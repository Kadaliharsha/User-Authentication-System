# OTP Auth Full-Stack App

A modern, full-stack authentication app with OTP-based login, user registration, profile image upload, and account management. Built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## Features
- User registration with profile image upload
- OTP-based login (email/password + OTP verification)
- JWT authentication
- User dashboard with profile info and image
- Account deletion (removes user and image)
- Elegant, responsive UI
- Security: bcrypt password hashing, rate-limiting for OTP requests

---

## Tech Stack
- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer, bcrypt, express-rate-limit, JWT

---

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Install dependencies
```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure Environment
- In `backend/.env`, set:
  - `MONGODB_URI=<your-mongodb-uri>`
  - `JWT_SECRET=<your-secret>`

### 4. Start the servers
- **Backend:**
  ```bash
  cd backend
  npm start
  # or nodemon server.js
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm start
  ```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

---

## Usage
- **Register:** Create an account and upload a profile image.
- **Login:** Enter email & password, then verify OTP.
- **Dashboard:** View profile, logout, or delete account.

---

## Security Notes
- Passwords are hashed with bcrypt before storage.
- OTP requests are rate-limited (max 5 per 10 minutes per IP).
- JWT is used for authentication.
- Uploaded images are stored in `/backend/uploads` and deleted on account removal.

---

## Customization
- Update styles in `frontend/src/components/FormStyles.css`.
- Change backend settings in `backend/server.js` and `backend/routes/auth.routes.js`.

---

## License
MIT 