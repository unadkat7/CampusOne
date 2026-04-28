# CampusOne — Unified Digital Campus Management Platform

CampusOne is a centralized university ERP platform built on the MERN stack. It provides a single login system for all university users — students, faculty, and administrators — each with a completely separate interface and access level based on their role. There is no public registration; all accounts are pre-created and credentials are distributed by the admin.

---

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) + bcrypt
- **Email Service:** Nodemailer (configured, not yet active)

---

## Project Structure

```
CampusOne/
├── server/
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── healthRoutes.js
│   ├── seed/
│   │   └── seedData.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardShell.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── FacultyDashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js v18 or above
- npm v9 or above
- MongoDB Atlas account or a local MongoDB instance

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CampusOne.git
cd CampusOne
```

---

### 2. Configure Environment Variables

Navigate to the server directory and create your `.env` file from the provided example:

```bash
cd server
cp .env.example .env
```

Open `.env` and fill in the values:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

---

### 3. Install Dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

---

### 4. Seed the Database

From the server directory, run the seed script to populate the database with 50 students, 10 faculty members, and 1 admin account:

```bash
cd server
npm run seed
```

This will create all pre-defined user accounts with hashed passwords. If data already exists, the script will skip re-seeding to avoid duplicates.

---

### 5. Run the Application

Start the backend server (from the server directory):

```bash
npm run dev
```

Start the frontend development server (from the client directory):

```bash
npm run dev
```

The backend runs on `http://localhost:5000` and the frontend runs on `http://localhost:5173`.

---

## Default Login Credentials

All accounts are pre-seeded. There is no registration flow. Use the credentials below to test each role.

| Role    | Email                      | Password      |
|---------|----------------------------|---------------|
| Admin   | admin@campusone.edu        | Admin@123     |
| Faculty | facultyname@campusone.edu  | Faculty@123   |
| Student | studentname@campusone.edu  | Student@123   |

After login, the system automatically redirects each user to their respective dashboard based on their role. A student logging in will never see the admin or faculty interface.

---

## API Endpoints

| Method | Endpoint          | Access    | Description                        |
|--------|-------------------|-----------|------------------------------------|
| GET    | /api/health       | Public    | Health check for the API server    |
| POST   | /api/auth/login   | Public    | Login with email and password      |
| GET    | /api/auth/me      | Protected | Get logged-in user profile         |

Protected routes require a valid JWT token passed in the Authorization header as `Bearer <token>`.

---

## Role-Based Access

| Role    | Dashboard Route       | Access Scope                              |
|---------|-----------------------|-------------------------------------------|
| Student | /student/dashboard    | Own profile, courses, attendance, fees    |
| Faculty | /faculty/dashboard    | Assigned courses, enrolled students       |
| Admin   | /admin/dashboard      | All users, departments, system settings   |

Attempting to access a dashboard of a different role redirects the user back to their own dashboard automatically.

---

## Development Methodology

This project follows an Agile Scrum-based development approach with weekly sprints. The team uses a feature-branch Git workflow where each member works on a dedicated branch and raises a pull request to merge into main.

Branch naming convention followed:

```
feature/auth-backend
feature/client-setup
feature/login-ui
```

---

## Authors

This project is developed and maintained by Group 21 — Prime Coders, M.Sc. IT, DA-IICT, Gandhinagar.

| Name       | Role                              |
|------------|-----------------------------------|
| Jay        | Project Lead, Repository Manager  |
| Durgesh    | Backend Development, Auth System  |
| Priyanshu  | Frontend Setup, API Integration   |
| Moksh      | UI Development, React Components  |

---

## Authors

This project is created as university requirement by Jay, Moksh, Priyanshu & Durgesh.
