import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AllProducts from '../page/shop/AllProducts';
import Dashboard from '../page/shop/Dashboard';
import Vendors from '../page/shop/Vendors';
import Customers from '../page/shop/Customers';
import Inventory from '../page/shop/Inventory';
import SuperOrders from '../page/shop/SuperOrders';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App serves as the layout (with Sidebar)
        children: [
            {
                path: "dashboard",  // Root route for Dashboard
                element: <Dashboard />, // Dashboard page will render here
            },
            {
                path: "dashboard-orders", 
                element: <SuperOrders />,
            },
            {
                path: "dashboard-products", // Route for All Products page
                element: <AllProducts />,
            },
            {
                path: "total_vendors", // Route for Edit Product page
                element: <Vendors />,
            },
            {
                path: "total_customers", // Route for Edit Product page
                element: <Customers />,
            },
            {
                path: "inventory", // Route for Edit Product page
                element: <Inventory />,
            },
        ],
    },
]);

export default router;
