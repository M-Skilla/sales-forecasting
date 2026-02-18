"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface ForecastPoint {
  date: string;
  forecast: number;
  lower?: number;
  upper?: number;
}

interface ForecastChartProps {
  data: ForecastPoint[];
  metrics?: { MAE: number; RMSE: number };
  modelUsed?: string;
}

export default function ForecastChart({ data, metrics, modelUsed }: ForecastChartProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Actual vs. Predicted Sales</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {modelUsed ? `${modelUsed} model` : "Revenue trend"} with confidence interval
          </p>
        </div>
        {hasData && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" /> Predicted
            </div>
            {data[0]?.lower !== undefined && (
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                <span className="w-8 h-4 bg-primary/10 rounded border border-primary/30 flex items-center justify-center text-[10px] text-primary font-bold">CI</span>
                Confidence
              </div>
            )}
          </div>
        )}
      </div>

      {/* Metrics Row */}
      {metrics && (
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
            <span className="material-icons-round text-sm">assessment</span>
            MAE: {metrics.MAE.toFixed(2)}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-500 text-xs font-semibold">
            <span className="material-icons-round text-sm">analytics</span>
            RMSE: {metrics.RMSE.toFixed(2)}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="flex-1 w-full min-h-[350px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 40 }}>
              <defs>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2b8cee" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2b8cee" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(148, 163, 184, 0.15)"
              />
              <XAxis
                dataKey="date"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
                tickLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={{ stroke: "rgba(148, 163, 184, 0.2)" }}
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a2632",
                  border: "1px solid rgba(43, 140, 238, 0.3)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  color: "#fff",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "16px" }}
              />
              {data[0]?.upper !== undefined && (
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="none"
                  fill="url(#confidenceGradient)"
                  name="Upper Bound"
                />
              )}
              {data[0]?.lower !== undefined && (
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="none"
                  fill="transparent"
                  name="Lower Bound"
                />
              )}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#2b8cee"
                strokeWidth={3}
                dot={{ r: 3, fill: "#2b8cee", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#2b8cee", stroke: "#fff", strokeWidth: 2 }}
                name="Predicted"
              />
              {data[0]?.lower !== undefined && (
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="rgba(43, 140, 238, 0.3)"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Lower CI"
                />
              )}
              {data[0]?.upper !== undefined && (
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="rgba(43, 140, 238, 0.3)"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Upper CI"
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          // Empty state chart placeholder
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600">
            <div className="relative w-full h-full">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-xs text-slate-400 text-right pr-2">
                <span>$150k</span>
                <span>$125k</span>
                <span>$100k</span>
                <span>$75k</span>
                <span>$50k</span>
                <span>$25k</span>
              </div>
              {/* Chart Area */}
              <div className="absolute left-10 top-0 right-0 bottom-8 border-l border-b border-slate-200 dark:border-slate-700">
                <div className="w-full h-full flex flex-col justify-between">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-px bg-slate-100 dark:bg-slate-700/50" />
                  ))}
                </div>
                {/* Decorative SVG lines */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path
                    d="M0,280 L80,260 L160,240 L240,250 L320,220 L400,200 L480,230 L560,210"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  <path
                    d="M560,210 L640,180 L720,170 L800,150"
                    fill="none"
                    stroke="#2b8cee"
                    strokeWidth="3"
                    opacity="0.5"
                  />
                  <circle cx="560" cy="210" r="4" fill="#2b8cee" stroke="white" strokeWidth="2" />
                </svg>
                {/* Center message */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <span className="material-icons-round text-4xl text-primary/40 mb-2">show_chart</span>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Configure parameters and click &quot;Update Forecast&quot;
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Upload data first, then generate predictions
                    </p>
                  </div>
                </div>
              </div>
              {/* X-Axis Labels */}
              <div className="absolute left-10 right-0 bottom-0 h-8 flex justify-between items-center text-xs text-slate-400 pt-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
