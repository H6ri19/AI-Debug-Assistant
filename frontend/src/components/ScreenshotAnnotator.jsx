// src/components/ScreenshotAnnotator.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export default function ScreenshotAnnotator({ onOcrComplete }) {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setFile(f);
  };

  const runOcr = async () => {
    if (!file) return alert("Please upload an image first.");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${API_BASE}/api/files/ocr`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOcrText(res.data.text);
      if (onOcrComplete) onOcrComplete(res.data.text);
    } catch (err) {
      console.error("OCR failed:", err);
      setOcrText("❌ OCR failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Upload */}
      <label className="block cursor-pointer p-3 border border-gray-600 rounded bg-gray-800 hover:bg-gray-700">
        Upload Screenshot
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Run OCR */}
      {file && (
        <button
          onClick={runOcr}
          disabled={loading}
          className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-lg font-medium shadow-lg hover:shadow-pink-500/50 transition-all disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Screenshot"}
        </button>
      )}

      {/* Result */}
      {ocrText && (
        <div className="p-3 bg-gray-900 border border-gray-700 rounded text-sm text-gray-200 whitespace-pre-wrap">
          {ocrText}
        </div>
      )}
    </div>
  );
}
