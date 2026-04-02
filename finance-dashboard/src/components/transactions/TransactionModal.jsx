import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IndianRupee, X } from "lucide-react";
import { CATEGORIES } from "../../constants/categories";
import { useDashboard } from "../../hooks/useDashboard";
import Field from "../common/Field";

const getInitialForm = () => ({
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
});

export default function TransactionModal() {
  const { isModalOpen, closeModal, editingTransaction, addTransaction, updateTransaction } =
    useDashboard();
  const [form, setForm] = useState(getInitialForm());

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        id: editingTransaction.id,
        date: editingTransaction.date,
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        type: editingTransaction.type,
      });
    } else {
      setForm(getInitialForm());
    }
  }, [editingTransaction, isModalOpen]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (!payload.description.trim() || !payload.date || !payload.amount || payload.amount <= 0) {
      return;
    }

    if (editingTransaction) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }

    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {editingTransaction
                    ? "Update the selected transaction."
                    : "Create a new income or expense entry."}
                </p>
              </div>
              <button onClick={closeModal} className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Date">
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none dark:border-slate-700"
                  />
                </Field>

                <Field label="Amount">
                  <input
                    type="number"
                    min="1"
                    value={form.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="Enter amount"
                    className="w-full rounded-2xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none dark:border-slate-700"
                  />
                </Field>
              </div>

              <Field label="Description">
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="e.g. Grocery shopping"
                  className="w-full rounded-2xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none dark:border-slate-700"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none dark:border-slate-700"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Type">
                  <select
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-transparent px-3 py-2.5 outline-none dark:border-slate-700"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </Field>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
                >
                  <IndianRupee className="h-4 w-4" />
                  {editingTransaction ? "Save Changes" : "Add Transaction"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}