import { Outlet } from "react-router-dom";
// import Header from "@/components/Navigation/Navbar";
import Navbar from "@/components/Navigation/NewNavbar";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="md:p-5 my-10 hidden1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
