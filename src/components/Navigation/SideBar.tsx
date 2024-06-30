import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiCartAdd, BiGridAlt, BiLogOut } from "react-icons/bi";
import { Button, useDisclosure } from "@nextui-org/react";
import { authentication_token } from "@/lib";
import { FaTimes } from "react-icons/fa";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";

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
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => logout(),
    confirmationMessage: "Are you sure you want to logout ?",
    response,
  });
  const handleChangeModalContent = (template: string) => {
    changeModalContent({
      template,
      templates,
      onOpen,
      setCurrentTemplate,
    });
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
      <aside className="flex flex-col gap-8 px-4 md:px-0">
        <Link
          to="/dashboard_1/products"
          className={`text-2xl font-bold first-letter:text-3xl text-dark-gray-100 ${
            status ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center gap-3">
            <BiCartAdd size={30} className="text-deep-blue-100" />
            FresCart
          </div>
        </Link>
        <div className="flex md:hidden items-center justify-between">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <BiCartAdd size={30} className="text-deep-blue-100" />
            FresCart
          </div>
          <FaTimes onClick={closeMenu} />
        </div>
        <div className="flex flex-col gap-4 justify-between text-dark-gray-100">
          <Link
            to="/dashboard_1/products"
            className={`items-center gap-2 px-2 py-3 rounded hover:bg-deep-gray-300 ${
              status ? "flex" : "hidden"
            }`}
          >
            <BiGridAlt size={18} />
            Dashboard
          </Link>
          <div className="flex flex-col justify-between gap-2 md:min-h-[400px]">
            <div>
              <p className={`px-2 py-3 text-sm ${status ? "block" : "hidden"}`}>
                Store Management
              </p>
              <div className="flex flex-col gap-2">
                {sidebarlinks.map((link) => (
                  <Link
                    key={link?.title}
                    to={link?.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      location.pathname.slice(urlCount).replace("-", " ") ==
                        link?.title.toLowerCase() &&
                      "bg-deep-green-2001 bg-deep-blue-100 text-white"
                    }`}
                  >
                    <link.icon size={18} />
                    {link?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-b border-dotted bg-dark-gray-200 py-1 rounded"></div>
            <div>
              <Button
                onClick={() => handleChangeModalContent("02")}
                className="flex items-center gap-2 rounded-lg border hover:border-deep-blue-100"
              >
                <BiLogOut />
                Log out
              </Button>
            </div>
          </div>
        </div>
      </aside>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
