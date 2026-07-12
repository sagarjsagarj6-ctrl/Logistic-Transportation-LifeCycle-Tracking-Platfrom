import { useState } from 'react';

import { API_BASE } from '../api.js';

function Login({ setView, onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin(data.user, data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
      console.error('Error:', err);
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Login to TransOps</h2>

        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="admin@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </label>

          <button type="submit" className="w-full rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <button type="button" onClick={() => setView('register')} className="font-semibold text-blue-600 hover:text-blue-700">
            Register
          </button>
        </p>
      </div>
    </section>
  );
}

export default Login;