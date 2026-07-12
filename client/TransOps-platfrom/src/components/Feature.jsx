import {
  MapPinned,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Live GPS Tracking",
    desc: "Monitor every vehicle in real-time with accurate GPS.",
    icon: MapPinned,
  },
  {
    title: "Fleet Security",
    desc: "Protect vehicles with smart monitoring and alerts.",
    icon: ShieldCheck,
  },
  {
    title: "Analytics Dashboard",
    desc: "Gain insights into fuel, trips, and fleet performance.",
    icon: BarChart3,
  },
];

function Features() {
  return (
    <section
      id="features"
      className="py-20 bg-gray-100"
    >

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Powerful Features
        </h2>

        <p className="text-center text-gray-500 mt-3">
          Everything needed to manage your fleet efficiently.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 transition"
            >
              <feature.icon
                size={45}
                className="text-blue-600"
              />

              <h3 className="text-2xl font-semibold mt-5">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {feature.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;