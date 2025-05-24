import { Request, Response } from 'express';
import { EmailService } from '../services/email.service';
import pool from '../config/database';

export class EmailController {
    static async getEmails(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '20', search, from, to } = req.query;
            const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

            let query = `
        SELECT 
          e.*,
          json_agg(DISTINCT jsonb_build_object(
            'type', r.type,
            'name', r.name,
            'address', r.address
          )) as recipients,
          json_agg(DISTINCT jsonb_build_object(
            'filename', a.filename,
            'mime_type', a.mime_type,
            'size', a.size,
            'drive_view_link', a.drive_view_link
          )) FILTER (WHERE a.id IS NOT NULL) as attachments
        FROM emails e
        LEFT JOIN recipients r ON e.id = r.email_id
        LEFT JOIN attachments a ON e.id = a.email_id
        WHERE 1=1
      `;

            const queryParams: any[] = [];
            let paramCount = 1;

            if (search) {
                query += ` AND (
          e.subject ILIKE $${paramCount} OR
          e.body_text ILIKE $${paramCount}
        )`;
                queryParams.push(`%${search}%`);
                paramCount++;
            }

            if (from) {
                query += ` AND e.date >= $${paramCount}`;
                queryParams.push(from);
                paramCount++;
            }

            if (to) {
                query += ` AND e.date <= $${paramCount}`;
                queryParams.push(to);
                paramCount++;
            }

            query += `
        GROUP BY e.id
        ORDER BY e.date DESC
        LIMIT $${paramCount} OFFSET $${paramCount + 1}
      `;
            queryParams.push(limit, offset);

            const result = await pool.query(query, queryParams);

            // Get total count for pagination
            const countResult = await pool.query(
                'SELECT COUNT(*) FROM emails WHERE 1=1' +
                (search ? ' AND (subject ILIKE $1 OR body_text ILIKE $1)' : '') +
                (from ? ' AND date >= $2' : '') +
                (to ? ' AND date <= $3' : ''),
                queryParams.slice(0, -2)
            );

            res.json({
                emails: result.rows,
                total: parseInt(countResult.rows[0].count),
                page: parseInt(page as string),
                limit: parseInt(limit as string)
            });
        } catch (error) {
            console.error('Error fetching emails:', error);
            res.status(500).json({ error: 'Failed to fetch emails' });
        }
    }

    static async getEmailById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const result = await pool.query(
                `SELECT 
          e.*,
          json_agg(DISTINCT jsonb_build_object(
            'type', r.type,
            'name', r.name,
            'address', r.address
          )) as recipients,
          json_agg(DISTINCT jsonb_build_object(
            'filename', a.filename,
            'mime_type', a.mime_type,
            'size', a.size,
            'drive_view_link', a.drive_view_link
          )) FILTER (WHERE a.id IS NOT NULL) as attachments
        FROM emails e
        LEFT JOIN recipients r ON e.id = r.email_id
        LEFT JOIN attachments a ON e.id = a.email_id
        WHERE e.id = $1
        GROUP BY e.id`,
                [id]
            );

            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Email not found' });
                return;
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching email:', error);
            res.status(500).json({ error: 'Failed to fetch email' });
        }
    }

    static async triggerSync(req: Request, res: Response): Promise<void> {
        try {
            // Get last history ID
            const result = await pool.query(
                'SELECT history_id FROM emails ORDER BY date DESC LIMIT 1'
            );
            const lastHistoryId = result.rows[0]?.history_id;

            // Start sync process
            const emailService = EmailService.getInstance();
            emailService.fetchEmails(lastHistoryId).catch((error: any) => {
                console.error('Background sync error:', error);
            });

            res.json({ message: 'Sync process started' });
        } catch (error) {
            console.error('Error triggering sync:', error);
            res.status(500).json({ error: 'Failed to trigger sync' });
        }
    }

    static async getSyncStatus(req: Request, res: Response): Promise<void> {
        try {
            const result = await pool.query(
                'SELECT * FROM sync_history ORDER BY start_time DESC LIMIT 1'
            );

            if (result.rows.length === 0) {
                res.json({ status: 'No sync history found' });
                return;
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error('Error fetching sync status:', error);
            res.status(500).json({ error: 'Failed to fetch sync status' });
        }
    }
} 