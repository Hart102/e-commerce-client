import { Image, Button } from "@nextui-org/react";
import MasterCardImage from "@/assets/mastercard.svg";

export default function PaymentMethod() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl md:text-3xl font-bold">Payment Method</h1>

      <div className="flex items-center justify-between border-b">
        <div className="flex gap-4 items-center">
          <Image src={MasterCardImage} width={70} />
          <div>
            <p>****1234</p>
            <p>Expires in 10/2023</p>
          </div>
        </div>

        <Button>Remove</Button>
      </div>

      <div className="flex items-center justify-between border-b">
        <div className="flex gap-4 items-center">
          <Image src={MasterCardImage} width={70} />
          <div>
            <p>****1234</p>
            <p>Expires in 10/2023</p>
          </div>
        </div>

        <Button>Remove</Button>
      </div>
    </div>
  );
}
