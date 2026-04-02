import React, { useState, useEffect } from "react";

const currencies = [
  { code: "USD", symbol: "$",  flag: "🇺🇸", name: "US Dollar" },
  { code: "EUR", symbol: "€",  flag: "🇪🇺", name: "Euro" },
  { code: "GBP", symbol: "£",  flag: "🇬🇧", name: "British Pound" },
  { code: "AUD", symbol: "A$", flag: "🇦🇺", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥",  flag: "🇯🇵", name: "Japanese Yen" },
  { code: "SGD", symbol: "S$", flag: "🇸🇬", name: "Singapore Dollar" },
];

export default function CurrencyRates() {
  const [rates, setRates] = useState(null);
  const [rateDate, setRateDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const symbols = currencies.map((c) => c.code).join(",");
      const res = await fetch(`https://api.frankfurter.app/latest?from=INR&to=${symbols}`);
      if (!res.ok) throw new Error("Network error");
      const data = await res.json();
      setRates(data.rates);
      setRateDate(data.date);
    } catch (e) {
      setError("Could not load exchange rates. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            🌐 Live Exchange Rates
            <span className="ml-2 text-xs font-normal bg-green-900/40 text-green-400 border border-green-700 px-2 py-0.5 rounded-full">LIVE</span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            1 INR to major currencies · Frankfurter API{rateDate && ` · ${rateDate}`}
          </p>
        </div>
        <button
          onClick={fetchRates}
          disabled={loading}
          className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "⟳ Refresh"}
        </button>
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">⚠️ {error}</p>
      )}

      {!error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {currencies.map((c) => (
            <div key={c.code} className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-3 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span>{c.flag}</span>
                <span className="text-xs font-semibold text-gray-300 uppercase">{c.code}</span>
              </div>
              {loading ? (
                <div className="h-5 bg-gray-700 rounded animate-pulse w-3/4" />
              ) : (
                <>
                  <p className="text-white font-bold">
                    {c.symbol}{rates?.[c.code] != null ? rates[c.code].toFixed(rates[c.code] < 1 ? 4 : 2) : "—"}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{c.name}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
