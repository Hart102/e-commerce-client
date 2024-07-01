import { Outlet } from "react-router-dom";
import {
  BiLogoProductHunt,
  BiUserPlus,
  BiCategoryAlt,
  BiCartAdd,
} from "react-icons/bi";
import Header from "@/components/Navigation/Header";
import SideBar from "@/components/Navigation/SideBar";
import { useState } from "react";

const links = [
  { icon: BiLogoProductHunt, title: "Products", href: "/dashboard/products" },
  { icon: BiCategoryAlt, title: "Categories", href: "/dashboard/categories" },
  { icon: BiCartAdd, title: "Orders", href: "/dashboard/orders" },
  { icon: BiUserPlus, title: "Customers", href: "/dashboard/customers" },
];

export default function DashboardLayout() {
  const [toggleStatus, setToggleStatus] = useState<boolean>(false);
  const toggle = () =>
    !toggleStatus ? setToggleStatus(true) : setToggleStatus(false);

  return (
    <div className="w-screen bg-deep-gray-300">
      <div className="w-full md:w-11/12 flex flex-col px-2 md:px- mx-auto md:py-4 text-dark-gray-100">
        <div className="w-full bg-white rounded-t-xl py-4">
          <Header onclick={() => toggle()} />
        </div>
        <div className="relative md:mt-5 md:flex gap-8 pb-5">
          <div
            className={`w-full md:w-4/12 h-screen md:h-fit md:px-3 md:py-4 rounded-xl md:border border-dotted
           absolute md:relative top-0 left-0 z-20 bg-white delay-150 duration-300 md:-translate-x-0 ${
             !toggleStatus ? "-translate-x-full" : "-translate-x-0"
           }`}
          >
            <SideBar
              status={true}
              sidebarlinks={links}
              urlCount={11}
              closeMenu={() => toggle()}
            />
          </div>
          <div className="w-full md:w-10/12 mx-auto flex flex-col gap-3 py-4 bg-white rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
