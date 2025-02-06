import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateProduct from '../page/shop/CreateProduct';
import AllProducts from '../page/shop/AllProducts';
import Dashboard from '../page/shop/Dashboard';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App serves as the layout
        children: [
            {
                path: "Dashboard", // Define the route
                element: <Dashboard />, // Specify the component for this route
            },
            {
                path: "dashboard-create-product", // Define the route
                element: <CreateProduct />, // Specify the component for this route
            },
            {
                path: "dashboard-products",
                element: <AllProducts/>,
            },
        
        ],
    },
]);

export default router;
