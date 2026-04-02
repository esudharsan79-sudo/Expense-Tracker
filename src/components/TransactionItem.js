import React from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionSlice";
import { formatCurrency } from "../utils";

const categoryIcons = {
  Salary: "💼", Freelance: "💻", Investment: "📈", Business: "🏢", Gift: "🎁",
  Food: "🍔", Transport: "🚗", Entertainment: "🎬", Shopping: "🛍️",
  Health: "💊", Utilities: "⚡", Education: "📚", Travel: "✈️", Other: "📌",
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const { id, type, category, description, amount, date } = transaction;

  return (
    <div className="flex items-center justify-between p-3.5 bg-[#2a2a3e] rounded-xl hover:bg-[#333352] transition-colors duration-150 group">
      <div className="flex items-center gap-3">
        <span className="text-2xl w-10 h-10 flex items-center justify-center bg-[#1e1e2e] rounded-xl">
          {categoryIcons[category] || "📌"}
        </span>
        <div>
          <p className="text-sm font-medium text-white">{description}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={type === "income" ? "badge-income" : "badge-expense"}>{category}</span>
            <span className="text-xs text-gray-500">{formatDate(date)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`font-bold text-sm ${type === "income" ? "text-income" : "text-expense"}`}>
          {type === "income" ? "+" : "-"}{formatCurrency(amount)}
        </span>
        <button
          onClick={() => dispatch(deleteTransaction(id))}
          className="text-gray-600 hover:text-expense transition-colors opacity-0 group-hover:opacity-100 text-xl leading-none"
          title="Delete"
        >
          ×
        </button>
      </div>
    </div>
  );
}
