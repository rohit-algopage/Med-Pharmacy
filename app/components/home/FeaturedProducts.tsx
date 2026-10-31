import ProductCard from "@/components/products/ProductCard";

const products = [
  { id: 1, name: "Vitamin C Tablets", price: 299 },
  { id: 2, name: "Digital Thermometer", price: 199 },
  { id: 3, name: "Hand Sanitizer", price: 149 },
  { id: 4, name: "Health Supplement", price: 399 },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="site-container">

        <h2 className="text-3xl font-bold">
          Featured Products
        </h2>

        <p className="text-gray-500 mt-2">
          Explore our popular healthcare products.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}