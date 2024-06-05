import { useRef } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/Navigation/SideBar";
import { BiBell, BiCreditCard, BiCartAdd, BiGridAlt } from "react-icons/bi";
import { FaMapMarkerAlt, FaToggleOn } from "react-icons/fa";
import Navbar from "@/components/Navigation/Navbar";

const links = [
  { icon: BiCartAdd, title: "Your Orders", href: "" },
  { icon: FaToggleOn, title: "Settings", href: "/user/dashboard/settings" },
  {
    icon: BiCreditCard,
    title: "Payment method",
    href: "/user/dashboard/payment-method",
  },
  { icon: FaMapMarkerAlt, title: "Address", href: "/user/dashboard/address" },
  { icon: BiBell, title: "Notification", href: "" },
];

export default function UserDasboardLayout() {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    if (sidebarRef?.current?.classList.contains("-translate-x-full")) {
      sidebarRef?.current?.classList.remove("-translate-x-full");
    } else {
      sidebarRef?.current?.classList.add("-translate-x-full");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen bg-white">
        <div className="w-full md:w-10/12 mx-auto relative flex">
          <div
            ref={sidebarRef}
            className="w-full md:w-3/12 min-h-screen absolute md:fixed 
            md:left-10 delay-150 duration-300 -translate-x-full md:-translate-x-0 py-10 md:py-0 z-20"
          >
            <SideBar
              status={false}
              sidebarlinks={links}
              urlCount={16}
              closeMenu={() => handleToggle()}
            />
          </div>
          <div className="w-full bg-white md:w-9/12 min-h-screen py-5 px-10 flex flex-col gap-5 border-l md:absolute right-0">
            <div
              onClick={handleToggle}
              className="flex md:hidden z-20 -ml-4 items-center gap-1 w-[80px]"
            >
              <BiGridAlt />
              menu
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

// -translate-x-full md:-translate-x-0 z-20 delay-150 duration-300 mt-10 md:pt-0
