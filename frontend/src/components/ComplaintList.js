import React, { useEffect, useState } from "react";
import API from "../services/api";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const response = await API.get("/complaints");
    setComplaints(response.data);
  };

  return (
    <div>
      <h2>All Complaints</h2>

      {complaints.map((c) => (
        <div key={c.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <p><b>Title:</b> {c.title}</p>
          <p><b>Category:</b> {c.category}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
