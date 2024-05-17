import { Modal, ModalContent, ModalBody, Button } from "@nextui-org/react";

export default function ServerResponseModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ closeButton: "hidden" }}
      className="fixed top-0 left-0 h-screen w-screen bg-overLay"
    >
      <ModalContent className="flex flex-col justify-center items-center">
        {(onClose) => (
          <div className="w-full md:w-5/12 mx-auto text-center bg-white rounded-xl">
            <ModalBody>
              <div className="flex flex-col gap-10">
                some messages
                <div>
                  <Button
                    onClick={onClose}
                    className="bg-black text-white rounded-full px-10"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}