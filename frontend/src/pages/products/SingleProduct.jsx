import React from "react";
import { Link, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Product name</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>{" "}
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>{" "}
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">product name</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product img */}
          <div className="md:w-1/2 w-full">
            <img
              src="https://plus.unsplash.com/premium_vector-1721206074862-b28587e8fb81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt=""
              className="rounded-md w-full h-auto"
            />
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">Product Name</h3>
            <p className="text-xl text-primary mb-4 ">$100</p>
            <p className="text-gray-400  mb-4 ">this is description</p>
            {/* additional product info */}
            <div>
              <p>
                <strong>Category:</strong> Skincare
              </p>
              <p>
                <strong>Brand:</strong> Mamaearth
              </p>
              <p>
                <strong>Skin-Type:</strong> Sensitive
              </p>
            </div>
            <button className="mt-6 px-6 bg-primary text-white rounded-md">Add to Cart</button>
          </div>
        </div>
      </section>

 
    </>
  );
};

export default SingleProduct;
