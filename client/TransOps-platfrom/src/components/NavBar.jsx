import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar({ setView }) {
  const navLinks = ["Home", "About Us", "Features", "Contact"];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <h1 className="text-2xl font-bold text-blue-600">TransOps</h1>

        {/* Desktop Menu */}
        <div className="flex gap-8 items-center">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}

          <button 
            onClick={() => setView('login')}
            className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Login
          </button>

          <button 
            onClick={() => setView('register')}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
