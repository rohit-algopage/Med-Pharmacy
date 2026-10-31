type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 hover:shadow-lg transition">

      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
        💊
      </div>

      <h3 className="font-semibold mt-4">
        {product.name}
      </h3>

      <p className="text-green-700 font-bold mt-2">
        ₹{product.price}
      </p>

      <button className="w-full bg-green-700 text-white py-2 rounded-lg mt-4 hover:bg-green-800">
        Add to Cart
      </button>

    </div>
  );
}