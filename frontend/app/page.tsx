"use client";

import { useState } from "react";
import UploadForm from "@/components/UploadForm";
import ForecastForm from "@/components/ForecastForm";
import ForecastChart from "@/components/ForecastChart";

export default function Home() {
  const [uploaded, setUploaded] = useState(false);
  const [forecastData, setForecastData] = useState<any>(null);

  const handleUpload = () => {
    setUploaded(true);
    setForecastData(null); // Reset forecast when new data is uploaded
  };

  const handleForecast = (data: any) => {
    setForecastData(data);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📈 Sales Forecasting System
          </h1>
          <p className="text-gray-600">
            Upload your sales data and generate forecasts using ARIMA or Prophet models
          </p>
        </div>

        <div className="space-y-6">
          <UploadForm onUpload={handleUpload} />

          {uploaded && (
            <ForecastForm onForecast={handleForecast} />
          )}

          {forecastData && (
            <ForecastChart
              data={forecastData.forecast}
              metrics={forecastData.metrics}
              modelUsed={forecastData.model_used}
            />
          )}
        </div>
      </div>
    </main>
  );
}
