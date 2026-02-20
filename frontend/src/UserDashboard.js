import React, { useEffect, useState } from "react";
import API from "./services/api";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/lightpurple.jpg";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/user/complaints", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComplaints(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to fetch complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/user-login");
  };

  // ✅ UPDATED DELETE FUNCTION WITH CONFIRMATION POPUP
  const handleDelete = async (complaintId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) {
      return; // If user clicks Cancel
    }

    try {
      const res = await API.delete(`/complaints/${complaintId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert(res.data.message);
      setComplaints((prev) =>
        prev.filter((c) => c.id !== complaintId)
      );
    } catch (err) {
      console.error("Delete error:", err.response?.data || err);
      alert(err.response?.data?.message || "Error deleting complaint");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Logout Button */}
      <button
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 15px",
          border: "none",
          borderRadius: 5,
          backgroundColor: "red",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        Logout
      </button>

      <h1 style={{ color: "#fff" }}>User Dashboard</h1>

      <button
        onClick={() => navigate("/create-complaint")}
        style={{
          padding: "10px 15px",
          border: "none",
          borderRadius: 5,
          backgroundColor: "#FFA41C",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        Create New Complaint
      </button>

      {/* Complaints List */}
      {complaints.map((c) => (
        <div
          key={c.id}
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            padding: 15,
            marginBottom: 15,
            borderRadius: 10,
            position: "relative",
          }}
        >
          <p><b>Title:</b> {c.title}</p>
          <p><b>Category:</b> {c.category}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Status:</b> {c.status}</p>

          {c.image_url && (
            <img
              src={c.image_url}
              alt="complaint"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setModalImage(c.image_url);
                setModalOpen(true);
              }}
            />
          )}

          <p><b>Updates:</b></p>
          <ul>
            {c.updates &&
              c.updates.map((u) => (
                <li key={u.id}>
                  {u.remark} (by ID: {u.updated_by})
                </li>
              ))}
          </ul>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(c.id)}
            style={{
              position: "absolute",
              top: 15,
              right: 15,
              padding: "5px 10px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Image Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
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
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={modalImage}
            alt="full complaint"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserDashboard;