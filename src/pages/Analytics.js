import React from "react";
import { useSelector } from "react-redux";
import { selectTotals, selectMonthlyData, selectCategoryBreakdown } from "../store/transactionSlice";
import { formatCurrency } from "../utils";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import IncomeVsExpenseChart from "../components/charts/IncomeVsExpenseChart";

export default function Analytics() {
  const { totalIncome, totalExpense, balance } = useSelector(selectTotals);
  const monthlyData       = useSelector(selectMonthlyData);
  const categoryBreakdown = useSelector(selectCategoryBreakdown);

  const savingsRate  = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;
  const expenseRatio = totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(0) : 0;
  const avgMonthly   = monthlyData.length > 0 ? totalExpense / monthlyData.length : 0;
  const topCategory  = [...categoryBreakdown].sort((a, b) => b.value - a.value)[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Deep insights into your spending patterns</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card border border-primary/20 text-center">
          <p className="text-gray-400 text-xs">Savings Rate</p>
          <p className={`text-2xl font-bold mt-1 ${Number(savingsRate) >= 20 ? "text-income" : "text-expense"}`}>{savingsRate}%</p>
          <p className="text-xs text-gray-500 mt-1">{Number(savingsRate) >= 20 ? "✅ Healthy" : "⚠️ Low"}</p>
        </div>
        <div className="card border border-primary/20 text-center">
          <p className="text-gray-400 text-xs">Avg. Monthly Expense</p>
          <p className="text-2xl font-bold text-expense mt-1">{formatCurrency(avgMonthly)}</p>
        </div>
        <div className="card border border-primary/20 text-center">
          <p className="text-gray-400 text-xs">Top Expense Category</p>
          <p className="text-lg font-bold text-white mt-1">{topCategory?.name || "—"}</p>
          <p className="text-xs text-expense mt-1">{topCategory ? formatCurrency(topCategory.value) : ""}</p>
        </div>
        <div className="card border border-primary/20 text-center">
          <p className="text-gray-400 text-xs">Expense Ratio</p>
          <p className="text-lg font-bold text-income mt-1">{expenseRatio}%</p>
          <p className="text-xs text-gray-500 mt-1">of income spent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyBarChart />
        <ExpensePieChart />
      </div>
      <IncomeVsExpenseChart />

      <div className="card">
        <h2 className="text-lg font-semibold mb-4 text-white">Expense Breakdown by Category</h2>
        <div className="space-y-3">
          {[...categoryBreakdown].sort((a, b) => b.value - a.value).map(({ name, value }) => {
            const pct = totalExpense > 0 ? ((value / totalExpense) * 100).toFixed(1) : 0;
            return (
              <div key={name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{name}</span>
                  <span className="text-gray-400">
                    {formatCurrency(value)} <span className="text-gray-600">({pct}%)</span>
                  </span>
                </div>
                <div className="w-full bg-[#2a2a3e] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
