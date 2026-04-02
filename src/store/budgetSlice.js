import { createSlice } from "@reduxjs/toolkit";

const defaultLimits = {
  Food: 5000,
  Transport: 3000,
  Entertainment: 2000,
  Shopping: 4000,
  Health: 2500,
  Utilities: 2000,
  Other: 3000,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState: { limits: defaultLimits },
  reducers: {
    setBudgetLimit: (state, action) => {
      const { category, amount } = action.payload;
      state.limits[category] = amount;
    },
    resetBudgets: (state) => {
      state.limits = defaultLimits;
    },
  },
});

export const { setBudgetLimit, resetBudgets } = budgetSlice.actions;

export const selectBudgetLimits = (state) => state.budget.limits;

export const selectBudgetStatus = (state) => {
  const limits = state.budget.limits;
  const spent = {};
  state.transactions.list
    .filter((t) => t.type === "expense")
    .forEach((t) => { spent[t.category] = (spent[t.category] || 0) + t.amount; });

  return Object.entries(limits).map(([category, limit]) => ({
    category,
    limit,
    spent: spent[category] || 0,
    percentage: Math.min(((spent[category] || 0) / limit) * 100, 100),
    isOver: (spent[category] || 0) > limit,
  }));
};

export default budgetSlice.reducer;
