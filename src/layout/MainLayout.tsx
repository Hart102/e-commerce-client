import { Outlet } from "react-router-dom";
import Header from "../components/Navigation/Navbar";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="py-4 md:py-8 px-4 md:px-14">
        <Outlet />
      </div>
    </>
  );
}
