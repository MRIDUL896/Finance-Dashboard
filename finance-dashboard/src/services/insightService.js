import {
  getCategoryBreakdown,
  getExpenseTotal,
  getIncomeTotal,
  getMonthlyTrend,
} from "./transactionService";
import { formatCurrency } from "../utils/formatters";

export const getInsights = (transactions) => {
  const breakdown = getCategoryBreakdown(transactions);
  const trend = getMonthlyTrend(transactions);
  const current = trend.at(-1);
  const previous = trend.at(-2);

  const highest = breakdown[0];

  const monthlyComparison =
    current && previous
      ? current.expense > previous.expense
        ? `Expenses increased by ${formatCurrency(current.expense - previous.expense)} compared to last month.`
        : `Expenses decreased by ${formatCurrency(previous.expense - current.expense)} compared to last month.`
      : "Add more monthly data to unlock comparison insights.";

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthTransactions = transactions.filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const currentMonthIncome = getIncomeTotal(currentMonthTransactions);
  const currentMonthExpenses = getExpenseTotal(currentMonthTransactions);

  const savingsRate = !currentMonthIncome
    ? "No income data yet for this month to calculate savings rate."
    : `Current month savings rate is ${Math.max(
        0,
        ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome) * 100
      ).toFixed(1)}%.`;

  return [
    highest
      ? `Highest spending category is ${highest.name} at ${formatCurrency(highest.value)}.`
      : "No expense transactions available yet.",
    monthlyComparison,
    savingsRate,
  ];
};