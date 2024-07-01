import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/login";
import Categories_page from "@/pages/categories";
import SingleProduct from "@/pages/Single";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

// DASHBOARD
import DashboardLayout from "@/layout/DashboardLayout";
import AddProduct from "@/pages/dashboard/Add-product";
import ProductsPage from "@/pages/dashboard/Products";
import Orders from "@/pages/dashboard/Orders";
import Customers from "@/pages/dashboard/Customers";
import Categories from "@/pages/dashboard/Categories";
import ProductView from "@/pages/dashboard/ProductView";
import EditAndEditCategory from "@/pages/dashboard/CreateAndEditCategory";

// Reused
import SingleOrder from "@/pages/dashboard/SingleOrder";

// USER
import UserDasboardLayout from "@/layout/UserDasboardLayout";
import User from "@/pages/user/Address";
import UserOrder from "@/layout/OrdersLayout/index";
import Order from "@/pages/user/Orders";
import PaymentMethod from "@/pages/user/Profile";
import AccountSetting from "@/pages/user/AccountSetting";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/shop/:category", element: <Categories_page /> },

      { path: "shop/cart", element: <Cart /> },
      { path: "/shop/checkout", element: <Checkout /> },
      { path: "/shop/single/", element: <SingleProduct /> },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/products", element: <ProductsPage /> },
      { path: "/dashboard/product/:action", element: <AddProduct /> },
      { path: "/dashboard/orders", element: <Orders /> },
      { path: "/dashboard/order", element: <SingleOrder /> },
      { path: "/dashboard/customers", element: <Customers /> },
      { path: "/dashboard/categories", element: <Categories /> },
      {
        path: "/dashboard/categories/:action",
        element: <EditAndEditCategory />,
      },
      { path: "/dashboard/product-view", element: <ProductView /> },
    ],
  },
  {
    path: "/user",
    element: <UserDasboardLayout />,
    children: [
      {
        path: "/user/dashboard",
        element: <UserOrder />,
        children: [
          { path: "/user/dashboard/your-orders", element: <Order /> },
          {
            path: "/user/dashboard/single-order",
            element: <SingleOrder />,
          },
        ],
      },
      { path: "/user/dashboard/address", element: <User /> },
      { path: "/user/dashboard/profile", element: <PaymentMethod /> },
      { path: "/user/dashboard/settings", element: <AccountSetting /> },
    ],
  },
]);
