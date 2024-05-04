import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaBars, FaUserAlt, FaShoppingBag, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="w-screen text-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 py-4 md:py-8 px-4 md:px-14">
        <div className="w-full md:w-auto flex gap-4 items-center">
          <FaBars />
          <h2 className="text-2xl font-bold">Spline.One</h2>
        </div>

        <div className="w-full md:w-1/2 border rounded-md px-2 flex items-center gap-2">
          <FaSearch className="text-app-gray-100" />
          <Input
            size="sm"
            type="search"
            placeholder="Type to search..."
            classNames={{
              base: "h-10 border-0 outline-0",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal hover:border-0",
            }}
            style={{ outline: "0" }}
          />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to={""} className="flex items-center gap-2">
            <FaShoppingBag className="text-app-gray-100" />
            Cart
          </Link>

          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <FaUserAlt className="text-app-gray-100" />
                Account
              </div>
            </DropdownTrigger>
            <DropdownMenu
              variant="light"
              className="flex flex-col p-5 rounded text-sm"
            >
              <DropdownItem key="settings" className="my-1">
                <Link to={""}>My Settings</Link>
              </DropdownItem>
              <DropdownItem key="analytics" className="my-1">
                <Link to={""}>Analytics</Link>
              </DropdownItem>

              <DropdownItem key="logout" color="danger" className="my-1">
                <Link to={""}> Log Out</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
