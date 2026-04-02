import { motion } from "framer-motion";
import { useDashboardData } from "../../hooks/useDashboardData";

export default function InsightsSection() {
  const { insights } = useDashboardData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h3 className="mb-4 text-lg font-semibold">Insights</h3>

      <div className="grid gap-3 md:grid-cols-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.03,
              y: -4,
              transition: { type: "spring", stiffness: 260, damping: 18 },
            }}
            className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 transition-all duration-300 hover:shadow-lg hover:ring-2 hover:ring-blue-500/40 dark:bg-slate-800/80 dark:text-slate-200"
          >
            {insight}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}