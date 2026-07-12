import { useState } from 'react';

function Register({ setView }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role:'Driver'});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registered successfully!");
        setView('login');
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" placeholder="Name" className="w-full p-2 mb-3 border rounded" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      <input type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
      <div className="mb-3">
  <label className="block mb-2 font-medium">
    Select Role
  </label>

  <select
    className="w-full p-2 border rounded"
    value={formData.role}
    onChange={(e) =>
      setFormData({
        ...formData,
        role: e.target.value,
      })
    }
  >
    <option value="Driver">Driver</option>
    <option value="Admin">Admin</option>
  </select>
</div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
      <p className="mt-4 text-center">Already have an account? <button type="button" onClick={() => setView('login')} className="text-blue-600">Login</button></p>
     
    </form>
  );
}

export default Register;