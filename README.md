
# WMS WebApp - Improved Architecture

This repository contains a Warehouse Management System (WMS) WebApp with an improved architecture designed for maintainability, scalability, and developer experience.

## Architecture Overview

The application follows a feature-based organization with clear separation of concerns:

```
src/
├── app/              # Next.js style routing with layouts
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Shared UI components
├── contexts/         # React context providers
├── features/         # Feature-based modules
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries
├── services/         # API services
└── types/            # TypeScript definitions
```

## Key Features

- Feature-based organization (Domain-Driven Design approach)
- Clear separation of concerns
- Reusable components and services
- Type safety with TypeScript
- Centralized state management
- Clean routing structure
- API service layer abstraction

## Feature Modules

Each feature module encapsulates related functionality:

```
features/
├── auth/             # Authentication related functionality
├── dashboard/        # Dashboard visualizations and analytics
├── inventory/        # Inventory management
├── permission-management/ # User, role and permission management
└── ...
```

Inside each feature:
```
features/auth/
├── components/       # Feature-specific components
├── hooks/            # Feature-specific hooks
├── services/         # Feature-specific services
├── types/            # Feature-specific types
└── utils/            # Feature-specific utility functions
```

## API Service Layer

The application uses a service layer to abstract API communication:

```
services/
├── api-client.ts     # Base API client configuration
├── auth.service.ts   # Authentication services
├── dashboard/        # Dashboard-related services
└── ...
```

## Routing Structure

The application uses a Next.js-inspired file-based routing structure:

```
app/
├── (auth)/           # Authentication routes with layout
├── (dashboard)/      # Dashboard routes with layout
└── (settings)/       # Settings routes with layout
```

## State Management

- React Context API for global state
- React Query for server state management
- Local component state for UI state

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Development Guidelines

- Follow the feature-based organization pattern
- Create small, focused components
- Use TypeScript for type safety
- Leverage custom hooks for reusable logic
- Use service layer for API communication
- Follow the Next.js-inspired routing structure
- Write unit tests for critical business logic
