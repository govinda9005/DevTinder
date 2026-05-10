# DevTinder Backend ⚙️

This is the backend service for the DevTinder application. It is a RESTful API built with Node.js and Express.js, using MongoDB for data storage. It handles all the core business logic, user authentication, and data persistence for the application.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcrypt (for password hashing)
- **Middleware**: cookie-parser (for JWT session management), cors (for cross-origin requests)
- **Validation**: validator.js

## 📁 Folder Structure

- `src/app.js`: Main entry point and server setup.
- `src/config/`: Configuration files (e.g., database connection).
- `src/models/`: Mongoose schemas (User, ConnectionRequest).
- `src/routes/`: API route definitions (auth, profile, requests, user).
- `src/middlewares/`: Custom Express middlewares (e.g., user authentication).
- `src/utils/`: Utility functions and helpers.

## 🚀 Core API Features

- **Auth Routes (`/auth`)**: Registration, login, and logout functionalities. Issues JWT cookies upon successful login.
- **Profile Routes (`/profile`)**: Viewing and updating logged-in user profile details (skills, bio, etc.).
- **Request Routes (`/request`)**: Sending connection requests to other users, and accepting/rejecting incoming requests.
- **User Routes (`/user`)**: Fetching the feed of developers and managing the user's active connections list.

## 🏃‍♂️ Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server (uses `nodemon` for auto-restarts):
   ```bash
   npm run dev
   ```
   *Alternatively, run `npm start` for standard execution.*

## 🔒 Security Notes
- Passwords are encrypted using `bcrypt` before saving to the database.
- Authentication state is maintained using HTTP-only cookies containing JSON Web Tokens, mitigating certain XSS vulnerabilities compared to localStorage.
- The API enforces CORS policies to only accept requests from the configured frontend origin with credentials enabled.
