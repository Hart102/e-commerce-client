import { createBrowserRouter } from "react-router-dom";
import "./App.css";
MainLayout;
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ShopSingle from "./pages/Shop-single";

import DashboardLayout from "./layout/DashboardLayout";
import Products from "./pages/dashboard/Products";
import AddProduct from "./pages/dashboard/Add-products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/online-store/shop-single/:id", element: <ShopSingle /> },
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
