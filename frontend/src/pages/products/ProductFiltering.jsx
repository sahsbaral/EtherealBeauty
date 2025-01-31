import React from "react";

const ProductFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3 className="font-bold text-xl">Filters</h3>

      {/* Category Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-2">{category}</span>
          </label>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Brand</h4>
        <hr />
        {filters.brands.map((brand) => (
          <label key={brand} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={filtersState.brand === brand}
              onChange={(e) =>
                setFiltersState({ ...filtersState, brand: e.target.value })
              }
            />
            <span className="ml-2">{brand}</span>
          </label>
        ))}
      </div>

      {/* Skin Type Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Skin Type</h4>
        <hr />
        {filters.skinTypes.map((skinType) => (
          <label key={skinType} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="skinType"
              value={skinType}
              checked={filtersState.skinType === skinType}
              onChange={(e) =>
                setFiltersState({ ...filtersState, skinType: e.target.value })
              }
            />
            <span className="ml-2">{skinType}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={
                filtersState.priceRange === `${range.min}-${range.max}`
              }
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-2">{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFiltering;
