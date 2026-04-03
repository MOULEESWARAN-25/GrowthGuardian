import { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Info } from 'lucide-react';

const API_URL = "http://127.0.0.1:8000";
const FUND_ANALYZER_API = "https://hackit-fin-tech-backend.vercel.app/api/fundAnalyzer";

export default function AssetPredictionTool() {
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [forecastYears, setForecastYears] = useState('2');
  const [prediction, setPrediction] = useState(null);
  const [fundAnalysis, setFundAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const assetOptions = {
    Stock: ['AAPL - Apple', 'MSFT - Microsoft'],
    Cryptocurrency: ['BTC-USD - Bitcoin', 'ETH-USD - Ethereum'],
    Commodity: ['GC=F - Gold', 'CL=F - Oil'],
    Bond: ['^TNX - Treasury Bond', 'LQD - Corporate Bond'],
    'Real Estate': ['VNQ - REIT'],
  };
  const USD_TO_INR = 83.50;

  useEffect(() => {
    if (prediction && resultsRef.current) resultsRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [prediction]);

  const generatePrediction = async () => {
    if (!assetType || !assetName || !interestRate || !inflationRate || !forecastYears) { alert('Please fill all fields'); return; }
    setIsLoading(true); setError(null);
    const assetSymbol = assetName.split(' - ')[0];
    const requestPayload = { asset_type: assetType, asset_name: assetSymbol, interest_rate: parseFloat(interestRate) || 0, inflation_rate: parseFloat(inflationRate) || 0, forecast_years: parseInt(forecastYears) || 2 };
    try {
      const predRes = await fetch(`${API_URL}/predict`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestPayload) });
      if (!predRes.ok) { const e = await predRes.json().catch(() => null); throw new Error(e?.error || `Error: ${predRes.status}`); }
      const predData = await predRes.json();
      const currentPriceINR = (Number(predData.current_price[assetSymbol]) || 0) * USD_TO_INR;
      const predictedPriceINR = (Number(predData[`predicted_price_${forecastYears}_years`]) || 0) * USD_TO_INR;
      setPrediction({ asset: assetName, currentPrice: currentPriceINR, predictedPrice: predictedPriceINR, interestRate: Number(predData.interest_rate) || 0, inflationRate: Number(predData.inflation_rate) || 0, growthApplied: predData.growth || '0%', forecastYears: parseInt(predData.forecast_years) || parseInt(forecastYears) });
      const fundRes = await fetch(FUND_ANALYZER_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestPayload) });
      if (fundRes.ok) { const fd = await fundRes.json(); setFundAnalysis(fd.response); }
    } catch (err) { setError(`Failed to get prediction: ${err.message}`); } finally { setIsLoading(false); }
  };

  const formatINR = (v) => isNaN(v) ? '₹0' : `₹${Number(v).toLocaleString('en-IN')}`;

  const generateChartData = () => {
    if (!prediction?.currentPrice || !prediction?.predictedPrice) return [];
    const cur = Number(prediction.currentPrice), pred = Number(prediction.predictedPrice), yrs = Number(prediction.forecastYears) || 1;
    const gr = pred > 0 && cur > 0 ? Math.pow(pred / cur, 1 / yrs) - 1 : 0;
    return Array.from({ length: yrs + 1 }, (_, yr) => ({
      year: yr,
      projectedValue: Math.round(cur * Math.pow(1 + gr, yr)) || 0,
      inflationAdjustedValue: Math.round(cur * Math.pow(1 + gr - (Number(prediction.inflationRate) / 100 || 0), yr)) || 0,
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "10px 14px" }}>
        <p className="text-xs font-bold mb-2" style={{ color: "var(--muted-foreground)" }}>Year {label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: {formatINR(p.value)}</p>
        ))}
      </div>
    );
  };

  const inp = "w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-ring transition";
  const lbl = "block text-xs font-semibold uppercase tracking-wide mb-1.5";

  const fields = [
    { id: "forecastYears", label: "Forecast Period (Years)", value: forecastYears, set: setForecastYears, type: "number", min: 1, max: 30, placeholder: "e.g., 2", hint: "Number of years to forecast the asset's future value" },
    { id: "interestRate", label: "Interest Rate (%)", value: interestRate, set: setInterestRate, type: "number", min: 0, max: 20, step: 0.1, placeholder: "e.g., 3", hint: "Higher rates may reduce asset values" },
    { id: "inflationRate", label: "Inflation Rate (%)", value: inflationRate, set: setInflationRate, type: "number", min: 0, max: 20, step: 0.1, placeholder: "e.g., 2", hint: "Higher inflation erodes purchasing power" },
  ];

  return (
    <div className="min-h-full px-6 pb-8 font-sans" style={{ background: "transparent" }}>
      <div className="max-w-4xl mx-auto">
        <main className="flex flex-col gap-6">

          {/* Parameters Card */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-[24px] border p-7" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
            <h2 className="text-lg font-bold mb-6" style={{ color: "var(--foreground)" }}>Prediction Parameters</h2>

            {/* Asset Type */}
            <div className="mb-5">
              <label htmlFor="assetType" className={lbl} style={{ color: "var(--muted-foreground)" }}>Asset Type</label>
              <select id="assetType" value={assetType}
                onChange={(e) => { setAssetType(e.target.value); setAssetName(''); }}
                className={inp} style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                <option value="">Select Asset Type</option>
                {Object.keys(assetOptions).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Asset Name (conditional) */}
            {assetType && (
              <div className="mb-5">
                <label htmlFor="assetName" className={lbl} style={{ color: "var(--muted-foreground)" }}>Asset Name</label>
                <select id="assetName" value={assetName} onChange={(e) => setAssetName(e.target.value)}
                  className={inp} style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }}>
                  <option value="">Select Asset</option>
                  {assetOptions[assetType].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}

            {/* Numeric fields */}
            <div className="grid md:grid-cols-3 gap-5 mb-6">
              {fields.map(({ id, label, value, set, hint, ...rest }) => (
                <div key={id}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <label htmlFor={id} className={lbl} style={{ color: "var(--muted-foreground)", marginBottom: 0 }}>{label}</label>
                    <div className="group relative">
                      <div className="cursor-help flex items-center justify-center text-primary transition-opacity hover:opacity-80">
                        <Info size={14} />
                      </div>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-44 text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-10 pointer-events-none shadow-lg"
                        style={{ background: "var(--popover)", color: "var(--popover-foreground)", border: "1px solid var(--border)" }}>
                        {hint}
                      </div>
                    </div>
                  </div>
                  <input id={id} type={rest.type} value={value} onChange={e => set(e.target.value)}
                    min={rest.min} max={rest.max} step={rest.step} placeholder={rest.placeholder}
                    className={inp} style={{ background: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)" }} />
                </div>
              ))}
            </div>

            <button onClick={generatePrediction} disabled={isLoading}
              className="w-full py-4 rounded-[14px] font-bold text-base transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? (
                <><Loader2 size={18} className="animate-spin" /> Processing prediction...</>
              ) : (
                <><Sparkles size={18} /> Predict Asset Return</>
              )}
            </button>

            {error && (
              <div className="mt-4 px-4 py-3 rounded-xl text-sm border" style={{ background: "color-mix(in oklch, var(--destructive) 8%, var(--background))", borderColor: "color-mix(in oklch, var(--destructive) 30%, transparent)", color: "var(--destructive)" }}>
                {error}
              </div>
            )}
          </motion.div>

          {/* Results */}
          {prediction && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} ref={resultsRef} className="rounded-[24px] border p-7 space-y-6" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div>
                <h2 className="text-lg font-bold mb-1" style={{ color: "var(--foreground)" }}>{prediction.forecastYears}-Year Prediction Results</h2>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{prediction.asset}</p>
              </div>

              {/* Stat chips */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Current Price", value: formatINR(prediction.currentPrice) },
                  { label: `Predicted (${prediction.forecastYears}yr)`, value: formatINR(prediction.predictedPrice), highlight: true },
                  { label: "Interest Rate", value: `${prediction.interestRate}%` },
                  { label: "Inflation Rate", value: `${prediction.inflationRate}%` },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="rounded-[16px] p-4" style={{ background: "var(--muted)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{label}</p>
                    <p className="text-base font-bold" style={{ color: highlight ? "var(--primary)" : "var(--foreground)" }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="rounded-[16px] border p-5" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
                <h3 className="text-sm font-bold mb-4" style={{ color: "var(--foreground)" }}>{prediction.forecastYears}-Year Investment Projection</h3>
                <div style={{ height: '280px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={generateChartData()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="year" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottomRight', offset: -5, fill: "var(--muted-foreground)", fontSize: 11 }} />
                      <YAxis tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }} />
                      <Line type="monotone" dataKey="projectedValue" name="Projected Value" stroke="var(--primary)" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="inflationAdjustedValue" name="Inflation Adjusted" stroke="#10b981" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  Analysis based on {prediction.interestRate}% interest rate, {prediction.inflationRate}% inflation, over {prediction.forecastYears} years. Green line shows inflation-adjusted purchasing power.
                </p>
              </div>

              {/* Fund Analysis */}
              {fundAnalysis && (
                <div className="rounded-[16px] border p-5" style={{ borderColor: "var(--border)" }}>
                  <h3 className="text-sm font-bold mb-4" style={{ color: "var(--foreground)" }}>Detailed Asset Analysis</h3>
                  <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                    {fundAnalysis.split('\n\n').map((section, i) => (
                      <div key={i} className="mb-3">
                        {section.split('\n').map((line, j) => (
                          <p key={j} className="mb-1" style={{ color: line.startsWith('*') ? "var(--foreground)" : "var(--muted-foreground)" }}>
                            {line.replace(/^\*\s*/, '• ').replace(/\*\*([^*]+)\*\*/g, '$1')}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}