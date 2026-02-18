"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ForecastForm from "@/components/ForecastForm";
import ForecastChart from "@/components/ForecastChart";
import ExportReportModal from "@/components/ExportReportModal";
import Link from "next/link";

export default function Home() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [showExport, setShowExport] = useState(false);

  const handleForecast = (data: any) => {
    setForecastData(data);
  };

  return (
    <DashboardLayout>
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-[#15202b]/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-40">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500 font-normal">Overview /</span> Sales Forecast
        </h1>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700">
            <span className="material-icons-round text-slate-400 text-sm mr-2">calendar_today</span>
            <span className="text-sm font-medium">Current Period</span>
            <span className="material-icons-round text-slate-400 text-sm ml-2">arrow_drop_down</span>
          </div>
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary/20"
          >
            <span className="material-icons-round text-sm">download</span>
            Export
          </button>
          <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-icons-round">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
          </button>
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* KPI 1 */}
            <div className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Projected Monthly Revenue</p>
                  <h3 className="text-3xl font-bold mt-1 text-slate-800 dark:text-white">$1,240,500</h3>
                </div>
                <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                  <span className="material-icons-round text-xl">trending_up</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-green-500 font-semibold mr-2">+12.5%</span>
                <span className="text-slate-400">vs last month</span>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-16 opacity-10 pointer-events-none">
                <svg className="w-full h-full fill-current text-primary" viewBox="0 0 100 50">
                  <path d="M0 50 L20 30 L40 40 L60 20 L80 30 L100 10 V50 Z" />
                </svg>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Forecast Accuracy (MAPE)</p>
                  <h3 className="text-3xl font-bold mt-1 text-slate-800 dark:text-white">
                    {forecastData?.metrics ? `${(100 - forecastData.metrics.MAE).toFixed(1)}%` : "94.5%"}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <span className="material-icons-round text-xl">check_circle</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-primary font-semibold mr-2">+1.2%</span>
                <span className="text-slate-400">improvement</span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">YoY Growth Rate</p>
                  <h3 className="text-3xl font-bold mt-1 text-slate-800 dark:text-white">+8.3%</h3>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <span className="material-icons-round text-xl">show_chart</span>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-purple-500 font-semibold mr-2">+2.4%</span>
                <span className="text-slate-400">vs target</span>
              </div>
            </div>
          </div>

          {/* Main Section: Chart & Parameters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chart Container */}
            <div className="lg:col-span-3 bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col min-h-[500px]">
              <ForecastChart
                data={forecastData?.forecast || []}
                metrics={forecastData?.metrics}
                modelUsed={forecastData?.model_used}
              />
            </div>

            {/* Forecast Parameters Sidebar */}
            <div className="lg:col-span-1">
              <ForecastForm onForecast={handleForecast} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/upload"
              className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 transition-all group flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons-round text-2xl">cloud_upload</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Upload Sales Data</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Import CSV or Excel datasets for analysis</p>
              </div>
              <span className="material-icons-round text-slate-400 ml-auto">arrow_forward</span>
            </Link>
            <Link
              href="/analytics"
              className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary/50 transition-all group flex items-center gap-4"
            >
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <span className="material-icons-round text-2xl">analytics</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Detailed Analytics</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Deep dive into forecast models and drivers</p>
              </div>
              <span className="material-icons-round text-slate-400 ml-auto">arrow_forward</span>
            </Link>
          </div>
        </div>
        <div className="h-8" />
      </div>

      {/* Export Report Modal */}
      {showExport && <ExportReportModal onClose={() => setShowExport(false)} />}
    </DashboardLayout>
  );
}
