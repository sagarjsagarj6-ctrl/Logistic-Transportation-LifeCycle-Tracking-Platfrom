function RoleSelection({ setView }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Choose your path</p>
          <h2 className="mt-4 text-4xl font-bold text-slate-900">Admin or Driver? Start your journey with TransOps.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Select the role that matches your work and continue to the dedicated login or registration experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Admin</h3>
            <p className="mt-4 text-slate-600">Monitor the fleet, analyze costs, and manage dispatch from one central dashboard.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setView('login', 'Admin')} className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                Login
              </button>
              <button onClick={() => setView('register', 'Admin')} className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50">
                Register
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900">Driver</h3>
            <p className="mt-4 text-slate-600">View trips, clock in, and keep track of performance for your assigned vehicle.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setView('login', 'Driver')} className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                Login
              </button>
              <button onClick={() => setView('register', 'Driver')} className="rounded-full border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-50">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoleSelection;
