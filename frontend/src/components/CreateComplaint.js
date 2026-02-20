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
      setComplaint({ ...complaint, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (!complaint.title || !complaint.description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", complaint.title);
      formData.append("category", complaint.category);
      formData.append("description", complaint.description);
      if (complaint.image) {
        formData.append("image", complaint.image);
      }

      await API.post("/complaints", formData);

      alert("Complaint Submitted Successfully!");
      navigate("/user-dashboard");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Create Complaint</h2>

        <input name="title" placeholder="Title" onChange={handleChange} style={inputStyle} />
        <select name="category" onChange={handleChange} style={inputStyle}>
          <option>Internet</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Technical</option>
          <option>Billing</option>
          <option>Service</option>
        </select>
        <textarea name="description" rows="4" placeholder="Description" onChange={handleChange} style={inputStyle} />
        <input type="file" name="image" accept="image/*" onChange={handleChange} style={inputStyle} />

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
