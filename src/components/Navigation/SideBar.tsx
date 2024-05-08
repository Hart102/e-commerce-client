import { Link } from "react-router-dom";
import { FaHome, FaTimes } from "react-icons/fa";
import { sideBarLinks } from "./sidebarLinks";

export default function SideBar({
  activate,
  onclick,
}: {
  activate: boolean;
  onclick: () => void;
}) {
  return (
    <aside
      className={`md:block bg-white w-full md:w-[23%] fixed rounded-2xl h-full z-10 ${
        !activate ? "hidden" : "block absolute"
      }`}
    >
      <div className="flex flex-col gap-5 py-4 px-6 bg-white h-full rounded-2xl">
        <FaTimes className="block md:hidden self-end" onClick={onclick} />
        <Link to="/dashboard">
          <h2 className="text-2xl font-bold">Spline.One</h2>
        </Link>

        <div className="mt-5">
          <Link
            to={""}
            className="flex items-center gap-2 text-neutral-600 py-3 px-2 rounded-lg hover:bg-app-gray-50"
          >
            <FaHome />
            Dashboard
          </Link>

          <div className="mt-8">
            <p className="text-neutral-600 text-sm mb-5 px-2">
              Store Management
            </p>
            <div className="mt-5 flex flex-col gap-2">
              {sideBarLinks.map((sideLinks) => (
                <Link
                  key={sideLinks.title}
                  to={sideLinks.href}
                  className="flex items-center gap-2 text-neutral-600 py-3 px-2 rounded-lg hover:bg-app-gray-50 capitalize"
                >
                  <sideLinks.icon />
                  {sideLinks.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
