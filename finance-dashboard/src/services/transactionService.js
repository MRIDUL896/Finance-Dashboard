export const getIncomeTotal = (transactions) =>
  transactions
    .filter((item) => item.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

export const getExpenseTotal = (transactions) =>
  transactions
    .filter((item) => item.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

export const getBalanceTotal = (transactions) =>
  getIncomeTotal(transactions) - getExpenseTotal(transactions);

export const getCategoryBreakdown = (transactions) => {
  const totals = transactions
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

  return Object.entries(totals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyTrend = (transactions) => {
  const grouped = transactions.reduce((acc, item) => {
    const date = new Date(item.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });

    if (!acc[key]) {
      acc[key] = {
        key,
        month: label,
        income: 0,
        expense: 0,
      };
    }

    if (item.type === "income") acc[key].income += item.amount;
    if (item.type === "expense") acc[key].expense += item.amount;

    return acc;
  }, {});

  return Object.values(grouped)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((item) => ({
      month: item.month,
      income: item.income,
      expense: item.expense,
      balance: item.income - item.expense,
    }));
};

export const getFilteredTransactions = (transactions, filters) => {
  let result = [...transactions];

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter((item) =>
      [item.description, item.category, item.type, item.date].some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );
  }

  if (filters.type !== "all") {
    result = result.filter((item) => item.type === filters.type);
  }

  if (filters.category !== "all") {
    result = result.filter((item) => item.category === filters.category);
  }

  const sorters = {
    "date-desc": (a, b) => new Date(b.date) - new Date(a.date),
    "date-asc": (a, b) => new Date(a.date) - new Date(b.date),
    "amount-desc": (a, b) => b.amount - a.amount,
    "amount-asc": (a, b) => a.amount - b.amount,
  };

  return result.sort(sorters[filters.sortBy]);
};