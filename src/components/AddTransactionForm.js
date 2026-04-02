import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction } from "../store/transactionSlice";

const formCategories = {
  income:  ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
  expense: ["Food", "Transport", "Entertainment", "Shopping", "Health", "Utilities", "Education", "Travel", "Other"],
};

const emptyForm = { type: "expense", category: "Food", description: "", amount: "", date: "" };

export default function AddTransactionForm() {
  const dispatch = useDispatch();
  const [form, setForm]       = useState(emptyForm);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: formCategories[value][0] } : {}),
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Please enter a description.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) return setError("Enter a valid amount.");
    if (!form.date) return setError("Please select a date.");

    dispatch(addTransaction({ ...form, amount: Number(form.amount) }));
    setForm(emptyForm);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4 text-white">➕ Add Transaction</h2>

      <div className="flex mb-4 bg-[#2a2a3e] rounded-xl p-1">
        {["expense", "income"].map((t) => (
          <button
            key={t}
            onClick={() => setForm((prev) => ({ ...prev, type: t, category: formCategories[t][0] }))}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg capitalize transition-all duration-200
              ${form.type === t
                ? t === "income" ? "bg-income text-white" : "bg-expense text-white"
                : "text-gray-400 hover:text-white"
              }`}
          >
            {t === "income" ? "💚 Income" : "🔴 Expense"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input-field">
            {formCategories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Description</label>
          <input
            type="text" name="description" value={form.description}
            onChange={handleChange} placeholder="e.g. Monthly salary"
            className="input-field" maxLength={60}
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Amount (₹)</label>
          <input
            type="number" name="amount" value={form.amount}
            onChange={handleChange} placeholder="0" min="1" className="input-field"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input-field" />
        </div>

        {error   && <p className="text-expense text-sm">{error}</p>}
        {success && <p className="text-income  text-sm">✅ Transaction added!</p>}

        <button type="submit" className="btn-primary w-full mt-2">Add Transaction</button>
      </form>
    </div>
  );
}
