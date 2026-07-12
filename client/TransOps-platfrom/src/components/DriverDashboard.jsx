// components/DriverDashboard.jsx
import DashboardLayout from './DashboardLayout';

export default function DriverDash() {
  return (
    <DashboardLayout userRole="Driver">
      <h2 className="text-2xl font-bold mb-6">My Deliveries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-700">Active Shipment</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">TRK-8829</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">View Details</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="font-semibold text-gray-700">Today's Goal</h3>
          <p className="text-lg mt-2">4 Deliveries Remaining</p>
        </div>
      </div>
    </DashboardLayout>
  );
}






