import { useEffect, useState } from 'react';
import { API_BASE } from '../api.js';
import DashboardLayout from './DashboardLayout';

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('transops-token');
    if (!token) {
      setError('Please login to view your dashboard.');
      return;
    }

    fetch(`${API_BASE}/api/dashboard/driver`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Unable to load driver data.');
        }
        setInfo(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <DashboardLayout userRole="Driver" activeTab={activeTab} setActiveTab={setActiveTab}>
      {error && <div className="mb-6 rounded-3xl bg-red-50 p-4 text-red-700">{error}</div>}

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900">Welcome back, {info?.driver?.name || 'Driver'}</h2>
              <p className="mt-2 text-slate-600">Review your current trip status and vehicle summary below.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Deliveries completed</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{info?.stats?.deliveriesCompleted ?? 0}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Distance traveled</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{info?.stats?.totalDistance ?? 0} km</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Fuel cost</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">${info?.stats?.fuelCost ?? 0}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Vehicle status</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{info?.stats?.activeStatus || 'Idle'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Vehicle details</h3>
              <div className="mt-5 space-y-3 text-slate-600">
                <p><span className="font-semibold text-slate-900">Vehicle number:</span> {info?.vehicle?.number || 'N/A'}</p>
                <p><span className="font-semibold text-slate-900">Capacity:</span> {info?.vehicle?.capacity ?? 'N/A'}</p>
                <p><span className="font-semibold text-slate-900">Fuel cost:</span> ${info?.vehicle?.fuelCost ?? 0}</p>
                <p><span className="font-semibold text-slate-900">Maintenance cost:</span> ${info?.vehicle?.maintenanceCost ?? 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900">Current trip</h3>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">{info?.currentTrip?.status ?? 'No Active Trip'}</span>
            </div>
            {info?.currentTrip ? (
              <div className="mt-6 space-y-3 text-slate-600">
                <p><span className="font-semibold text-slate-900">Route:</span> {info.currentTrip.source} → {info.currentTrip.destination}</p>
                <p><span className="font-semibold text-slate-900">Distance:</span> {info.currentTrip.distance ?? 0} km</p>
                <p><span className="font-semibold text-slate-900">Deliveries:</span> {info.currentTrip.deliveriesCompleted}</p>
                <p><span className="font-semibold text-slate-900">Started:</span> {new Date(info.currentTrip.startTime).toLocaleString()}</p>
              </div>
            ) : (
              <p className="mt-6 text-slate-600">You don’t have a trip in progress right now. Check back after your next dispatch.</p>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Recent deliveries</h3>
            <div className="mt-5 space-y-4">
              {info?.completedTrips?.length ? (
                info.completedTrips.slice(0, 3).map((trip) => (
                  <div key={trip._id} className="rounded-2xl border border-slate-100 p-4">
                    <p className="text-sm text-slate-500">{trip.source} → {trip.destination}</p>
                    <p className="mt-2 text-slate-900">Completed deliveries: {trip.deliveriesCompleted}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-600">No completed trips yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Driver Analytics</h2>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">Analyze your recent performance and review efficiency metrics for your trips.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Upcoming deliveries</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{info?.currentTrip ? info.currentTrip.deliveriesCompleted : 0}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Trip distance</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{info?.currentTrip?.distance ?? 0} km</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Driver settings</h2>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-600">Driver profiles and access controls will be managed here. Check with your admin for routing updates and vehicle assignments.</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}







