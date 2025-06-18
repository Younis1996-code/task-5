import { createBrowserRouter } from "react-router-dom";

import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import OrderList from "./pages/OrderList";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ViewProduct from "./pages/ViewProduct";
import DeleteProduct from "./components/DeleteProcut";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Products />,
        errorElement: <Error />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
        errorElement: <Error />,
      },
      {
        path: "/order",
        element: <OrderList />,
        errorElement: <Error />,
      },
      {
        path: "/add-product",
        element: <AddProduct />,
        errorElement: <Error />,
      },
      {
        path: "/edit-product/:id",
        element: <EditProduct />,
        errorElement: <Error />,
      },
      {
        path: "/view-product/:id",
        element: <ViewProduct />,
        errorElement: <Error />,
      },
      {
        path: "/delete-product/:id",
        element: <DeleteProduct />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/order",
    element: <OrderList />,
    errorElement: <Error />,
  },

  {
    path: "/login",
    element: <LogIn />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
]);

export default router;
