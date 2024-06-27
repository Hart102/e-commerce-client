import { Image, Button } from "@nextui-org/react";
// import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import MasterCardImage from "@/assets/mastercard.svg";
import { BiTrashAlt } from "react-icons/bi";

export default function PaymentMethod() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [message, setMessage] = useState<string>("");

  // const removeCard = () => {
  //   setMessage("Are you sure you want to remove card ?");
  //   onOpen();
  // };

  // const confirmRemoval = () => {
  //   onClose();
  //   alert("Coming soon");
  // };

  return (
    <>
      <div className="flex flex-col gap-8">
        <h1 className="text-xl md:text-3xl font-bold">Payment Method</h1>

        <div className="flex flex-col gap-4 mt-8">
          <div className="flex items-center justify-between border-b pb-5">
            <div className="flex gap-4 items-center">
              <Image src={MasterCardImage} width={50} />
              <div>
                <p>****1234</p>
                <p>Expires in 10/2023</p>
              </div>
            </div>

            <Button
              size="sm"
              className="text-sm flex gap-1 items-center text-red-500"
              // onClick={removeCard}
            >
              <BiTrashAlt /> Remove
            </Button>
          </div>
        </div>
      </div>
      {/* <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onContinue={confirmRemoval}
        message={message}
      /> */}
    </>
  );
}
