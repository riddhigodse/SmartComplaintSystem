import React, { useEffect, useState } from "react";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/complaints")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="list-container">
      <h3>All Complaints</h3>

      {complaints.map((c) => (
        <div key={c.id} className="complaint-card">
          <h4>{c.title}</h4>
          <p><b>Category:</b> {c.category}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Status:</b> {c.status}</p>
        </div>
      ))}
    </div>
  );
}

export default ComplaintList;
