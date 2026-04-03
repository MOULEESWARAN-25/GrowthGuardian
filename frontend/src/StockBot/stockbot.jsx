import React, { useState, useRef, useEffect } from "react";
import { Send, BarChart2, TrendingUp, RefreshCw, Sparkles, ChevronRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Lightweight markdown → HTML renderer (avoids ReactMarkdown crash)
const MdText = ({ children }) => {
  const lines = (children || "").split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        const heading = line.match(/^(#{1,3})\s+(.*)/);
        if (heading) return <p key={i} className="font-bold text-[15px] mt-2 mb-0.5" dangerouslySetInnerHTML={{ __html: inlineFormat(heading[2]) }} />;
        const bullet = line.match(/^[-*]\s+(.*)/); 
        if (bullet) return <p key={i} className="flex gap-2"><span>•</span><span dangerouslySetInnerHTML={{ __html: inlineFormat(bullet[1]) }} /></p>;
        const numbered = line.match(/^\d+\.\s+(.*)/);
        if (numbered) return <p key={i} className="flex gap-2"><span>{line.split(/\s/)[0]}</span><span dangerouslySetInnerHTML={{ __html: inlineFormat(numbered[1]) }} /></p>;
        return <p key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(line) }} />;
      })}
    </div>
  );
};

const inlineFormat = (text) =>
  text
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded text-[12px]" style="background:rgba(255,255,255,0.08);font-family:monospace">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const SUGGESTIONS = [
  "Analyze Reliance Industries stock trend",
  "Best SIP mutual funds for 2026",
  "Explain why Nifty 50 dropped today",
  "Compare growth vs value investing",
];

export default function StockBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;
    const userMsg = { role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const payload = { prompt: text + " Focus heavily on stock markets, trading, and fund advising." };
      const res = await axios.post("http://localhost:5000/api/chat", payload, {
        headers: { "Content-Type": "application/json" },
      });
      const botMsg = {
        role: "bot",
        content: res.data.response || "No response received.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Could not reach the AI engine. Please ensure the backend is running on `localhost:5000`.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "transparent" }}>

      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-6 py-4 z-10"
        style={{
          background: "rgba(6,6,14,0.65)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.055)",
        }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 0 20px rgba(16,185,129,0.12)" }}
          >
            <TrendingUp size={22} style={{ color: "#10b981" }} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-[17px] font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.9)", letterSpacing: "-0.02em" }}>
              Stock <span style={{ color: "#10b981" }}>Intelligence</span>
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
              Market Analysis Core
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
          >
            <RefreshCw size={13} /> New Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Empty state */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center pt-16 pb-8"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-7"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.14)", boxShadow: "0 0 60px rgba(16,185,129,0.08)" }}
              >
                <TrendingUp size={36} style={{ color: "#10b981" }} strokeWidth={1.6} />
              </div>
              <h2
                className="text-[28px] font-bold mb-3"
                style={{ color: "rgba(255,255,255,0.85)", letterSpacing: "-0.03em" }}
              >
                Stock Market AI
              </h2>
              <p className="text-[14px] font-medium max-w-sm mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                Ask anything about equities, mutual funds, or trading strategies. Powered by a 70B parameter model.
              </p>
              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-3">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                  >
                    <Sparkles size={13} style={{ color: "#10b981" }} />
                    {s}
                    <ChevronRight size={13} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Message thread */}
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 mt-1"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
                  >
                    <TrendingUp size={15} style={{ color: "#10b981" }} />
                  </div>
                )}
                <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[82%]`}>
                  <div
                    className="px-5 py-4 rounded-2xl text-[14px] leading-relaxed font-medium"
                    style={
                      msg.role === "user"
                        ? { background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", color: "rgba(255,255,255,0.88)", borderBottomRightRadius: "6px" }
                        : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.82)", borderBottomLeftRadius: "6px" }
                    }
                  >
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <MdText>{msg.content}</MdText>
                    )}
                  </div>
                  <span className="text-[10px] mt-1.5 font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mr-3 flex-shrink-0 mt-1"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <TrendingUp size={15} style={{ color: "#10b981" }} />
              </div>
              <div
                className="px-5 py-4 rounded-2xl flex items-center gap-1.5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderBottomLeftRadius: "6px" }}
              >
                <span className="w-2 h-2 rounded-full animate-wave-1" style={{ background: "#10b981" }} />
                <span className="w-2 h-2 rounded-full animate-wave-2" style={{ background: "#10b981", opacity: 0.7 }} />
                <span className="w-2 h-2 rounded-full animate-wave-3" style={{ background: "#10b981", opacity: 0.5 }} />
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ background: "rgba(6,6,14,0.65)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div
            className="flex items-center gap-3 p-2 rounded-2xl transition-all"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            onFocus={() => {}}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about stocks, funds, trading strategies..."
              className="flex-1 px-4 bg-transparent focus:outline-none text-[14px] font-medium py-2.5"
              style={{ color: "rgba(255,255,255,0.85)", caretColor: "#10b981" }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
              style={{
                background: input.trim() && !isLoading ? "#10b981" : "rgba(255,255,255,0.05)",
                color: input.trim() && !isLoading ? "#04040a" : "rgba(255,255,255,0.2)",
              }}
            >
              <Send size={17} strokeWidth={2.5} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
