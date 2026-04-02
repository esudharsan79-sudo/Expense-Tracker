import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBudgetStatus, setBudgetLimit, resetBudgets } from "../store/budgetSlice";
import { formatCurrency } from "../utils";

export default function Budget() {
  const dispatch     = useDispatch();
  const budgetStatus = useSelector(selectBudgetStatus);
  const [editing, setEditing]   = useState(null);
  const [inputVal, setInputVal] = useState("");

  const overBudgetCount = budgetStatus.filter((b) => b.isOver).length;

  const handleSave = (category) => {
    const amount = Number(inputVal);
    if (amount > 0) dispatch(setBudgetLimit({ category, amount }));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Budget Planner</h1>
          <p className="text-gray-400 text-sm mt-1">Set and monitor spending limits per category</p>
        </div>
        <button onClick={() => dispatch(resetBudgets())} className="btn-primary text-sm">🔄 Reset Defaults</button>
      </div>

      {overBudgetCount > 0 && (
        <div className="bg-expense/10 border border-expense/30 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="text-expense font-semibold">Budget Exceeded!</p>
            <p className="text-gray-400 text-sm">{overBudgetCount} category(ies) have exceeded their limits.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card border border-primary/20 text-center">
          <p className="text-gray-400 text-xs">Total Budget</p>
          <p className="text-xl font-bold text-primary mt-1">
            {formatCurrency(budgetStatus.reduce((s, b) => s + b.limit, 0))}
          </p>
        </div>
        <div className="card border border-expense/20 text-center">
          <p className="text-gray-400 text-xs">Total Spent</p>
          <p className="text-xl font-bold text-expense mt-1">
            {formatCurrency(budgetStatus.reduce((s, b) => s + b.spent, 0))}
          </p>
        </div>
        <div className="card border border-income/20 text-center col-span-2 lg:col-span-1">
          <p className="text-gray-400 text-xs">Remaining</p>
          <p className="text-xl font-bold text-income mt-1">
            {formatCurrency(budgetStatus.reduce((s, b) => s + Math.max(0, b.limit - b.spent), 0))}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {budgetStatus.map(({ category, limit, spent, percentage, isOver }) => {
          const remaining = limit - spent;
          return (
            <div key={category} className={`card border ${isOver ? "border-expense/40" : "border-[#3a3a5e]"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isOver ? "bg-expense" : "bg-income"}`} />
                  <h3 className="font-semibold text-white">{category}</h3>
                  {isOver && <span className="badge-expense">Over Budget</span>}
                </div>
                <button onClick={() => { setEditing(category); setInputVal(limit); }} className="text-xs text-primary hover:underline">
                  ✏️ Edit
                </button>
              </div>

              {editing === category && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="number" value={inputVal} min="1" autoFocus
                    onChange={(e) => setInputVal(e.target.value)}
                    className="input-field text-sm"
                  />
                  <button onClick={() => handleSave(category)} className="btn-primary text-sm px-3">Save</button>
                  <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-white text-sm px-2">✕</button>
                </div>
              )}

              <div className="w-full bg-[#1e1e2e] rounded-full h-3 mb-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-500
                    ${isOver ? "bg-expense" : percentage > 70 ? "bg-yellow-400" : "bg-income"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>Spent: <span className={isOver ? "text-expense font-semibold" : "text-white"}>{formatCurrency(spent)}</span></span>
                <span>Limit: <span className="text-white">{formatCurrency(limit)}</span></span>
                <span>Left: <span className={remaining < 0 ? "text-expense font-semibold" : "text-income"}>
                  {remaining < 0 ? `-${formatCurrency(Math.abs(remaining))}` : formatCurrency(remaining)}
                </span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
