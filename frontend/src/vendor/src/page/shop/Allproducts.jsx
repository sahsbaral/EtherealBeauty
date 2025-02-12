import { useEffect, useState } from "react";
import axios from "axios";

export default function VendorProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vendor/products") // Replace with your backend URL
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching vendor products:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard - All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <div className="mt-2 flex space-x-2">
                <button className="px-4 py-2 bg-green-500 text-white rounded">Edit</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found. Start adding new products.</p>
        )}
      </div>
    </div>
  );
}
