const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  income: Number,
  expenses: Number,
  budget: Number,
  savings: {
    current: Number,
    goal: Number,
  },
  familyMembers: [
    {
      name: String,
      savings: Number,
      savingsGoal: Number,
    }
  ],
  familyModuleProgress: [
    {
      member: String,
      modules: [
        {
          name: String,
          progress: Number,
        }
      ]
    }
  ],
  expenseDistribution: [
    {
      name: String,
      value: Number,
    }
  ],
  monthlyCashFlow: [
    {
      month: String,
      income: Number,
      expenses: Number,
      savings: Number,
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('DashboardData', DashboardDataSchema);
