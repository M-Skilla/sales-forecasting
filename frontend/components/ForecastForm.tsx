"use client";

import { useState } from "react";
import { getForecast } from "@/lib/api";

interface ForecastFormProps {
  onForecast: (data: any) => void;
}

export default function ForecastForm({ onForecast }: ForecastFormProps) {
  const [model, setModel] = useState("prophet");
  const [periods, setPeriods] = useState(12);
  const [frequency, setFrequency] = useState("M");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confidence, setConfidence] = useState(95);
  const [seasonality, setSeasonality] = useState(true);
  const [outlierDetection, setOutlierDetection] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await getForecast(model, periods, frequency);
      onForecast(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col h-auto">
      <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-white">
        <span className="material-icons-round text-primary">tune</span>
        <h3 className="font-bold">Parameters</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1">
        {/* Time Horizon */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Time Horizon
          </label>
          <select
            value={periods}
            onChange={(e) => setPeriods(Number(e.target.value))}
            className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value={3}>Next 3 Months</option>
            <option value={6}>Next 6 Months</option>
            <option value={12}>Next 12 Months</option>
          </select>
        </div>

        {/* Algorithm Model */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Algorithm Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="arima">ARIMA</option>
            <option value="prophet">Prophet (Meta)</option>
          </select>
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full bg-background-light dark:bg-background-dark border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            <option value="D">Daily</option>
            <option value="W">Weekly</option>
            <option value="M">Monthly</option>
          </select>
        </div>

        {/* Confidence Interval Slider */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Confidence Interval
            </label>
            <span className="text-xs font-bold text-primary">{confidence}%</span>
          </div>
          <input
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
            min="80"
            max="99"
            type="range"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
          />
          <div className="flex justify-between mt-1 text-[10px] text-slate-400">
            <span>80%</span>
            <span>99%</span>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-700/50">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
              Include Seasonality
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={seasonality}
                onChange={(e) => setSeasonality(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
            </div>
          </label>
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">
              Outlier Detection
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={outlierDetection}
                onChange={(e) => setOutlierDetection(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary" />
            </div>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-icons-round text-sm">{loading ? "hourglass_empty" : "refresh"}</span>
          {loading ? "Forecasting..." : "Update Forecast"}
        </button>

        {error && (
          <div className="mt-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
