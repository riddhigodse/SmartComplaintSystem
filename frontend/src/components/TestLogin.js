import React, { useState } from "react";
import API from "../services/api";

const TestLogin = () => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testDirectFetch = async () => {
    setLoading(true);
    setResult("Testing with fetch...");
    
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@example.com",
          password: "admin123"
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResult(`✅ FETCH SUCCESS!\nRole: ${data.role}\nUser ID: ${data.user_id}\nToken: ${data.access_token.substring(0, 50)}...`);
      } else {
        setResult(`❌ FETCH FAILED!\nStatus: ${response.status}\nError: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ FETCH ERROR!\n${error.message}`);
    }
    setLoading(false);
  };

  const testAxios = async () => {
    setLoading(true);
    setResult("Testing with Axios...");
    
    try {
      const res = await API.post("/login", {
        email: "admin@example.com",
        password: "admin123"
      });
      
      setResult(`✅ AXIOS SUCCESS!\nRole: ${res.data.role}\nUser ID: ${res.data.user_id}\nToken: ${res.data.access_token.substring(0, 50)}...`);
    } catch (error) {
      setResult(`❌ AXIOS ERROR!\nMessage: ${error.message}\nResponse: ${JSON.stringify(error.response?.data || {})}`);
    }
    setLoading(false);
  };

  const testBackendHealth = async () => {
    setLoading(true);
    setResult("Testing backend health...");
    
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setResult(`✅ Backend is running!\n${data.message}`);
    } catch (error) {
      setResult(`❌ Backend not reachable!\n${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>🔧 Login Debug Tool</h2>
      
      <div style={{ marginBottom: 20 }}>
        <p><strong>API Base URL:</strong> {API.defaults.baseURL}</p>
        <p><strong>Test Credentials:</strong> admin@example.com / admin123</p>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <button onClick={testBackendHealth} disabled={loading} style={buttonStyle}>
          Test Backend Health
        </button>
        <button onClick={testDirectFetch} disabled={loading} style={buttonStyle}>
          Test with Fetch API
        </button>
        <button onClick={testAxios} disabled={loading} style={buttonStyle}>
          Test with Axios
        </button>
      </div>
      
      <div style={{
        padding: 15,
        backgroundColor: "#f5f5f5",
        borderRadius: 5,
        whiteSpace: "pre-wrap",
        minHeight: 100,
        fontFamily: "monospace"
      }}>
        {result || "Click a button to test..."}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  margin: "5px",
  backgroundColor: "#FFA41C",
  color: "#fff",
  border: "none",
  borderRadius: 5,
  cursor: "pointer",
  fontWeight: "bold"
};

export default TestLogin;
