import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDisclosure } from "@nextui-org/react";
import SideBar from "@/components/Navigation/SideBar";
import { BiBell, BiCreditCard, BiCartAdd, BiGridAlt } from "react-icons/bi";
import { FaMapMarkerAlt, FaToggleOn } from "react-icons/fa";
import Navbar from "@/components/Navigation/Navbar";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { api, authentication_token } from "@/lib";
import {
  ModalLayout,
  ResponseModal,
  LoadingGif,
} from "@/components/Modal/index";
import { ModalTemplateType } from "@/types/index";

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
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });

  const templates: ModalTemplateType = {
    loaderModal: <LoadingGif />,
    responseModal: (
      <ResponseModal isError={response.isError} message={response.message} />
    ),
  };

  const changeModalContent = (template: string) => {
    if (template in templates) {
      onOpen();
      setCurrentTemplate(template);
    }
  };

  const handleToggle = () => {
    if (sidebarRef?.current?.classList.contains("-translate-x-full")) {
      sidebarRef?.current?.classList.remove("-translate-x-full");
    } else {
      sidebarRef?.current?.classList.add("-translate-x-full");
    }
  };

  const confirmPayment = async () => {
    onOpen();
    changeModalContent("loaderModal");
    const { data } = await axios.get(`${api}/transactions/confirm-payment`, {
      headers: { Authorization: authentication_token },
    });
    changeModalContent("responseModal");
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
      <Navbar />

      <div className="w-screen bg-white flex flex-col gap-4">
        {paymentStatus && (
          <div className="mt-16 py-1 px-5 bg-deep-green-50 flex justify-end">
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
        <div
          className={`w-full md:w-10/12 mx-auto relative flex ${
            paymentStatus ? "mt-3" : "mt-24"
          }`}
        >
          <div
            ref={sidebarRef}
            className="w-full md:w-3/12 min-h-screen absolute md:fixed 
            md:left-10 delay-150 duration-300 -translate-x-full md:-translate-x-0 py-10 md:py-0 z-20"
          >
            <SideBar
              status={false}
              sidebarlinks={links}
              urlCount={16}
              closeMenu={() => handleToggle()}
            />
          </div>
          <div className="w-full bg-white md:w-9/12 min-h-screen px-10 flex flex-col gap-5 border-l md:absolute right-0">
            <div
              onClick={handleToggle}
              className="flex md:hidden z-20 -ml-4 items-center gap-1 w-[80px]"
            >
              <BiGridAlt />
              menu
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
