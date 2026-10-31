const categories = [
  { name: "Medicines", icon: "💊" },
  { name: "Vitamins", icon: "🧴" },
  { name: "Personal Care", icon: "🧼" },
  { name: "Baby Care", icon: "🍼" },
  { name: "Healthcare Devices", icon: "🩺" },
  { name: "Ayurvedic", icon: "🌿" },
];

export default function CategorySection() {
  return (
    <section className="site-container py-16">
      <h2 className="text-3xl font-bold text-gray-900">
        Shop by Category
      </h2>

      <p className="text-gray-500 mt-2">
        Explore our healthcare collections.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-8">
        {categories.map((item) => (
          <div
            key={item.name}
            className="border rounded-xl p-6 text-center hover:shadow-md transition"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="font-semibold mt-4 text-gray-800">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}