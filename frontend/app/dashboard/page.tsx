"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import UploadForm from "@/components/UploadForm";
import ForecastForm from "@/components/ForecastForm";
import ForecastChart from "@/components/ForecastChart";

export default function DashboardPage() {
  const router = useRouter();
  const [step, setStep] = useState<"upload" | "parameters" | "analytics">("upload");
  const [forecastData, setForecastData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleUpload = () => {
    setStep("parameters");
  };

  const handleForecast = (data: any) => {
    setForecastData(data);
    setStep("analytics");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Top Header */}
      <header className="h-16 bg-white dark:bg-[#15202b]/50 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white shrink-0">
            <span className="material-icons-round text-xl">insights</span>
          </div>
          <h1 className="text-lg font-bold">SalesForecast</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <span className="material-icons-round">logout</span>
          <span className="hidden md:inline text-sm">Logout</span>
        </button>
      </header>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-[#15202b] border-b border-slate-200 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Step 1: Upload */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === "upload"
                    ? "bg-primary text-white"
                    : step === "parameters" || step === "analytics"
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                }`}
              >
                {step === "parameters" || step === "analytics" ? (
                  <span className="material-icons-round text-xl">check</span>
                ) : (
                  <span className="material-icons-round text-xl">cloud_upload</span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Upload Data</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Import your sales CSV</p>
              </div>
            </div>

            {/* Connector */}
            <div className={`h-0.5 flex-1 mx-4 ${step !== "upload" ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`} />

            {/* Step 2: Parameters */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === "parameters"
                    ? "bg-primary text-white"
                    : step === "analytics"
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                }`}
              >
                {step === "analytics" ? (
                  <span className="material-icons-round text-xl">check</span>
                ) : (
                  <span className="material-icons-round text-xl">tune</span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Set Parameters</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Configure forecast model</p>
              </div>
            </div>

            {/* Connector */}
            <div className={`h-0.5 flex-1 mx-4 ${step === "analytics" ? "bg-green-500" : "bg-slate-200 dark:bg-slate-700"}`} />

            {/* Step 3: Analytics */}
            <div className="flex items-center gap-3 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === "analytics"
                    ? "bg-primary text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                }`}
              >
                <span className="material-icons-round text-xl">analytics</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">View Analytics</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Analyze forecast results</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto">
          {/* Step 1: Upload */}
          {step === "upload" && (
            <div className="space-y-6">
              <UploadForm onUpload={handleUpload} />
            </div>
          )}

          {/* Step 2: Parameters */}
          {step === "parameters" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Configure Your Forecast</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    Select your preferred forecasting model and adjust parameters to generate predictions.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("upload")}
                      className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
                    >
                      <span className="material-icons-round text-sm">arrow_back</span>
                      Back to Upload
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <ForecastForm onForecast={handleForecast} />
              </div>
            </div>
          )}

          {/* Step 3: Analytics */}
          {step === "analytics" && (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep("parameters")}
                  className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="material-icons-round text-sm">arrow_back</span>
                  Adjust Parameters
                </button>
                <button
                  onClick={() => setStep("upload")}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <span className="material-icons-round text-sm">cloud_upload</span>
                  Upload New Data
                </button>
              </div>

              {/* Forecast Chart */}
              <div className="bg-white dark:bg-[#15202b] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                <ForecastChart
                  data={forecastData?.forecast || []}
                  metrics={forecastData?.metrics}
                  modelUsed={forecastData?.model_used}
                />
              </div>

              {/* Metrics Cards */}
              {forecastData?.metrics && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <span className="material-icons-round text-xl">show_chart</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Mean Absolute Error</p>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          {forecastData.metrics.MAE.toFixed(2)}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#15202b] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400">
                        <span className="material-icons-round text-xl">trending_up</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Root Mean Square Error</p>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                          {forecastData.metrics.RMSE.toFixed(2)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
