import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function Charts({ estimate }) {
  if (!estimate) return null;

  const cost = Number(estimate.total_cost || 0);
  const profit = Number(estimate.profit || 0);

  const barData = {
    labels: ["Cost", "Profit"],
    datasets: [
      {
        label: "₹",
        data: [cost, profit],
        backgroundColor: ["rgba(27, 79, 114, 0.85)", "rgba(10, 61, 98, 0.85)"],
      },
    ],
  };

  const pieData = {
    labels: ["Fiber", "Equipment", "Labour", "Civil"],
    datasets: [
      {
        data: [
          Number(estimate.fiber_cost || 0),
          Number(estimate.equipment_cost || 0),
          Number(estimate.labour_cost || 0),
          Number(estimate.civil_cost || 0),
        ],
        backgroundColor: ["#1B4F72", "#0A3D62", "#2E7D9C", "#6BA6C5"],
      },
    ],
  };

  return (
    <div className="card">
      <div style={{ fontWeight: 900, marginBottom: 12 }}>Charts</div>

      <div className="row" style={{ flexWrap: "wrap" }}>
        <div className="col" style={{ minWidth: 340 }}>
          <Bar data={barData} />
        </div>
        <div className="col" style={{ minWidth: 340 }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

