# DevTinder 🚀

DevTinder is a full-stack social networking platform designed specifically for developers. It functions similarly to popular dating apps but is tailored to help developers connect, collaborate, and network with each other based on their tech stacks and interests.

## 🏗️ Project Architecture

This project is built using the **MERN Stack** and is divided into two main components:

- **[Frontend](./DevTinder_frontend/)**: A responsive, fast Single Page Application built with React, Vite, and Tailwind CSS.
- **[Backend](./DevTinder_backend/)**: A robust RESTful API built with Node.js, Express, and MongoDB.

## 🌟 Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens) stored in HTTP-only cookies.
- **Profile Management**: Users can create profiles highlighting their skills, bio, and experience.
- **Developer Feed**: Browse through profiles of other developers.
- **Connection System**: Send, accept, or reject connection requests (similar to swiping right/left).
- **State Management**: Centralized state management on the frontend using Redux Toolkit.
- **Responsive Design**: Beautiful UI built with Tailwind CSS and DaisyUI components.

## 🚀 Getting Started

To run the application locally, you will need to start both the backend server and the frontend development server.

### Prerequisites
- Node.js installed
- MongoDB installed locally or an active MongoDB Atlas cluster URI

### 1. Backend Setup
Navigate to the backend directory, install dependencies, and start the server:
```bash
cd DevTinder_backend
npm install
npm run dev
```
*(Make sure to set up your environment variables or MongoDB connection strings in the backend as required)*

### 2. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the Vite dev server:
```bash
cd DevTinder_frontend
npm install
npm run dev
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
