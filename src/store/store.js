import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transactionSlice";
import budgetReducer from "./budgetSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("expIQ_data");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("expIQ_data", JSON.stringify(state));
  } catch {
    // ignore write errors
  }
};

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    budget: budgetReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});
