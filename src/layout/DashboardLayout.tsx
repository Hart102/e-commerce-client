import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import SideBar from "../components/Navigation/SideBar";

export default function DashboardLayout() {
  const [isTrue, setIsTrue] = useState(false);

  const toggleSideBar = () => (!isTrue ? setIsTrue(true) : setIsTrue(false));

  return (
    <div className="w-full relative md:p-5 flex">
      <SideBar activate={isTrue} onclick={() => toggleSideBar()} />

      <div className="flex flex-col gap-4 w-full md:w-[72%] md:absolute right-3 rounded-2xl p-2">
        <div className="flex items-center gap-4">
          <div className="flex">
            <FaAngleLeft className="cursor-pointer" onClick={toggleSideBar} />
            <FaAngleRight className="cursor-pointer" onClick={toggleSideBar} />
          </div>
          <div className="flex justify-end w-full">
            <BiBell size={20} />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
