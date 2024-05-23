import { Outlet } from "react-router-dom";
import {
  BiLogoProductHunt,
  BiUserPlus,
  BiCategoryAlt,
  BiCartAdd,
} from "react-icons/bi";
import SideBar from "@/components/Navigation/SideBar";
import Header from "@/components/Navigation/Header";

const links = [
  { icon: BiLogoProductHunt, title: "Products", href: "/dashboard/products" },
  { icon: BiCategoryAlt, title: "Categories", href: "/dashboard/categories" },
  { icon: BiCartAdd, title: "Orders", href: "/dashboard/orders" },
  { icon: BiUserPlus, title: "Customers", href: "/dashboard/customers" },
];

export default function DashboardLayout() {
  return (
    <div className="w-full relative md:p-5 flex">
      <SideBar status={true} sidebarlinks={links} urlCount={11} />

      <div className="relative right-0 w-full flex flex-col gap-4">
        <Header />
        <div className="w-full p-5 flex flex-col gap-5 overflow-x-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
