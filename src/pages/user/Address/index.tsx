import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import AddAddress from "@/components/Add-address";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

export default function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openCofirmation = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setMessage("");
    } else {
      setIsModalOpen(true);
      setMessage("Are you sure you want to delete address");
    }
  };

  return (
    <>
      <div className="flex justify-end pb-4">
        <Button
          size="sm"
          type="button"
          onPress={onOpen}
          className="py-1 px-2 border rounded-full flex items-center gap-1 hover:bg-black hover:text-white"
        >
          <FaMapMarkerAlt />
          <p className="text-sm font-semibold">ADD ADDRESS</p>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label
          htmlFor="2"
          className="flex flex-col gap-4 bg-deep-gray-200 rounded-lg cursor-pointer p-4"
        >
          <div className="flex items-center justify-between gap-2">
            <FaMapMarkerAlt />
            <input type="radio" name="location" id="2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
            <div>
              <b>STREET:</b>
              <p>No, 7 aba oweri road</p>
            </div>
            <div>
              <b>STATE/COUNTRY:</b>
              <p>Aba, Abia State. Nigeria</p>
            </div>
            <div>
              <b>POSTAL CODE:</b>
              <p>440102</p>
            </div>
            <div>
              <b>PHONE:</b>
              <p>090123455</p>
            </div>
          </div>
        </label>
      </div>

      <AddAddress isOpen={isOpen} onClose={onClose} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={openCofirmation}
        message={message}
      />
    </>
  );
}
