import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import CostForm from "../components/CostForm.jsx";
import Charts from "../components/Charts.jsx";

function safeParse(v) {
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const [estimate, setEstimate] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("lastEstimate");
    if (raw) setEstimate(safeParse(raw));
  }, []);

  return (
    <div className="container">
      <div className="row" style={{ alignItems: "flex-start" }}>
        <Sidebar />
        <div className="col">
          <div className="row" style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <div className="col" style={{ minWidth: 520 }}>
              <CostForm onResult={setEstimate} />
            </div>

            <div className="col" style={{ minWidth: 420 }}>
              <div className="card">
                <div style={{ fontWeight: 900, marginBottom: 12 }}>Summary</div>
                {!estimate ? (
                  <div style={{ color: "var(--muted)" }}>Calculate cost to see results.</div>
                ) : (
                  <>
                    <div className="kv">
                      <div className="k">Distance</div>
                      <div className="v">{Number(estimate.distance_km).toFixed(2)} km</div>
                    </div>
                    <div className="kv">
                      <div className="k">Total Cost</div>
                      <div className="v">₹{Number(estimate.total_cost).toFixed(2)}</div>
                    </div>
                    <div className="kv">
                      <div className="k">Total Revenue</div>
                      <div className="v">₹{Number(estimate.total_revenue).toFixed(2)}</div>
                    </div>
                    <div className="kv">
                      <div className="k">Profit</div>
                      <div className="v">₹{Number(estimate.profit).toFixed(2)}</div>
                    </div>
                    <div className="kv">
                      <div className="k">Profit Margin</div>
                      <div className="v">{Number(estimate.profit_margin).toFixed(2)}%</div>
                    </div>
                  </>
                )}
              </div>

              {estimate ? <div style={{ height: 16 }} /> : null}
              <div className="card" style={{ marginTop: estimate ? 0 : 0 }}>
                <div style={{ fontWeight: 900, marginBottom: 12 }}>Cost Breakdown</div>
                {!estimate ? (
                  <div style={{ color: "var(--muted)" }}>—</div>
                ) : (
                  <ul className="list">
                    <li>Fiber: ₹{Number(estimate.fiber_cost).toFixed(2)}</li>
                    <li>Equipment: ₹{Number(estimate.equipment_cost).toFixed(2)}</li>
                    <li>Labour: ₹{Number(estimate.labour_cost).toFixed(2)}</li>
                    <li>Civil: ₹{Number(estimate.civil_cost).toFixed(2)}</li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div style={{ height: 16 }} />
          <Charts estimate={estimate} />
        </div>
      </div>
    </div>
  );
}

