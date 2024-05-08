import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";

export default function AddAddress({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border-b",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };
  return (
    <div>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{ closeButton: "hidden" }}
        className="fixed top-0 left-0 h-screen w-screen bg-overLay"
      >
        <ModalContent className="flex flex-col justify-center items-center">
          {(onClose) => (
            <div className="w-full md:w-6/12 mx-auto">
              <ModalBody>
                <form className="bg-white rounded-lg p-5 flex flex-col gap-12 text-sm">
                  <div>
                    <div className="flex justify-end">
                      <FaTimes
                        size={30}
                        onClick={onClose}
                        className="border rounded-full p-2 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:px-10">
                      <p>NEW SHIPPING ADDRESS</p>
                      <p className="text-neutral-500">
                        Add new shipping address for your order delivery.
                      </p>
                    </div>
                  </div>
                  <div className="md:px-10 md:py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <Input
                        label="Address"
                        placeholder="No, 7 aba oweri road"
                        classNames={InputProps}
                      />
                      <Input
                        label="City"
                        placeholder="Aba"
                        classNames={InputProps}
                      />
                      <Input
                        label="State"
                        placeholder="Abia state"
                        classNames={InputProps}
                      />
                      <Input
                        label="Country"
                        placeholder="Nigeria"
                        classNames={InputProps}
                      />
                    </div>
                    <div>
                      <Button
                        variant="light"
                        className="bg-black text-white rounded-full px-20 mt-5"
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
