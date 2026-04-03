module.exports = {
  userId: 'karthik',
  name: "Karthikeyan",
  income: 145000,
  expenses: 82000,
  budget: 95000,
  savings: { current: 350000, goal: 1000000 },
  familyMembers: [
    { name: "Karthikeyan", savings: 250000, savingsGoal: 600000 },
    { name: "Priya", savings: 75000, savingsGoal: 300000 },
    { name: "Suresh", savings: 25000, savingsGoal: 100000 },
  ],
  familyModuleProgress: [
    { member: "Karthikeyan", modules: [{ name: "Budgeting", progress: 100 }, { name: "Saving", progress: 80 }, { name: "Investing", progress: 40 }] },
    { member: "Priya", modules: [{ name: "Budgeting", progress: 60 }, { name: "Saving", progress: 20 }, { name: "Investing", progress: 0 }] },
    { member: "Suresh", modules: [{ name: "Budgeting", progress: 100 }, { name: "Saving", progress: 100 }, { name: "Investing", progress: 100 }] },
  ],
  expenseDistribution: [
    { name: "Chennai Housing", value: 30000 },
    { name: "Food & Groceries", value: 18000 },
    { name: "Transport/Metro", value: 8000 },
    { name: "Utilities (TNEB)", value: 6000 },
    { name: "Insurance", value: 10000 },
    { name: "Others", value: 10000 },
  ],
  monthlyCashFlow: [
    { month: "Jan", income: 135000, expenses: 78000, savings: 57000 },
    { month: "Feb", income: 135000, expenses: 84000, savings: 51000 },
    { month: "Mar", income: 138000, expenses: 80000, savings: 58000 },
    { month: "Apr", income: 145000, expenses: 82000, savings: 63000 },
    { month: "May", income: 145000, expenses: 79000, savings: 66000 },
    { month: "Jun", income: 150000, expenses: 85000, savings: 65000 },
  ]
};
