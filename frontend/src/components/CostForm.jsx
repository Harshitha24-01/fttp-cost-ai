import React, { useMemo, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

function num(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

export default function CostForm({ onResult }) {
  const token = useMemo(() => localStorage.getItem("token") || "", []);

  const [form, setForm] = useState({
    source: "",
    destination: "",
    premises_count: 100,
    equipment_cost: 30000,
    labour_cost: 20000,
    civil_cost: 40000,
    revenue_per_user: 1000,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const calculate = async () => {
    setError("");
    setLoading(true);
    try {
      const payload = {
        source: form.source,
        destination: form.destination,
        premises_count: num(form.premises_count),
        equipment_cost: num(form.equipment_cost),
        labour_cost: num(form.labour_cost),
        civil_cost: num(form.civil_cost),
        revenue_per_user: num(form.revenue_per_user),
      };

      const r = await axios.post(`${API_BASE}/estimate-cost`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = r.data;
      localStorage.setItem("lastEstimate", JSON.stringify(data));

      // Pre-build the payload needed by LLM endpoints.
      const aiData = {
        fiber_length: data.distance_km,
        premises_count: payload.premises_count,
        equipment_cost: data.equipment_cost,
        labour_cost: data.labour_cost,
        civil_cost: data.civil_cost,
        total_cost: data.total_cost,
      };
      localStorage.setItem("lastAIData", JSON.stringify(aiData));

      if (onResult) onResult(data);
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setError(detail ? String(detail) : "Failed to calculate cost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 12 }}>Cost Estimation</div>

      <div className="field">
        <label>Source</label>
        <input value={form.source} onChange={(e) => update("source", e.target.value)} placeholder="Enter source location" />
      </div>

      <div className="field">
        <label>Destination</label>
        <input
          value={form.destination}
          onChange={(e) => update("destination", e.target.value)}
          placeholder="Enter destination location"
        />
      </div>

      <div className="grid-2">
        <div className="field">
          <label>Premises Count</label>
          <input
            type="number"
            value={form.premises_count}
            onChange={(e) => update("premises_count", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Revenue per User</label>
          <input type="number" value={form.revenue_per_user} onChange={(e) => update("revenue_per_user", e.target.value)} />
        </div>
      </div>

      <div className="grid-2">
        <div className="field">
          <label>Equipment Cost</label>
          <input type="number" value={form.equipment_cost} onChange={(e) => update("equipment_cost", e.target.value)} />
        </div>
        <div className="field">
          <label>Labour Cost</label>
          <input type="number" value={form.labour_cost} onChange={(e) => update("labour_cost", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>Civil Cost</label>
        <input type="number" value={form.civil_cost} onChange={(e) => update("civil_cost", e.target.value)} />
      </div>

      {error ? <div className="error" style={{ marginTop: 10 }}>{error}</div> : null}

      <button className="btn" onClick={calculate} disabled={loading || !form.source || !form.destination}>
        {loading ? "Calculating..." : "Calculate"}
      </button>
    </div>
  );
}

