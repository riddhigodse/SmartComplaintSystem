import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import UserLogin from "./components/UserLogin";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import CreateComplaint from "./components/CreateComplaint";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/create-complaint" element={<CreateComplaint />} />
      </Routes>
    </Router>
  );
}

export default App;
