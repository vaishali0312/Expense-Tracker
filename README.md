# Expense Tracker

A full-stack personal expense tracker with in-memory storage.

## Stack
- **Backend**: Node.js + Express (REST API, port 3001)
- **Frontend**: React (via CDN, served as a plain HTML file)

---

## Run Instructions

### 1. Start the Backend

```bash
cd expense-tracker
npm install
npm start
```

You should see:
```
🧾 Expense API running at http://localhost:3001
```

### 2. Open the Frontend

Open `index.html` directly in your browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

Or just double-click `index.html` in your file explorer.

> ⚠️ The backend must be running before you open the frontend.

---

## Features

| Feature | Details |
|---|---|
| Add expense | Amount (positive number) + Category (non-empty) |
| Validation | Client-side + server-side, with clear error messages |
| Totals | Per-category totals shown as chips, grand total highlighted |
| Ledger | All entries listed newest-first with delete button |
| In-memory | No database — data lives in the Node.js process |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/expenses` | Returns all expenses + totals per category |
| `POST` | `/expenses` | Add expense `{ amount, category }` |
| `DELETE` | `/expenses/:id` | Remove an expense by ID |
