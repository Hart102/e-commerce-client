import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navigation/NewNavbar";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="w-full md:w-10/12 mx-auto py-10 px-4 md:px-5">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
