"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import UploadForm from "@/components/UploadForm";

export default function UploadPage() {
  const [uploadCount, setUploadCount] = useState(0);

  const handleUpload = () => {
    setUploadCount((prev) => prev + 1);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="h-16 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-8">
        <div className="hidden md:block">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Upload Sales Data</h1>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <span className="font-bold text-lg">Upload Data</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-surface-lighter transition-colors relative">
            <span className="material-icons">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark" />
          </button>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <UploadForm onUpload={handleUpload} />
        </div>
      </div>
    </DashboardLayout>
  );
}
