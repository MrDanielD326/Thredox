import { simpleParser } from 'mailparser';
import { gmail, drive } from '../config/google';
import pool from '../config/database';
import { Email, Recipient, Attachment, EmailMetadata } from '../types';
import { GaxiosResponse } from 'gaxios';
import { gmail_v1 } from 'googleapis';

export class EmailService {
    private static instance: EmailService;

    private constructor() { }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    async fetchEmails(historyId?: string): Promise<void> {
        try {
            const syncHistoryResult = await pool.query(
                'INSERT INTO sync_history (start_time, status, messages_processed) VALUES (NOW(), $1, $2) RETURNING id',
                ['running', 0]
            );
            const syncHistoryId = syncHistoryResult.rows[0].id;

            let pageToken: string | undefined;
            let messagesProcessed = 0;

            do {
                const response = await gmail.users.messages.list({
                    userId: 'me',
                    pageToken: pageToken || undefined,
                    q: 'in:inbox',
                    ...(historyId ? { startHistoryId: historyId } : {})
                });

                const messages = response.data.messages || [];
                if (messages.length === 0) break;

                for (const message of messages) {
                    if (message.id) {
                        try {
                            await this.processEmail(message.id);
                            messagesProcessed++;
                        } catch (error) {
                            console.error(`Error processing message ${message.id}:`, error);
                        }
                    }
                }

                pageToken = response.data.nextPageToken || undefined;
            } while (pageToken);

            await pool.query(
                'UPDATE sync_history SET end_time = NOW(), status = $1, messages_processed = $2 WHERE id = $3',
                ['completed', messagesProcessed, syncHistoryId]
            );
        } catch (error) {
            console.error('Error fetching emails:', error);
            throw error;
        }
    }

    private async processEmail(messageId: string): Promise<void> {
        const message = await gmail.users.messages.get({
            userId: 'me',
            id: messageId,
            format: 'full'
        });

        const emailMetadata = message.data as EmailMetadata;

        const existingEmail = await pool.query(
            'SELECT id FROM emails WHERE gmail_id = $1',
            [messageId]
        );

        if (existingEmail.rows.length > 0) return;

        const headers = emailMetadata.payload.headers;
        const subject = headers.find(h => h.name.toLowerCase() === 'subject')?.value || '';
        const messageIdHeader = headers.find(h => h.name.toLowerCase() === 'message-id')?.value || '';
        const date = headers.find(h => h.name.toLowerCase() === 'date')?.value;

        let bodyText = '';
        let bodyHtml = '';

        if (emailMetadata.payload.body?.data) {
            const content = Buffer.from(emailMetadata.payload.body.data, 'base64').toString();
            const parsed = await simpleParser(content);
            bodyText = parsed.text || '';
            bodyHtml = parsed.html?.toString() || '';
        }

        const emailResult = await pool.query(
            `INSERT INTO emails 
       (message_id, thread_id, subject, body_text, body_html, date, gmail_id, history_id, raw_headers)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
            [
                messageIdHeader,
                emailMetadata.threadId,
                subject,
                bodyText,
                bodyHtml,
                new Date(date || emailMetadata.internalDate),
                messageId,
                emailMetadata.historyId,
                JSON.stringify(headers)
            ]
        );

        const emailId = emailResult.rows[0].id;

        await this.processRecipients(headers, emailId);

        if (emailMetadata.payload.parts?.length) {
            await this.processAttachments(emailMetadata.payload.parts, messageId, emailId);
        }
    }

    private async processRecipients(headers: Array<{ name: string; value: string }>, emailId: number): Promise<void> {
        const recipientTypes = ['from', 'to', 'cc', 'bcc'];

        for (const type of recipientTypes) {
            const header = headers.find(h => h.name.toLowerCase() === type);
            if (!header) continue;

            const addresses = header.value.split(',').map(addr => {
                const match = addr.match(/(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/);
                return {
                    name: match?.[1]?.trim(),
                    address: match?.[2]?.trim() || addr.trim()
                };
            });

            for (const { name, address } of addresses) {
                await pool.query(
                    'INSERT INTO recipients (email_id, type, name, address) VALUES ($1, $2, $3, $4)',
                    [emailId, type, name, address]
                );
            }
        }
    }

    private async processAttachments(parts: NonNullable<EmailMetadata['payload']['parts']>, messageId: string, emailId: number): Promise<void> {
        for (const part of parts) {
            if (!part.filename || !part.body.attachmentId) continue;

            const attachment = await gmail.users.messages.attachments.get({
                userId: 'me',
                messageId,
                id: part.body.attachmentId
            });

            if (!attachment.data.data) continue;

            const fileMetadata = {
                name: part.filename,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID as string]
            };

            const media = {
                mimeType: part.mimeType,
                body: Buffer.from(attachment.data.data, 'base64')
            };

            const file = await drive.files.create({
                requestBody: fileMetadata,
                media,
                fields: 'id, webViewLink'
            });

            await pool.query(
                `INSERT INTO attachments 
         (email_id, filename, mime_type, size, gmail_attachment_id, drive_file_id, drive_view_link)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    emailId,
                    part.filename,
                    part.mimeType,
                    part.body.size,
                    part.body.attachmentId,
                    file.data.id,
                    file.data.webViewLink
                ]
            );
        }
    }
} 