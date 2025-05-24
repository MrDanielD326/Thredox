# Thredox Frontend 🎨

The frontend application for Thredox Email Archiving System, built with Vite, React, and TypeScript.

## ✨ Features

- [ ] Modern, responsive UI
- [ ] Real-time email sync status
- [ ] Advanced search and filtering
- [ ] Email thread visualization
- [ ] Attachment preview
- [ ] Dark/Light theme support

## 🔧 Prerequisites

Before starting, make sure you have:
- [ ] Node.js (v16 or higher)
- [ ] npm or yarn
- [ ] Backend service running
- [ ] Modern web browser
- [ ] Git installed

## 🌍 Environment Variables

Required variables in your `.env`:
```bash
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_FILE_PREVIEW=true

# Misc
VITE_APP_VERSION=$npm_package_version
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   cd thredox-frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   # Copy example env file
   cp .env.example .env

   # Edit .env with your settings
   nano .env   # or use your preferred editor
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   ```
   Navigate to http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
│   ├── auth/      # Authentication components
│   ├── email/     # Email-related components
│   ├── layout/    # Layout components
│   └── shared/    # Shared components
├── config/        # App configuration
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── layouts/       # Page layouts
├── pages/         # Page components
├── services/      # API services
├── styles/        # Global styles
├── types/         # TypeScript types
├── utils/         # Helper functions
└── App.tsx        # Root component
```

## 🛠️ Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run test`: Run tests

## 🎨 UI Components

### Core Components
- `<EmailList />` - Displays paginated email list
- `<EmailViewer />` - Shows email content and metadata
- `<SearchBar />` - Advanced email search
- `<AttachmentGrid />` - Grid view of email attachments
- `<ThreadView />` - Email thread visualization
- `<AuthGuard />` - Route protection component
- `<MainLayout />` - Main application layout
- `<LoadingSpinner />` - Loading state component
- `<ErrorBoundary />` - Error handling component
- `<Toast />` - Notification component

### Layout Components
- `<DashboardLayout />` - Dashboard page layout
- `<AuthLayout />` - Authentication pages layout
- `<SettingsLayout />` - Settings pages layout

### State Management
- `useEmailContext` - Email data and operations
- `useAuthContext` - Authentication state
- `useSyncStatus` - Email sync status
- `useToast` - Toast notifications
- `useTheme` - Theme switching
- `useLocalStorage` - Local storage operations

## 🔌 API Integration

### Authentication Flow
1. Click "Sign in with Google"
2. Complete OAuth process
3. Store tokens securely
4. Handle token refresh
5. Implement token persistence
6. Handle session expiry

### Email Operations
- Fetch email list with pagination
- Get email details
- Download attachments
- Trigger manual sync
- Search and filter
- Handle email threading
- Manage attachments
- Track sync status

## 🎯 Development Guide

### Adding New Features

1. **Create Component**
   ```tsx
   // src/components/NewFeature.tsx
   export const NewFeature: React.FC = () => {
     return <div>New Feature</div>
   }
   ```

2. **Add Styles**
   ```scss
   // src/styles/NewFeature.scss
   .new-feature {
     // your styles
   }
   ```

3. **Create Tests**
   ```tsx
   // src/components/__tests__/NewFeature.test.tsx
   describe('NewFeature', () => {
     it('renders correctly', () => {
       // your test
     })
   })
   ```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Failed**
   ```
   ✓ Check if backend is running
   ✓ Verify API_URL in .env
   ✓ Check CORS settings
   ```

2. **Build Errors**
   ```
   ✓ Clear node_modules and reinstall
   ✓ Check TypeScript errors
   ✓ Verify import paths
   ```

3. **Authentication Issues**
   ```
   ✓ Check OAuth configuration
   ✓ Clear browser cookies
   ✓ Verify token handling
   ```

## 🔍 Code Style Guide

- Use functional components with hooks
- Follow TypeScript best practices
- Implement error boundaries
- Write meaningful tests
- Use semantic HTML
- Follow accessibility guidelines

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests and lint
5. Submit pull request

## 📫 Support

Need help? Follow these steps:

1. Check troubleshooting guide
2. Search existing issues
3. Create detailed bug report
4. Include environment info

## 🎨 Design System

We use a combination of:
- Tailwind CSS for utility classes
- SCSS modules for component-specific styles
- CSS variables for theming
