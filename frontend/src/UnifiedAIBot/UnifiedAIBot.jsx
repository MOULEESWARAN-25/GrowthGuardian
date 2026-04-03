import React, { useState, useRef, useEffect } from "react";
import { Send, ShieldAlert, TrendingUp, RefreshCw, StopCircle, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded text-[12px]" style="background:var(--accent);font-family:monospace;color:var(--primary)">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

const STOCK_SUGGESTIONS = ["Analyze Reliance Industries stock trend", "Best SIP mutual funds for 2026", "Explain why Nifty 50 dropped"];
const SCAM_SUGGESTIONS = ["Analyze this crypto DM I received", "Is this lottery email a scam?", "Someone asked for my OTP over phone"];

const getRiskBadge = (text) => {
  const t = text.toLowerCase();
  if (t.includes("risk level: high") || t.includes("high risk")) return { label: "HIGH RISK", color: "#fff", bg: "var(--destructive)", border: "transparent" };
  if (t.includes("risk level: medium") || t.includes("medium risk")) return { label: "MEDIUM RISK", color: "#fff", bg: "#f59e0b", border: "transparent" };
  if (t.includes("risk level: low") || t.includes("low risk")) return { label: "LOW RISK", color: "#fff", bg: "#10b981", border: "transparent" };
  return null;
};

export default function UnifiedAIBot() {
  const [mode, setMode] = useState("stock"); // "stock" | "scam"
  const [messages, setMessages] = useState({ stock: [], scam: [] });
  const [inputs, setInputs] = useState({ stock: "", scam: "" });
  const [isLoading, setIsLoading] = useState(false);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const currentMessages = messages[mode];
  const currentInput = inputs[mode];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, isLoading, mode]);

  const setInput = (val) => setInputs(prev => ({ ...prev, [mode]: val }));

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;
    const userMsg = { role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    
    setMessages(prev => ({ ...prev, [mode]: [...prev[mode], userMsg] }));
    setInput("");
    setIsLoading(true);

    try {
      let endpoint = "http://localhost:5000/api/chat";
      let payload = { prompt: text };
      
      if (mode === "stock") {
        payload.prompt = text + " Focus heavily on stock markets, trading, and fund advising.";
      } else {
        endpoint = "http://localhost:5000/api/scam-detect";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network Error");
      const data = await res.json();
      
      const botMsg = {
        role: "bot",
        content: data.response || "No response received.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      
      setMessages(prev => ({ ...prev, [mode]: [...prev[mode], botMsg] }));
    } catch {
      setMessages(prev => ({
        ...prev, 
        [mode]: [...prev[mode], { 
          role: "bot", 
          content: "⚠️ Could not reach the AI engine. Ensure the backend is running on `localhost:5000`.", 
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
        }]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentInput);
  };

  return (
    <div className="flex flex-col h-full bg-transparent">
      
      {/* Premium Header with Mode Toggle */}
      <div 
        className="flex-shrink-0 flex items-center justify-between px-8 py-5 z-10 sticky top-0"
        style={{ 
          background: "color-mix(in oklch, var(--background) 80%, transparent)", 
          backdropFilter: "blur(24px)", 
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex bg-muted p-1 rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
            <button
              onClick={() => setMode("stock")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === "stock" ? "shadow-md" : "opacity-60 hover:opacity-100"}`}
              style={{
                background: mode === "stock" ? "var(--background)" : "transparent",
                color: mode === "stock" ? "var(--primary)" : "var(--foreground)",
              }}
            >
              <TrendingUp size={16} /> Stock Market AI
            </button>
            <button
              onClick={() => setMode("scam")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === "scam" ? "shadow-md" : "opacity-60 hover:opacity-100"}`}
              style={{
                background: mode === "scam" ? "var(--background)" : "transparent",
                color: mode === "scam" ? "var(--destructive)" : "var(--foreground)",
              }}
            >
              <ShieldAlert size={16} /> Scam Prevention AI
            </button>
          </div>
        </div>

        {currentMessages.length > 0 && (
          <button
            onClick={() => setMessages(prev => ({ ...prev, [mode]: [] }))}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all hover:bg-[var(--accent)]"
            style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
          >
            <RefreshCw size={13} /> Clear Chat
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Empty State */}
          <AnimatePresence mode="wait">
            {currentMessages.length === 0 && (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center pt-24 pb-8"
              >
                <div 
                  className="w-24 h-24 rounded-[32px] flex items-center justify-center mb-8 shadow-2xl"
                  style={{ 
                    background: mode === "stock" ? "color-mix(in oklch, var(--primary) 10%, transparent)" : "color-mix(in oklch, var(--destructive) 10%, transparent)",
                    border: `1px solid ${mode === "stock" ? "color-mix(in oklch, var(--primary) 20%, transparent)" : "color-mix(in oklch, var(--destructive) 20%, transparent)"}`
                  }}
                >
                  {mode === "stock" 
                    ? <TrendingUp size={44} style={{ color: "var(--primary)" }} strokeWidth={1.5} /> 
                    : <ShieldCheck size={44} style={{ color: "var(--destructive)" }} strokeWidth={1.5} />
                  }
                </div>
                
                <h2 className="text-4xl font-bold mb-4 tracking-tight" style={{ color: "var(--foreground)"}}>
                  {mode === "stock" ? "Market Intelligence" : "Security Scanner"}
                </h2>
                
                <p className="text-lg mb-12 max-w-lg leading-relaxed" style={{ color: "var(--muted-foreground)"}}>
                  {mode === "stock" 
                    ? "Advanced quantitative analysis, stock trends, and fund advising powered by a state-of-the-art AI model." 
                    : "Instantly analyze suspicious messages, emails, or links to assess fraud risk via our deep detection matrix."
                  }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {(mode === "stock" ? STOCK_SUGGESTIONS : SCAM_SUGGESTIONS).map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(s)}
                      className="flex flex-col items-start gap-3 p-5 rounded-2xl text-left transition-all border shadow-sm group"
                      style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--foreground)" }}
                    >
                      <div className="p-2 rounded-lg" style={{ background: "var(--accent)" }}>
                        {mode === "stock" ? <Sparkles size={16} className="text-primary" /> : <AlertTriangle size={16} className="text-destructive" />}
                      </div>
                      <span className="text-sm font-semibold group-hover:text-primary transition-colors">{s}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Thread */}
          <div className="space-y-8">
            <AnimatePresence initial={false}>
              {currentMessages.map((msg, i) => {
                const risk = mode === "scam" && msg.role === "bot" ? getRiskBadge(msg.content) : null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "bot" && (
                      <div 
                        className="w-10 h-10 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 mt-1 shadow-sm border"
                        style={{ background: "var(--card)", borderColor: "var(--border)" }}
                      >
                        {mode === "stock" 
                          ? <TrendingUp size={18} style={{ color: "var(--primary)" }} /> 
                          : <ShieldAlert size={18} style={{ color: "var(--destructive)" }} />
                        }
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                      {risk && (
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-3 shadow-md"
                          style={{ background: risk.bg, color: risk.color }}
                        >
                          <AlertTriangle size={12} /> {risk.label}
                        </div>
                      )}
                      
                      <div
                        className="px-6 py-5 rounded-[24px] text-[15px] leading-relaxed shadow-sm transition-all"
                        style={
                          msg.role === "user"
                            ? { background: "var(--primary)", color: "var(--primary-foreground)", borderBottomRightRadius: "8px" }
                            : { background: "var(--card)", border: "1px solid var(--border)", color: "var(--foreground)", borderBottomLeftRadius: "8px" }
                        }
                      >
                        {msg.role === "user" ? (
                          <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                        ) : (
                          <div className="font-medium opacity-90"><MdText>{msg.content}</MdText></div>
                        )}
                      </div>
                      <span className="text-[11px] mt-2 font-semibold px-2" style={{ color: "var(--muted-foreground)" }}>{msg.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 shadow-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  {mode === "stock" ? <TrendingUp size={18} style={{ color: "var(--primary)" }} /> : <ShieldAlert size={18} style={{ color: "var(--destructive)" }} />}
                </div>
                <div className="px-6 py-5 rounded-[24px] rounded-bl-lg flex items-center gap-2 border shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  <span className="w-2.5 h-2.5 rounded-full animate-wave-1" style={{ background: mode === "stock" ? "var(--primary)" : "var(--destructive)" }} />
                  <span className="w-2.5 h-2.5 rounded-full animate-wave-2 opacity-70" style={{ background: mode === "stock" ? "var(--primary)" : "var(--destructive)" }} />
                  <span className="w-2.5 h-2.5 rounded-full animate-wave-3 opacity-40" style={{ background: mode === "stock" ? "var(--primary)" : "var(--destructive)" }} />
                </div>
              </motion.div>
            )}
            
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div 
        className="flex-shrink-0 px-8 py-6 z-10 sticky bottom-0"
        style={{ 
          background: "linear-gradient(to top, var(--background) 70%, transparent)",
        }}
      >
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div 
            className="flex items-center gap-3 p-2.5 rounded-[24px] transition-all shadow-lg border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "stock" ? "Ask anything about stocks, funds, or analysis..." : "Paste suspicious messages or emails..."}
              className="flex-1 px-5 bg-transparent focus:outline-none text-[15px] font-medium py-3 placeholder:opacity-50"
              style={{ color: "var(--foreground)" }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!currentInput.trim() || isLoading}
              className="w-14 h-14 rounded-[20px] flex items-center justify-center flex-shrink-0 transition-all duration-300"
              style={{
                background: currentInput.trim() && !isLoading ? "var(--primary)" : "var(--muted)",
                color: currentInput.trim() && !isLoading ? "var(--primary-foreground)" : "var(--muted-foreground)",
                transform: currentInput.trim() && !isLoading ? "scale(1.02)" : "scale(1)",
              }}
            >
              {isLoading ? <StopCircle size={20} className="animate-pulse" /> : <Send size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
