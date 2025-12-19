// src/pages/SignIn.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

export default function SignIn({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setMessage('✅ Logged in!');

      if (onLogin) onLogin(email, res.data.token);
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      setMessage('❌ Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-xl w-96 shadow-2xl border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            Sign In
          </button>
        </form>

        {message && <p className="mt-3 text-sm">{message}</p>}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-400 hover:text-white underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
