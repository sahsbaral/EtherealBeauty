import React from 'react';
import { Link } from 'react-router-dom';
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";

const Brands = () => {
  const Brands = [
    { name: 'Cetaphil', path: 'cetaphil', image: category1 },
    { name: 'Mamaearth', path: 'Mamaearth', image: category2 },
    { name: 'Aqualogica', path: 'Aqualogica', image: category3 },
    { name: 'DermaCo', path: 'DermaCo', image: category4 },
  ];

  return (
    <>
        <h3 className='section__header'>Explore our brands</h3>
      <div className='product__grid'>
        {Brands.map((brand) => (
          <Link
            key={brand.name} // Add a unique key
            to={`/brands/${brand.path}`} // Use backticks for template literals
            className='categories__card'
          >
            <img src={brand.image} alt={brand.name} />
            <h4>{brand.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Brands;
