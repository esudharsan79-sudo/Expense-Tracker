import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const seedData = [
  { id: uuidv4(), type: "income",  category: "Salary",        description: "HDFC salary credit",        amount: 52000, date: "2026-01-02" },
  { id: uuidv4(), type: "expense", category: "Food",          description: "Swiggy + Zomato orders",    amount: 2800,  date: "2026-01-08" },
  { id: uuidv4(), type: "expense", category: "Transport",     description: "Ola/Uber rides",            amount: 1400,  date: "2026-01-15" },
  { id: uuidv4(), type: "expense", category: "Utilities",     description: "BESCOM electricity",        amount: 1650,  date: "2026-01-20" },
  { id: uuidv4(), type: "income",  category: "Salary",        description: "HDFC salary credit",        amount: 52000, date: "2026-02-02" },
  { id: uuidv4(), type: "income",  category: "Freelance",     description: "React project - client",    amount: 18000, date: "2026-02-10" },
  { id: uuidv4(), type: "expense", category: "Shopping",      description: "Amazon + Flipkart orders",  amount: 3500,  date: "2026-02-15" },
  { id: uuidv4(), type: "expense", category: "Entertainment", description: "Netflix + Hotstar",         amount: 1099,  date: "2026-02-20" },
  { id: uuidv4(), type: "income",  category: "Investment",    description: "Mutual fund dividend",      amount: 4200,  date: "2026-03-05" },
  { id: uuidv4(), type: "expense", category: "Food",          description: "Blinkit groceries",         amount: 3200,  date: "2026-03-12" },
  { id: uuidv4(), type: "expense", category: "Health",        description: "Apollo pharmacy + gym",     amount: 1800,  date: "2026-03-18" },
  { id: uuidv4(), type: "expense", category: "Transport",     description: "Petrol - bike",             amount: 900,   date: "2026-03-22" },
];

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    list: seedData,
    filter: { type: "all", category: "all", month: "" },
    searchQuery: "",
  },
  reducers: {
    addTransaction: (state, action) => {
      state.list.unshift({ ...action.payload, id: uuidv4() });
    },
    deleteTransaction: (state, action) => {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearAllTransactions: (state) => {
      state.list = [];
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  setFilter,
  setSearchQuery,
  clearAllTransactions,
} = transactionSlice.actions;

export const selectAllTransactions = (state) => state.transactions.list;
export const selectFilter = (state) => state.transactions.filter;
export const selectSearchQuery = (state) => state.transactions.searchQuery;

export const selectFilteredTransactions = (state) => {
  const { list, filter, searchQuery } = state.transactions;
  return list.filter((t) => {
    const matchType = filter.type === "all" || t.type === filter.type;
    const matchCategory = filter.category === "all" || t.category === filter.category;
    const matchMonth = !filter.month || t.date.startsWith(filter.month);
    const matchSearch =
      !searchQuery ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchCategory && matchMonth && matchSearch;
  });
};

export const selectTotals = (state) => {
  const list = state.transactions.list;
  const totalIncome = list.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpense = list.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
};

export const selectCategoryBreakdown = (state) => {
  const breakdown = {};
  state.transactions.list
    .filter((t) => t.type === "expense")
    .forEach((t) => { breakdown[t.category] = (breakdown[t.category] || 0) + t.amount; });
  return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
};

export const selectMonthlyData = (state) => {
  const data = {};
  state.transactions.list.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!data[month]) data[month] = { month, income: 0, expense: 0 };
    if (t.type === "income") data[month].income += t.amount;
    else data[month].expense += t.amount;
  });
  return Object.values(data).sort((a, b) => a.month.localeCompare(b.month));
};

export default transactionSlice.reducer;
