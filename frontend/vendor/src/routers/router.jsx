import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateProduct from '../page/shop/CreateProduct'; // Corrected import path

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App serves as the layout
        children: [
            {
                path: "dashboard-create-product", // Define the route
                element: <CreateProduct />, // Specify the component for this route
            },
        ],
    },
]);

export default router;
