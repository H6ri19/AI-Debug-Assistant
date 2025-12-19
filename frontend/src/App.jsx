// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import CodeEditor from './components/CodeEditor';
import ScreenshotAnnotator from './components/ScreenshotAnnotator';
import SuggestionsPanel from './components/SuggestionsPanel';
import SignInModal from './components/signinModal';
import OAuthCallback from './pages/OAuthCallback';

export default function App() {
  const [code, setCode] = useState('');
  const [ocrLogs, setOcrLogs] = useState('');
  const [pulseActive, setPulseActive] = useState(true);

  const [stats, setStats] = useState({
    bugs: 0,
    warnings: 0,
    suggestions: 0,
  });

  const [showSignIn, setShowSignIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setPulseActive((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      {/* ================= MAIN APP ================= */}
      <Route
        path="/"
        element={
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-gray-800 to-indigo-900 text-gray-100">
            {/* Animations */}
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
              }
            `}</style>

            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-extrabold flex items-center gap-2">
                    ⚡ Multimodal Debug Assistant
                    <span
                      className={`w-2 h-2 bg-green-400 rounded-full ${
                        pulseActive ? 'animate-pulse' : ''
                      }`}
                    />
                  </h1>
                  <p className="text-sm text-indigo-200">
                    AI-powered code debugging
                  </p>
                </div>

                {user ? (
                  <span className="text-white">👋 Hi, {user}</span>
                ) : (
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg"
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-white/10 p-3 rounded">
                  <p className="text-xs">Bugs</p>
                  <p className="text-2xl text-red-400">{stats.bugs}</p>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <p className="text-xs">Warnings</p>
                  <p className="text-2xl text-yellow-400">{stats.warnings}</p>
                </div>
                <div className="bg-white/10 p-3 rounded">
                  <p className="text-xs">Suggestions</p>
                  <p className="text-2xl text-green-400">{stats.suggestions}</p>
                </div>
              </div>
            </header>

            {/* Main */}
            <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 space-y-6">
                <div className="bg-gray-900 p-5 rounded-xl">
                  <h2 className="text-indigo-400 mb-2">💻 Code Editor</h2>
                  <CodeEditor onCodeChange={setCode} />
                </div>

                <div className="bg-gray-900 p-5 rounded-xl">
                  <h2 className="text-pink-400 mb-2">🖼 Screenshot</h2>
                  <ScreenshotAnnotator
                    onOcrComplete={(text) => setOcrLogs(text)}
                  />
                </div>
              </section>

              <aside>
                <div className="bg-gray-900 p-5 rounded-xl">
                  <h2 className="text-green-400 mb-2">🤖 AI Suggestions</h2>
                  <SuggestionsPanel
                    code={code}
                    logs={ocrLogs}
                    onStatsUpdate={setStats}
                  />
                </div>
              </aside>
            </main>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-400 py-4">
              Built with ❤️ using Debug Assistant AI
            </footer>

            {/* Sign In Modal */}
            {showSignIn && (
              <SignInModal
                onClose={() => setShowSignIn(false)}
                onLogin={(email) => setUser(email)}
              />
            )}
          </div>
        }
      />

      {/* ================= OAUTH CALLBACK ================= */}
      <Route path="/oauth" element={<OAuthCallback />} />
    </Routes>
  );
}
