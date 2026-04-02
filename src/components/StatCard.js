import React from "react";
import { formatCurrency } from "../utils";

export default function StatCard({ title, amount, icon, type, subtitle }) {
  const cardStyles = {
    income: "text-income border-income/30 bg-income/5",
    expense: "text-expense border-expense/30 bg-expense/5",
    balance: "text-primary border-primary/30 bg-primary/5",
    default: "text-white border-[#3a3a5e] bg-cardBg",
  };

  const amountColor =
    type === "expense" ? "text-expense" : type === "income" ? "text-income" : "text-primary";

  return (
    <div className={`card border ${cardStyles[type] || cardStyles.default} flex items-center gap-4`}>
      <div className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl bg-white/5">
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className={`text-2xl font-bold mt-0.5 ${amountColor}`}>
          {typeof amount === "number" && type !== "default"
            ? formatCurrency(amount)
            : amount}
        </p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
