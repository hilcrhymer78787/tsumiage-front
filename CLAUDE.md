# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tsumiage is a task management and calendar application built with Next.js 12, React 17, TypeScript, and Material-UI. The app is designed as a PWA with both desktop and mobile interfaces, featuring authentication, task management, friend connections, and calendar views for tracking work.

## Development Commands

### Setup

```bash
# Install dependencies
yarn install

# Copy environment file (manually set API URL)
cp .env.development .env.local
```

### Running the App

```bash
# Development server (requires .env.local)
yarn dev

# Production build (uses .env.production)
yarn build

# Build for X-Server (uses .env.xserver)
yarn build:x

# Start production server
yarn start
```

### Code Quality

```bash
# Format with Prettier
yarn format

# Lint and auto-fix
yarn lint

# Type checking (watch mode)
yarn tsc

# Run all fixes (format, lint, tsc)
yarn fix

# Run tests
yarn test
```

## Architecture

### Application Structure

- **State Management**: Recoil for global state (login info, snackbar notifications)
- **API Communication**: Axios instance configured in `plugins/axios.ts` with cookie-based authentication
- **Styling**: Material-UI v5 with custom dark theme in `plugins/theme.ts`
- **Layout**: Responsive layout with drawer navigation (desktop) and bottom navigation (mobile) in `layouts/default.tsx`

### Directory Organization

- `pages/` - Next.js pages (routes: `/task`, `/calendar`, `/friend`, `/mypage`)
- `components/` - React components organized by feature (task, calendar, friend, user, common)
- `data/` - Custom hooks for API calls, organized by resource type
  - `data/types/` - TypeScript type definitions
  - `data/common/` - Shared hooks (useLoginInfo, useSnackbar, useErrHandler)
  - `data/user/` - User authentication hooks
  - `data/task/` - Task CRUD operations
  - `data/work/` - Work calendar operations
  - `data/invitation/` - Friend invitation operations
- `layouts/` - Layout components
- `plugins/` - Global configuration (axios, MUI theme)
- `public/` - Static assets

### Key Patterns

**Authentication Flow**:

- App initializes by calling `bearerAuth()` to check authentication status with HTTP-only cookies
- Login info stored in Recoil atom (`loginInfoAtom` in `data/common/useLoginInfo.ts`)
- Unauthenticated users see login/registration forms
- 401 errors automatically trigger logout via `useErrHandler`

**Data Fetching Hooks**:
All API hooks follow this pattern:

- Located in `data/[resource]/use[Action][Resource].ts`
- Return loading state, error state, and async function
- Use centralized error handler (`useErrHandler`)
- Example: `useCreateTask`, `useReadTasks`, `useDeleteTask`

**Component Organization**:

- Feature-specific components in `components/[feature]/`
- Shared utilities in `components/common/`
- Main page components named `[Feature]Main.tsx`
- Item components named `[Feature]Item.tsx`

**Environment Variables**:

- `NEXT_PUBLIC_APP_ENV` - Environment identifier
- `NEXT_PUBLIC_API_BASE_URL` - Backend API URL (required)
- Three environment configs: `.env.development`, `.env.production`, `.env.xserver`

### Recoil State

The app uses HMR-safe Recoil atoms with global storage to prevent duplicate atom keys during development:

```typescript
// Pattern used in data/common/useLoginInfo.ts
export const loginInfoAtom =
  (global as any).loginInfoAtom ??
  atom<LoginInfo | null>({
    key: "loginInfo",
    dangerouslyAllowMutability: true,
    default: null,
  });
```

### API Integration

- Base axios instance: `plugins/axios.ts`
- Configured with `withCredentials: true` for cookie-based auth
- Response interceptor logs all responses in development
- Error interceptor handles cancellation and error logging

### PWA Configuration

- PWA setup via `next-pwa` in `next.config.js`
- Disabled in development mode
- Service worker outputs to `public/`
- Splash screens in `public/splashscreens/`

### Responsive Design

- Uses custom `useMedia` hook to detect desktop vs mobile
- Desktop: Fixed drawer navigation (180px width)
- Mobile: Bottom navigation with safe area insets
- MUI theme includes safe area support for iOS notch

## Code Style

- **Formatting**: Prettier with 100 character line width, 2-space tabs, semicolons, double quotes
- **Linting**: ESLint with Next.js config, enforces `prefer-const`, `no-var`, semicolons, JSX patterns
- **TypeScript**: Strict mode enabled, path alias `@/*` maps to project root

## Node Version

Node.js 22.20.0 (specified in `.nvmrc`)
