import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { getBaseUrl } from "../../utils/baseURL";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `${getBaseUrl()}/api/products/display_vendor_products`;

      try {
        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
        console.error('Error fetching products from db:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p>{error}</p>}
      {products.map((product, index) => (
        <div key={product.product_id} className="bg-white p-4 shadow-lg rounded-lg">
          <div className="text-sm text-gray-500 mb-2">
            #{index + 1} {/* Serial Order */}
          </div>

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
            <p> Brand: {product.brand}</p>
          </div>

          {/* Edit Button */}
          <div className="mt-4">
            <Link
              to={`/edit-product/${product.product_id}`} // Link to Edit Page
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
