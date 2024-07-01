import { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown, FaSearch, FaTimes } from "react-icons/fa";
import { BiCartAdd, BiMenuAltLeft, BiGridAlt } from "react-icons/bi";
import { authentication_token, getCartCount } from "@/lib";
import axios from "axios";
import { api } from "@/lib";
import { CategoryWithProductCount } from "@/types/index";

export default function Navbar() {
  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<string | number>();
  const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);

  useEffect(() => {
    const FetchCategories = async () => {
      const { data } = await axios.get(`${api}/categories/fetch-all-categorie`);
      if (!data.error) {
        setCategories(data);
      }
    };
    FetchCategories();
  }, []);

  setInterval(() => {
    setCartCount(getCartCount());
  }, 3000);
  const Toggle = () => (!isOpen ? setIsOpen(true) : setIsOpen(false));
  const ChangeCategory = (cat: string) => navigation(`/shop/${cat}`);

  const dropDownClass = "my-1 hover:bg-deep-gray-50 py-1 rounded-md";
  return (
    <>
      <nav className="w-screen relative md:sticky md:-top-16 z-50 bg-white">
        <div className=" flex flex-col gap-2">
          <div className="border-b border-deep-gray-50">
            <div className="w-full md:w-11/12 px-5 py-3 md:py-4 md:px-14 mx-auto flex items-center justify-between">
              <Link
                to="/"
                className="font-bold text-3xl flex items-center gap-2"
              >
                <BiCartAdd size={30} className="text-deep-blue-100" />
                FreshCart
              </Link>
              <div className="w-5/12 hidden md:flex items-center justify-between border rounded-lg px-4 bg-white">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="py-2 w-96 text-dark-gray-100 outline-none text-sm"
                />
                <FaSearch className="text-deep-gray-100" />
              </div>
              <div className="flex items-center text-deep-gray-100 gap-8">
                <Link to="/shop/cart" className="relative">
                  <span className="bg-deep-red-100 text-white text-xs px-1.5 py-0.5 rounded-full absolute -top-3 -right-3">
                    {cartCount}
                  </span>
                  <BiCartAdd size={23} className="text-deep-blue-100" />
                </Link>
                <Button
                  onClick={Toggle}
                  size="sm"
                  className="px-0 block md:hidden"
                >
                  <BiMenuAltLeft size={23} className="text-dark-gray-100" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-11/12 mx-auto md:px-14 px-5 hidden md:flex gap-8 items-center pb-2">
            <Dropdown>
              <DropdownTrigger>
                <Button className="bg-deep-blue-100 text-white rounded-lg flex gap-2">
                  <BiGridAlt size={23} />
                  All Departments
                </Button>
              </DropdownTrigger>
              {categories && categories.length > 0 && (
                <DropdownMenu
                  aria-label="Static Actions"
                  className="bg-white capitalize text-dark-gray-100 text-sm shadow rounded mt-1 px-2 min-w-[200px]"
                >
                  {categories.map((category) => (
                    <DropdownItem
                      key={category.id}
                      onClick={() => {
                        ChangeCategory(category.name);
                      }}
                      className={dropDownClass}
                    >
                      {category.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              )}
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" className="p-0 text-dark-gray-100 flex">
                  Account
                  <FaAngleDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Static Actions"
                className="bg-white text-dark-gray-100 text-sm shadow rounded mt-3 px-2 w-[150px]"
              >
                <DropdownItem
                  onClick={() => navigation("/login")}
                  className={`${dropDownClass} ${
                    authentication_token == undefined ? "block" : "hidden"
                  }`}
                >
                  Signin
                </DropdownItem>
                <DropdownItem
                  className={`${dropDownClass} ${
                    authentication_token !== undefined ? "block" : "hidden"
                  }`}
                >
                  Logout
                </DropdownItem>
                <DropdownItem
                  className={`${dropDownClass} ${
                    authentication_token == undefined ? "block" : "hidden"
                  }`}
                >
                  Signup
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigation("/user/dashboard/settings")}
                  className={`${dropDownClass} ${
                    authentication_token !== undefined ? "block" : "hidden"
                  }`}
                >
                  My Account
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Mobile */}
        <div
          className={`block md:hidden w-screen h-screen absolute top-0 bg-white z-30 p-4 duration-300 delay-300 ${
            !isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="w-full flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="font-bold text-2xl flex items-center gap-2"
              >
                <BiCartAdd size={30} className="text-deep-blue-100" />
                FresCart
              </Link>
              <Button>
                <FaTimes
                  onClick={Toggle}
                  size={23}
                  className="text-dark-gray-100"
                />
              </Button>
            </div>
            <div className="w-full flex items-center justify-between border rounded-lg px-4 bg-white">
              <input
                type="text"
                placeholder="Search for products"
                className="py-2 w-96 text-dark-gray-100 outline-none"
              />
              <FaSearch className="text-deep-gray-100" />
            </div>
            <div className="flex flex-col gap-10">
              <Dropdown className="w-screen">
                <DropdownTrigger>
                  <Button className="bg-deep-blue-100 text-white rounded-lg flex gap-2">
                    <BiGridAlt size={23} />
                    All Departments
                  </Button>
                </DropdownTrigger>
                {categories && categories.length > 0 && (
                  <DropdownMenu
                    aria-label="Static Actions"
                    className="bg-white capitalize text-dark-gray-100 text-sm shadow rounded mt-1 px-2 min-w-[200px]"
                  >
                    {categories.map((category) => (
                      <DropdownItem
                        key={category.id}
                        onClick={() => {
                          ChangeCategory(category.name);
                        }}
                        className={dropDownClass}
                      >
                        {category.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Dropdown>
              <Dropdown className="w-screen">
                <DropdownTrigger>
                  <div className="p-0 text-dark-gray-100 flex items-center gap-2">
                    Account
                    <FaAngleDown />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  className="bg-white text-dark-gray-100 text-sm px-2 w-[150px]"
                >
                  <DropdownItem
                    onClick={() => navigation("/login")}
                    className={`${dropDownClass} ${
                      authentication_token == undefined ? "block" : "hidden"
                    }`}
                  >
                    <Link to="">Signin</Link>
                  </DropdownItem>
                  <DropdownItem
                    className={`${dropDownClass} ${
                      authentication_token !== undefined ? "block" : "hidden"
                    }`}
                  >
                    <Link to="">Logout</Link>
                  </DropdownItem>
                  <DropdownItem
                    className={`${dropDownClass} ${
                      authentication_token == undefined ? "block" : "hidden"
                    }`}
                  >
                    <Link to="">Signup</Link>
                  </DropdownItem>
                  <DropdownItem
                    className={`${dropDownClass} ${
                      authentication_token !== undefined ? "block" : "hidden"
                    }`}
                  >
                    <Link to="">My Account</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
