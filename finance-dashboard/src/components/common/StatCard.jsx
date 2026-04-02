import { formatCurrency } from "../../utils/formatters";
import HoverCard from "./HoverCard";

export default function StatCard({ title, value, icon: Icon, hint, positive }) {
  return (
    <HoverCard className="border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold">{formatCurrency(value)}</h3>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
        </div>

        <div
          className={`rounded-2xl p-3 ${
            positive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </HoverCard>
  );
}