import { Link } from "react-router-dom";
import {
  BiGridAlt,
  BiLogoProductHunt,
  BiUserPlus,
  BiCategoryAlt,
} from "react-icons/bi";

const sideBarLinks = [
  { icon: BiLogoProductHunt, title: "Products", href: "/dashboard_1/products" },
  { icon: BiUserPlus, title: "Customers", href: "/dashboard_1/customers" },
  { icon: BiCategoryAlt, title: "Categories", href: "/dashboard_1/categories" },
];

export default function SideBar() {
  return (
    <aside className="bg-white p-5 rounded-l-xl h-[93vh w-full md:w-3/12 hidden md:flex flex-col gap-8">
      <Link
        to="/dashboard_1/products"
        className="text-2xl font-bold first-letter:text-3xl"
      >
        Spline.One
      </Link>

      <div className="flex flex-col gap-4 text-neutral-500">
        <Link
          to="/dashboard_1/products"
          className="flex items-center gap-2 px-2 py-3 rounded hover:bg-main-gray"
        >
          <BiGridAlt size={18} />
          Dashboard
        </Link>

        <div className="flex flex-col gap-2">
          <p className="px-2 py-3 rounded bg-main-gray">PRODUCT MANAGEMENT</p>

          <div className="flex flex-col gap-2">
            {sideBarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 px-2 py-3 rounded hover:bg-main-gray"
              >
                <link.icon size={18} />
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
