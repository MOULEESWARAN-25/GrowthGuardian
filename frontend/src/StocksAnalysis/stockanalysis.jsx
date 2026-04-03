import React, { useState, useEffect } from "react";
import { X, TrendingUp, TrendingDown, ArrowUpRight, BarChart3, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StockTradingInterface = ({ handleChartsStock }) => {
  const navigate = useNavigate();
  

    const [stocks, setStocks] = useState([]);
  const [mutualFunds, setMutualFunds] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/investments")
      .then(res => res.json())
      .then(data => {
        setStocks(data.stocks || []);
        setMutualFunds(data.mutualFunds || []);
      })
      .catch(console.error);
  }, []);

  const [selectedType, setSelectedType] = useState("stocks");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [symbol, setSymbol] = useState("TATASTEEL");

  const handleSymbol = () => { handleChartsStock(symbol); };

  const handleItemSelect = (item) => {
    setSymbol(item.symbol);
    setSelectedItem(item);
    if (selectedType === "mutualFunds") setPrice(item.price.toString());
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleSubmit = () => { if (selectedItem) setShowModal(true); };
  const closeModal = () => setShowModal(false);

  const confirmOrder = () => {
    setShowModal(false);
    setShowConfirmation(true);
    setOrderConfirmed(true);
    fetch('https://hackit-fin-tech-backend.vercel.app/api/teleBot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symbol: selectedItem.symbol, name: selectedItem.name,
        type: selectedType === "stocks" ? "Stock" : "Mutual Fund",
        price: selectedType === "stocks" ? selectedItem.price : parseFloat(price),
        quantity, alert: "The stock is getting a drastic change",
        totalValue: parseFloat(totalValue), timestamp: new Date().toISOString()
      })
    }).catch(error => console.error('Error sending to teleBot:', error));
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type); setSelectedItem(null);
    setQuantity(1); setPrice(""); setOrderConfirmed(false);
  };

  const totalValue = selectedType === "stocks" && selectedItem
    ? (selectedItem.price * quantity).toFixed(2)
    : price ? (parseFloat(price) * quantity).toFixed(2) : "0.00";

  return (
    <div className="min-h-full font-sans px-6 pb-8" style={{ background: "transparent" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Selection tabs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-[24px] shadow-sm border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="p-1.5 border-b" style={{ borderColor: "var(--border)" }}>
                <div className="flex p-1 rounded-2xl" style={{ background: "var(--muted)" }}>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: selectedType === "stocks" ? "var(--primary)" : "transparent",
                      color: selectedType === "stocks" ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}
                    onClick={() => handleTypeChange("stocks")}
                  >
                    Stocks
                  </button>
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: selectedType === "mutualFunds" ? "var(--primary)" : "transparent",
                      color: selectedType === "mutualFunds" ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    }}
                    onClick={() => handleTypeChange("mutualFunds")}
                  >
                    Mutual Funds
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ background: "var(--muted)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {selectedType === "stocks" ? (
                    <ul className="space-y-2">
                      {stocks.map((stock) => (
                        <li
                          key={stock.id}
                          className="p-3.5 rounded-[16px] cursor-pointer transition-all"
                          style={{
                            background: selectedItem?.id === stock.id && selectedType === "stocks" ? "var(--accent)" : "transparent",
                            border: selectedItem?.id === stock.id && selectedType === "stocks" ? "1px solid var(--primary)" : "1px solid var(--border)",
                          }}
                          onClick={() => handleItemSelect(stock)}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium text-sm text-foreground">{stock.symbol}</div>
                            <div className={stock.change >= 0 ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                              ₹{stock.price}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">{stock.name}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2">
                      {mutualFunds.map((fund) => (
                        <li
                          key={fund.id}
                          className="p-3.5 rounded-[16px] cursor-pointer transition-all"
                          style={{
                            background: selectedItem?.id === fund.id && selectedType === "mutualFunds" ? "var(--accent)" : "transparent",
                            border: selectedItem?.id === fund.id && selectedType === "mutualFunds" ? "1px solid var(--primary)" : "1px solid var(--border)",
                          }}
                          onClick={() => handleItemSelect(fund)}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium text-sm text-foreground">{fund.symbol}</div>
                            <div className="text-foreground text-sm">₹{fund.price}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">{fund.name}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Selected item details */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="rounded-[24px] shadow-sm border p-6 md:col-span-2" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-foreground">{selectedItem.name}</h2>
                    <span className="text-lg font-semibold text-foreground">₹{selectedItem.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="block mb-1">Symbol</span>
                      <span className="font-medium text-foreground">{selectedItem.symbol}</span>
                    </div>
                    {selectedType === "stocks" ? (
                      <div className="text-sm text-muted-foreground">
                        <span className="block mb-1">24h Change</span>
                        <span className={selectedItem.change >= 0 ? "font-medium text-green-500" : "font-medium text-red-500"}>
                          {selectedItem.change >= 0 ? "+" : ""}{selectedItem.change}%
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        <span className="block mb-1">Expense Ratio</span>
                        <span className="font-medium text-foreground">{selectedItem.expense}%</span>
                      </div>
                    )}
                  </div>

                  {orderConfirmed ? (
                    <div className="pt-4 border-t border-border mt-4">
                      <h3 className="text-lg font-medium mb-4 text-foreground">Order Details</h3>
                      <div className="space-y-3">
                        {[
                          ["Symbol", selectedItem.symbol],
                          ["Type", selectedType === "stocks" ? "Stock" : "Mutual Fund"],
                          ["Price", `₹${selectedType === "stocks" ? selectedItem.price : price}`],
                          ["Quantity", quantity],
                          ["Total Value", `₹${totalValue}`],
                        ].map(([label, val]) => (
                          <div key={label} className="flex justify-between py-2 border-b border-border">
                            <span className="text-muted-foreground">{label}:</span>
                            <span className="font-medium text-foreground">{val}</span>
                          </div>
                        ))}
                        <button
                          className="w-full py-3.5 rounded-[14px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99] mt-4"
                          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
                          onClick={() => navigate("/stockschart")}
                        >
                          View Charts
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-border mt-4">
                      <h3 className="text-lg font-medium mb-4 text-foreground">Place Order</h3>
                      <div className="space-y-4">
                        {selectedType === "stocks" ? (
                          <div>
                            <label className="block text-sm text-muted-foreground mb-1">Quantity</label>
                            <input type="number" value={quantity} min="1" onChange={handleQuantityChange}
                              className="w-full p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                          </div>
                        ) : (
                          <>
                            <div>
                              <label className="block text-sm text-muted-foreground mb-1">Price (₹)</label>
                              <input type="number" value={price} min="0.01" step="0.01" onChange={handlePriceChange}
                                className="w-full p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                            </div>
                            <div>
                              <label className="block text-sm text-muted-foreground mb-1">Quantity</label>
                              <input type="number" value={quantity} min="1" onChange={handleQuantityChange}
                                className="w-full p-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                            </div>
                          </>
                        )}
                        <div className="flex justify-between py-2">
                          <span className="text-muted-foreground">Total Value:</span>
                          <span className="font-semibold text-foreground">₹{totalValue}</span>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={handleSubmit}
                            className="flex-1 py-3.5 rounded-[14px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99]"
                            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                            Submit Order
                          </button>
                          <button className="py-3.5 px-6 rounded-[14px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99]"
                            style={{ background: "var(--secondary)", color: "var(--secondary-foreground)" }}
                            onClick={handleSymbol}>
                            View Charts
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Select a {selectedType === "stocks" ? "stock" : "mutual fund"} to view details</p>
                </div>
              )}
            </motion.div>
        </div>
      </div>

      {/* Order confirmation modal */}
      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-[24px] p-7 w-full max-w-md shadow-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Order Confirmation</h3>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                ["Symbol", selectedItem.symbol],
                ["Type", selectedType === "stocks" ? "Stock" : "Mutual Fund"],
                ["Price", `₹${selectedType === "stocks" ? selectedItem.price : price}`],
                ["Quantity", quantity],
                ["Total Value", `₹${totalValue}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{label}:</span>
                  <span className="font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button onClick={confirmOrder}
                className="w-full py-3.5 rounded-[14px] font-bold transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                Confirm Order
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success notification */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-[24px] p-7 shadow-2xl max-w-md" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Order Confirmed!</h3>
              <p className="text-muted-foreground">Your order has been placed successfully.</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default StockTradingInterface;
