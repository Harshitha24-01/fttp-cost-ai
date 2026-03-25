import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="brand">FTTP Cost AI</div>
      <div className="nav">
        <NavLink to="/dashboard">Cost Estimation</NavLink>
        <NavLink to="/insights">AI Insights</NavLink>
        <NavLink to="/plans">Plans</NavLink>
      </div>

      <div className="spacer" />
      <button className="btn btn-secondary" onClick={onLogout} style={{ width: "100%" }}>
        Logout
      </button>
    </div>
  );
}

