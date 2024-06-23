import { Link } from "react-router-dom";

import { Button } from "@nextui-org/react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const shop = [
  { href: "", title: "Fashion" },
  { href: "", title: "Jewelry" },
  { href: "", title: "Electronic" },
];

const help = [
  { href: "", title: "Contact Us" },
  { href: "", title: "FAQ" },
  { href: "", title: "Accessibility" },
];

export default function Footer() {
  return (
    <footer className="bg-deep-green-200 text-white py-10 text-sm">
      <div className="w-10/12 mx-auto py-5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-3xl">treeCard</h3>
          <div className="flex items-center gap-4">
            <FaTwitter />
            <FaFacebook />
            <FaInstagram />
          </div>
        </div>
        <div className="flex gap-10 md:gap-20 ">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">SHOP</h3>
            {shop.map((link) => (
              <Link to={link.href} key={link.title} className="text-sm">
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">HELP</h3>
            {help.map((link) => (
              <Link to={link.href} key={link.title} className="text-sm">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-2xl md:text-3xl">
              Sign up to get 10% off your first order
            </h3>
            <p>
              Footers do not have to be small or narrow.
              <br className="hidden md:block" /> Creativity applies to footers
              as much as the rest of the site.
            </p>
            <div className="mt-5">
              <Button className="bg-[#4DAF78] font-semibold rounded-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center mt-6">
        © 2021 Spline.One. All rights reserved.
      </p>
    </footer>
  );
}
