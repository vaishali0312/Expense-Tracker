const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store
let expenses = [];
let nextId = 1;

// Validation helper
function validate({ amount, category }) {
  const errors = [];
  const num = parseFloat(amount);
  if (isNaN(num) || num <= 0) errors.push('Amount must be a positive number.');
  if (!category || category.trim() === '') errors.push('Category cannot be empty.');
  return errors;
}

// GET /expenses — all expenses + totals per category
app.get('/expenses', (req, res) => {
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }
  res.json({ expenses, totals });
});

// POST /expenses — add a new expense
app.post('/expenses', (req, res) => {
  const { amount, category } = req.body;
  const errors = validate({ amount, category });
  if (errors.length) return res.status(400).json({ errors });

  const expense = {
    id: nextId++,
    amount: parseFloat(parseFloat(amount).toFixed(2)),
    category: category.trim(),
    date: new Date().toISOString(),
  };
  expenses.push(expense);
  res.status(201).json(expense);
});

// DELETE /expenses/:id
app.delete('/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = expenses.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Expense not found.' });
  expenses.splice(idx, 1);
  res.json({ success: true });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`🧾 Expense API running at http://localhost:${PORT}`));
