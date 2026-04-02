import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ROLES } from "../../constants/roles";
import { useDashboard } from "../../hooks/useDashboard";
import { useFilteredTransactions } from "../../hooks/useFilteredTransactions";
import { formatCurrency, formatDate } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";
import TypeBadge from "../common/TypeBadge";

const ITEMS_PER_PAGE = 20;

export default function TransactionTable() {
  const { role, openEditModal, filters } = useDashboard();
  const transactions = useFilteredTransactions();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, transactions.length]);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, currentPage]);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        {!transactions.length ? (
          <div className="p-8">
            <EmptyState
              title="No matching transactions"
              message="Try changing your filters or add a new transaction."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/70">
                <tr className="text-slate-600 dark:text-slate-300">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  {role === ROLES.ADMIN && (
                    <th className="px-4 py-3 font-medium">Action</th>
                  )}
                </tr>
              </thead>

              <tbody>
                {paginatedTransactions.map((item) => (
                  <motion.tr
                    layout
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-slate-100 transition-all duration-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/80"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{item.description}</div>
                    </td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">
                      <TypeBadge type={item.type} />
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {formatCurrency(item.amount)}
                    </td>

                    {role === ROLES.ADMIN && (
                      <td className="px-4 py-3">
                        <button
                          onClick={() => openEditModal(item)}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          Edit
                        </button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {transactions.length > ITEMS_PER_PAGE && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, transactions.length)} of{" "}
            {transactions.length} transactions
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm transition-all duration-200 hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
            >
              Previous
            </button>

            <span className="text-sm text-slate-600 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm transition-all duration-200 hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}