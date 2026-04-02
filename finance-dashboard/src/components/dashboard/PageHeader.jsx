import { motion } from "framer-motion";
import { Moon, ShieldCheck, SunMedium } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import { ROLES } from "../../constants/roles";

export default function PageHeader() {
  const { role, setRole, theme, setTheme } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Monitor balances, track transactions, and explore spending patterns.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 transition-all duration-200 hover:scale-105 hover:shadow-md dark:border-slate-700">
          <ShieldCheck className="h-4 w-4" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value={ROLES.VIEWER}>Viewer</option>
            <option value={ROLES.ADMIN}>Admin</option>
          </select>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md dark:border-slate-700"
        >
          {theme === "dark" ? (
            <SunMedium className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === "dark" ? "Light" : "Dark"} mode
        </button>
      </div>
    </motion.div>
  );
}