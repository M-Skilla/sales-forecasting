"use client";

import { useState } from "react";
import { uploadCSV } from "@/lib/api";

interface UploadFormProps {
  onUpload: () => void;
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await uploadCSV(file);
      setMessage(`✅ ${response.message} (${response.rows} rows)`);
      onUpload();
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">1. Upload Sales Data</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={loading}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
      />
      {loading && <p className="mt-2 text-blue-600">Uploading...</p>}
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {error && <p className="mt-2 text-red-600">{error}</p>}
    </div>
  );
}
