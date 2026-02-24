import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/business-figure-stands-red-file-labeled-complaints-customer-service-feedback-issue-resolution-concept-d-rendered-352487401.webp";

const CreateComplaint = () => {
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    title: "",
    category: "Internet",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setComplaint({ ...complaint, image: e.target.files[0] });
    } else {
      const newComplaint = { ...complaint, [e.target.name]: e.target.value };
      console.log("Updated complaint:", newComplaint);
      setComplaint(newComplaint);
    }
  };

  const handleSubmit = async () => {
    console.log("Current complaint state:", complaint);
    
    // Check if user is logged in
    const token = localStorage.getItem("token");
    console.log("JWT Token exists:", !!token);
    if (!token) {
      alert("Please login first!");
      navigate("/user-login");
      return;
    }
    
    // Trim whitespace for validation
    const trimmedTitle = complaint.title.trim();
    const trimmedDescription = complaint.description.trim();

    console.log("Trimmed title:", trimmedTitle);
    console.log("Trimmed description:", trimmedDescription);

    if (!trimmedTitle) {
      alert("Title is required");
      return;
    }

    if (!trimmedDescription) {
      alert("Description is required");
      return;
    }

    if (trimmedDescription.length < 10) {
      alert("Description must be at least 10 characters long");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", trimmedTitle);
      formData.append("category", complaint.category);
      formData.append("description", trimmedDescription);
      if (complaint.image) {
        formData.append("image", complaint.image);
      }

      console.log("Sending complaint to backend...");
      console.log("FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await API.post("/complaints", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Backend response:", response.data);

      alert("Complaint Submitted Successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      console.error("Error submitting complaint:", err.response?.data || err);
      console.error("Full error:", err);
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Create Complaint</h2>

        <input 
          name="title" 
          value={complaint.title}
          placeholder="Title (e.g., Internet not working)" 
          onChange={handleChange} 
          style={inputStyle}
          required
        />
        <select 
          name="category" 
          value={complaint.category}
          onChange={handleChange} 
          style={inputStyle}
        >
          <option>Internet</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Technical</option>
          <option>Billing</option>
          <option>Service</option>
        </select>
        <textarea 
          name="description" 
          value={complaint.description}
          rows="4" 
          placeholder="Describe your issue in detail (minimum 10 characters)" 
          onChange={handleChange} 
          style={inputStyle}
          required
        />
        <input 
          type="file" 
          name="image" 
          accept="image/*" 
          onChange={handleChange} 
          style={inputStyle} 
        />

        <button onClick={handleSubmit} style={buttonStyle}>Submit</button>
      </div>
    </div>
  );
};

const containerStyle = {
  height: "100vh",
  backgroundImage: `url(${bgImage})`,
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  width: 400,
  padding: 30,
  borderRadius: 15,
  backdropFilter: "blur(10px)",
  background: "rgba(0,0,0,0.5)",
  color: "white",
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 15,
  borderRadius: 8,
};

const buttonStyle = {
  width: "100%",
  padding: 10,
  backgroundColor: "#FFA41C",
  color: "white",
  border: "none",
  borderRadius: 8,
};

export default CreateComplaint;
