/* eslint-disable */
import React, { useState, useEffect } from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,  
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import Investment from "./CalculationTools/InvestmentVsDebtRepayment";
import BudgetPlanner from "./CalculationTools/BudgetPlanner";
import Retirement from "./CalculationTools/RetirementPlanner";
import Stock from "./StocksAnalysis/stockanalysis";
import Stockchart from "./StocksAnalysis/stockchart";
import AssetReturnForecast from "./AssetForecast/AssetReturnForecast";
import FloatingChatbot from "./FloatingChatbot/Floating";
import UnifiedAIBot from "./UnifiedAIBot/UnifiedAIBot";
import Landing from "./LandingPage/LandingPage";
import Login from "./LoginPage/LoginPage";
import DashBoard from "./Dashboard/dashboards";
import Learning from "./LearningModules/LearningModulesNew";
import {
  Home,
  DollarSign,
  Shield,
  BarChart2,
  Menu,
  Target,
  FileText,
  ChevronRight,
  LogOut,
  ChartArea,
  Book,
  Wallet,
  Bell,
  X,
  Sparkles,
  TrendingUp,
  Sun,
  Moon,
  User,
  CreditCard,
  Settings,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(3);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => setIsDark(d => !d);

  return (
    <Router>
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.11 0.015 260)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "oklch(0.92 0.01 255)",
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
          },
        }}
      />
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*"
          element={
            <div className="flex h-screen w-full overflow-hidden" style={{ background: "var(--background)" }}>

              {/* Mobile overlay */}
              {!sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/50 z-10 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Sidebar */}
              <aside
                className={`${
                  sidebarOpen ? "w-[260px]" : "w-[72px]"
                } relative h-full flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col z-20`}
                style={{
                  background: "var(--sidebar)",
                  borderRight: "1px solid var(--sidebar-border)",
                }}
              >
                <SidebarContent
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden relative">

                {/* Sticky Header Bar */}
                <StickyPageHeader
                  isDark={isDark}
                  toggleTheme={toggleTheme}
                  notifications={notifications}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                {/* Scrollable Route Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                  <div className="px-6 pt-6 pb-8">
                    <Routes>
                      <Route index element={<DashBoard />} />
                      <Route path="/" element={<DashBoard />} />
                      <Route path="/budgetplanner" element={<BudgetPlanner />} />
                      <Route path="/learning-modules" element={<Learning />} />
                      <Route path="/invvsdebt" element={<Investment />} />
                      <Route path="/retirementplanner" element={<Retirement />} />
                      <Route path="/ai-hub" element={<UnifiedAIBot />} />
                      <Route path="/stocks" element={<Stock />} />
                      <Route path="/stockschart" element={<Stockchart />} />
                      <Route path="/forecast" element={<AssetReturnForecast />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                </div>

                <FloatingChatbot />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

/* Page content section header — gives every page a visual anchor below the top bar */
const PAGE_META = {
  "/": null, // Dashboard has its own hero
  "/budgetplanner": { section: "Tools", title: "Budget Planner", subtitle: "Track income, expenses and remaining budget in real time" },
  "/learning-modules": { section: "Overview", title: "Learning Modules", subtitle: "Build financial literacy through interactive lessons and quizzes" },
  "/invvsdebt": { section: "Tools", title: "Invest vs Debt", subtitle: "Compare returns on investments against loan repayment strategies" },
  "/retirementplanner": { section: "Tools", title: "Retirement Planner", subtitle: "Project your retirement corpus with inflation-adjusted estimates" },
  "/ai-hub": { section: "AI Intelligence", title: "Unified AI Hub", subtitle: "Your centralized intelligence for stock analysis and scam protection" },
  "/stocks": { section: "Investments", title: "Investment Simulator", subtitle: "Simulate stock and mutual fund orders with live market data" },
  "/stockschart": { section: "Investments", title: "Stock Charts", subtitle: "Visualize price history and technical indicators" },
  "/forecast": { section: "Investments", title: "Asset Return Forecast", subtitle: "Predict asset performance with inflation-adjusted projections" },
};

/* Unified Sticky Header: page title + nav controls in one bar */
const StickyPageHeader = ({ isDark, toggleTheme, notifications , handleLogout = () => { window.location.href = "/landing"; }, sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const meta = PAGE_META[location.pathname];

  return (
    <div
      className="flex-shrink-0 flex items-center justify-between px-6 py-4"
      style={{
        background: "var(--background)",
        borderBottom: "1px solid var(--border)",
        minHeight: meta ? "auto" : "64px",
      }}
    >
      {/* Left: Page Title */}
      <div className="min-w-0 flex-1 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl transition-all focus:outline-none flex-shrink-0"
          style={{ 
            color: "var(--foreground)", 
            background: "color-mix(in oklch, var(--foreground) 5%, transparent)" 
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "color-mix(in oklch, var(--foreground) 10%, transparent)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "color-mix(in oklch, var(--foreground) 5%, transparent)"; }}
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <div className="min-w-0">
          {meta ? (
            <>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: "var(--primary)" }}>
                {meta.section}
              </p>
              <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                {meta.title}
              </h1>
              <p className="text-xs mt-0.5 hidden sm:block" style={{ color: "var(--muted-foreground)" }}>
                {meta.subtitle}
              </p>
            </>
          ) : (
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
              Dashboard
            </h1>
          )}
        </div>
      </div>

      {/* Right: Nav Controls */}
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all focus:outline-none"
          style={{ color: "var(--muted-foreground)" }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.background = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.background = "transparent"; }}
        >
          {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </button>

        <div className="w-px h-4" style={{ background: "var(--border)" }} />

        <button
          className="relative p-2 rounded-full transition-all focus:outline-none"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)"; e.currentTarget.style.background = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.background = "transparent"; }}
        >
          <Bell size={16} strokeWidth={2} />
          {notifications > 0 && (
            <span
              className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {notifications}
            </span>
          )}
        </button>

        <div className="w-px h-4" style={{ background: "var(--border)" }} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-none rounded-full cursor-pointer">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px]"
                style={{
                  background: "linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 70%, black))",
                  color: "var(--primary-foreground)",
                  boxShadow: "0 0 0 1.5px var(--border)",
                }}
              >
                AJ
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" sideOffset={10}>
            <DropdownMenuItem>
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard size={16} className="mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings size={16} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => { window.location.href = "/landing"; }}>
              <LogOut size={16} className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

/* Compact title shown in the sticky header bar */
const PageTitle = () => {
  const location = useLocation();
  const meta = PAGE_META[location.pathname];
  const title = meta?.title || "Dashboard";
  return (
    <h2 className="text-[12px] font-semibold hidden sm:block tracking-[0.12em] uppercase"
      style={{ color: "var(--muted-foreground)" }}>
      {title}
    </h2>
  );
};

const SidebarContent = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex flex-col h-full">

      {/* Logo Row */}
      <div
        className={`flex items-center h-[64px] flex-shrink-0 ${sidebarOpen ? "px-5 justify-between" : "justify-center"}`}
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        {sidebarOpen ? (
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, oklch(0.65 0.18 265), oklch(0.48 0.18 265))",
                boxShadow: "0 4px 20px oklch(0.65 0.18 265 / 0.35)",
              }}
            >
              <Target size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-[17px] font-bold tracking-tight whitespace-nowrap" style={{ color: "var(--sidebar-foreground)" }}>
              Growth<span style={{ color: "var(--sidebar-primary)" }}>Guardian</span>
            </h1>
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, oklch(0.65 0.18 265), oklch(0.48 0.18 265))",
              boxShadow: "0 4px 20px oklch(0.65 0.18 265 / 0.3)",
            }}
          >
            <Target size={15} className="text-white" strokeWidth={2.5} />
          </div>
        )}

        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg transition-all lg:hidden"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-5 px-3 no-scrollbar">
        <NavMenu sidebarOpen={sidebarOpen} />
      </div>

      {/* User Footer */}
      <div
        className="flex-shrink-0 p-3"
        style={{ borderTop: "1px solid var(--sidebar-border)" }}
      >
        {sidebarOpen ? (
          <div
            className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all group"
            onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div
              className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, var(--sidebar-primary), color-mix(in oklch, var(--sidebar-primary) 70%, black))",
                color: "var(--sidebar-primary-foreground)",
                boxShadow: "0 0 0 2px var(--sidebar-border)",
              }}
            >
              AJ
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate" style={{ color: "var(--sidebar-foreground)" }}>Alex Johnson</p>
              <p className="text-[11px] truncate" style={{ color: "var(--muted-foreground)" }}>Premium Member</p>
            </div>
            <button
              className="p-1.5 rounded-lg transition-all flex-shrink-0"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "rgb(248,113,113)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="p-2.5 rounded-full transition-all relative group"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; e.currentTarget.style.color = "rgb(248,113,113)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NAV_SECTIONS = [
  {
    title: "Overview",
    items: [
      { to: "/", icon: Home, label: "Dashboard" },
      { to: "/learning-modules", icon: Book, label: "Learning Modules" },
    ],
  },
  {
    title: "Investments",
    items: [
      { to: "/stocks", icon: BarChart2, label: "Investment Simulator" },
      { to: "/forecast", icon: ChartArea, label: "Asset Forecast" },
    ],
  },
  {
    title: "Tools",
    items: [
      { to: "/budgetplanner", icon: Wallet, label: "Budget Planner" },
      { to: "/invvsdebt", icon: DollarSign, label: "Invest vs Debt" },
      { to: "/retirementplanner", icon: Target, label: "Retirement" },
    ],
  },
  {
    title: "AI Intelligence",
    items: [
      { to: "/ai-hub", icon: Shield, label: "Unified AI Hub" },
    ],
  },
];

