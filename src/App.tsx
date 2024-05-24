import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import SingleProduct from "./pages/Single";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";

// DASHBOARD
import DashboardLayout from "./layout/DashboardLayout";
import AddProduct from "./pages/dashboard/Add-product";
import ProductsPage from "./pages/dashboard/Products";
import Orders from "./pages/dashboard/Orders";
import SingleOrder from "./pages/dashboard/SingleOrder";
import Customers from "./pages/dashboard/Customers";
import Categories from "./pages/dashboard/Categories";

// USER
import User from "./pages/user/Address"
import UserDasboardLayout from "./layout/UserDasboardLayout";
import PaymentMethod from "./pages/user/PaymentMethod";
import AccountSetting from "@/pages/user/AccountSetting";

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
      { path: "/dashboard/orders", element: <Orders /> },
      { path: "/dashboard/orders/:id", element: <SingleOrder /> },
      { path: "/dashboard/customers", element: <Customers /> },
      { path: "/dashboard/categories", element: <Categories /> },
    ],
  },
  {
    path: "/user",
    element: <UserDasboardLayout />,
    children: [
      { path: "/user/dashboard/address", element: <User /> },
      { path: "/user/dashboard/payment-method", element: <PaymentMethod /> },
      { path: "/user/dashboard/settings", element: <AccountSetting /> },
    ],
  },
]);
