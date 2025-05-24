export interface EmailAddress {
    name?: string;
    address: string;
}

export interface Email {
    id?: number;
    messageId: string;
    threadId: string;
    subject?: string;
    bodyText?: string;
    bodyHtml?: string;
    date: Date;
    gmailId: string;
    historyId?: string;
    rawHeaders: Record<string, any>;
    createdAt?: Date;
}

export interface Recipient {
    id?: number;
    emailId: number;
    type: 'from' | 'to' | 'cc' | 'bcc';
    name?: string;
    address: string;
    createdAt?: Date;
}

export interface Attachment {
    id?: number;
    emailId: number;
    filename: string;
    mimeType: string;
    size: number;
    gmailAttachmentId: string;
    driveFileId?: string;
    driveViewLink?: string;
    createdAt?: Date;
}

export interface OAuthToken {
    id?: number;
    accessToken: string;
    refreshToken: string;
    expiryDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SyncHistory {
    id?: number;
    startTime: Date;
    endTime?: Date;
    status: 'running' | 'completed' | 'failed';
    messagesProcessed: number;
    errorMessage?: string;
    createdAt?: Date;
}

export interface EmailMetadata {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    historyId: string;
    internalDate: string;
    payload: {
        headers: Array<{
            name: string;
            value: string;
        }>;
        parts?: Array<{
            partId: string;
            mimeType: string;
            filename: string;
            headers: Array<{
                name: string;
                value: string;
            }>;
            body: {
                attachmentId?: string;
                size: number;
                data?: string;
            };
        }>;
        body?: {
            data?: string;
            size: number;
        };
    };
}
