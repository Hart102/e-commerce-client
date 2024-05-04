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
      className={`md:w-3/12 border-r border-dotted md:block bg-white ${
        !activate ? "hidden" : "block absolute z-10 bg-white w-9/12"
      }`}
    >
      <div className="flex flex-col gap-5 py-4 px-6">
        <FaTimes className="block md:hidden self-end" onClick={onclick} />
        <Link to="/dashboard">
          <h2 className="text-2xl font-bold">Spline.One</h2>
        </Link>

        <div className="mt-5">
          <Link
            to={""}
            className="flex items-center gap-2 text-neutral-600 py-3 px-2 rounded hover:bg-neutral-600 hover:text-white"
          >
            <FaHome />
            Dashboard
          </Link>

          <div className="mt-10">
            <p className="text-neutral-600 text-sm mb-5 px-2">
              Store Management
            </p>
            <div className="mt-5 flex flex-col gap-4">
              {sideBarLinks.map((sideLinks) => (
                <Link
                  key={sideLinks.title}
                  to={sideLinks.href}
                  className="flex items-center gap-2 text-neutral-600 py-3 px-2 rounded hover:bg-neutral-600 hover:text-white"
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