const NavMenu = ({ sidebarOpen }) => (
  <div className="space-y-1">
    {NAV_SECTIONS.map((section) => (
      <NavSection key={section.title} {...section} sidebarOpen={sidebarOpen} />
    ))}
  </div>
);

const NavSection = ({ title, items, sidebarOpen }) => (
  <div className="mb-5">
    {sidebarOpen && (
      <p
        className="text-[9px] font-bold uppercase tracking-[0.22em] px-3 mb-2"
        style={{ color: "var(--muted-foreground)" }}
      >
        {title}
      </p>
    )}
    {!sidebarOpen && <div className="my-3 mx-3 h-px" style={{ background: "var(--border)" }} />}
    <ul className="space-y-0.5">
      {items.map((item) => (
        <NavItem key={item.to} {...item} sidebarOpen={sidebarOpen} />
      ))}
    </ul>
  </div>
);

const NavItem = ({ to, icon: NavIcon, label, sidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        title={!sidebarOpen ? label : undefined}
        className="group relative flex items-center rounded-xl transition-all duration-200 overflow-hidden"
        style={{
          height: "40px",
          padding: sidebarOpen ? "0 12px" : "0",
          justifyContent: sidebarOpen ? "flex-start" : "center",
          background: isActive ? "color-mix(in oklch, var(--primary) 12%, var(--background))" : "transparent",
          color: isActive ? "var(--primary)" : "var(--muted-foreground)",
        }}
        onMouseEnter={e => {
          if (!isActive) {
            e.currentTarget.style.background = "var(--accent)";
            e.currentTarget.style.color = "var(--foreground)";
          }
        }}
        onMouseLeave={e => {
          if (!isActive) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--muted-foreground)";
          }
        }}
      >
        {/* Active indicator bar */}
        {isActive && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
            style={{
              height: "60%",
              background: "var(--primary)",
              boxShadow: "0 0 8px color-mix(in oklch, var(--primary) 70%, transparent)",
            }}
          />
        )}

        <span className="flex items-center justify-center w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
          <NavIcon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
        </span>

        {sidebarOpen && (
          <span
            className="ml-3 text-[13.5px] font-medium whitespace-nowrap transition-all"
            style={{ fontWeight: isActive ? 600 : 500 }}
          >
            {label}
          </span>
        )}

        {/* Tooltip for collapsed state */}
        {!sidebarOpen && (
          <div
            className="absolute left-[calc(100%+8px)] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
            style={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              color: "var(--popover-foreground)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            {label}
          </div>
        )}
      </Link>
    </li>
  );
};

export default App;