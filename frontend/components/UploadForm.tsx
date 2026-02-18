"use client";

import { useState, useRef } from "react";
import { uploadCSV } from "@/lib/api";

interface UploadFormProps {
  onUpload: () => void;
}

interface UploadedFile {
  name: string;
  date: string;
  rows: number;
  status: "validated" | "processing" | "error";
  errorMessage?: string;
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    setCurrentFile(file.name);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 90));
    }, 200);

    try {
      const response = await uploadCSV(file);
      clearInterval(progressInterval);
      setProgress(100);

      setUploads((prev) => [
        {
          name: file.name,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          rows: response.rows,
          status: "validated",
        },
        ...prev,
      ]);
      onUpload();
    } catch (err: any) {
      clearInterval(progressInterval);
      setUploads((prev) => [
        {
          name: file.name,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          rows: 0,
          status: "error",
          errorMessage: err.message,
        },
        ...prev,
      ]);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setCurrentFile(null);
        setProgress(0);
      }, 500);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  };

  return (
    <div className="space-y-8">
      {/* Header Description */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Import Dataset</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
            Upload your raw sales history files here. The system accepts CSV and Excel (.xlsx) formats.
            Ensure your data includes columns for{" "}
            <code className="bg-slate-100 dark:bg-surface-lighter px-1.5 py-0.5 rounded text-xs font-mono text-primary">date</code>,{" "}
            <code className="bg-slate-100 dark:bg-surface-lighter px-1.5 py-0.5 rounded text-xs font-mono text-primary">sku</code>, and{" "}
            <code className="bg-slate-100 dark:bg-surface-lighter px-1.5 py-0.5 rounded text-xs font-mono text-primary">revenue</code>.
          </p>
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur" />
        <div
          className={`relative w-full h-64 border-2 border-dashed ${
            dragOver ? "border-primary bg-primary/5" : "border-slate-300 dark:border-slate-600"
          } hover:border-primary dark:hover:border-primary rounded-xl bg-slate-50 dark:bg-surface-dark flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-slate-100 dark:group-hover:bg-surface-lighter cursor-pointer`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
          />
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="material-icons text-primary text-3xl">cloud_upload</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Drag & drop files here</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">or click to browse from your computer</p>
          <button
            type="button"
            className="px-6 py-2.5 bg-white dark:bg-surface-lighter border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-lg hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-all shadow-sm font-medium text-sm"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            Select Files
          </button>
          <p className="mt-4 text-xs text-slate-400">Supported formats: CSV, XLSX (Max 50MB)</p>
        </div>
      </div>

      {/* Active Upload Progress */}
      {loading && currentFile && (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <span className="material-icons text-emerald-500">description</span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{currentFile}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Uploading...</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-icons">close</span>
            </button>
          </div>
          <div className="relative w-full h-2 bg-slate-100 dark:bg-surface-lighter rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{Math.round(progress)}% completed</span>
            <span>Processing...</span>
          </div>
        </div>
      )}

      {/* Recent Uploads Table */}
      {uploads.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Uploads</h3>
          </div>
          <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-surface-lighter border-b border-slate-200 dark:border-slate-700">
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">File Name</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Upload Date</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Records</th>
                    <th className="py-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {uploads.map((file, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-surface-lighter/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="material-icons text-slate-400">table_view</span>
                          <span className="font-medium text-slate-900 dark:text-white">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">{file.date}</td>
                      <td className="py-4 px-6 text-sm text-slate-500 dark:text-slate-400">
                        {file.rows > 0 ? file.rows.toLocaleString() : "-"}
                      </td>
                      <td className="py-4 px-6">
                        {file.status === "validated" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Validated
                          </span>
                        )}
                        {file.status === "processing" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Processing
                          </span>
                        )}
                        {file.status === "error" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Error
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
