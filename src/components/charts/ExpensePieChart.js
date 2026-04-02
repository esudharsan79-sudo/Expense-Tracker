import React from "react";
import { useSelector } from "react-redux";
import { selectCategoryBreakdown } from "../../store/transactionSlice";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils";

const pieColors = ["#6366f1","#8b5cf6","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#06b6d4"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#2a2a3e] border border-[#3a3a5e] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-primary">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function ExpensePieChart() {
  const data = useSelector(selectCategoryBreakdown);

  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center h-64">
        <p className="text-gray-500">No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-white">🍩 Expense by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span style={{ color: "#9ca3af", fontSize: "12px" }}>{v}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
