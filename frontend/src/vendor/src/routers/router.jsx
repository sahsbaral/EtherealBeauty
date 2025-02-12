import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateProduct from '../page/shop/CreateProduct';
import AllProducts from '../page/shop/AllProducts';
import Dashboard from '../page/shop/Dashboard';
import EditProducts from '../page/shop/EditProducts';

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
                path: "dashboard-create-product", // Route for Create Product page
                element: <CreateProduct />,
            },
            {
                path: "dashboard-products", // Route for All Products page
                element: <AllProducts />,
            },
            {
                path: "edit-product/:id", // Route for Edit Product page
                element: <EditProducts />,
            },
        ],
    },
]);

export default router;
