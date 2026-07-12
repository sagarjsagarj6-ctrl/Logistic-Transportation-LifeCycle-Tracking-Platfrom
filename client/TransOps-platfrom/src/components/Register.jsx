import { useEffect, useState } from 'react';
import { API_BASE } from '../api.js';

function Register({ setView, defaultRole }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: defaultRole || 'Driver', vehicleNumber: '', vehicleCapacity: 20 });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role: defaultRole || 'Driver' }));
  }, [defaultRole]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! Please login.');
        setTimeout(() => setView('login'), 1400);
      } else {
        setError(data.error || 'Registration failed.');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
      console.error('Error:', err);
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Create a TransOps account</h2>

        {error && <p className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
        {success && <p className="mb-4 rounded-lg bg-emerald-100 px-4 py-3 text-sm text-emerald-700">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Full Name</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
              placeholder="jane@example.com"
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
              placeholder="Choose a secure password"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Account type</span>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="Driver">Driver</option>
              <option value="Admin">Admin</option>
            </select>
          </label>

          {formData.role === 'Driver' && (
            <>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Vehicle Number</span>
                <input
                  type="text"
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="AB-01-XY-1234"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Vehicle capacity</span>
                <input
                  type="number"
                  min="1"
                  value={formData.vehicleCapacity}
                  onChange={(e) => setFormData({ ...formData, vehicleCapacity: Number(e.target.value) })}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 focus:border-blue-500 focus:outline-none"
                  placeholder="24"
                />
              </label>
            </>
          )}

          <button type="submit" className="w-full rounded-full bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <button type="button" onClick={() => setView('login')} className="font-semibold text-blue-600 hover:text-blue-700">
            Sign in
          </button>
        </p>
      </div>
    </section>
  );
}

export default Register;