import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import Investment from "./CalculationTools/InvestmentVsDebtRepayment";
import BudgetPlanner from "./CalculationTools/BudgetPlanner";
import Scamprevent from "./ScamPreventionBot/scamprevention";
import Scamarticle from "./ScamPreventionBot/scampreventionarticle";
import Retirement from "./CalculationTools/RetirementPlanner";
import Stock from "./StocksAnalysis/stockanalysis";
import StockingBot from "./StockBot/stockbot";
import Learning from "./LearningModules/LearningModulesNew";
import Stockchart from "./StocksAnalysis/stockchart";
import AssetReturnForecast from "./AssetForecast/AssetReturnForecast";
import FloatingChatbot from "./FloatingChatbot/Floating";
import Landing from "./LandingPage/LandingPage";
import Login from "./LoginPage/LoginPage";
import DashBoard from "./Dashboard/dashboards";
import {
  Home,
  Calculator,
  DollarSign,
  Shield,
  BarChart2,
  Bot,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  PiggyBank,
  Wallet,
  Target,
  Settings,
  FileText,
  Landmark,
  Briefcase,
  ChevronRight,
  LogOut,
  ChartArea,
  Book,
} from "lucide-react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main layout with sidebar for all routes */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen">
              {/* Sidebar */}
              <aside
                className={`${
                  sidebarOpen ? "w-64" : "w-20"
                } fixed h-full z-20 transition-all duration-300 ease-in-out bg-blue-900 shadow-lg`}
              >
                <SidebarContent
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              </aside>

              {/* Overlay for mobile */}
              {isMobile && sidebarOpen && (
                <div
                  className="fixed inset-0 bg-black/30 z-10 lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}

              {/* Main Content Area */}
              <main
                className={`flex-1 transition-all duration-300 ${
                  sidebarOpen ? "ml-64" : "ml-20"
                }`}
              >
                <Routes>
                  <Route index element={<DashBoard />} />
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/budgetplanner" element={<BudgetPlanner />} />
                  <Route path="/learning-modules" element={<Learning />} />
                  <Route path="/invvsdebt" element={<Investment />} />
                  <Route path="/retirementplanner" element={<Retirement />} />
                  <Route path="/scamprevention" element={<Scamprevent />} />
                  <Route path="/scamarticle" element={<Scamarticle />} />
                  <Route path="/stockingbots" element={<StockingBot />} />
                  <Route path="/stocks" element={<Stock />} />
                  <Route path="/stockschart" element={<Stockchart />} />
                  <Route path="/forecast" element={<AssetReturnForecast />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <FloatingChatbot />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

const SidebarContent = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="flex flex-col h-full text-white">
      <div
        className={`flex items-center h-16 ${
          sidebarOpen ? "px-6 justify-between" : "justify-center"
        }`}
      >
        {sidebarOpen ? (
          <>
            <div className="flex items-center">
              <h1 className="ml-3 text-lg font-semibold text-white">
                GrowthGuardian
              </h1>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 rounded-md hover:bg-blue-800 text-white"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md hover:bg-blue-800 text-white"
          >
            <Menu size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
        <NavMenu sidebarOpen={sidebarOpen} />
      </div>

      {sidebarOpen && (
        <div className="p-3 mt-2 border-t border-blue-700">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white text-blue-900 flex items-center justify-center">
              <span className="font-medium">AJ</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Alex Johnson</p>
            </div>
            <button className="ml-auto p-1.5 rounded-md hover:bg-blue-800 text-white">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const NavMenu = ({ sidebarOpen }) => {
  return (
    <div className="space-y-8">
      <NavSection
        title="Main"
        sidebarOpen={sidebarOpen}
        items={[
          {
            to: "/",
            icon: <Home size={18} />,
            label: "Dashboard",
          },
          {
            to: "/learning-modules",
            icon: <Book size={18} />,
            label: "Learning Modules",
          },
        ]}
      />
      <NavSection
        title="Investments"
        sidebarOpen={sidebarOpen}
        items={[
          {
            to: "/stocks",
            icon: <BarChart2 size={18} />,
            label: "Investment Simulator",
          },
          {
            to: "/forecast",
            icon: <ChartArea size={18} />,
            label: "Asset Return Forecast",
          },
        ]}
      />
      <NavSection
        title="Finance Tools"
        sidebarOpen={sidebarOpen}
        items={[
          {
            to: "/budgetplanner",
            icon: <Wallet size={18} />,
            label: "Budget Planner",
          },
          {
            to: "/invvsdebt",
            icon: <DollarSign size={18} />,
            label: "Invest vs Debt",
          },
          {
            to: "/retirementplanner",
            icon: <Target size={18} />,
            label: "Retirement Planning",
          },
        ]}
      />
      <NavSection
        title="Security"
        sidebarOpen={sidebarOpen}
        items={[
          {
            to: "/scamprevention",
            icon: <Shield size={18} />,
            label: "Scam Prevention Bot",
          },
          {
            to: "/scamarticle",
            icon: <FileText size={18} />,
            label: "Prevention Guide",
          },
        ]}
      />
    </div>
  );
};

const NavSection = ({ title, items, sidebarOpen }) => {
  return (
    <div>
      {sidebarOpen && (
        <h3 className="text-xs font-medium uppercase text-blue-200 mb-3 px-3">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item, index) => (
          <NavItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </ul>
    </div>
  );
};

const NavItem = ({ to, icon, label, sidebarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <Link
        to={to}
        className={`group flex items-center ${
          sidebarOpen ? "px-3" : "justify-center"
        } py-2 rounded-md transition-all ${
          isActive
            ? "bg-white/20 text-white font-medium"
            : "text-blue-100 hover:bg-blue-800 hover:text-white"
        }`}
      >
        <div
          className={`flex items-center justify-center ${
            isActive ? "text-white" : "text-blue-100 group-hover:text-white"
          }`}
        >
          {icon}
        </div>

        {sidebarOpen && <span className="ml-3 text-sm">{label}</span>}

        {!sidebarOpen && (
          <div className="absolute left-16 ml-1 p-2 min-w-max rounded-md shadow-md bg-gray-800 text-xs font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
            {label}
          </div>
        )}
      </Link>
    </li>
  );
};

// Add global CSS for hiding scrollbars
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
  }
`;
document.head.appendChild(style);

export default App;