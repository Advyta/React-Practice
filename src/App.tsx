import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import MenuLayout from "./Components/Menu/MenuLayout";
import PersonalDetails from "./Components/Content/PersonalDetails";
import Attendance from "./Components/Content/Attendance/Attendance";

// Project:     Reactjs practice
// Module:      Main Module
// Component:   App Component
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// Screen Layout:
// - A single-page application layout with routing functionality using `react-router-dom`.
// - Contains a `BrowserRouter` wrapping a `main` container with `Routes` defining the navigation paths.
// - Routes are linked to components such as `MenuLayout`, `Login`, `PersonalDetails`, and `Attendance` 
// they will appear on screen as per user selection.

// UI Behavior:
// - Renders different components based on the URL path.
// - Redirects all unhandled paths to the home route (`/`).

// Screen Data:
// - No specific data handling; primarily manages routing.

// Screen Data Validation Rules:
// - Ensures that unknown paths are redirected to the home route.

function App() {
  return (
    <BrowserRouter>
      <main className="container">
        {/* <h1 className="mb-5">Welcome to ABC School</h1> */}
        <Routes>
          {/* Home Route (displays Menu component) */}
          <Route path="/" element={<MenuLayout />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* SubMenuScreen Route with dynamic title */}
          {/* <Route path="/view/:title" element={<SubMenuScreen />} /> */}

          <Route path="/personal-details" element={<PersonalDetails />} />

          <Route path="/attendance" element={<Attendance />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
