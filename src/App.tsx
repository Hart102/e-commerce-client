import { createBrowserRouter } from "react-router-dom";
import "./App.css";
MainLayout;
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ShopSingle from "./pages/Shop-single";
import SingleProduct from "./pages/Single";

import CheckoutSummary from "./pages/checkoutSummary/summary";

import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/Add-products";
import Shipping from "./pages/shipping";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },

      { path: "/shop/:id", element: <ShopSingle /> },
      { path: "/shop/single", element: <SingleProduct /> },

      { path: "shop/summary", element: <CheckoutSummary /> },
      { path: "/shop/shipping", element: <Shipping /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/products", element: <Products /> },
      { path: "/dashboard/add-products", element: <AddProduct /> },
    ],
  },
]);
