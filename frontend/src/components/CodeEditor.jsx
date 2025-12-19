import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function CodeEditor({ onCodeChange }) {
  const [code, setCode] = useState(`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`);

  const [isRunning, setIsRunning] = useState(false);

  // notify parent when code changes
  useEffect(() => {
    if (onCodeChange) onCodeChange(code);
  }, [code, onCodeChange]);

  // const handleRun = async () => {
  //   setIsRunning(true);
  //   try {
  //     const res = await axios.post(`${API_BASE}/api/agent/analyze`, {
  //       code,
  //       logs: "",
  //     });
  //     alert("AI Suggestion: " + res.data.suggestion.summary);
  //   } catch (err) {
  //     console.error("Run failed:", err);
  //     alert("Run failed ❌");
  //   }
  //   setIsRunning(false);
  // };
  const handleRun = async () => {
    setIsRunning(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('❌ Please sign in first');
        setIsRunning(false);
        return;
      }

      const res = await axios.post(
        `${API_BASE}/api/agent/analyze`,
        {
          code,
          logs: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('AI Suggestion: ' + res.data.suggestion.summary);
    } catch (err) {
      console.error('Run failed:', err);

      if (err.response?.status === 401) {
        alert('❌ Session expired. Please sign in again.');
        localStorage.removeItem('token');
      } else {
        alert('Run failed ❌');
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-3">
      {/* Buttons */}
      <div className="flex gap-2 items-center">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium shadow-lg transition-all disabled:opacity-50"
        >
          ▶ {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Editor
          height="60vh"
          theme="vs-dark"
          language="javascript"
          value={code}
          onChange={(val) => setCode(val || '')}
        />
      </div>
    </div>
  );
}
