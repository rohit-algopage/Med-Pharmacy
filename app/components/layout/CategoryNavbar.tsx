import Link from "next/link";

const categories = [
  "Medicines",
  "Vitamins & Supplements",
  "Personal Care",
  "Healthcare Devices",
  "Baby Care",
  "Ayurvedic",
];

export default function CategoryNavbar() {
  return (
    <nav className="bg-white border-b">
      <div className="site-container flex gap-8 overflow-x-auto py-3">

        {categories.map((category) => (
          <Link
            key={category}
            href="/products"
            className="text-sm font-medium text-gray-700 hover:text-green-700 whitespace-nowrap"
          >
            {category}
          </Link>
        ))}

      </div>
    </nav>
  );
}