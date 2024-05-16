import { Outlet } from "react-router-dom";

import SideBar from "../components/Navigation/Admin/SideBar";
import Header from "../components/Navigation/Admin/Header";

export default function DashboardLayout() {
  return (
    <div className="w-full relative md:p-5 flex">
      <SideBar />

      <div className="relative right-0 w-full flex flex-col gap-4">
        <Header />
        <div className="w-full p-5 flex flex-col gap-5 overflow-x-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
