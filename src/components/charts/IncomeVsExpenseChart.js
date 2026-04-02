import React from "react";
import { useSelector } from "react-redux";
import { selectMonthlyData } from "../../store/transactionSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[#2a2a3e] border border-[#3a3a5e] rounded-xl px-4 py-3 shadow-xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.stroke }} className="text-sm">
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function IncomeVsExpenseChart() {
  const raw = useSelector(selectMonthlyData);
  const data = raw.map((d) => ({
    ...d,
    month:   new Date(d.month + "-01").toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
    savings: d.income - d.expense,
  }));

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-white">📈 Income, Expense & Savings Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGrad"  x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
          <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span style={{ color: "#9ca3af", fontSize: "12px", textTransform: "capitalize" }}>{v}</span>} />
          <Area type="monotone" dataKey="income"  stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)"  name="Income"  />
          <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" name="Expense" />
          <Area type="monotone" dataKey="savings" stroke="#6366f1" strokeWidth={2} fill="url(#savingsGrad)" name="Savings" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
