# ExpenseIQ

A personal expense tracker built with Redux Toolkit and Recharts. Tracks income/expenses, shows spending patterns, and lets you set per-category budgets.

🔗 **Live demo:** https://expense-tracker-five-snowy-24.vercel.app/
## Stack

- React 18
- Redux Toolkit + localStorage persistence
- React Router v6
- Recharts
- Tailwind CSS

## Running locally

```bash
npm install
npm start
```

Opens at http://localhost:3000

## Features

- Add/delete transactions with category, description, date
- Filter by type, category, or month, plus free-text search
- Dashboard with balance summary and recent activity
- Analytics: pie chart, monthly bar chart, income vs expense area trend
- Budget planner: per-category limits with over-budget alerts
- Live INR exchange rates via Frankfurter API (no key needed)
- Data saved in localStorage across refreshes

## Notes

No backend. Runs entirely in the browser. Sample transactions are seeded for three months so charts have data on first load.
