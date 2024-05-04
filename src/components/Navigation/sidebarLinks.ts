import { IconType } from "react-icons";
import { FaShoppingBag, FaUsers, FaBars } from "react-icons/fa";

type sideBarType = {
  href: string;
  icon: IconType;
  title: string;
};
export const sideBarLinks: sideBarType[] = [
  { href: "/dashboard/products", icon: FaShoppingBag, title: "products" },
  { href: "", icon: FaUsers, title: "customers" },
  { href: "", icon: FaBars, title: "categories" },
];
