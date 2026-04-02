import { useMemo } from "react";
import { useDashboard } from "./useDashboard";
import {
  getBalanceTotal,
  getCategoryBreakdown,
  getExpenseTotal,
  getIncomeTotal,
  getMonthlyTrend,
} from "../services/transactionService";
import { getInsights } from "../services/insightService";

export function useDashboardData() {
  const { transactions } = useDashboard();

  return useMemo(() => {
    const income = getIncomeTotal(transactions);
    const expenses = getExpenseTotal(transactions);
    const balance = getBalanceTotal(transactions);
    const trendData = getMonthlyTrend(transactions);
    const breakdownData = getCategoryBreakdown(transactions);
    const insights = getInsights(transactions);

    return {
      income,
      expenses,
      balance,
      trendData,
      breakdownData,
      insights,
    };
  }, [transactions]);
}