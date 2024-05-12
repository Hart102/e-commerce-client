import { Outlet } from "react-router-dom";
import Header from "../components/Navigation/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className="md:p-5 my-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
