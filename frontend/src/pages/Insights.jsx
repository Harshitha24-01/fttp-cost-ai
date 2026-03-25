import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar.jsx";

const API_BASE = "http://127.0.0.1:8000";

function safeParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

export default function Insights() {
  const token = localStorage.getItem("token") || "";

  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("lastAIData");
    if (raw) setAiData(safeParse(raw));
  }, []);

  const callLLM = async () => {
    if (!aiData) return;
    setError("");
    setLoading(true);
    setExplanation("");
    setSuggestions([]);
    try {
      const explainPayload = {
        data: {
          fiber_length: aiData.fiber_length,
          premises_count: aiData.premises_count,
          equipment_cost: aiData.equipment_cost,
          labour_cost: aiData.labour_cost,
          civil_cost: aiData.civil_cost,
        },
        total_cost: aiData.total_cost,
      };

      const [explainRes, optimizeRes] = await Promise.all([
        axios.post(`${API_BASE}/explain-cost`, explainPayload, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post(
          `${API_BASE}/optimize-cost-ai`,
          {
            fiber_length: aiData.fiber_length,
            premises_count: aiData.premises_count,
            equipment_cost: aiData.equipment_cost,
            labour_cost: aiData.labour_cost,
            civil_cost: aiData.civil_cost,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        ),
      ]);

      setExplanation(explainRes.data.explanation || "");
      setSuggestions(optimizeRes.data.suggestions || []);
    } catch (e) {
      const detail = e?.response?.data?.detail;
      setError(detail ? String(detail) : "Failed to load AI insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ alignItems: "flex-start" }}>
        <Sidebar />
        <div className="col">
          <div className="card">
            <div style={{ fontWeight: 900, marginBottom: 12 }}>AI Insights</div>

            {!aiData ? (
              <div style={{ color: "var(--muted)" }}>
                Run a cost estimation first to enable AI insights.
              </div>
            ) : (
              <>
                <button className="btn" onClick={callLLM} disabled={loading}>
                  {loading ? "Generating insights..." : "Get AI Insights"}
                </button>

                {error ? <div className="error" style={{ marginTop: 10 }}>{error}</div> : null}

                <div style={{ height: 14 }} />
                <div className="grid-2">
                  <div className="card" style={{ boxShadow: "none" }}>
                    <div style={{ fontWeight: 900, marginBottom: 8 }}>Cost Explanation</div>
                    {explanation ? <div style={{ whiteSpace: "pre-wrap" }}>{explanation}</div> : <div style={{ color: "var(--muted)" }}>—</div>}
                  </div>
                  <div className="card" style={{ boxShadow: "none" }}>
                    <div style={{ fontWeight: 900, marginBottom: 8 }}>Optimization Suggestions</div>
                    {suggestions?.length ? (
                      <ul className="list">
                        {suggestions.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ color: "var(--muted)" }}>—</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

