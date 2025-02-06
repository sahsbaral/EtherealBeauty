import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from "../../utils/baseURL";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `${getBaseUrl()}/api/products/display_products`;  // Ensure correct URL from backend
      
      try {
        const response = await axios.get(apiUrl);  // Get data from backend
        setProducts(response.data);  // Set product data in state
      } catch (err) {
        setError('Error fetching products');
        console.error('Error fetching products from db:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Product Cards */}
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={product.product_id} className="bg-white shadow-lg rounded-lg p-4 border relative">
              

              {/* Product Image */}
              {product.image && (
                <div className="w-full h-64 mb-3 overflow-hidden">
                  <img
                    src={product.image}  // Full image URL
                    alt={product.name}
                    className="object-contain w-full h-full"
                    style={{ maxHeight: '200px', objectFit: 'contain' }}  // Ensure image is fully visible
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";  // Default image on error
                    }}
                  />
                </div>
              )}

              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold mt-2">${product.price}</p>
              <div className="text-sm text-gray-500 mt-2">
                <p>Category: {product.category}</p>
                <p>Brand: {product.brand}</p>
                <p>Skin Type: {product.skin_type_suitability}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
