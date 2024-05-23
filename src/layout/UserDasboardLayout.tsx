import { Outlet } from "react-router-dom";
import SideBar from "@/components/Navigation/SideBar";
import { BiBell, BiCreditCard, BiCartAdd } from "react-icons/bi";
import { FaMapMarkerAlt, FaToggleOn } from "react-icons/fa";

const links = [
  { icon: BiCartAdd, title: "Your Orders", href: "" },
  { icon: FaToggleOn, title: "Settings", href: "" },
  {
    icon: BiCreditCard,
    title: "Payment method",
    href: "/user/dashboard/payment-method",
  },
  { icon: FaMapMarkerAlt, title: "Address", href: "/user/dashboard/address" },
  { icon: BiBell, title: "Notification", href: "" },
];

export default function UserDasboardLayout() {
  return (
    <div className="bg-white w-full min-h-screen py-14">
      <div className="w-full md:w-10/12 mx-auto relative flex">
        <SideBar status={false} sidebarlinks={links} urlCount={16} />
        <div className="w-full py-5 px-10 flex flex-col gap-5 border-l">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
