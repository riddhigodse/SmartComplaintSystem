import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import bgImage from "../assets/PAzR.jpg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if user is already logged in
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    
    if (token && role === "admin") {
      // Redirect to admin dashboard if already logged in as admin
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      console.log("🔍 Admin attempting login to:", API.defaults.baseURL + "/login");
      console.log("📧 Email:", email);
      const res = await API.post("/login", { email, password });
      console.log("✅ Admin Login Response:", res.data);

      const token = res.data.access_token;
      const role = res.data.role || res.data.user?.role;
      const id = res.data.user_id || res.data.user?.id;

      if (!token || !role) {
        alert("Login response format error");
        return;
      }

      if (role !== "admin") {
        alert("You are not an admin");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", id);

      alert("Admin login successful!");
      navigate("/admin-dashboard");

    } catch (err) {
      console.error("Admin Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Invalid credentials!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div style={{ backgroundColor: "rgba(255,255,255,0.9)", padding: 40, borderRadius: 10, textAlign: "center" }}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, margin: 10, width: 250 }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, margin: 10, width: 250 }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFA41C",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: 5,
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;