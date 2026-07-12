import { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import Features from './components/Feature';
import RoleSelection from './components/RoleSelection';
import AdminDashboard from './components/AdminDashboard';
import DriverDashboard from './components/DriverDashboard';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);
  const [defaultRole, setDefaultRole] = useState('Driver');

  useEffect(() => {
    const storedUser = localStorage.getItem('transops-user');
    const storedToken = localStorage.getItem('transops-token');
    if (storedUser && storedToken) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setView(parsed.role === 'Admin' ? 'admindashboard' : 'driverdashboard');
    }
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('transops-token', token);
    localStorage.setItem('transops-user', JSON.stringify(userData));
    setUser(userData);
    setView(userData.role === 'Admin' ? 'admindashboard' : 'driverdashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('transops-token');
    localStorage.removeItem('transops-user');
    setUser(null);
    setView('home');
  };

  const navigate = (nextView, role = null) => {
    if (role) {
      setDefaultRole(role);
    }
    setView(nextView);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar user={user} setView={navigate} onLogout={handleLogout} />

      {view === 'home' && (
        <>
          <Hero onStart={() => navigate('roleSelect')} />
          <Features />
        </>
      )}

      {view === 'roleSelect' && <RoleSelection setView={navigate} />}

      {view === 'login' && <Login setView={navigate} onLogin={handleLogin} />}

      {view === 'register' && <Register setView={navigate} defaultRole={defaultRole} />}

      {view === 'admindashboard' && user?.role === 'Admin' && <AdminDashboard />}

      {view === 'driverdashboard' && user?.role === 'Driver' && <DriverDashboard />}

      {(view === 'admindashboard' || view === 'driverdashboard') && !user && (
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-xl font-medium text-red-600">Session expired. Please login again.</p>
          <button
            onClick={() => navigate('login')}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Re-authenticate
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
