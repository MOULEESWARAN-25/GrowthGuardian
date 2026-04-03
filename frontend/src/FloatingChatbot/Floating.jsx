import React, { useState, useRef, useEffect } from "react";
import { X, Send, Mic, Sparkles, ChevronRight, Target, RefreshCw } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const QUICK_CHIPS = [
  "Check my budget health",
  "Best investment for ₹10k/month",
  "Explain SIP vs lumpsum",
];

// Lightweight markdown renderer — no external dependency
const MdText = ({ children }) => {
  const lines = (children || "").split("\n");
  return (
    <div className="space-y-1 text-[13px] leading-relaxed">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1.5" />;
        const h = line.match(/^(#{1,3})\s+(.+)/);
        if (h) return <p key={i} className="font-bold mt-2" dangerouslySetInnerHTML={{ __html: fmt(h[2]) }} />;
        const b = line.match(/^[-*]\s+(.+)/);
        if (b) return <p key={i} className="flex gap-2"><span className="opacity-50 mt-0.5">•</span><span dangerouslySetInnerHTML={{ __html: fmt(b[1]) }} /></p>;
        return <p key={i} dangerouslySetInnerHTML={{ __html: fmt(line) }} />;
      })}
    </div>
  );
};
const fmt = (t) =>
  t.replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.12);font-family:monospace;padding:1px 5px;border-radius:3px;font-size:11px">$1</code>')
   .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
   .replace(/\*([^*]+)\*/g, "<em>$1</em>");

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! I'm **Guardian AI** — your personal finance assistant. Ask me anything about budgeting, investing, or savings.", sender: "bot" },
  ]);
  const recognitionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && !isLoading) inputRef.current?.focus();
  }, [isOpen, isLoading]);

  const initRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = false;
    r.onresult = (e) => { const t = e.results[0][0].transcript; if (t) handleSendDirect(t); };
    r.onend = () => setIsListening(false);
    return r;
  };

  const startListening = () => {
    if (!recognitionRef.current) recognitionRef.current = initRecognition();
    if (recognitionRef.current) { setIsListening(true); recognitionRef.current.start(); }
  };

  const fetchBotResponse = async (prompt) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data;
    } catch {
      return { response: "⚠️ Could not reach the backend. Please ensure the server is running on `localhost:5000`." };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendDirect = async (text) => {
    setMessages((p) => [...p, { text, sender: "user" }]);
    setMessage("");
    const d = await fetchBotResponse(text);
    setMessages((p) => [...p, { text: d.response || "No response.", sender: "bot" }]);
  };

  const handleSend = () => { if (message.trim() && !isLoading) handleSendDirect(message.trim()); };

  return (
    <div className="fixed bottom-7 right-7 z-50 font-sans">

      {/* FAB trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 65%, black))",
              boxShadow: "0 8px 32px color-mix(in oklch, var(--primary) 40%, transparent), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            <span className="absolute inset-0 rounded-2xl animate-pulse" style={{ background: "color-mix(in oklch, var(--primary) 25%, transparent)" }} />
            <Sparkles size={22} className="text-white relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.95 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="absolute right-0 flex flex-col overflow-hidden"
            style={{
              bottom: "calc(100% + 20px)",
              width: "390px",
              height: "590px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "24px",
              boxShadow: "0 32px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--primary)", boxShadow: "0 4px 14px color-mix(in oklch, var(--primary) 30%, transparent)" }}>
                  <Target size={17} className="text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold tracking-tight" style={{ color: "var(--foreground)" }}>Guardian AI</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-1.5" style={{ color: "#10b981" }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setMessages([{ text: "Hello! I'm **Guardian AI** — your personal finance assistant.", sender: "bot" }])}
                  className="p-2 rounded-xl transition-all" title="Clear chat"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  <RefreshCw size={14} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl transition-all"
                  style={{ color: "var(--muted-foreground)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
              {/* Quick chips */}
              {messages.length === 1 && (
                <div className="space-y-2 pb-1">
                  {QUICK_CHIPS.map((c, i) => (
                    <button key={i} onClick={() => handleSendDirect(c)}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[12.5px] font-medium text-left transition-all"
                      style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--foreground)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "var(--muted)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}>
                      {c} <ChevronRight size={13} />
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: msg.sender === "user" ? 8 : -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className="max-w-[90%] px-4 py-3 rounded-2xl"
                    style={msg.sender === "user"
                      ? { background: "var(--primary)", color: "var(--primary-foreground)", borderBottomRightRadius: "5px" }
                      : { background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)", borderBottomLeftRadius: "5px" }}>
                    {msg.sender === "bot" ? <MdText>{msg.text}</MdText> : <p className="text-[13px]">{msg.text}</p>}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex items-start">
                  <div className="px-4 py-3.5 rounded-2xl flex items-center gap-1.5"
                    style={{ background: "var(--muted)", border: "1px solid var(--border)", borderBottomLeftRadius: "5px" }}>
                    {[1, 2, 3].map(n => (
                      <span key={n} className={`w-2 h-2 rounded-full animate-wave-${n}`}
                        style={{ background: "var(--primary)", opacity: n === 1 ? 1 : n === 2 ? 0.7 : 0.4 }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-4" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="flex items-center gap-2 rounded-[16px] p-1.5 transition-all"
                style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask AI anything..."
                  className="flex-1 py-2.5 px-3 bg-transparent text-[13.5px] font-medium focus:outline-none"
                  style={{ color: "var(--foreground)", caretColor: "var(--primary)" }}
                  disabled={isLoading}
                />
                <button type="button" onClick={startListening} disabled={isLoading}
                  className="p-2 rounded-xl transition-all"
                  style={{ color: isListening ? "#ef4444" : "var(--muted-foreground)", background: isListening ? "rgba(239,68,68,0.08)" : "transparent" }}>
                  <Mic size={15} />
                </button>
                <button type="button" onClick={handleSend} disabled={!message.trim() || isLoading}
                  className="h-9 w-9 rounded-[12px] flex items-center justify-center transition-all flex-shrink-0"
                  style={{
                    background: message.trim() && !isLoading ? "var(--primary)" : "var(--background)",
                    color: message.trim() && !isLoading ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  }}>
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChatbot;
