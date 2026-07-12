import { useState } from 'react'
import Register from "./components/Register";
import Login from "./components/Login"
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import './App.css'

function App() {
  const[view,setView]=useState('home');
  
  return (
    <>
    <Navbar setView={setView}/>
    {view==='home'&&(
    <>
    <Hero/>
    <Feature/>
    </>
  )}

  {view ==='login' && <Login/>}
  {view==='register'&&<Register/>}
   </>

            )
}

export default App
