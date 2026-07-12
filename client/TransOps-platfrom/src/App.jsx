import { useState } from 'react'
import Register from "./components/Register";
import Login from "./components/Login"
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import Admindash from './components/AdminDashboard';
import DriverDash from './components/DriverDashboard';
import './App.css'

function App() {
  const[view,setView]=useState('home');
  
  return (
    <>
    <Navbar setView={setView} />
      {view === 'home' && <><Hero /><Feature /></>}
      {view === 'login' && <Login setView={setView} />}
      {view === 'register' && <Register setView={setView} />}
      {view === 'admindashboard'&&<Admindash />}
      {view === 'DriverDash' && <DriverDash />}
   </>

            )
}

export default App
