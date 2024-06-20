import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiGridAlt, BiLogOut } from "react-icons/bi";
import { Button, useDisclosure } from "@nextui-org/react";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { authentication_token } from "@/lib";

const checkAuthentication = (
  token: string | undefined,
  navigation: (to: string) => void
) => {
  if (token === undefined) {
    navigation("/login");
  }
};

export default function SideBar({
  status,
  sidebarlinks,
  urlCount,
  closeMenu,
}: {
  status?: boolean;
  sidebarlinks: { icon: React.ElementType; title: string; href: string }[];
  urlCount: number;
  closeMenu?: () => void;
}) {
  const location = useLocation();
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");

  const confirmLogout = () => {
    setMessage("Are you sure you want to logout?");
    onOpen();
  };

  const logout = () => {
    onClose();
    alert("Coming soon");
  };

  useEffect(() => {
    checkAuthentication(authentication_token, navigation);
  }, [navigation]);

  return (
    <>
      <aside className="p-5 w-full flex flex-col gap-8">
        <Link
          to="/dashboard_1/products"
          className={`text-2xl font-bold first-letter:text-3xl text-deep-green-100 ${
            status ? "block" : "hidden"
          }`}
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
                    onClick={closeMenu}
                    className={`flex items-center gap-2 p-2 rounded ${
                      location.pathname.slice(urlCount).replace("-", " ") ==
                        link?.title.toLowerCase() &&
                      "bg-deep-green-100 text-white"
                    }`}
                  >
                    <link.icon size={18} />
                    {link?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-b border-deep-green-50"></div>
            <div>
              <Button
                onClick={confirmLogout}
                className="flex items-center gap-2 rounded hover:bg-deep-green-100 hover:text-white"
              >
                <BiLogOut />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        message={message}
        onContinue={logout}
      />
    </>
  );
}
