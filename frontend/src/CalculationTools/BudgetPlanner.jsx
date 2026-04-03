import { useState, useEffect } from 'react';

function BudgetPlanner() {
  const [budget, setBudget] = useState(150000);
  const [expenses, setExpenses] = useState([]);
  const [remaining, setRemaining] = useState(150000);
  const [spent, setSpent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(150000);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('groceries');

  useEffect(() => {
    const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
    setSpent(totalSpent);
    setRemaining(budget - totalSpent);
  }, [expenses, budget]);

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    setBudget(Number(newBudget));
    setIsEditing(false);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || amount <= 0) return;
    setExpenses([...expenses, { id: Date.now(), name, amount: Number(amount), category, date: new Date().toISOString().slice(0, 10) }]);
    setName(''); setAmount(''); setCategory('groceries');
  };

  const deleteExpense = (id) => setExpenses(expenses.filter(e => e.id !== id));

  const formatINR = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

  const spentPercentage = Math.min((spent / budget) * 100, 100);

  /* shared classes */
  const card = "rounded-xl border p-6";
  const inp = "w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const lbl = "block text-xs font-semibold uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-full px-6 pb-8 font-sans" style={{ background: "transparent" }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left – Summary + Form + Table */}
            <div className="lg:col-span-2 space-y-6">

              {/* Budget Summary */}
              <div className={card} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>Budget Summary</h2>
                  <button onClick={() => setIsEditing(!isEditing)} className="text-sm font-medium" style={{ color: "var(--primary)" }}>
                    {isEditing ? 'Cancel' : 'Edit Budget'}
                  </button>
                </div>

                {isEditing ? (
                  <form onSubmit={handleBudgetSubmit} className="flex gap-2">
                    <input type="number" value={newBudget} onChange={(e) => setNewBudget(e.target.value)}
                      className={inp} min="0"
                      style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                    <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Save</button>
                  </form>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "BUDGET", value: formatINR(budget) },
                      { label: "REMAINING", value: formatINR(remaining), warn: remaining < 0 },
                      { label: "SPENT", value: formatINR(spent) },
                    ].map(({ label, value, warn }) => (
                      <div key={label} className="rounded-lg p-4 text-center" style={{ background: "var(--muted)" }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                        <p className="text-xl font-bold" style={{ color: warn ? "var(--destructive)" : "var(--foreground)" }}>{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Expense Form */}
              <div className={card} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Add New Expense</h2>
                <form onSubmit={handleExpenseSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Expense Name</label>
                      <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className={inp} placeholder="Groceries, Rent…" required
                        style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                    </div>
                    <div>
                      <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Amount (₹)</label>
                      <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                        className={inp} placeholder="0" min="1" step="1" required
                        style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                    </div>
                    <div>
                      <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Category</label>
                      <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}
                        className={inp}
                        style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                        {['groceries','housing','utilities','transport','dining','entertainment','healthcare','education','other'].map(c => (
                          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button type="submit" className="w-full py-2.5 rounded-lg font-semibold text-sm"
                        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>Add Expense</button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Expense Table */}
              <div className={card} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "var(--foreground)" }}>Your Expenses</h2>
                {expenses.length === 0 ? (
                  <p className="text-center py-6 text-sm" style={{ color: "var(--muted-foreground)" }}>No expenses recorded yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)" }}>
                          {['Name','Category','Date','Amount',''].map(h => (
                            <th key={h} className={`px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide ${h === 'Amount' || h === '' ? 'text-right' : ''}`}
                              style={{ color: "var(--muted-foreground)" }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map((expense) => (
                          <tr key={expense.id} className="transition-colors"
                            style={{ borderBottom: "1px solid var(--border)" }}
                            onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
                            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                            <td className="px-4 py-3 text-sm font-medium" style={{ color: "var(--foreground)" }}>{expense.name}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}>
                                {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{expense.date}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-right" style={{ color: "var(--foreground)" }}>{formatINR(expense.amount)}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => deleteExpense(expense.id)} className="text-xs font-medium"
                                style={{ color: "var(--destructive)" }}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Right – Budget Overview */}
            <div>
              <div className={card} style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <h2 className="text-lg font-bold mb-5" style={{ color: "var(--foreground)" }}>Budget Overview</h2>
                <div className="space-y-6">

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "var(--accent)", color: "var(--primary)" }}>Spending Progress</span>
                      <span className="text-xs font-bold" style={{ color: spentPercentage > 80 ? "var(--destructive)" : "var(--primary)" }}>
                        {spentPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${spentPercentage}%`, background: spentPercentage > 80 ? "var(--destructive)" : "var(--primary)" }} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    {[
                      { label: "Total Budget", value: formatINR(budget) },
                      { label: "Spent", value: formatINR(spent) },
                      { label: "Remaining", value: formatINR(remaining), warn: remaining < 0 },
                    ].map(({ label, value, warn }) => (
                      <div key={label} className="flex justify-between items-center">
                        <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{label}:</span>
                        <span className="text-sm font-semibold"
                          style={{ color: warn ? "var(--destructive)" : "var(--foreground)" }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="rounded-lg p-3 text-center text-sm font-medium"
                    style={{ background: remaining >= 0 ? "color-mix(in oklch, var(--primary) 10%, var(--background))" : "color-mix(in oklch, var(--destructive) 10%, var(--background))",
                      color: remaining >= 0 ? "var(--primary)" : "var(--destructive)" }}>
                    {remaining >= 0
                      ? `${formatINR(remaining)} left to spend`
                      : `Over budget by ${formatINR(Math.abs(remaining))}`}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
}

export default BudgetPlanner;
