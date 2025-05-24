# Thredox Backend 🚀

The backend service for Thredox Email Archiving System, built with Express.js, TypeScript, and PostgreSQL.

## 🔧 Prerequisites

Before you begin, ensure you have:
- [ ] Node.js (v16 or higher)
- [ ] PostgreSQL (v12 or higher)
- [ ] Google Cloud account
- [ ] Gmail account with API access
- [ ] Git installed

## 🌍 Environment Variables

Required variables in your `.env`:
```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=thredox
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Security
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:5173
```

## 🎯 Quick Start

1. **Clone and Install Dependencies**
   ```bash
   cd thredox-backend
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your credentials
   nano .env   # or use your preferred editor
   ```

3. **Set Up PostgreSQL**
   ```bash
   # Login to PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE thredox;

   # Create user (optional, for better security)
   CREATE USER thredox_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE thredox TO thredox_user;

   # Exit psql
   \q
   ```

4. **Initialize Database Schema**
   ```bash
   # Run the schema file
   psql -U postgres -d thredox -f src/schema.sql
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔑 Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable APIs:
   - [x] Gmail API
   - [x] Google Drive API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:3000/api/auth/google/callback`

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Custom middlewares
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── index.ts        # Application entry point
```

## 🛠️ Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build for production
- `npm start`: Run production server
- `npm test`: Run tests

## 🔍 API Endpoints

### Authentication
- `GET /api/auth/google/url` - Get Google OAuth URL
- `GET /api/auth/google/callback` - OAuth callback
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/revoke` - Revoke access

### Emails
- `GET /api/emails` - List emails (with pagination)
- `GET /api/emails/:id` - Get email details
- `POST /api/sync` - Trigger email sync
- `GET /api/sync/status` - Get sync status

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   ```
   ✓ Check if PostgreSQL is running
   ✓ Verify database credentials in .env
   ✓ Ensure database exists
   ```

2. **Google OAuth Error**
   ```
   ✓ Verify CLIENT_ID and CLIENT_SECRET
   ✓ Check redirect URI configuration
   ✓ Ensure APIs are enabled
   ```

3. **Email Sync Not Working**
   ```
   ✓ Check Gmail API quota
   ✓ Verify OAuth tokens
   ✓ Check drive folder permissions
   ```

## 📝 Development Notes

- Use `nodemon` for auto-reloading during development
- TypeScript compilation errors will be shown in the console
- Check `src/types/index.ts` for type definitions
- Use the error middleware for consistent error responses

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## 📫 Support

Having issues? Let's resolve them:

1. Open an issue
2. Provide error logs
3. Describe expected behavior
4. Share environment details 