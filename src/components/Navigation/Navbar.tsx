import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaTools } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import { BiGridAlt, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getCartCount } from "@/lib";

const navBarLink = [
  { title: "Home", href: "" },
  { title: "Fashion", href: "" },
  { title: "Jewelry", href: "" },
  { title: "Electronics", href: "" },
];

export default function Header() {
  const [isTrue, setIsTrue] = useState<boolean>(false);
  const toggleMenu = () => (!isTrue ? setIsTrue(true) : setIsTrue(false));
  const [cartCount, setCartCount] = useState<string | number>();

  setInterval(() => {
    setCartCount(getCartCount());
  }, 3000);

  return (
    <nav className="w-screen bg-deep-green-1001 bg-deep-green-100 text-white border-b border-[#EAE4CE] sticky top-0 left-0 z-40">
      <div className="container relative mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 py-3 px-4 md:px-14 z-40">
        <div className="w-full md:w-auto flex gap-4 items-baseline justify-between">
          <Link to="/" className="text-2xl font-bold first-letter:text-3xl">
            Spline.One
          </Link>
          {!isTrue && (
            <FaBars onClick={toggleMenu} className="block md:hidden" />
          )}

          {isTrue && (
            <FaTimes onClick={toggleMenu} className="block md:hidden" />
          )}
        </div>
        <div
          className={`absolute md:relative top-[60px] md:top-0 w-full md:w-7/12 p-5
          md:p-0 flex flex-col-reverse md:flex-row justify-between gap-4 delay-150
          duration-300 z-10 bg-deep-gray-200 md:bg-transparent shadow md:shadow-none ${
            !isTrue
              ? "-translate-x-[30rem] md:-translate-x-0"
              : "-translate-x-0"
          }`}
        >
          <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 [&_a]:p-2 md:[&_a]:p-2">
            {navBarLink.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="w-11/12 md:w-auto hover:bg-black hover:text-white md:hover:bg-transparent md:hover:text-neutral-400"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="w-full md:w-auto flex items-center gap-8 pb-5 border-b md:border-0">
            <div className="w-full border rounded px-2 md:hidden flex items-center gap-4">
              <FaSearch className="text-deep-gray-100" />
              <Input
                size="sm"
                type="search"
                placeholder="Search for products..."
                classNames={{
                  base: "h-10 border-0 border-l",
                  mainWrapper: "h-full",
                  input: "text-small outline-0",
                  inputWrapper: "h-full",
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2 gap-8">
            <FaSearch className="hidden md:block" />
            <Link to="/shop/cart" className="flex items-center gap-">
              <BiCartAdd size={17} />
              <span className="bg-deep-red-100 text-white text-xs px-1.5 py-0.5 rounded-full -mt-5">
                {cartCount}
              </span>
            </Link>
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <BiGridAlt size={17} />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                variant="light"
                className="flex flex-col rounded text-sm bg-white shadow text-neutral-500 mt-1 px-0"
              >
                <DropdownItem
                  startContent={<FaTools />}
                  key="settings"
                  className="p-3 cursor-pointer hover:bg-deep-gray-200"
                >
                  <Link to={""}>My Account</Link>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  startContent={<BiLogOut />}
                  className="p-3 cursor-pointer hover:bg-deep-gray-200"
                >
                  <Link to={""}> Log Out</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
