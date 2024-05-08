import { Outlet } from "react-router-dom";
import Header from "../components/Navigation/Navbar";

export default function MainLayout() {
  return (
    <>
      <Header />
      {/* <div className="w-full py-4 md:py-8 px-41 md:px-14"> */}
      <div className="container1 mx-auto1 md:p-5">
        <Outlet />
      </div>
      {/* </div> */}
    </>
  );
}
