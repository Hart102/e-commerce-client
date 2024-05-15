import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SingleProduct from "./pages/Single";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

import DashboardLayout from "./layout/DashboardLayout";
import AddProduct from "./pages/dashboard/Add-product";
import ProductsPage from "./pages/dashboard/Products";

// DASHBOARD

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },

      { path: "shop/cart", element: <Cart /> },
      { path: "/shop/checkout", element: <Checkout /> },
      { path: "/shop/single/:id", element: <SingleProduct /> },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/products", element: <ProductsPage /> },
      { path: "/dashboard/add-products", element: <AddProduct /> },
    ],
  },
]);
