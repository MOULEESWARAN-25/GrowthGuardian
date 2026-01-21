require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Groq } = require('groq-sdk');
const DashboardData = require('./models/DashboardData');
const Investment = require('./models/Investment');
const fallbackData = require('./fallbackData');

const app = express();
app.use(express.json());
app.use(cors());

const seedDatabase = async () => {
  try {
    const dashCount = await DashboardData.countDocuments();
    if (dashCount === 0) {
      console.log("Seeding default dashboard data...");
      await DashboardData.create(fallbackData);
      console.log("Dashboard data seeded successfully.");
    }

    const investCount = await Investment.countDocuments();
    if (investCount === 0) {
      console.log("Seeding default investment data...");
      const defaultInvestments = [
        { symbol: "TATASTEEL", name: "Tata Steel Ltd.", price: 152.40, change: 1.25, type: "stock" },
        { symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2460.50, change: -0.45, type: "stock" },
        { symbol: "INFY", name: "Infosys Ltd.", price: 1425.00, change: 0.82, type: "stock" },
        { symbol: "TCS", name: "Tata Consultancy Services Ltd.", price: 3820.00, change: 1.48, type: "stock" },
        { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", price: 1610.20, change: -1.15, type: "stock" },
        { symbol: "PPFAS", name: "Parag Parikh Flexi Cap Fund", price: 65.45, expense: 0.76, type: "mutualFund" },
        { symbol: "HDFCSEN", name: "HDFC Index Fund - S&P BSE Sensex Plan", price: 120.30, expense: 0.20, type: "mutualFund" },
        { symbol: "SBIBLUE", name: "SBI Bluechip Fund", price: 82.40, expense: 0.95, type: "mutualFund" },
        { symbol: "AXISSMALL", name: "Axis Small Cap Fund", price: 95.15, expense: 0.55, type: "mutualFund" }
      ];
      await Investment.insertMany(defaultInvestments);
      console.log("Investment data seeded successfully.");
    }
  } catch (err) {
    console.error("Database seeding failed:", err);
  }
};

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected securely.");
    seedDatabase();
  })
  .catch(err => console.error("MongoDB connection error:", err));

const ChatSchema = new mongoose.Schema({
  userMessage: String,
  botResponse: String,
  timestamp: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', ChatSchema);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Input validation and sanitization middleware
const validateInputPrompt = (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: "Request body must contain a valid 'prompt' string." });
  }
  const trimmed = prompt.trim();
  if (trimmed.length === 0) {
    return res.status(400).json({ error: "Prompt cannot be empty or whitespace-only." });
  }
  if (trimmed.length > 5000) {
    return res.status(400).json({ error: "Prompt exceeds the maximum limit of 5000 characters." });
  }
  req.body.prompt = trimmed; // assign sanitized value
  next();
};

app.post('/api/chat', validateInputPrompt, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are the GrowthGuardian AI. Respond clearly using markdown. Keep it concise, helpful, and professional in a fintech context." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });
    
    const botResponse = completion.choices[0]?.message?.content || "I couldn't process that.";
    try {
      await Chat.create({ userMessage: prompt, botResponse });
    } catch (dbErr) {
      console.error("DB Logging skipped:", dbErr.message);
    }

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

app.post('/api/scam-detect', validateInputPrompt, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are the Scam Detection AI designed for GrowthGuardian. Analyze the user's text thoroughly and determine if it contains signs of a scam or fraud. Explain your reasoning professionally and concisely using markdown. Provide an explicit RISK LEVEL (Low, Medium, High) at the top." },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });
    
    const botResponse = completion.choices[0]?.message?.content || "Scam analysis failed.";
    try {
      await Chat.create({ userMessage: `Scam Analysis Request: ${prompt}`, botResponse });
    } catch (dbErr) {
      console.error("DB Logging skipped:", dbErr.message);
    }

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Failed to run scam analysis." });
  }
});

app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("DB not connected, sending regional fallback instantly.");
      return res.json(fallbackData);
    }
    let data = await DashboardData.findOne({ userId: req.params.userId }).maxTimeMS(2000);
    if (!data) {
      console.log(`User ${req.params.userId} not found in DB. Creating dynamic profile...`);
      const template = { ...fallbackData };
      template.userId = req.params.userId;
      const capitalized = req.params.userId.charAt(0).toUpperCase() + req.params.userId.slice(1);
      template.name = capitalized;
      
      // Ensure we don't duplicate unique index constraints from Mongoose template _id field
      delete template._id;
      
      data = await DashboardData.create(template);
      console.log(`New user profile saved to database for ${req.params.userId}`);
    }
    res.json(data);
  } catch (error) {
    console.error("Dashboard API error, falling back to local memory:", error);
    res.json(fallbackData);
  }
});

app.get('/api/investments', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("DB not connected, sending local mock investments.");
      return res.json({
        stocks: [
          { id: "1", symbol: "TATASTEEL", name: "Tata Steel Ltd.", price: 152.40, change: 1.25 },
          { id: "2", symbol: "RELIANCE", name: "Reliance Industries Ltd.", price: 2460.50, change: -0.45 }
        ],
        mutualFunds: [
          { id: "6", symbol: "PPFAS", name: "Parag Parikh Flexi Cap Fund", price: 65.45, expense: 0.76 }
        ]
      });
    }

    const list = await Investment.find({});
    const stocks = list
      .filter(item => item.type === 'stock')
      .map(item => ({
        id: item._id.toString(),
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        change: item.change
      }));
    const mutualFunds = list
      .filter(item => item.type === 'mutualFund')
      .map(item => ({
        id: item._id.toString(),
        symbol: item.symbol,
        name: item.name,
        price: item.price,
        expense: item.expense
      }));

    res.json({ stocks, mutualFunds });
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).json({ error: "Failed to fetch investments" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Active: Running on port ${PORT}`));
