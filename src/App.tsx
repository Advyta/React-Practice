import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Menu from "./Components/Menu/Menu";
import Login from "./Components/Login/Login";
import SubMenuScreen from "./Components/SubMenuScreen/SubMenuScreen";

function App() {
  return (
    <BrowserRouter>
      <main className="container">
        <h1 className="mb-5">Welcome to ABC School</h1>
        <Routes>
          {/* Home Route (displays Menu component) */}
          <Route path="/" element={<Menu />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* SubMenuScreen Route with dynamic title */}
          <Route path="/view/:title" element={<SubMenuScreen />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
