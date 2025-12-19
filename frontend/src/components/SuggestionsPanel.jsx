// src/components/SuggestionsPanel.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function SuggestionsPanel({
  code = '',
  logs = '',
  onStatsUpdate,
}) {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);

  // const runAnalysis = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.post(`${API_BASE}/api/agent/analyze`, { code, logs });
  //     const data = res.data.suggestion;
  //     setSuggestion(data);

  //     // Update stats in parent
  //     if (onStatsUpdate) {
  //       onStatsUpdate({
  //         bugs: data.summary.includes("TypeError") ? 1 : 0,
  //         warnings: data.summary.includes("Deprecated") ? 1 : 0,
  //         suggestions: 1,
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Run analysis failed:", err);
  //     setSuggestion({ summary: "❌ Failed to fetch AI suggestions" });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const runAnalysis = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setSuggestion({ summary: '❌ Please sign in to run analysis.' });
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${API_BASE}/api/agent/analyze`,
        { code, logs },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.suggestion;
      setSuggestion(data);

      // Update stats in parent
      if (onStatsUpdate) {
        onStatsUpdate({
          bugs: data.summary?.includes('TypeError') ? 1 : 0,
          warnings: data.summary?.includes('Deprecated') ? 1 : 0,
          suggestions: 1,
        });
      }
    } catch (err) {
      console.error('Run analysis failed:', err);

      if (err.response?.status === 401) {
        setSuggestion({ summary: '❌ Session expired. Please sign in again.' });
        localStorage.removeItem('token');
      } else {
        setSuggestion({ summary: '❌ Failed to fetch AI suggestions' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {suggestion ? (
        <div className="p-3 bg-gray-800 rounded border border-gray-600">
          <p className="font-medium text-gray-100">{suggestion.summary}</p>
          {suggestion.patch && (
            <pre className="mt-2 p-2 bg-gray-950 text-green-400 text-sm rounded overflow-x-auto">
              {suggestion.patch}
            </pre>
          )}
          <p className="text-xs text-gray-400 mt-1">
            Confidence: {suggestion.confidence ?? 'n/a'}
          </p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          No suggestions yet — click Run Analysis.
        </p>
      )}

      <button
        onClick={runAnalysis}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
      >
        {loading ? 'Analyzing...' : 'Run Analysis'}
      </button>
    </div>
  );
}
