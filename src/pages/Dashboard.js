import React from "react";
import { useSelector } from "react-redux";
import { selectTotals, selectAllTransactions } from "../store/transactionSlice";
import StatCard from "../components/StatCard";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionItem from "../components/TransactionItem";
import ExpensePieChart from "../components/charts/ExpensePieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CurrencyRates from "../components/CurrencyRates";

export default function Dashboard() {
  const { totalIncome, totalExpense, balance } = useSelector(selectTotals);
  const transactions = useSelector(selectAllTransactions);
  const recent = transactions.slice(0, 5);
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Track your income, expenses & savings at a glance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance"   amount={balance}             icon="💰" type="balance" subtitle={`Savings Rate: ${savingsRate}%`} />
        <StatCard title="Total Income"    amount={totalIncome}          icon="📈" type="income"  subtitle="All time income"   />
        <StatCard title="Total Expenses"  amount={totalExpense}         icon="📉" type="expense" subtitle="All time expenses" />
        <StatCard title="Transactions"    amount={transactions.length}  icon="📋" type="default" subtitle="Total records"     />
      </div>

      <CurrencyRates />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MonthlyBarChart />
          <ExpensePieChart />
        </div>
        <div>
          <AddTransactionForm />
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
          <a href="/transactions" className="text-primary text-sm hover:underline">View all →</a>
        </div>
        <div className="space-y-2">
          {recent.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">No transactions yet. Add one above!</p>
          ) : (
            recent.map((t) => <TransactionItem key={t.id} transaction={t} />)
          )}
        </div>
      </div>
    </div>
  );
}
