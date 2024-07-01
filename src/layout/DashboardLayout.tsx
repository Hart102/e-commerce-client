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
      <div className="w-full md:w-11/12 flex flex-col px-2 md:px-5 mx-auto md:py-4 text-dark-gray-100">
        <div className="w-full bg-white rounded-t-xl py-4">
          <Header onclick={() => toggle()} />
        </div>
        <div className="relative md:mt-5 md:flex gap-8 pb-5">
          <div
            className={`w-full md:w-4/12 h-screen md:h-fit md:px-2 md:py-4 rounded-xl md:border border-dotted
           absolute md:relative top-0 left-0 z-20 bg-white delay-150 duration-300 md:-translate-x-0 ${
             !toggleStatus ? "-translate-x-full" : "-translate-x-0"
           }`}
          >
            <SideBar status={true} sidebarlinks={links} urlCount={11} />
          </div>
          <div className="w-full md:w-10/12 mx-auto flex flex-col gap-3 py-4 bg-white rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full relative md:p-5 flex">
    //   <div
    //     // ref={sidebarRef}
    //     className="w-full md:w-[300px] min-h-screen absolute md:fixed rounded-l-2xl border-r border-dotted
    //         md:left-3 delay-150 duration-300 -translate-x-full md:-translate-x-0 py-10 md:py-0 -z-10"
    //   >
    //     <SideBar status={true} sidebarlinks={links} urlCount={11} />
    //   </div>

    //   <div className="absolute right-4 w-full md:w-9/12 flex flex-col gap-4">
    //     <Header />
    //     <div className="w-full p-5 flex flex-col gap-5 overflow-x-scroll md:overflow-x-hidden">
    //       <Outlet />
    //     </div>
    //   </div>
    // </div>
  );
}
