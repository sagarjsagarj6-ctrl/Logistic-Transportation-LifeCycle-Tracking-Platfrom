// components/AdminDashboard.jsx
import { useState } from 'react';
import DashboardLayout from './DashboardLayout';

export default function Admindash() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout userRole="Admin" activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-gray-500">Total Shipments</h3>
              <p className="text-2xl font-bold">1,284</p>
            </div>
            {/* Add more widgets here */}
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">System Settings</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p>Manage system configurations and user roles here.</p>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}









