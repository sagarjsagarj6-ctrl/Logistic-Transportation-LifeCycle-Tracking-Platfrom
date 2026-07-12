function Navbar({ user, onLogout, setView }) {
  const navLinks = ['Home', 'About Us', 'Features', 'Contact'];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white grid place-items-center font-bold">T</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">TransOps</h1>
            <p className="text-sm text-slate-500">Fleet lifecycle tracking</p>
          </div>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-slate-700 hover:text-blue-600 transition">
              {item}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {user ? (
            <>
              <button onClick={() => setView(user.role === 'Admin' ? 'admindashboard' : 'driverdashboard')} className="rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                Dashboard
              </button>
              <button onClick={onLogout} className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setView('login')} className="rounded-full border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50">
                Login
              </button>
              <button onClick={() => setView('register')} className="rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
