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
      <div
        // ref={sidebarRef}
        className="w-full md:w-[300px] min-h-screen absolute md:fixed rounded-l-2xl border-r border-dotted
            md:left-3 delay-150 duration-300 -translate-x-full md:-translate-x-0 py-10 md:py-0 -z-10"
      >
        <SideBar status={true} sidebarlinks={links} urlCount={11} />
      </div>

      <div className="absolute right-4 w-full md:w-9/12 flex flex-col gap-4">
        <Header />
        <div className="w-full p-5 flex flex-col gap-5 overflow-x-scroll md:overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
