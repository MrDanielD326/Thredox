import { Request, Response, NextFunction } from 'express';
import { google } from 'googleapis';
import { oauth2Client } from '../config/google';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export async function checkAuth(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: 'No authorization header' });
            return;
        }

        // Get the access token from the header
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        // Set the access token
        oauth2Client.setCredentials({ access_token: token });

        // Verify the token by making a test request to get user info
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
        const userInfo = await oauth2.userinfo.get();

        if (!userInfo.data.email) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        // Store the user ID (email) in the request
        req.userId = userInfo.data.email;

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};
