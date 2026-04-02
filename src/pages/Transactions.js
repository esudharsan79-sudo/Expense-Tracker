import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredTransactions, selectTotals, clearAllTransactions } from "../store/transactionSlice";
import { formatCurrency } from "../utils";
import FilterBar from "../components/FilterBar";
import TransactionItem from "../components/TransactionItem";
import AddTransactionForm from "../components/AddTransactionForm";

export default function Transactions() {
  const dispatch     = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const { totalIncome, totalExpense } = useSelector(selectTotals);

  const handleClearAll = () => {
    if (window.confirm("Delete ALL transactions? This cannot be undone.")) {
      dispatch(clearAllTransactions());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-gray-400 text-sm mt-1">{transactions.length} transaction(s) found</p>
        </div>
        <button onClick={handleClearAll} className="btn-danger text-sm">🗑️ Clear All</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="card border border-income/20">
          <p className="text-gray-400 text-xs">Total Income</p>
          <p className="text-income font-bold text-xl">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="card border border-expense/20">
          <p className="text-gray-400 text-xs">Total Expenses</p>
          <p className="text-expense font-bold text-xl">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <FilterBar />
          <div className="space-y-2">
            {transactions.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-500 text-lg">No transactions found</p>
                <p className="text-gray-600 text-sm mt-1">Try adjusting filters or add a new transaction</p>
              </div>
            ) : (
              transactions.map((t) => <TransactionItem key={t.id} transaction={t} />)
            )}
          </div>
        </div>
        <div>
          <AddTransactionForm />
        </div>
      </div>
    </div>
  );
}
