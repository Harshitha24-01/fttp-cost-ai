import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

const API_BASE = "http://127.0.0.1:8000";

export default function Plans() {
  const token = localStorage.getItem("token") || "";
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setError("");
        setLoading(true);
        const r = await axios.get(`${API_BASE}/plans`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(r.data.plans || []);
      } catch (e) {
        const detail = e?.response?.data?.detail;
        setError(detail ? String(detail) : "Failed to load plans.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  return (
    <div className="container">
      <div className="row" style={{ alignItems: "flex-start" }}>
        <Sidebar />
        <div className="col">
          <div className="card">
            <div style={{ fontWeight: 900, marginBottom: 12 }}>Plans</div>
            {loading ? (
              <div style={{ color: "var(--muted)" }}>Loading...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : (
              <div className="grid-2">
                {plans.map((p) => (
                  <div key={p.name} className="card" style={{ boxShadow: "none" }}>
                    <div style={{ fontWeight: 900 }}>{p.name}</div>
                    <div style={{ color: "var(--muted)", marginTop: 6 }}>{p.speed}</div>
                    <div style={{ fontWeight: 900, marginTop: 10 }}>₹{p.price}/mo</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

