import { createBrowserRouter } from "react-router-dom";
import "./App.css";
MainLayout;
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ShopSingle from "./pages/Shop-single";
import SingleProduct from "./pages/Single";

import Cart from "./pages/Cart";

import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/Add-products";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

// DASHBOARD
import Porducts_1 from "./pages/dashboard_1/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "shop/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/shop/checkout", element: <Checkout /> },

      { path: "/shop/:id", element: <ShopSingle /> },
      { path: "/shop/single", element: <SingleProduct /> },
    ],
  },
  {
    path: "/dashboard_1/products",
    element: <Porducts_1 />,
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
