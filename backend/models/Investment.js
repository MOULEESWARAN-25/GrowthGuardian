const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  change: { type: Number }, // percentage 24h change (for stocks)
  expense: { type: Number }, // expense ratio (for mutual funds)
  type: { type: String, enum: ['stock', 'mutualFund'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Investment', InvestmentSchema);
