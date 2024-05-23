import { Link, useLocation } from "react-router-dom";
import { BiGridAlt, BiLogOut } from "react-icons/bi";
import { Button } from "@nextui-org/react";

export default function SideBar({
  status,
  sidebarlinks,
  urlCount,
}: {
  status?: boolean;
  sidebarlinks: { icon: React.ElementType; title: string; href: string }[];
  urlCount: number;
}) {
  const location = useLocation();

  return (
    <aside className="bg-white p-5 rounded-l-xl w-full md:w-3/12 hidden md:flex flex-col gap-8">
      <Link
        to="/dashboard_1/products"
        className="text-2xl font-bold first-letter:text-3xl"
      >
        Spline.One
      </Link>

      <div className="flex flex-col gap-4 justify-between">
        <Link
          to="/dashboard_1/products"
          className={`items-center gap-2 px-2 py-3 rounded hover:bg-deep-gray-300 ${
            status ? "flex" : "hidden"
          }`}
        >
          <BiGridAlt size={18} />
          Dashboard
        </Link>

        <div className="flex flex-col justify-between gap-2 md:h-[400px]">
          <div className="flex flex-col gap-2">
            <p className={`px-2 py-3 ${status ? "block" : "hidden"}`}>
              PRODUCT MANAGEMENT
            </p>

            <div className="flex flex-col gap-2">
              {sidebarlinks.map((link) => (
                <Link
                  key={link?.title}
                  to={link?.href}
                  className={`flex items-center gap-2 px-2 py-3 rounded ${
                    location.pathname.slice(urlCount).replace("-", " ") ==
                      link?.title.toLowerCase() && "bg-black text-white"
                  }`}
                >
                  <link.icon size={18} />
                  {link?.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="border-b"></div>
          <div>
            <Button className="flex items-center gap-2 bg-deep-gray-300 rounded">
              <BiLogOut />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
