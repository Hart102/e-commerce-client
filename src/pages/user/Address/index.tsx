import { useEffect, useState } from "react";
import axios from "axios";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaMapMarkerAlt, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import AddAddress from "@/components/Add-address";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { api, authentication_token } from "@/lib";
import { AddressType } from "@/types/index";

export default function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<AddressType[]>([]);

  const fetchUserAddress = async () => {
    const { data } = await axios.get(`${api}/user/get-address`, {
      headers: { Authorization: authentication_token },
    });
    if (!data.error) setUserAddress(data);
  };

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

  useEffect(() => {
    fetchUserAddress();
  }, []);

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
        {userAddress &&
          userAddress?.map((address) => (
            <div
              key={address?.id}
              className="bg-deep-gray-200 rounded p-5 cursor-pointer"
            >
              <FaMapMarkerAlt className="text-deep-red-100" />
              <div className="flex flex-col gap-1 mt-4">
                <p>{address?.address_line}</p>
                <p>
                  {address?.city}, {address?.state}
                </p>
                <p>{address?.country}</p>
                <p>{address?.phone_number}</p>
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
          ))}
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
