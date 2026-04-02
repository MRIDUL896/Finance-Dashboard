import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "../components/charts/SpendingBreakdownChart";
import PageShell from "../components/common/PageShell";
import InsightsSection from "../components/dashboard/InsightsSection";
import PageHeader from "../components/dashboard/PageHeader";
import SummarySection from "../components/dashboard/SummarySection";
import TransactionModal from "../components/transactions/TransactionModal";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionsToolbar from "../components/transactions/TransactionsToolbar";

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHeader />
      <div className="space-y-6">
        <SummarySection />

        <div className="grid gap-6 xl:grid-cols-2">
          <BalanceTrendChart />
          <SpendingBreakdownChart />
        </div>

        <InsightsSection />

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <TransactionsToolbar />
          <TransactionTable />
        </section>
      </div>

      <TransactionModal />
    </PageShell>
  );
}