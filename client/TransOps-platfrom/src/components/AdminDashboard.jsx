import { useEffect, useState } from 'react';
import { API_BASE } from '../api.js';
import DashboardLayout from './DashboardLayout';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [recentTrips, setRecentTrips] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('transops-token');
    if (!token) {
      setError('Please login to view your dashboard.');
      return;
    }

    fetch(`${API_BASE}/api/dashboard/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Unable to load admin stats.');
        }
        setStats(data.totals);
        setVehicles(data.vehicles || []);
        setRecentTrips(data.recentTrips || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const summary = [
    { label: 'Vehicles', value: stats?.totalVehicles ?? 0 },
    { label: 'Active', value: stats?.activeVehicles ?? 0 },
    { label: 'Resting', value: stats?.restingVehicles ?? 0 },
    { label: 'Trips', value: stats?.totalTrips ?? 0 },
    { label: 'Deliveries', value: stats?.totalDeliveries ?? 0 },
    { label: 'Distance (km)', value: stats?.totalDistance ?? 0 },
  ];

  return (
    <DashboardLayout userRole="Admin" activeTab={activeTab} setActiveTab={setActiveTab}>
      {error && <div className="mb-6 rounded-3xl bg-red-50 p-4 text-red-700">{error}</div>}

      {activeTab === 'overview' && (
        <div>
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Admin Overview</h2>
              <p className="mt-2 text-slate-600">Quick insights into your fleet, routes, and costs.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {summary.map((item) => (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Vehicle Fleet</h3>
              <div className="mt-5 space-y-4">
                {vehicles.length ? (
                  vehicles.slice(0, 5).map((vehicle) => (
                    <div key={vehicle._id} className="rounded-2xl border border-slate-100 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500">{vehicle.number}</p>
                          <p className="font-semibold text-slate-900">{vehicle.status}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{vehicle.active ? 'Active' : 'Idle'}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">Capacity: {vehicle.capacity}</p>
                      <p className="text-sm text-slate-600">Distance: {vehicle.distanceTravelled} km</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600">No vehicle records available yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Recent Trips</h3>
              <div className="mt-5 space-y-4">
                {recentTrips.length ? (
                  recentTrips.map((trip) => (
                    <div key={trip._id} className="rounded-2xl border border-slate-100 p-4">
                      <p className="text-sm text-slate-500">{trip.source} → {trip.destination}</p>
                      <p className="mt-2 text-slate-900">Status: {trip.status}</p>
                      <p className="text-sm text-slate-600">Driver: {trip.driver?.name || 'Unknown'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600">No trips found yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Analytics</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Fuel & maintenance</h3>
              <p className="mt-4 text-slate-600">Monitor cost trends across your fleet and identify vehicles that need attention first.</p>
              <div className="mt-6 space-y-3 text-slate-600">
                <p><span className="font-semibold text-slate-900">Fuel cost:</span> ${stats?.totalFuelCost ?? 0}</p>
                <p><span className="font-semibold text-slate-900">Maintenance cost:</span> ${stats?.totalMaintenanceCost ?? 0}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Dispatch performance</h3>
              <p className="mt-4 text-slate-600">Track completed trips and identify routes that deliver the best efficiency.</p>
              <div className="mt-6 space-y-3 text-slate-600">
                <p><span className="font-semibold text-slate-900">Total trips:</span> {stats?.totalTrips ?? 0}</p>
                <p><span className="font-semibold text-slate-900">Total deliveries:</span> {stats?.totalDeliveries ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">System Settings</h2>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">The TransOps admin view is ready to manage vehicles, drivers, and dispatch operations.</p>
            <p className="mt-4 text-slate-500">Use this panel to connect analytics, onboard new drivers, or update fleet rules.</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}








