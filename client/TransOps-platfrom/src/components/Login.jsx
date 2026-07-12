import { useState } from 'react';

function Login({ setView }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Logged in successfully!");
        localStorage.setItem('token', data.token); // Store token for later
        setView('dashboard'); 
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      <p className="mt-4 text-center">Don't have an account? <button type="button" onClick={() => setView('register')} className="text-blue-600">Register</button></p>
      <p className="mt-4 text-center"><button type="button" onClick={() => setView('admindashboard')} className="text-blue-600">AdminDemoLogin</button></p>
      <p className="mt-4 text-center"> <button type="button" onClick={() => setView('driverdashboard')} className="text-blue-600">DriverDemoLogin</button></p>

    </form>
  );
}

export default Login;