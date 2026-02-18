"use client";

import DashboardLayout from "@/components/DashboardLayout";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      {/* Top Navigation Header */}
      <header className="w-full h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15202B] flex items-center px-6 justify-between shrink-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
            <span className="material-icons-round text-base mx-1">chevron_right</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Forecasts</span>
            <span className="material-icons-round text-base mx-1">chevron_right</span>
            <span className="text-gray-900 dark:text-white font-semibold">Forecast Analytics</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-500">Model Active</span>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20">
            <span className="material-icons-round text-sm">download</span>
            Export Report
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Chart & Controls (Span 3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Filters & Controls Bar */}
            <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Date Picker */}
                <div className="relative group">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Analysis Period</label>
                  <button className="flex items-center gap-3 bg-white dark:bg-[#101922] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary px-3 py-2 rounded-lg transition-colors w-64 justify-between">
                    <span className="text-sm font-medium">Jan 01, 2023 - Dec 31, 2023</span>
                    <span className="material-icons-round text-gray-500 dark:text-gray-400 text-lg">calendar_today</span>
                  </button>
                </div>
                {/* Granularity */}
                <div className="relative group">
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">Granularity</label>
                  <button className="flex items-center gap-3 bg-white dark:bg-[#101922] border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary px-3 py-2 rounded-lg transition-colors w-32 justify-between">
                    <span className="text-sm font-medium">Weekly</span>
                    <span className="material-icons-round text-gray-500 dark:text-gray-400 text-lg">expand_more</span>
                  </button>
                </div>
              </div>
              {/* Toggles */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#101922] p-1 rounded-lg border border-gray-200 dark:border-gray-800">
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white dark:bg-primary text-primary dark:text-white shadow-sm transition-all">
                  Forecast
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500" /> Seasonality
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Trend
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Outliers
                </button>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="glass-panel p-6 rounded-xl min-h-[500px] flex flex-col relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Forecast vs Actuals</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comparing predicted values against historical performance data.</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-gray-400 dark:bg-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400">Historical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-0.5 bg-primary" />
                    <span className="text-gray-900 dark:text-white font-medium">Predicted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 h-6 bg-primary/10 rounded border border-primary/30 flex items-center justify-center text-primary font-bold text-[10px]">95% CI</span>
                    <span className="text-gray-500 dark:text-gray-400">Confidence Interval</span>
                  </div>
                </div>
              </div>

              {/* SVG Chart */}
              <div className="flex-1 w-full relative min-h-[400px]">
                {/* Y Axis Labels */}
                <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 text-right pr-2">
                  <span>$120k</span>
                  <span>$100k</span>
                  <span>$80k</span>
                  <span>$60k</span>
                  <span>$40k</span>
                  <span>$20k</span>
                  <span>$0</span>
                </div>
                {/* Chart Content */}
                <div className="absolute left-12 top-0 right-0 bottom-8">
                  {/* Grid Lines */}
                  <div className="w-full h-full flex flex-col justify-between border-l border-b border-gray-200 dark:border-gray-700">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className={`w-full h-px ${i < 6 ? 'bg-gray-200 dark:bg-gray-800/50' : 'bg-transparent'}`} />
                    ))}
                  </div>
                  {/* Data Lines (SVG) */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Confidence Interval Area */}
                    <path
                      d="M0,250 Q150,220 300,180 T600,100 L600,200 Q450,240 300,280 T0,300 Z"
                      fill="rgba(43, 140, 238, 0.1)"
                      opacity="0.5"
                    />
                    {/* Historical Data Line (Gray) */}
                    <path
                      className="opacity-60"
                      d="M0,280 L50,260 L100,275 L150,230 L200,245 L250,200 L300,210 L350,180 L400,195"
                      fill="none"
                      stroke="#6b7280"
                      strokeDasharray="4,4"
                      strokeWidth="2"
                    />
                    {/* Current/Forecast Breakpoint Dot */}
                    <circle className="fill-white stroke-gray-500" cx="400" cy="195" r="4" strokeWidth="2" />
                    {/* Predicted Line (Primary) */}
                    <path
                      d="M400,195 L450,160 L500,170 L550,140 L600,150 L650,110 L700,125 L750,90 L800,100 L850,60"
                      fill="none"
                      stroke="#2b8cee"
                      strokeWidth="3"
                    />
                    {/* Interactive Tooltip Overlay */}
                    <g transform="translate(600, 150)">
                      <circle className="fill-primary animate-ping opacity-75" r="5" />
                      <circle className="fill-background-dark stroke-primary" r="4" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
                {/* X Axis Labels */}
                <div className="absolute left-12 right-0 bottom-0 h-8 flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Panel: Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-xl">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-base">trending_up</span>
                  Positive Drivers
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Holiday Seasonality</span>
                    <span className="text-green-500 font-medium">+12.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-400">Marketing Campaign Q3</span>
                    <span className="text-green-500 font-medium">+5.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-xl">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span className="material-icons-round text-red-500 text-base">trending_down</span>
                  Negative Impacts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Supply Chain Delay</span>
                    <span className="text-red-500 font-medium">-3.1%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "25%" }} />
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500 dark:text-gray-400">Competitor Pricing</span>
                    <span className="text-red-500 font-medium">-1.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "15%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Metrics Sidebar */}
          <aside className="flex flex-col gap-6">
            {/* Model Summary Card */}
            <div className="glass-panel p-5 rounded-xl border-l-4 border-l-primary">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white">Model Summary</h3>
                <span className="material-icons-round text-primary cursor-help text-lg" title="More info">info</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Algorithm</p>
                  <p className="text-sm font-medium mt-1">Linear Regression (Auto-ARIMA)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Training Date</p>
                    <p className="text-sm font-medium mt-1">Oct 14, 2023</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Status</p>
                    <p className="text-sm font-medium mt-1 text-green-500">Converged</p>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* MAPE Card */}
              <div className="glass-panel p-5 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide mb-1">MAPE</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">4.2%</span>
                  <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">Good</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Mean Absolute Percentage Error</p>
              </div>

              {/* RMSE Card */}
              <div className="glass-panel p-5 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide mb-1">RMSE</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$1,240</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Root Mean Square Error</p>
              </div>

              {/* MAE Card */}
              <div className="glass-panel p-5 rounded-xl relative overflow-hidden group hover:border-primary/50 transition-all">
                <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                <h4 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide mb-1">MAE</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$985</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Mean Absolute Error</p>
              </div>
            </div>

            {/* Model Parameters Table */}
            <div className="glass-panel p-0 rounded-xl overflow-hidden flex-1">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#15202B]">
                <h3 className="font-bold text-sm">Parameters</h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                <div className="flex justify-between p-4 text-sm hover:bg-white/5 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Alpha (Smoothing)</span>
                  <span className="font-mono">0.45</span>
                </div>
                <div className="flex justify-between p-4 text-sm hover:bg-white/5 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Beta (Trend)</span>
                  <span className="font-mono">0.12</span>
                </div>
                <div className="flex justify-between p-4 text-sm hover:bg-white/5 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Gamma (Seasonal)</span>
                  <span className="font-mono">0.89</span>
                </div>
                <div className="flex justify-between p-4 text-sm hover:bg-white/5 transition-colors">
                  <span className="text-gray-500 dark:text-gray-400">Lookback Period</span>
                  <span className="font-mono">12 mo</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50/50 dark:bg-white/5 border-t border-gray-200 dark:border-gray-800 text-center">
                <button className="text-xs text-primary hover:text-primary/80 font-semibold uppercase tracking-wide">
                  View All Parameters
                </button>
              </div>
            </div>
          </aside>
        </div>
        <div className="h-8" />
      </div>
    </DashboardLayout>
  );
}
