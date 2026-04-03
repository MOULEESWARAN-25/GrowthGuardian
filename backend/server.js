require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Groq } = require('groq-sdk');
const DashboardData = require('./models/DashboardData');
const fallbackData = require('./fallbackData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected securely."))
  .catch(err => console.error("MongoDB connection error:", err));

const ChatSchema = new mongoose.Schema({
  userMessage: String,
  botResponse: String,
  timestamp: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', ChatSchema);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/chat', async (req, res) => {
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

app.post('/api/scam-detect', async (req, res) => {
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
    const data = await DashboardData.findOne({ userId: req.params.userId }).maxTimeMS(2000);
    if (!data) return res.json(fallbackData);
    res.json(data);
  } catch (error) {
    console.error("Dashboard API gracefully caught DB Error, sending regional data.");
    res.json(fallbackData);
  }
});

app.get('/api/investments', (req, res) => {
  res.json(fallbackData.investments);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Active: Running on port ${PORT}`));
