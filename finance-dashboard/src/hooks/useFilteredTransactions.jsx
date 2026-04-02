import { useMemo } from "react";
import { useDashboard } from "./useDashboard";
import { getFilteredTransactions } from "../services/transactionService";

export function useFilteredTransactions() {
  const { transactions, filters } = useDashboard();

  return useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters]
  );
}