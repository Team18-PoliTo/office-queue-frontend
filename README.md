# Office Queue Management System - Frontend

Frontend web application for the office queue management system, providing interfaces for customers and officers.

## Tech Stack

- **React 19.1.1** with **JavaScript/JSX**
- **Vite 7.1.7** as build tool and dev server
- **React Bootstrap 2.10.10** for UI components
- **Bootstrap 5.3.8** for styling and responsive design
- **React Router 7.9.4** for client-side routing
- **Bootstrap Icons 1.13.1** for iconography

## Installation

```bash
npm install
```

## Run

```bash
# normal mode
npm run

# Development mode 
npm run dev

# Build for production
npm run build

```

## Current Sprint - User Stories

This sprint includes:
1. **Service Selection** - Customer chooses service and gets ticket
2. **Officer Dashboard** - Officer calls next customer in queue

## Architecture

This project follows a **component-based React architecture**:

```
App → Components → API Layer → Backend
```

### Layer Responsibilities:

- **Components**: UI rendering and user interaction
- **API Layer**: Communication with backend services
- **Routing**: Navigation between different views
- **State Management**: Local component state with hooks

## Project Structure

```
src/
├── main.jsx                        # Application entry point
├── App.jsx                         # Root component with routing
├── App.css                         # Global application styles
├── index.css                       # Global styles and Inter font import
├── components/                     # React components
│   ├── DefaultLayout.jsx           # Main layout wrapper
│   ├── HomePage.jsx                # Landing page (Customer/Officer choice)
│   ├── NavHeader.jsx               # Navigation header component  
│   ├── OfficerPage.jsx             # Officer dashboard for queue management
│   ├── ServicesPage.jsx            # Customer service selection interface
│   └── Style/                      # Component-specific CSS files
│       ├── HomePage.css            # Homepage button styling
│       ├── NavHeader.css           # Navigation header styling
│       ├── OfficerPage.css         # Officer dashboard styling
│       └── ServicesPage.css        # Service cards and ticket modal styling
└── API/
    └── API.mjs             # Backend communication layer
```

## Components Overview

### Core Components

- **HomePage** - Entry point with Customer/Officer selection buttons
- **ServicesPage** - Displays available services as clickable cards, shows ticket modal
- **OfficerPage** - Officer interface with current customer display and "Call Next" button
- **NavHeader** - Navigation bar with page title and home button
- **DefaultLayout** - Wrapper component providing consistent layout structure

### API Integration

The `API.mjs` module provides:
- `getServices()` - Fetch available services from backend
- `postTicket(serviceId)` - Create new ticket for selected service  
- `callNextCustomer()` - Officer calls next customer in queue

## Backend Integration

The frontend connects to the backend API running on `http://localhost:3001` via proxy configuration in `vite.config.js`:

```javascript
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### API Endpoints Used

- `GET /api/services` - Get list of available services
- `POST /api/tickets` - Create ticket for service (body: `{serviceId}`)
- `POST /api/officer/next-customer` - Call next customer

## User Flows

### Customer Flow
1. **Homepage** → Click "Customer" button
2. **ServicesPage** → Select service from available cards
3. **Ticket Modal** → View generated ticket number (auto-closes after 4 seconds)

### Officer Flow  
1. **Homepage** → Click "Officer" button
2. **OfficerPage** → View current customer and click "Call Next Customer"


## Development Configuration

### Vite Configuration
- React plugin for JSX support
- Proxy setup for API calls to backend
- Hot Module Replacement for fast development

