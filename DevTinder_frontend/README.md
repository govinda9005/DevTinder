# DevTinder Frontend 🖥️

This is the user interface for the DevTinder application, built to be fast, responsive, and engaging. It provides the visual layout and interactivity for developers to connect with one another.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 & DaisyUI
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## 🚀 Features & Pages

- **Authentication Flow**: Secure login page that synchronizes with the global Redux store.
- **Feed Page (`/`)**: Discover and view profiles of other developers.
- **Connections Page (`/connections`)**: View and manage your active connections and pending requests.
- **Profile Page (`/profile`)**: View and edit your personal developer profile.
- **Dynamic NavBar**: Navigation bar that updates its state based on the user's authentication status.

## 🏃‍♂️ Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. The application will typically be available at `http://localhost:5173`.

## 📝 Development Journey / Milestones

*(Original project roadmap)*
- [x] Create a Vite + React application
- [x] Remove unnecessary code and create a Hello World app
- [x] Install Tailwind CSS & Daisy UI
- [x] Add NavBar component and separate it into `NavBar.jsx`
- [x] Install `react-router-dom` and setup routing (`BrowserRouter` > `Routes` > `Route` > `Outlet`)
- [x] Create a Footer component
- [x] Create a Login Page
- [x] Install and configure Axios for API calls with `withCredentials: true`
- [x] Set up backend CORS middleware
- [x] Install and configure Redux Toolkit (`configureStore`, `Provider`, `createSlice`)
- [x] Implement login and verify data flow into the Redux store (using Redux DevTools)
- [x] Make NavBar reactive to user login state
- [x] Refactor code: add constants file, organize components folder
