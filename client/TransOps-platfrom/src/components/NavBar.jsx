import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    "Home",
    "About Us",
    "Features",
    "Contact",
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-2xl font-bold text-blue-600">
          TransOps
        </h1>

        {/* Desktop Menu */}

        <div className="hidden md:flex gap-8 items-center">

          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}

          <button className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50">
            Login
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
            Register
          </button>

        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {open && (
        <div className="md:hidden bg-white px-6 pb-5 space-y-4">

          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "")}`}
              className="block text-gray-700"
            >
              {item}
            </a>
          ))}

          <button className="w-full border border-blue-600 py-2 rounded-lg text-blue-600">
            Login
          </button>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Register
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;