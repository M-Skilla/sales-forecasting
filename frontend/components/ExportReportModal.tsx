"use client";

import { useState } from "react";

interface ExportReportModalProps {
  onClose: () => void;
}

export default function ExportReportModal({ onClose }: ExportReportModalProps) {
  const [format, setFormat] = useState("pdf");
  const [includeNotes, setIncludeNotes] = useState(false);

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity z-[60]"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[70]">
        <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Export Report Preview</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sales Forecasting Analysis</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="material-icons">close</span>
            </button>
          </div>

          {/* Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            {/* Preview Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Graph Thumbnail */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons text-primary text-base">show_chart</span>
                  Trend Visualization
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg p-4 h-64 flex flex-col relative group overflow-hidden">
                  {/* Simulated Chart Content */}
                  <div className="flex justify-between items-end h-full w-full px-2 pb-2 gap-2 opacity-80">
                    <div className="w-full bg-primary/10 rounded-t-sm h-[40%] group-hover:bg-primary/20 transition-colors" />
                    <div className="w-full bg-primary/20 rounded-t-sm h-[55%] group-hover:bg-primary/30 transition-colors" />
                    <div className="w-full bg-primary/30 rounded-t-sm h-[45%] group-hover:bg-primary/40 transition-colors" />
                    <div className="w-full bg-primary/40 rounded-t-sm h-[70%] group-hover:bg-primary/50 transition-colors" />
                    <div className="w-full bg-primary/60 rounded-t-sm h-[85%] group-hover:bg-primary/70 transition-colors" />
                    <div className="w-full bg-primary rounded-t-sm h-[95%] group-hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20" />
                  </div>
                  {/* Decorative Forecast Line Overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none p-4" preserveAspectRatio="none">
                    <path
                      className="drop-shadow-md"
                      d="M10,180 C50,160 80,140 120,150 C160,160 200,80 280,40"
                      fill="none"
                      stroke="#2b8cee"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <circle cx="280" cy="40" fill="white" r="4" stroke="#2b8cee" strokeWidth="2" />
                  </svg>
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-primary shadow-sm border border-slate-100 dark:border-slate-700">
                    +12.5% Growth
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-800 to-transparent opacity-40 pointer-events-none" />
                </div>
              </div>

              {/* Summary Table */}
              <div className="flex flex-col space-y-3">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons text-primary text-base">table_chart</span>
                  Data Summary
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                      <tr>
                        <th className="px-4 py-3">Metric</th>
                        <th className="px-4 py-3 text-right">Value</th>
                        <th className="px-4 py-3 text-right">Var %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">Total Revenue</td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">$1,240,500</td>
                        <td className="px-4 py-3 text-right text-green-600 font-medium">+8.2%</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">Units Sold</td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">45,200</td>
                        <td className="px-4 py-3 text-right text-green-600 font-medium">+12.4%</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">Avg Order Val</td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">$27.45</td>
                        <td className="px-4 py-3 text-right text-red-500 font-medium">-1.2%</td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">Retention Rate</td>
                        <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">88%</td>
                        <td className="px-4 py-3 text-right text-slate-400 font-medium">0.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Export Format Options */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Select Format</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* PDF Option */}
                <label className="relative flex items-center p-4 border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <input
                    checked={format === "pdf"}
                    onChange={() => setFormat("pdf")}
                    className="peer sr-only"
                    name="export-format"
                    type="radio"
                    value="pdf"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary rounded-xl pointer-events-none" />
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0 dark:bg-red-900/30 dark:text-red-400">
                      <span className="material-icons">picture_as_pdf</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">PDF Document</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Best for printing & sharing</span>
                    </div>
                    <div className="ml-auto opacity-0 peer-checked:opacity-100 text-primary transition-opacity">
                      <span className="material-icons">check_circle</span>
                    </div>
                  </div>
                </label>

                {/* Excel Option */}
                <label className="relative flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <input
                    checked={format === "excel"}
                    onChange={() => setFormat("excel")}
                    className="peer sr-only"
                    name="export-format"
                    type="radio"
                    value="excel"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary rounded-xl pointer-events-none" />
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 dark:bg-green-900/30 dark:text-green-400">
                      <span className="material-icons">grid_on</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">Excel (.xlsx)</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">For detailed analysis</span>
                    </div>
                    <div className="ml-auto opacity-0 peer-checked:opacity-100 text-primary transition-opacity">
                      <span className="material-icons">check_circle</span>
                    </div>
                  </div>
                </label>

                {/* CSV Option */}
                <label className="relative flex items-center p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <input
                    checked={format === "csv"}
                    onChange={() => setFormat("csv")}
                    className="peer sr-only"
                    name="export-format"
                    type="radio"
                    value="csv"
                  />
                  <div className="absolute inset-0 border-2 border-transparent peer-checked:border-primary rounded-xl pointer-events-none" />
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 dark:bg-blue-900/30 dark:text-blue-400">
                      <span className="material-icons">description</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">CSV File</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Raw data export</span>
                    </div>
                    <div className="ml-auto opacity-0 peer-checked:opacity-100 text-primary transition-opacity">
                      <span className="material-icons">check_circle</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Optional Settings */}
            <div className="flex items-center gap-3 pt-2">
              <input
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary dark:bg-slate-800 dark:border-slate-600"
                id="include-notes"
                type="checkbox"
                checked={includeNotes}
                onChange={(e) => setIncludeNotes(e.target.checked)}
              />
              <label className="text-sm text-slate-600 dark:text-slate-400 select-none cursor-pointer" htmlFor="include-notes">
                Include analyst notes and metadata in export
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
              Estimated file size: ~2.4 MB
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium transition-colors border border-transparent"
              >
                Cancel
              </button>
              <button className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-semibold shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
                <span className="material-icons text-sm group-hover:animate-bounce">download</span>
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
