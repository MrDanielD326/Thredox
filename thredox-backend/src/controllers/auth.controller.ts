import { Request, Response } from 'express';
import { oauth2Client } from '../config/google';
import pool from '../config/database';

export class AuthController {
    static async handleCallback(req: Request, res: Response): Promise<void> {
        const { code } = req.query;

        if (!code || typeof code !== 'string') {
            res.status(400).json({ error: 'Authorization code is required' });
            return;
        }

        try {
            // Exchange code for tokens
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);

            if (!tokens.access_token || !tokens.refresh_token || !tokens.expiry_date) {
                throw new Error('Invalid token response');
            }

            // Store tokens in database
            await pool.query(`
                INSERT INTO oauth_tokens (access_token, refresh_token, expiry_date)
                VALUES ($1, $2, $3)
                ON CONFLICT (id) DO UPDATE
                SET access_token = EXCLUDED.access_token, refresh_token = EXCLUDED.refresh_token, expiry_date = EXCLUDED.expiry_date
                `,
                [tokens.access_token, tokens.refresh_token, new Date(tokens.expiry_date)]
            );

            // Return tokens to frontend
            res.json({
                access_token: tokens.access_token,
                expires_in: Math.floor((tokens.expiry_date - Date.now()) / 1000)
            });
        } catch (error) {
            console.error('OAuth callback error:', error);
            res.status(500).json({ error: 'Failed to process OAuth callback' });
        }
    }

    static async refreshToken(req: Request, res: Response): Promise<void> {
        try {
            // Get current tokens
            const result = await pool.query('SELECT * FROM oauth_tokens LIMIT 1');

            if (result.rows.length === 0) {
                res.status(401).json({ error: 'No tokens found' });
                return;
            }

            const { refresh_token } = result.rows[0];

            // Set refresh token and get new access token
            oauth2Client.setCredentials({ refresh_token });
            const { credentials } = await oauth2Client.refreshAccessToken();

            if (!credentials.access_token || !credentials.expiry_date) {
                throw new Error('Invalid refresh token response');
            }

            // Update tokens in database
            await pool.query(`
                UPDATE oauth_tokens 
                SET access_token = $1, expiry_date = $2, updated_at = NOW()
                WHERE refresh_token = $3
                `,
                [credentials.access_token, new Date(credentials.expiry_date), refresh_token]
            );

            res.json({
                access_token: credentials.access_token,
                expires_in: Math.floor((credentials.expiry_date - Date.now()) / 1000)
            });
        } catch (error) {
            console.error('Token refresh error:', error);
            res.status(500).json({ error: 'Failed to refresh token' });
        }
    }

    static async revokeAccess(req: Request, res: Response): Promise<void> {
        try {
            // Get current tokens
            const result = await pool.query('SELECT * FROM oauth_tokens LIMIT 1');

            if (result.rows.length === 0) {
                res.status(401).json({ error: 'No tokens found' });
                return;
            }

            const { access_token } = result.rows[0];

            // Revoke access
            await oauth2Client.revokeToken(access_token);

            // Clear tokens from database
            await pool.query('DELETE FROM oauth_tokens');

            res.json({ message: 'Access revoked successfully' });
        } catch (error) {
            console.error('Access revocation error:', error);
            res.status(500).json({ error: 'Failed to revoke access' });
        }
    }
};
