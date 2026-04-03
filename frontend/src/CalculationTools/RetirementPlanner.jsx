import { useState } from "react";

function RetirementPlanner() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [inflationRate, setInflationRate] = useState(6);
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState(50000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState({ yearsToRetirement: 0, projectedSavings: 0, monthlyIncomeFromSavings: 0, savingsGap: 0, additionalSavingsNeeded: 0 });

  const calculateRetirement = () => {
    if (retirementAge <= currentAge) { alert("Retirement age must be greater than current age"); return; }
    setIsCalculating(true);
    setTimeout(() => {
      const yearsToRetirement = retirementAge - currentAge;
      const realReturnRate = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1;
      const monthlyRate = Math.pow(1 + realReturnRate, 1 / 12) - 1;
      const futureValueCurrentSavings = currentSavings * Math.pow(1 + realReturnRate, yearsToRetirement);
      const months = yearsToRetirement * 12;
      const futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      const projectedSavings = futureValueCurrentSavings + futureValueContributions;
      const monthlyIncomeFromSavings = (projectedSavings * (withdrawalRate / 100)) / 12;
      const requiredSavings = (desiredMonthlyIncome * 12) / (withdrawalRate / 100);
      const savingsGap = Math.max(0, requiredSavings - projectedSavings);
      let additionalSavingsNeeded = 0;
      if (savingsGap > 0 && months > 0) {
        additionalSavingsNeeded = savingsGap / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) / (1 + monthlyRate);
      }
      setResults({ yearsToRetirement, projectedSavings: Math.round(projectedSavings), monthlyIncomeFromSavings: Math.round(monthlyIncomeFromSavings), savingsGap: Math.round(savingsGap), additionalSavingsNeeded: Math.round(additionalSavingsNeeded) });
      setIsCalculating(false);
      setIsModalOpen(true);
    }, 1000);
  };

  const inp = "w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-ring focus:outline-none transition-colors";
  const lbl = "block text-sm font-medium mb-2";

  const fields = [
    { label: "Current Age", value: currentAge, set: setCurrentAge, suffix: "years", min: 18, max: 80 },
    { label: "Retirement Age", value: retirementAge, set: setRetirementAge, suffix: "years", min: 45, max: 90 },
    { label: "Current Savings (₹)", value: currentSavings, set: setCurrentSavings, prefix: "₹", min: 0 },
    { label: "Monthly Contribution (₹)", value: monthlyContribution, set: setMonthlyContribution, prefix: "₹", min: 0 },
    { label: "Expected Annual Return (%)", value: expectedReturn, set: setExpectedReturn, suffix: "%", min: 0, max: 15, step: 0.1 },
    { label: "Expected Inflation Rate (%)", value: inflationRate, set: setInflationRate, suffix: "%", min: 0, max: 15, step: 0.1 },
    { label: "Desired Monthly Income (₹)", value: desiredMonthlyIncome, set: setDesiredMonthlyIncome, prefix: "₹", min: 0 },
    { label: "Annual Withdrawal Rate (%)", value: withdrawalRate, set: setWithdrawalRate, suffix: "%", min: 0, max: 10, step: 0.1 },
  ];

  return (
    <div className="min-h-full px-6 pb-8 font-sans" style={{ background: "transparent" }}>
      <div className="max-w-5xl mx-auto rounded-2xl border overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          <div className="p-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {fields.map(({ label, value, set, prefix, suffix, min, max, step }) => (
                <div key={label} className="space-y-1.5">
                  <label className={lbl} style={{ color: "var(--foreground)" }}>{label}</label>
                  <div className="relative">
                    {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>{prefix}</span>}
                    <input type="number" value={value} onChange={e => set(Number(e.target.value))}
                      min={min} max={max} step={step || 1}
                      className={inp + (prefix ? " pl-8" : "") + (suffix ? " pr-14" : "")}
                      style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                    {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--muted-foreground)" }}>{suffix}</span>}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={calculateRetirement} disabled={isCalculating}
              className="w-full mt-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", opacity: isCalculating ? 0.75 : 1 }}>
              {isCalculating ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Calculating...
                </>
              ) : "Calculate Retirement Plan"}
            </button>
          </div>
        </div>

        {/* Results Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div className="rounded-2xl border max-w-lg w-full relative"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <button onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ color: "var(--muted-foreground)", background: "var(--muted)" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--muted)"}>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--foreground)" }}>Retirement Plan Results</h2>
                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    ["Years until retirement", `${results.yearsToRetirement} yrs`],
                    ["Projected savings", `₹${results.projectedSavings.toLocaleString()}`],
                    ["Monthly income", `₹${results.monthlyIncomeFromSavings.toLocaleString()}`],
                    ["Savings gap", `₹${results.savingsGap.toLocaleString()}`],
                  ].map(([label, val]) => (
                    <div key={label} className="rounded-xl p-4" style={{ background: "var(--muted)" }}>
                      <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                      <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{val}</p>
                    </div>
                  ))}
                </div>

                {results.savingsGap > 0 && (
                  <div className="p-4 rounded-xl mb-4 border" style={{ background: "color-mix(in oklch, var(--destructive) 8%, var(--background))", borderColor: "color-mix(in oklch, var(--destructive) 30%, transparent)" }}>
                    <p className="text-sm font-medium mb-1" style={{ color: "var(--destructive)" }}>
                      To meet ₹{desiredMonthlyIncome.toLocaleString()} /mo, you need an extra monthly contribution of:
                    </p>
                    <p className="text-2xl font-bold" style={{ color: "var(--destructive)" }}>₹{results.additionalSavingsNeeded.toLocaleString()}</p>
                  </div>
                )}

                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  *Estimates based on your inputs. Actual results may vary with market conditions.
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default RetirementPlanner;
