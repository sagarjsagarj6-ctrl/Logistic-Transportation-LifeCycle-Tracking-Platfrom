import { useState } from 'react';

export default function DashboardLayout({ children, userRole, activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Hamburger Button */}
      <button 
        className="md:hidden p-4 text-slate-900" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Simple Hamburger Icon */}
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar - Controlled by isOpen state */}
      <aside className={`fixed md:static inset-y-0 left-0 bg-slate-900 text-white p-6 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 z-10`}>
        <h1 className="text-xl font-bold mb-8">TransOps {userRole}</h1>
        <nav className="space-y-4">
          <p className="text-gray-400 text-sm uppercase">Menu</p>
          <button 
            onClick={() => { setActiveTab('overview'); setIsOpen(false); }} 
            className={`block w-full text-left ${activeTab === 'overview' ? 'text-blue-400' : 'hover:text-blue-400'}`}>
            Overview
          </button>
          <button 
            onClick={() => { setActiveTab('analytics'); setIsOpen(false); }} 
            className={`block w-full text-left ${activeTab === 'analytics' ? 'text-blue-400' : 'hover:text-blue-400'}`}>
            Analytics
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setIsOpen(false); }} 
            className={`block w-full text-left ${activeTab === 'settings' ? 'text-blue-400' : 'hover:text-blue-400'}`}>
            Settings
          </button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}