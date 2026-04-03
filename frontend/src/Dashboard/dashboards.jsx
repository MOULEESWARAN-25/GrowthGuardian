import React, { useState } from "react";
import {
  PieChart, Pie, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  IndianRupeeIcon, ShoppingCart, BarChart2, CheckCircle,
  TrendingUp, TrendingDown, Calendar, ArrowUpRight, Target,
} from "lucide-react";
import AnimatedCard from "../components/AnimatedCard";

const PIE_COLORS = ["var(--primary)", "#10b981", "#8b5cf6", "#f59e0b", "#3b82f6", "#6366f1"];

const formatCurrency = (v) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

const formatShort = (v) => {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}k`;
  return `₹${v}`;
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};



const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: "14px", padding: "12px 16px", backdropFilter: "blur(12px)" }}>
      <p style={{ color: "var(--muted-foreground)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: "13px", fontWeight: 700, marginBottom: 2 }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
};

const FinancialDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(0);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/karthik")
      .then(r => r.json())
      .then(d => {
        if (!d.error) setUserData(d);
      })
      .catch(console.error);
  }, []);

  if (!userData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-primary border-r-primary border-transparent animate-spin" />
          <p className="text-sm text-muted-foreground font-semibold">Loading real-time financial data...</p>
        </div>
      </div>
    );
  }

  const expenseData = userData.expenseDistribution;
  const monthlyData = userData.monthlyCashFlow;
  const remainingBudget = userData.budget - userData.expenses;
  const KPI_CARDS = [
    { title: "Total Income", value: userData.income, delta: "+5.4%", up: true, icon: IndianRupeeIcon },
    { title: "Total Expenses", value: userData.expenses, delta: "+2.1%", up: false, icon: ShoppingCart },
    { title: "Monthly Budget", value: userData.budget, delta: "Active", up: true, icon: BarChart2 },
    { title: "Remaining Budget", value: remainingBudget, delta: remainingBudget >= 0 ? "On Track" : "Over", up: remainingBudget > 0, icon: CheckCircle },
  ];
  const savingsProgress = Math.round((userData.savings.current / userData.savings.goal) * 100);


  return (
    <div className="w-full p-5 md:p-7 font-sans" style={{ background: "transparent" }}>
      <div className="max-w-[1320px] mx-auto space-y-6">

        {/* WELCOME HERO */}
        <div className="relative overflow-hidden rounded-2xl border px-7 py-8"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {/* Soft glow blobs — theme aware */}
          <div className="absolute -top-16 -right-16 w-72 h-72 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 left-10 w-48 h-48 pointer-events-none rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10b981" }} />
                All Systems Nominal
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1.5" style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}>
                {getGreeting()}, {userData.name}.
              </h1>
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                Here's your financial overview for <strong>April 2026</strong>.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] font-semibold"
                style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
                <Calendar size={13} /> April 2026
              </div>
              <button 
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
                  const dlAnchorElem = document.createElement('a');
                  dlAnchorElem.setAttribute("href",     dataStr     );
                  dlAnchorElem.setAttribute("download", "growthguardian_report.json");
                  dlAnchorElem.click();
                }}
                className="px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all hover:opacity-90 flex items-center gap-1.5"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                <ArrowUpRight size={14} /> Export Report
              </button>
            </div>
          </div>
        </div>

        {/* SAVINGS PROGRESS BAR */}
        <div className="rounded-2xl border px-7 py-5" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--muted-foreground)" }}>Annual Savings Goal</p>
              <p className="text-lg font-bold mt-0.5" style={{ color: "var(--foreground)" }}>{formatCurrency(userData.savings.current)} <span className="text-sm font-normal" style={{ color: "var(--muted-foreground)" }}>/ {formatCurrency(userData.savings.goal)}</span></p>
            </div>
            <span className="text-3xl font-bold" style={{ color: "var(--primary)" }}>{savingsProgress}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${savingsProgress}%`, background: "var(--primary)" }} />
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {KPI_CARDS.map((card, idx) => (
            <AnimatedCard key={idx} delay={0.08 * (idx + 1)} className="!p-6 !rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "color-mix(in oklch, var(--primary) 12%, var(--background))", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 20%, transparent)" }}>
                  <card.icon size={18} strokeWidth={2} />
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                  style={{
                    background: card.up ? "rgba(16,185,129,0.08)" : "color-mix(in oklch, var(--destructive) 10%, var(--background))",
                    color: card.up ? "#10b981" : "var(--destructive)",
                    border: `1px solid ${card.up ? "rgba(16,185,129,0.2)" : "color-mix(in oklch, var(--destructive) 25%, transparent)"}`,
                  }}>
                  {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {card.delta}
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: "var(--muted-foreground)" }}>{card.title}</p>
              <h3 className="text-[26px] font-bold tracking-tight leading-none" style={{ color: "var(--foreground)", letterSpacing: "-0.03em" }}>
                {formatCurrency(card.value)}
              </h3>
            </AnimatedCard>
          ))}
        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Area Chart */}
          <AnimatedCard delay={0.35} hover={false} className="lg:col-span-3 !p-6 !rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[16px] font-bold tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>Cash Flow</h2>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>Income vs expenses · 6 months</p>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-semibold" style={{ color: "var(--muted-foreground)" }}>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--primary)" }} />Income</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--destructive)" }} />Expenses</span>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 8, right: 4, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="var(--border)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} tickFormatter={formatShort} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="income" name="Income" stroke="var(--primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#gIncome)" dot={false} />
                  <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#gExpense)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>

          {/* Pie Chart */}
          <AnimatedCard delay={0.42} hover={false} className="lg:col-span-2 !p-6 !rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="text-[16px] font-bold mb-4 tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>Expense Split</h2>
            <div className="h-[170px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseData} cx="50%" cy="50%" innerRadius={52} outerRadius={72} paddingAngle={3} dataKey="value" stroke="none" cornerRadius={5}>
                    {expenseData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip 
                    formatter={(v) => formatCurrency(v)} 
                    contentStyle={{ borderRadius: "12px", border: "1px solid var(--border)", background: "var(--popover)", color: "var(--popover-foreground)", fontSize: 13, fontWeight: 700 }} 
                    itemStyle={{ color: "var(--foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--muted-foreground)" }}>Total</p>
                  <p className="text-[14px] font-bold" style={{ color: "var(--foreground)" }}>{formatShort(userData.expenses)}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {expenseData.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                    <span className="text-[12px]" style={{ color: "var(--muted-foreground)" }}>{item.name}</span>
                  </div>
                  <span className="text-[12px] font-bold" style={{ color: "var(--foreground)" }}>{formatShort(item.value)}</span>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Family Status */}
          <AnimatedCard delay={0.5} hover={false} className="!p-6 !rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>Family Overview</h2>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ background: "color-mix(in oklch, var(--primary) 10%, var(--background))", color: "var(--primary)", border: "1px solid color-mix(in oklch, var(--primary) 20%, transparent)" }}>
                Pro Plan
              </span>
            </div>
            <div className="space-y-3">
              {userData.familyMembers.map((member, i) => {
                const pct = Math.round((member.savings / member.savingsGoal) * 100);
                const colors = ["var(--primary)", "#10b981", "#f59e0b"];
                return (
                  <div key={i} className="p-4 rounded-xl" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px]"
                          style={{ background: `color-mix(in oklch, ${colors[i]} 15%, var(--background))`, color: colors[i] }}>
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>{member.name}</p>
                          <p className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>Goal: {formatCurrency(member.savingsGoal)}</p>
                        </div>
                      </div>
                      <span className="text-[17px] font-bold" style={{ color: colors[i] }}>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: colors[i], transition: "width 0.7s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedCard>

          {/* Education Path */}
          <AnimatedCard delay={0.58} hover={false} className="!p-6 !rounded-2xl"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[16px] font-bold tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>Learning Path</h2>
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                {userData.familyModuleProgress.map((f, i) => (
                  <button key={i} onClick={() => setSelectedFamilyMember(i)}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
                    style={{
                      background: selectedFamilyMember === i ? "var(--primary)" : "transparent",
                      color: selectedFamilyMember === i ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}>
                    {f.member.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {userData.familyModuleProgress[selectedFamilyMember].modules.map((mod, i) => {
                const done = mod.progress === 100;
                const active = mod.progress > 0 && mod.progress < 100;
                const statusColor = done ? "#10b981" : active ? "var(--primary)" : "var(--muted-foreground)";
                return (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
                    style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "color-mix(in oklch, var(--primary) 30%, transparent)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `color-mix(in oklch, ${statusColor} 12%, var(--background))`, color: statusColor }}>
                        <Target size={14} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold" style={{ color: "var(--foreground)" }}>{mod.name}</p>
                        <p className="text-[11px]" style={{ color: statusColor }}>
                          {done ? "Completed ✓" : active ? `${mod.progress}% progress` : "Not started"}
                        </p>
                      </div>
                    </div>
                    {active && (
                      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                        <div className="h-full rounded-full" style={{ width: `${mod.progress}%`, background: "var(--primary)" }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedCard>
        </div>

      </div>
    </div>
  );
};

export default FinancialDashboard;