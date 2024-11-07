import React from "react";
import { useNavigate } from "react-router-dom";

export default function PersonalDetails() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Personal Details</h1>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back
      </button>
    </div>
  );
}
