import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearchQuery, selectFilter, selectSearchQuery } from "../store/transactionSlice";

const categories = [
  "Food","Transport","Entertainment","Shopping","Health",
  "Utilities","Education","Travel","Salary","Freelance","Investment","Other",
];

export default function FilterBar() {
  const dispatch     = useDispatch();
  const filter       = useSelector(selectFilter);
  const searchQuery  = useSelector(selectSearchQuery);

  return (
    <div className="card mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text" placeholder="🔍 Search transactions..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="input-field"
        />
        <select value={filter.type} onChange={(e) => dispatch(setFilter({ type: e.target.value }))} className="input-field">
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filter.category} onChange={(e) => dispatch(setFilter({ category: e.target.value }))} className="input-field">
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          type="month" value={filter.month}
          onChange={(e) => dispatch(setFilter({ month: e.target.value }))}
          className="input-field"
        />
      </div>

      {/* Active filter pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {filter.type !== "all" && (
          <span className="badge-income cursor-pointer" onClick={() => dispatch(setFilter({ type: "all" }))}>
            Type: {filter.type} ×
          </span>
        )}
        {filter.category !== "all" && (
          <span className="badge-expense cursor-pointer" onClick={() => dispatch(setFilter({ category: "all" }))}>
            Category: {filter.category} ×
          </span>
        )}
        {filter.month && (
          <span className="bg-primary/20 text-primary text-xs px-2.5 py-1 rounded-full cursor-pointer" onClick={() => dispatch(setFilter({ month: "" }))}>
            Month: {filter.month} ×
          </span>
        )}
      </div>
    </div>
  );
}
