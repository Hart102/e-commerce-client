import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { FaBars } from "react-icons/fa";

import SideBar from "../components/Navigation/SideBar";

export default function DashboardLayout() {
  const [isTrue, setIsTrue] = useState(false);

  const toggleSideBar = () => (!isTrue ? setIsTrue(true) : setIsTrue(false));

  return (
    <div className="flex">
      <SideBar activate={isTrue} onclick={() => toggleSideBar()} />
      <div className="w-full py-4 px-5 md:px-8">
        <div className="flex items-center md:justify-between mb-10 md:mb-16">
          <FaBars
            size={20}
            onClick={toggleSideBar}
            className="block md:hidden"
          />
          <div className="flex justify-end w-full">
            <BiBell size={20} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
