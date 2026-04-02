import { Download, Plus, Search } from "lucide-react";
import { CATEGORIES } from "../../constants/categories";
import { ROLES } from "../../constants/roles";
import { useDashboard } from "../../hooks/useDashboard";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { exportTransactionsToCSV } from "../../services/csvService";

export default function TransactionsToolbar() {
  const { filters, setFilters, role, openCreateModal } = useDashboard();
  const filteredTransactions = useFilteredTransactions();

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, filter, sort, and export transaction records.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportTransactionsToCSV(filteredTransactions)}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md dark:border-slate-700"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>

          {role === ROLES.ADMIN && (
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-md dark:bg-white dark:text-slate-900"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            placeholder="Search by description, category..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-slate-700"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => updateFilter("sortBy", e.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="date-desc">Newest first</option>
          <option value="date-asc">Oldest first</option>
          <option value="amount-desc">Highest amount</option>
          <option value="amount-asc">Lowest amount</option>
        </select>
      </div>
    </div>
  );
}