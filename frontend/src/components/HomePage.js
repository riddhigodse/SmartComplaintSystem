import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images2.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    box: {
      backgroundColor: "rgba(255,255,255,0.9)",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      textAlign: "center",
      width: "400px",
    },
    projectName: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#232F3E",
    },
    smallMsg: {
      fontSize: "14px",
      marginBottom: "20px",
      color: "#555",
    },
    button: {
      backgroundColor: "#FFA41C",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "12px 0",
      cursor: "pointer",
      fontWeight: "bold",
      margin: "5px",
      width: "150px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.projectName}>
          Smart Complaint & Issue Tracking System
        </div>

        <div style={styles.smallMsg}>
          A digital platform to raise, track and resolve complaints transparently and efficiently.
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/user-login")}
        >
          User Dashboard
        </button>

        <button
          style={styles.button}
          onClick={() => navigate("/admin-login")}
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  );
};

export default HomePage;
