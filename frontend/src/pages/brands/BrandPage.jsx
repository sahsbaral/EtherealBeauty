import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductCards from "../products/ProductCards"


const BrandPage = () => {
  const { brandName } = useParams();
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.brand.toLowerCase() === brandName.toLowerCase()
    );
    setFilteredBrands(filtered);
  }, [brandName]);
  
  useEffect(() => {
   window.scrollTo(0,0);
  })

  return <>
  <section className="section__container bg-primary-light">
    <h2 className="section__header capitalize">{brandName}</h2>
  </section>

  {/* products card */}
  <div className="section__container">
<ProductCards products={filteredBrands}/>
</div>

  </>;
};

export default BrandPage;
