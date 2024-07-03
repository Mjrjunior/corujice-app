import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layout/app";
import { Orders } from "./pages/app/orders/orders";
import { Products } from "./pages/app/products/products";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {path: "/", element: <div>Home</div>},
            {path: "/orders", element: <Orders />},
            {path: "/products", element: <Products />}
        ]
    }
])