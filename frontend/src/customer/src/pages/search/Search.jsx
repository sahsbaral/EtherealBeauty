import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access navigation state
import productsData from "../../data/products.json";
import ProductCards from "../products/ProductCards";

const Search = () => {
  const location = useLocation(); // Get location object
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Get skin type label from location state if available
  const { skinTypeLabel } = location.state || {};

  useEffect(() => {
    if (skinTypeLabel) {
      // Set search query based on skin type label if provided
      setSearchQuery(skinTypeLabel);

      // Filter products based on skin type label if provided
      const filteredBySkinType = productsData.filter(product =>
        product.skin_type_suitability.toLowerCase().includes(skinTypeLabel.toLowerCase())
      );
      setFilteredProducts(filteredBySkinType);
    }
  }, [skinTypeLabel]); // Run this effect when skinTypeLabel changes

  const handleSearch = () => {
    const queryLowerCase = searchQuery.toLowerCase();
    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(queryLowerCase) ||
        product.brand.toLowerCase().includes(queryLowerCase) ||
        product.description.toLowerCase().includes(queryLowerCase) ||
        product.skin_type_suitability.toLowerCase().includes(queryLowerCase) ||
        product.category.toLowerCase().includes(queryLowerCase)
    );

    setFilteredProducts(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Search Products</h2>
      </section>
      {/* Input field */}
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded"
          >
            Search
          </button>
        </div>
      </section>
      {/* Products card */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default Search;
