import { BarChart3 } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboard } from "../../hooks/useDashboard";
import { useDashboardData } from "../../hooks/useDashboardData";
import ChartCard from "../common/ChartCard";
import EmptyState from "../common/EmptyState";

export default function BalanceTrendChart() {
  const { trendData } = useDashboardData();
  const { theme } = useDashboard();

  if (!trendData.length) {
    return (
      <EmptyState
        title="No trend data"
        message="Add transactions to visualize monthly balance trends."
      />
    );
  }

  const axisColor = theme === "dark" ? "#cbd5e1" : "#475569";
  const gridColor = theme === "dark" ? "#334155" : "#e2e8f0";
  const tooltipBg = theme === "dark" ? "#0f172a" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "#334155" : "#cbd5e1";
  const tooltipText = theme === "dark" ? "#f8fafc" : "#0f172a";

  return (
    <ChartCard title="Balance Trend" icon={BarChart3}>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart key={theme} data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={{ stroke: gridColor }} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "12px",
                color: tooltipText,
              }}
              labelStyle={{ color: tooltipText }}
            />
            <Legend wrapperStyle={{ color: axisColor }} />
            <Line type="monotone" dataKey="income" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="expense" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}