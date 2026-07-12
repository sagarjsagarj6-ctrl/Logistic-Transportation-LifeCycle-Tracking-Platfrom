import { Truck } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-blue-700 to-blue-500 text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 items-center gap-10">

        <div>

          <h1 className="text-5xl font-bold leading-tight">
            Smart Fleet Management for Modern Businesses
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Track vehicles, optimize routes, reduce operational costs,
            and manage your fleet efficiently with TransOps.
          </p>

          <div className="mt-8 flex gap-4">

            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700">
              Learn More
            </button>

          </div>

        </div>

        <div className="flex justify-center">
          <Truck size={220} />
        </div>

      </div>
    </section>
  );
}

export default Hero;