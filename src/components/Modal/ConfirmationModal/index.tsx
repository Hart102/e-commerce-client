import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";
import { FaTimes, FaCheckDouble } from "react-icons/fa";

export default function ConfirmationModal({
  isOpen,
  onClose,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}) {
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ closeButton: "hidden" }}
      className="fixed -top-1 -left-1 h-screen w-screen bg-overLay"
    >
      <ModalContent className="flex flex-col justify-center items-center">
        {(onClose) => (
          <div className="w-full md:w-4/12 mx-auto text-center bg-deep-gray-300 rounded-xl p-5">
            <div className="flex justify-end">
              <FaTimes
                size={30}
                onClick={onClose}
                className="border rounded-full p-2 cursor-pointer"
              />
            </div>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <FaCheckDouble
                  size={60}
                  className="text-green-500 border border-green-500 rounded-full p-2 mx-auto"
                />

                <p className="text-neutral-5001 first-letter:capitalize text-xl">
                  {message}
                </p>
              </div>

              <div className="flex justify-around pt-5">
                <Button
                  onPress={onClose}
                  className="border rounded-full bg-black text-white"
                >
                  Cancel
                </Button>
                <Button className="border rounded-full">Continue</Button>
              </div>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
