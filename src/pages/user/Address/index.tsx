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
          <p className="text-sm">ADD ADDRESS</p>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label htmlFor="2" className="border rounded p-5 cursor-pointer">
          <FaMapMarkerAlt />
          <div className="flex flex-col gap-1 mt-4">
            <p>No, 7 aba oweri road</p>
            <p>Aba, Abia state</p>
            <p>Nigeria</p>
            <p>440102</p>
            <p>090123455</p>
          </div>
          <div className="flex justify-end">
            <input type="radio" name="location" id="2" />
          </div>
          <div className="flex items-center gap-2">
            <Button className="p-0">Edit</Button>
            <Button className="p-0 text-red-500" onClick={openCofirmation}>
              Delete
            </Button>
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
