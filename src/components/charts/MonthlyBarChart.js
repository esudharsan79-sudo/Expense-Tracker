import React from "react";
import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../store/transactionSlice";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#2a2a3e] border border-[#3a3a5e] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }} className="text-sm">
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MonthlyBarChart() {
  const raw = useSelector(selectMonthlyData);
  const data = raw.map((d) => ({
    ...d,
    month: new Date(d.month + "-01").toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
  }));

  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center h-64">
        <p className="text-gray-500">No monthly data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-white">📊 Monthly Income vs Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
          <Legend formatter={(v) => <span style={{ color: "#9ca3af", fontSize: "12px", textTransform: "capitalize" }}>{v}</span>} />
          <Bar dataKey="income"  fill="#10b981" radius={[4, 4, 0, 0]} name="Income"  />
          <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
