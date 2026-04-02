import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useDashboardData } from "../../hooks/useDashboardData";
import StatCard from "../common/Statcard";

export default function SummarySection() {
  const { balance, income, expenses } = useDashboardData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard title="Total Balance" value={balance} icon={Wallet} hint="Net available balance" positive />
      <StatCard title="Income" value={income} icon={TrendingUp} hint="Total recorded earnings" positive />
      <StatCard title="Expenses" value={expenses} icon={TrendingDown} hint="Total recorded spending" />
    </div>
  );
}