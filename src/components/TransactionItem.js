import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction, updateTransaction } from "../store/transactionSlice";
import { formatCurrency } from "../utils";

const categoryIcons = {
  Salary: "💼", Freelance: "💻", Investment: "📈", Business: "🏢", Gift: "🎁",
  Food: "🍔", Transport: "🚗", Entertainment: "🎬", Shopping: "🛍️",
  Health: "💊", Utilities: "⚡", Education: "📚", Travel: "✈️", Other: "📌",
};

const formCategories = {
  income:  ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
  expense: ["Food", "Transport", "Entertainment", "Shopping", "Health", "Utilities", "Education", "Travel", "Other"],
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const { id, type, category, description, amount, date } = transaction;

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ category, description, amount: String(amount), date });
  const [error, setError] = useState("");

  const startEdit = () => {
    setForm({ category, description, amount: String(amount), date });
    setError("");
    setEditing(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSave = () => {
    if (!form.description.trim()) return setError("Please enter a description.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) return setError("Enter a valid amount.");
    if (!form.date) return setError("Please select a date.");

    dispatch(updateTransaction({
      id,
      category: form.category,
      description: form.description.trim(),
      amount: Number(form.amount),
      date: form.date,
    }));
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="p-3.5 bg-[#2a2a3e] rounded-xl space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field">
              {formCategories[type].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="input-field" />
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Description</label>
          <input
            type="text" name="description" value={form.description}
            onChange={handleChange} className="input-field" maxLength={60}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Amount (₹)</label>
          <input
            type="number" name="amount" value={form.amount}
            onChange={handleChange} min="1" className="input-field"
          />
        </div>
        {error && <p className="text-expense text-sm">{error}</p>}
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn-primary flex-1 text-sm">Save</button>
          <button
            onClick={() => setEditing(false)}
            className="flex-1 text-sm text-gray-300 border border-gray-600 rounded-lg py-2 hover:bg-[#333352]"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

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
          onClick={startEdit}
          className="text-gray-500 hover:text-white transition-colors md:opacity-0 md:group-hover:opacity-100 text-base leading-none"
          title="Edit"
        >
          ✏️
        </button>
        <button
          onClick={() => dispatch(deleteTransaction(id))}
          className="text-gray-600 hover:text-expense transition-colors md:opacity-0 md:group-hover:opacity-100 text-xl leading-none"
          title="Delete"
        >
          ×
        </button>
      </div>
    </div>
  );
}