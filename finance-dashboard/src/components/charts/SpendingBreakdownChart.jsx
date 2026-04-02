import { CreditCard } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDashboard } from "../../hooks/useDashboard";
import { useDashboardData } from "../../hooks/useDashboardData";
import { formatCurrency } from "../../utils/formatters";
import ChartCard from "../common/ChartCard";
import EmptyState from "../common/EmptyState";

const colors = [
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#f59e0b",
  "#16a34a",
  "#0f766e",
  "#64748b",
  "#ea580c",
];

export default function SpendingBreakdownChart() {
  const { breakdownData } = useDashboardData();
  const { theme } = useDashboard();

  if (!breakdownData.length) {
    return (
      <EmptyState
        title="No spending data"
        message="Expense categories will appear here once added."
      />
    );
  }

  const textColor = theme === "dark" ? "#cbd5e1" : "#475569";
  const tooltipBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "#334155" : "#cbd5e1";
  const tooltipText = theme === "dark" ? "#f8fafc" : "#0f172a";

  return (
    <ChartCard title="Spending Breakdown" icon={CreditCard}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart key={theme}>
            <Pie
              data={breakdownData}
              dataKey="value"
              nameKey="name"
              outerRadius={105}
              label={({ name }) => name}
              labelLine={false}
            >
              {breakdownData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "12px",
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
            />

            <Legend wrapperStyle={{ color: textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}