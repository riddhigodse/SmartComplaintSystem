import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/lightpurple.jpg";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [error, setError] = useState("");
  const [modalImage, setModalImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:5000/api/complaints",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Make sure full image URL
        const complaintsWithFullURL = res.data.map((c) => ({
          ...c,
          image_url: c.image_url
            ? c.image_url.startsWith("http")
              ? c.image_url
              : `http://127.0.0.1:5000${c.image_url}`
            : null,
        }));

        setComplaints(complaintsWithFullURL || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load complaints");
      }
    };
    fetchComplaints();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleRemarkChange = (id, value) => {
    setRemarks({ ...remarks, [id]: value });
  };

  const handleRemarkSubmit = async (id) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/complaints/${id}/remark`,
        { remark: remarks[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Remark updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update remark");
    }
  };

  const handleStatusChange = async (id, value) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/complaints/${id}/status`,
        { status: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: value } : c))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "red",
          color: "#fff",
          padding: "8px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1 style={{ color: "#fff", marginBottom: "20px" }}>Admin Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {complaints.length === 0 ? (
        <p style={{ color: "#fff" }}>No complaints found</p>
      ) : (
        complaints.map((c) => (
          <div
            key={c.id}
            style={{
              background: "rgba(255,255,255,0.6)",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p><strong>Title:</strong> {c.title}</p>
            <p><strong>Category:</strong> {c.category}</p>

            {/* Thumbnail image with click-to-preview */}
            {c.image_url && (
              <img
                src={c.image_url}
                alt="Complaint"
                style={{
                  maxWidth: "150px",
                  maxHeight: "100px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  marginBottom: "10px",
                  objectFit: "cover",
                }}
                onClick={() => setModalImage(c.image_url)}
              />
            )}

            <p><strong>Status:</strong></p>
            <select
              value={c.status || "Pending"}
              onChange={(e) => handleStatusChange(c.id, e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <br />

            <input
              type="text"
              placeholder="Add Remark"
              value={remarks[c.id] || ""}
              onChange={(e) => handleRemarkChange(c.id, e.target.value)}
              style={{
                padding: "8px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />

            <button
              onClick={() => handleRemarkSubmit(c.id)}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#FFA41C",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>
        ))
      )}

      {/* Modal for full image preview */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <img
            src={modalImage}
            alt="Full Complaint"
            style={{
              maxHeight: "90%",
              maxWidth: "90%",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
