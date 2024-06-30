import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@nextui-org/react";
import SideBar from "@/components/Navigation/SideBar";
import { BiBell, BiCreditCard, BiCartAdd, BiMenuAltLeft } from "react-icons/bi";
import { FaMapMarkerAlt, FaToggleOn } from "react-icons/fa";
import NewNavBar from "@/components/Navigation/NewNavbar";
import Footer from "@/components/Footer";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { api, authentication_token } from "@/lib";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";

const links = [
  { icon: BiCartAdd, title: "Your Orders", href: "" },
  { icon: FaToggleOn, title: "Settings", href: "/user/dashboard/settings" },
  {
    icon: BiCreditCard,
    title: "Payment method",
    href: "/user/dashboard/payment-method",
  },
  { icon: FaMapMarkerAlt, title: "Address", href: "/user/dashboard/address" },
  { icon: BiBell, title: "Notification", href: "" },
];

export default function UserDasboardLayout() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [toggleStatus, setToggleStatus] = useState<boolean>(false);

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => console.log("clicked from dashboard layout"),
    confirmationMessage: "",
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
  const toggle = () =>
    !toggleStatus ? setToggleStatus(true) : setToggleStatus(false);

  const confirmPayment = async () => {
    onOpen();
    handleChangeModalContent("01");
    const { data } = await axios.get(`${api}/transactions/confirm-payment`, {
      headers: { Authorization: authentication_token },
    });
    handleChangeModalContent("03");
    if (data.error) {
      setResponse({ ...response, isError: true, message: data.error });
    } else {
      setResponse({ ...response, isError: false, message: data.message });
    }
  };
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const { data } = await axios.get(
          `${api}/transactions/getUncompleted-payment`,
          {
            headers: { Authorization: authentication_token },
          }
        );
        if (!data.error && data.length > 0) {
          setPaymentStatus(true);
        } else {
          setPaymentStatus(false);
        }
      } catch (error) {
        setPaymentStatus(false);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <NewNavBar />
      <div className="w-full md:w-11/12 px-4 md:px-16 mx-auto md:py-8 text-dark-gray-100">
        {paymentStatus && (
          <div className="py-1 px-5 border-b flex justify-end">
            <Button
              size="sm"
              radius="none"
              type="button"
              onClick={confirmPayment}
              className="px-2 text-sm font-semibold text-dark-gray-100 hover:underline"
            >
              VERIFY PAYMENT
            </Button>
          </div>
        )}
        <div className="relative md:mt-5 md:flex gap-10 pb-10">
          <div
            className={`w-full md:w-3/12 h-screen md:h-fit md:pr-4 md:border-r border-dotted
           absolute md:relative top-0 left-0 z-20 bg-white delay-150 duration-300 md:-translate-x-0 ${
             !toggleStatus ? "-translate-x-full" : "-translate-x-0"
           }`}
          >
            <SideBar
              status={false}
              sidebarlinks={links}
              urlCount={16}
              closeMenu={() => toggle()}
            />
          </div>
          <div className="w-full md:w-9/12 mx-auto flex flex-col gap-3">
            <div className="flex justify-end md:hidden">
              <BiMenuAltLeft size={23} onClick={toggle} />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
      <Footer />
    </>
  );
}
