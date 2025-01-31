import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartModel from "../pages/products/CartModel";
// In index.js or App.js

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);
  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };
  return (
    <header className="fixed-nav-bar w-nav ">
      <nav className="max-w-screen-2xl mx-auto my-0 px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/product">Products</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            Ethereal Beauty <span>.</span>
          </Link>
        </div>
        {/* navicons */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-2-line"></i>
            </Link>
          </span>
          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-bag-4-fill"></i>
              <sup className="text-sm inline-block px-1.5 text-black rounded-full bg-primary text-center">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              <i className="ri-user-3-line"></i>
            </Link>
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
