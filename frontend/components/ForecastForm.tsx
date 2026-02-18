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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await getForecast(model, periods, frequency);
      onForecast(response);
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">2. Generate Forecast</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="prophet">Prophet</option>
            <option value="arima">ARIMA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periods to Forecast
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={periods}
            onChange={(e) => setPeriods(Number(e.target.value))}
            className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="D">Daily</option>
            <option value="W">Weekly</option>
            <option value="M">Monthly</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Forecasting..." : "Generate Forecast"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
