import { useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaMapMarkerAlt, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
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

  const deleteAddress = () => {
    alert("coming soon");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          size="sm"
          type="button"
          onPress={onOpen}
          className="py-1 px-2 border rounded-lg flex items-center gap-1 bg-deep-green-100 text-white"
        >
          <FaMapMarkerAlt />
          <p className="text-sm font-semibold">ADD ADDRESS</p>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label
          htmlFor="2"
          className="flex flex-col gap-4 rounded-lg cursor-pointer p-4"
        >
          <div>
            <div className="bg-deep-gray-2001 rounded p-5 cursor-pointer">
              <FaMapMarkerAlt className="text-deep-red-100" />
              <div className="flex flex-col gap-1 mt-4">
                <p>No, 7 aba oweri road</p>
                <p>Aba, Abia state</p>
                <p>Nigeria</p>
                <p>090123456</p>
              </div>
              <div className="flex gap-10 text-sm justify-between mt-4">
                <Button className="flex items-center gap-1 px-0 hover:underline font-semibold text-deep-green-100">
                  <FaTrashAlt />
                  Edit
                </Button>
                <Button
                  onClick={openCofirmation}
                  className="flex items-center gap-1 px-0 hover:underline font-semibold text-deep-red-100 "
                >
                  <FaPencilAlt />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </label>
      </div>
      <AddAddress isOpen={isOpen} onClose={onClose} />
      <ConfirmationModal
        isOpen={isModalOpen}
        onContinue={deleteAddress}
        onClose={openCofirmation}
        message={message}
      />
    </>
  );
}
