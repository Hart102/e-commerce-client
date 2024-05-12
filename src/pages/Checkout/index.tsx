import {
  Button,
  Image,
  Accordion,
  AccordionItem,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { ContainerLG, ContainerMD, ContainerSM } from "../../layout/Container";
import { FaMapMarkerAlt } from "react-icons/fa";
import { products } from "../../dummy/products";
import AddAddress from "../../components/Add-address";

export default function Shiipping() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border rounded-lg",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };

  return (
    <>
      <ContainerLG columnReverse="flex-col-reverse">
        <ContainerMD>
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="01. SHIPPING"
              title="01. SHIPPING"
              classNames={{
                heading: "text-lg",
                indicator: "-rotate-90",
              }}
            >
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
                <label
                  htmlFor="1"
                  className="border rounded p-5 cursor-pointer"
                >
                  <FaMapMarkerAlt />
                  <div className="flex flex-col gap-1 mt-4">
                    <p>No, 7 aba oweri road</p>
                    <p>Aba, Abia state</p>
                    <p>Nigeria</p>
                  </div>
                  <div className="flex justify-end">
                    <input type="radio" name="location" id="1" />
                  </div>
                </label>
                <label
                  htmlFor="2"
                  className="border rounded p-5 cursor-pointer"
                >
                  <FaMapMarkerAlt />
                  <div className="flex flex-col gap-1 mt-4">
                    <p>No, 7 aba oweri road</p>
                    <p>Aba, Abia state</p>
                    <p>Nigeria</p>
                  </div>
                  <div className="flex justify-end">
                    <input type="radio" name="location" id="2" />
                  </div>
                </label>
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion>
            <AccordionItem
              key="2"
              aria-label="02. PAYMENT"
              title="02. PAYMENT"
              classNames={{
                heading: "text-lg",
                indicator: "-rotate-90",
              }}
            >
              <div className="border rounded-lg p-5 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <p>Credit / Debit Card</p>
                  <p className="text-neutral-500">
                    Safe money transfer using your bank accou k account. We
                    support Mastercard tercard, Visa, Discover and Stripe.
                  </p>
                </div>

                <form>
                  <Input
                    label="Card number"
                    placeholder="123 4567 6789 4321"
                    classNames={InputProps}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      label="Name on card"
                      placeholder="Enter your first name"
                      classNames={InputProps}
                    />

                    <Input
                      type="date"
                      label="Expiry date"
                      classNames={InputProps}
                    />
                    <Input
                      label="CVV code"
                      placeholder="***"
                      classNames={InputProps}
                    />
                  </div>
                </form>
              </div>
              <div className="flex mt-5">
                <Button className="bg-black text-white rounded-full hover:opacity-55 px-8">
                  PLACE ORDER
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </ContainerMD>

        <ContainerSM>
          <p className="text-lg">SUMMARY</p>

          <div className="flex flex-col gap-4 border-b pb-3 [&_b]:text-neutral-600 [&_p]:text-neutral-700">
            <div className="flex items-center justify-between">
              <p>SUBTOTAL</p>
              <b>$ 137.00</b>
            </div>
            <div className="flex items-center justify-between">
              <p>SHIPPING FEE</p>
              <b>$ 18.00</b>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <b>TOTAL</b>
            <b>$ 155.00</b>
          </div>

          <div className="w-full flex flex-col gap-4">
            <p className="text-lg">IN YOUR CART</p>
            <div className="flex flex-col gap-4 h-[400px] overflow-y-auto">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center gap-5 ${
                    index + 1 < products.length && "border-b pb-5"
                  }`}
                >
                  <div className="h-[100px] w-[80px] z-0">
                    <Image
                      src={product.images[0]}
                      alt="product image"
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col text-neutral-700 capitalize">
                    <p className="capitalize">{product.name}</p>
                    <p className="my-0.5">Size: {product.size}</p>
                    <p>Qty: {product.units}</p>
                    <b className="mt-2">{product.price}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContainerSM>
      </ContainerLG>
      <AddAddress isOpen={isOpen} onClose={onClose} />
    </>
  );
}
