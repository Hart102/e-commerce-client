import { Link } from "react-router-dom";

// import { Button } from "@nextui-org/react";
// import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const shop = [
  { href: "", title: "Fashion" },
  { href: "", title: "Jewelry" },
  { href: "", title: "Electronic" },
];

// const help = [
//   { href: "", title: "Contact Us" },
//   { href: "", title: "FAQ" },
//   { href: "", title: "Accessibility" },
// ];

export default function Footer() {
  return (
    <footer className="bg-deep-gray-50 text-dark-gray-100">
      <div className="w-full md:w-10/12 mx-auto px-4 py-10 [&_h2]:text-xl [&_h2]:font-semibold grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3 text-sm">
          <h2>Categories</h2>
          {shop.map((item) => (
            <ul key={item.title}>
              <li>
                <Link to={item.href}>{item.title}</Link>
              </li>
            </ul>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h2>Get to know us </h2>
          <ul className="text-sm flex flex-col gap-2">
            <li>
              <Link to="">About</Link>
            </li>
            <li>
              <Link to="">Blog</Link>
            </li>
            <li>
              <Link to="">Help Center</Link>
            </li>
            <li>
              <Link to="">Our Value</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2>Become a Shopper</h2>
          <ul className="text-sm flex flex-col gap-2">
            <li>
              <Link to="">Become a Shopper</Link>
            </li>
            <li>
              <Link to="">Shopper Opportunities</Link>
            </li>
            <li>
              <Link to="">Become a Shopper</Link>
            </li>
            <li>
              <Link to="">Become a Shopper</Link>
            </li>
            <li>
              <Link to="">Earnings Ideas & Guides New Retailers</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
// [#4DAF78]



// return (
//   <footer className="border-t py-10">
//     <div className="w-full md:w-10/12 mx-auto py-5 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:gap-4">
//       <div className="flex flex-col gap-3">
//         <h3 className="font-bold text-3xl">FresCart</h3>
//         <div className="flex items-center gap-4">
//           <FaTwitter />
//           <FaFacebook />
//           <FaInstagram />
//         </div>
//       </div>
//       <div className="flex gap-10 md:gap-20 ">
//         <div className="flex flex-col gap-2">
//           <h3 className="font-semibold">SHOP</h3>
//           {shop.map((link) => (
//             <Link to={link.href} key={link.title} className="text-sm">
//               {link.title}
//             </Link>
//           ))}
//         </div>

//         <div className="flex flex-col gap-2">
//           <h3 className="font-semibold">HELP</h3>
//           {help.map((link) => (
//             <Link to={link.href} key={link.title} className="text-sm">
//               {link.title}
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div>
//         <div className="flex flex-col gap-2">
//           <h3 className="font-semibold text-2xl md:text-3xl">
//             Sign up to get 10% off your first order
//           </h3>
//           <p>
//             Footers do not have to be small or narrow.
//             <br className="hidden md:block" /> Creativity applies to footers as
//             much as the rest of the site.
//           </p>
//           <div className="mt-5">
//             <Button className="bg-deep-green-50 font-semibold rounded-lg">
//               Get Started
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <p className="text-center mt-6">© 2021 Spline.One. All rights reserved.</p>
//   </footer>
// );