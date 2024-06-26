import { FaSearch } from "react-icons/fa";
import { BiCartAdd, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="w-full md:w-10/12 p-5 mx-auto flex items-center justify-between">
        <h1 className="font-bold text-3xl">FresCart</h1>
        <div className="w-5/12 flex items-center justify-between border rounded-lg px-4">
          <input
            type="text"
            placeholder="Search for products"
            className="py-2 w-96 outline-none"
          />
          <FaSearch className="text-deep-gray-100" />
        </div>
        <div className="flex items-center text-dark-gray-100 gap-5">
          <Link to="">
            <BiCartAdd size={23} />
          </Link>
          <Link to="">
            <BiUser size={23} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
