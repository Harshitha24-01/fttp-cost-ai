import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://127.0.0.1:8000";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await axios.post(`${API_BASE}/login`, { username, password });
      const token = r.data.access_token;
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail ? String(detail) : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <div className="card">
        <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 10 }}>FTTP Cost Intelligence</div>
        <div style={{ color: "var(--muted)", marginBottom: 18 }}>Sign in to continue</div>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error ? <div className="error" style={{ marginBottom: 10 }}>{error}</div> : null}

          <button className="btn" disabled={loading || !username || !password} type="submit">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

