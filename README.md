# 🎓 CampusOne — Unified Digital Campus Management Platform

A centralized university ERP platform built on the MERN stack (MongoDB, Express.js, React.js, Node.js) serving Students, Faculty, and Admin/Staff — each with separate interfaces after login.

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React.js, Tailwind CSS v4, DaisyUI |
| Backend        | Node.js, Express.js                |
| Database       | MongoDB with Mongoose ODM          |
| Authentication | JWT + bcrypt                       |
| Dev Server     | Vite (frontend), Nodemon (backend) |

## Project Structure

```
campusone/
├── server/                 # Backend API
│   ├── config/             # DB & email configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/          # Auth middleware
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── seed/               # Database seeding script
│   ├── .env.example        # Environment variables template
│   └── server.js           # Entry point
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utility
│   │   └── App.jsx         # Root component
│   ├── index.html
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** running locally on `mongodb://localhost:27017` (or provide a remote URI)

### 1. Clone & Setup Environment

```bash
cd server
cp .env.example .env
# Edit .env if needed (default values work for local development)
```

### 2. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This creates **61 users**: 50 students, 10 faculty, and 1 admin.

### 4. Start the Backend

```bash
cd server
npm run dev
```

Backend runs at `http://localhost:5000`

### 5. Start the Frontend

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`

## Default Login Credentials

### Admin
| Email | Password |
|---|---|
| `admin@campusone.edu` | `Admin@123` |

### Faculty (sample)
| Email | Password |
|---|---|
| `rajeshsharma@campusone.edu` | `Faculty@123` |
| `sunitaverma@campusone.edu` | `Faculty@123` |

### Students (sample)
| Email | Password |
|---|---|
| `aaravsharma@campusone.edu` | `Student@123` |
| `vivaanverma@campusone.edu` | `Student@123` |

> All student emails follow the format `firstnamelastname@campusone.edu` with password `Student@123`
> All faculty emails follow the format `firstnamelastname@campusone.edu` with password `Faculty@123`

## API Endpoints

| Method | Endpoint          | Description                    | Auth Required |
|--------|-------------------|--------------------------------|---------------|
| GET    | `/api/health`     | Health check                   | No            |
| POST   | `/api/auth/login` | Login with email & password    | No            |
| GET    | `/api/auth/me`    | Get current user profile       | Yes (Bearer)  |

## Day 1 Features

- ✅ Express server with MongoDB connection
- ✅ User model with role-based schema
- ✅ Database seeding (50 students, 10 faculty, 1 admin)
- ✅ JWT authentication (login + protected routes)
- ✅ Professional login page with university branding
- ✅ Auth context with global state management
- ✅ Role-based protected routes
- ✅ Dashboard shells for all three roles

---

© 2026 CampusOne. Built with the MERN Stack.
