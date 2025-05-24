import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { oauth2Client, SCOPES } from './config/google';
import authRoutes from './routes/auth.routes';
import emailRoutes from './routes/email.routes';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Google OAuth login URL generator
app.get('/api/auth/google/url', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
    });
    res.json({ url });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
