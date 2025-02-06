import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import App from '../App';
import Home from "../pages/home/Home";
import BrandPage from '../pages/brands/BrandPage';
import Search from '../pages/search/Search';
import ProductPage from '../pages/products/ProductPage';
import SingleProduct from '../pages/products/SingleProduct';
import CheckoutPage from '../pages/products/CheckoutPage';

import Login from '../components/Login';
import Register from '../components/Register';
import Checkout from '../pages/products/CheckoutPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
        { path:"/", element: <Home/>},
        { path:"/brands/:brandName", element: <BrandPage/>},
        {path:"/search", element:<Search/>},
        {path:"/product", element:<ProductPage/>},
        {path:"/product/:id", element:<SingleProduct/>},
        {path:"/checkout", element:<CheckoutPage/>},
 
    ]
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/register",
    element:<Register/>
  }
]);

export default router;