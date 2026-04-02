import { createContext, useEffect, useMemo, useState } from "react";
import { MOCK_TRANSACTIONS } from "../data/mockTransactions";
import { ROLES } from "../constants/roles";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { getStoredValue, saveValue } from "../utils/storage";

export const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  //during testing
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  //for prod
  // const [transactions, setTransactions] = useState(() =>
  //   getStoredValue(STORAGE_KEYS.transactions, MOCK_TRANSACTIONS)
  // );
  const [role, setRole] = useState(() =>
    getStoredValue(STORAGE_KEYS.role, ROLES.VIEWER)
  );
  const [theme, setTheme] = useState(() =>
    getStoredValue(STORAGE_KEYS.theme, "light")
  );
  const [filters, setFilters] = useState({
    query: "",
    type: "all",
    category: "all",
    sortBy: "date-desc",
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    saveValue(STORAGE_KEYS.transactions, transactions);
  }, [transactions]);

  useEffect(() => {
    saveValue(STORAGE_KEYS.role, role);
  }, [role]);

  useEffect(() => {
    saveValue(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      { ...transaction, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === updatedTransaction.id ? updatedTransaction : item
      )
    );
  };

  const openCreateModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const value = useMemo(
    () => ({
      transactions,
      role,
      setRole,
      theme,
      setTheme,
      filters,
      setFilters,
      addTransaction,
      updateTransaction,
      editingTransaction,
      isModalOpen,
      openCreateModal,
      openEditModal,
      closeModal,
    }),
    [transactions, role, theme, filters, editingTransaction, isModalOpen]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}