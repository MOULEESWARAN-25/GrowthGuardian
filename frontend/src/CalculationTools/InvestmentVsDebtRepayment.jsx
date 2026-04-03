import { useState } from "react";

function InvestVsDebt() {
  const [formData, setFormData] = useState({
    principal: "", interestRate: "", tenure: "",
    type: "investment", frequency: "yearly", additional: "",
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateResults = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate) / 100;
    const time = parseFloat(formData.tenure);
    const additional = parseFloat(formData.additional) || 0;
    const freqMap = { yearly: 1, quarterly: 4, monthly: 12 };
    const n = freqMap[formData.frequency];

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
      alert("Please fill all required fields with valid positive numbers");
      setIsCalculating(false); return;
    }

    setTimeout(() => {
      let calculation;
      if (formData.type === "investment") {
        const periods = time * n;
        const periodRate = rate / n;
        let futureValue = principal * Math.pow(1 + periodRate, periods);
        if (additional > 0) {
          const monthlyFactor = n === 12 ? 1 : n === 4 ? 3 : 12;
          for (let i = 1; i <= periods; i++) futureValue += additional * monthlyFactor * Math.pow(1 + periodRate, periods - i);
        }
        const interest = futureValue - principal - additional * periods * (n === 12 ? 1 : n === 4 ? 3 : 12);
        calculation = { principal: principal.toFixed(2), total: futureValue.toFixed(2), interest: interest.toFixed(2), monthlyReturn: (futureValue / (time * 12)).toFixed(2), roi: (((futureValue - principal) / principal) * 100).toFixed(2) };
      } else {
        const monthlyRate = rate / 12;
        const months = time * 12;
        const baseEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const emi = baseEmi + additional;
        const totalPayable = emi * months;
        const interest = totalPayable - principal;
        calculation = { principal: principal.toFixed(2), emi: emi.toFixed(2), total: totalPayable.toFixed(2), interest: interest.toFixed(2), interestPercentage: ((interest / principal) * 100).toFixed(2) };
      }
      setResult(calculation); setShowModal(true); setIsCalculating(false);
    }, 1000);
  };

  const inp = "w-full p-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  const lbl = "block text-xs font-semibold uppercase tracking-wide mb-1.5";

  return (
    <div className="min-h-full px-6 pb-8 font-sans" style={{ background: "transparent" }}>
        <div className="max-w-3xl w-full mx-auto rounded-xl border p-8"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>

          {/* Type Selector */}
          <div className="rounded-xl p-4 mb-8" style={{ background: "var(--muted)" }}>
            <div className="flex items-center mb-4 gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                {formData.type === "investment" ? "₹+" : "₹-"}
              </div>
              <div>
                <h2 className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                  {formData.type === "investment" ? "Investment Calculator" : "Debt Calculator"}
                </h2>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {formData.type === "investment" ? "Estimate your investment growth" : "Calculate your loan repayment"}
                </p>
              </div>
            </div>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
              {["investment", "debt"].map(type => (
                <button key={type} type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type }))}
                  className="flex-1 py-2 px-4 text-sm font-medium transition-all"
                  style={{
                    background: formData.type === type ? "var(--primary)" : "var(--background)",
                    color: formData.type === type ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={calculateResults} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Principal Amount (₹)*</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>₹</span>
                  <input type="number" name="principal" value={formData.principal} onChange={handleInputChange}
                    placeholder="Enter amount" min="0" step="1000" required
                    className={inp + " pl-8"} style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                </div>
              </div>
              <div>
                <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Interest Rate (% p.a.)*</label>
                <div className="relative">
                  <input type="number" name="interestRate" value={formData.interestRate} onChange={handleInputChange}
                    placeholder="Annual rate" min="0" max="100" step="0.1" required
                    className={inp + " pr-8"} style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>%</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={lbl} style={{ color: "var(--muted-foreground)" }}>Tenure (Years)*</label>
                <div className="relative">
                  <input type="number" name="tenure" value={formData.tenure} onChange={handleInputChange}
                    placeholder="Years" min="1" step="1" required
                    className={inp + " pr-16"} style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>Yrs</span>
                </div>
              </div>
              <div>
                <label className={lbl} style={{ color: "var(--muted-foreground)" }}>
                  {formData.type === "investment" ? "Compounding Frequency" : "Repayment Frequency"}
                </label>
                <select name="frequency" value={formData.frequency} onChange={handleInputChange}
                  className={inp} style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                  <option value="yearly">Yearly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className={lbl} style={{ color: "var(--muted-foreground)" }}>
                  {formData.type === "investment" ? "Monthly Contribution (₹)" : "Extra Payment (₹)"}
                </label>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Optional</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>₹</span>
                <input type="number" name="additional" value={formData.additional} onChange={handleInputChange}
                  placeholder="Enter amount" min="0" step="100"
                  className={inp + " pl-8"} style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }} />
              </div>
            </div>

            <button type="submit" disabled={isCalculating}
              className="w-full py-4 rounded-lg font-semibold text-base transition-all duration-300"
              style={{
                background: "var(--primary)", color: "var(--primary-foreground)",
                opacity: isCalculating ? 0.7 : 1, cursor: isCalculating ? "not-allowed" : "pointer"
              }}>
              {isCalculating ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </span>
              ) : `Calculate ${formData.type === "investment" ? "Returns" : "Payments"}`}
            </button>
          </form>
        </div>

      {/* Results Modal */}
      {showModal && result && (
        <div className="fixed inset-0 flex items-center justify-center p-6 z-50" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="rounded-xl p-6 max-w-md w-full shadow-2xl border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <div className="w-14 h-14 mx-auto -mt-10 rounded-full flex items-center justify-center text-xl font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
              {formData.type === "investment" ? "₹+" : "₹-"}
            </div>
            <h2 className="text-xl text-center font-bold mt-4 mb-5" style={{ color: "var(--foreground)" }}>
              {formData.type === "investment" ? "Investment Results" : "Debt Results"}
            </h2>
            <div className="space-y-3 mb-5">
              {[
                ["Principal", `₹${result.principal}`],
                ...(formData.type === "investment"
                  ? [["Total Value", `₹${result.total}`], ["Interest Earned", `₹${result.interest}`], ["Monthly Return", `₹${result.monthlyReturn}`], ["ROI", `${result.roi}%`]]
                  : [["EMI", `₹${result.emi}`], ["Total Payment", `₹${result.total}`], ["Interest Payable", `₹${result.interest}`], ["Interest %", `${result.interestPercentage}%`]]),
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between p-3 rounded-lg"
                  style={{ background: "var(--muted)" }}>
                  <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>{label}:</span>
                  <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg font-medium text-sm border"
                style={{ background: "var(--background)", color: "var(--foreground)", borderColor: "var(--border)" }}>
                Close
              </button>
              <button onClick={() => { setShowModal(false); setResult(null); setFormData({ principal: "", interestRate: "", tenure: "", type: formData.type, frequency: "yearly", additional: "" }); }}
                className="flex-1 py-3 rounded-lg font-medium text-sm"
                style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
                New Calculation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestVsDebt;