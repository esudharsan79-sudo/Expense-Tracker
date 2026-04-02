import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const cls = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-primary text-white"
        : "text-gray-400 hover:text-white hover:bg-[#2a2a3e]"
    }`;

  return (
    <nav className="bg-cardBg border-b border-[#2a2a3e] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold text-primary">
              Expense<span className="text-white">IQ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={cls("/")}>🏠 Dashboard</Link>
            <Link to="/transactions" className={cls("/transactions")}>💳 Transactions</Link>
            <Link to="/analytics" className={cls("/analytics")}>📊 Analytics</Link>
            <Link to="/budget" className={cls("/budget")}>🎯 Budget</Link>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white p-2 space-y-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-0.5 bg-current" />
            <div className="w-5 h-0.5 bg-current" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className={cls("/")}>🏠 Dashboard</Link>
            <Link to="/transactions" onClick={() => setMenuOpen(false)} className={cls("/transactions")}>💳 Transactions</Link>
            <Link to="/analytics" onClick={() => setMenuOpen(false)} className={cls("/analytics")}>📊 Analytics</Link>
            <Link to="/budget" onClick={() => setMenuOpen(false)} className={cls("/budget")}>🎯 Budget</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
