# 💰 Finance Dashboard (Frontend Only)

A clean and interactive **Finance Dashboard UI** built using **React + Tailwind CSS**.
This project focuses on frontend architecture, state management, and user experience without relying on a backend.

---

## Overview

This dashboard allows users to:

- View overall financial summary (balance, income, expenses)
- Explore and filter transactions
- Understand spending patterns through charts
- Get simple financial insights
- Role-based UI behavior (Viewer/Admin)

---

## Approach & Architecture

```
src/
│
├── components/     → Reusable UI components (cards, charts, tables)
├── pages/          → Page-level components (Dashboard)
├── hooks/          → Custom hooks (logic separation)
├── context/        → Global state (DashboardContext)
├── services/       → Business logic (insights, CSV export)
├── utils/          → Helper functions (formatters)
├── data/           → Mock transaction dataset
├── constants/      → Static values (roles, categories)
```

### Key Design Principles

* **Separation of UI & logic** using hooks and services
* **DRY (Don’t Repeat Yourself)** via reusable components
* **SOLID-inspired structure** (single responsibility per module)
* **State centralized** using Context API

---

## Tech Stack

* **React (Vite)**
* **Tailwind CSS (v4)**
* **Recharts** (data visualization)
* **Local Storage** (data persistence)

---

## ✨ Features

### Dashboard Overview

* Summary cards:
  * Total Balance
  * Total Income
  * Total Expenses
* Balance trend (line chart)
* Spending breakdown (pie chart)

---

### Transactions

* Displays transaction list with:
  * Date
  * Description
  * Category
  * Type (income/expense)
  * Amount
* Features:
  * Search
  * Filter (category/type)
  * Sort (date/amount)
  * Pagination (20 per page)
  * Export to CSV

---

### Role-Based UI (Frontend Only)

* **Viewer**

  * Can view data only
* **Admin**

  * Can add/edit transactions

Role can be switched using a dropdown.

---

### 💡 Insights Section

* Highest spending category
* Monthly comparison
* Savings rate (current month)

---

### 🌙 Dark Mode

* Toggle between light and dark themes
* Uses Tailwind custom dark variant

---


## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-link>
cd finance-dashboard
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the development server

```bash
npm run dev
```

---

### 4. Open in browser

http://localhost:5173