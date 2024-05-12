import { Button, Image } from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { products } from "../../dummy/products";
import { ContainerLG, ContainerMD, ContainerSM } from "../../layout/Container";

export default function CheckoutSummary() {
  const navigation = useNavigate();

  const moveToCheckout = () => navigation("/shop/checkout");

  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        {/* DESKTOP PRODUCT TEMPLATE */}
        <div className="hidden md:flex justify-between border-b pb-5 px-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="cursor-pointer" />
            <span>SELECT ALL</span>
          </div>
          <span>QUANTITY</span>
          <span>TOTAL</span>
        </div>

        <div className="hidden md:block md:h-[400px] md:overflow-y-scroll">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between w-full border-b pb-8 md:px-2"
            >
              <input
                type="checkbox"
                className="hidden md:block cursor-pointer"
              />

              <div className="flex items-center gap-5">
                <div className="h-[100px] w-[90px]">
                  <Image
                    src={product.images[0]}
                    alt="product image"
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="capitalize">
                  <b className="text-neutral-600">{product.name}</b>
                  <p className="text-neutral-400">Size: {product.size}</p>
                  <b className="hidden md:block text-neutral-600 mt-2">
                    {product.price}
                  </b>
                </div>
              </div>

              <div className="flex items-center">
                <Button>-</Button>
                <div className="border px-2.5 py-1">0</div>
                <Button>+</Button>
              </div>

              <div className="flex items-center gap-8">
                <b className="text-neutral-600">$ 5.00</b>
                <div className="rounded-full bg-black text-white p-1 cursor-pointer">
                  <FaTimes />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE PRODUCT TEMPLATE */}
        <div className="md:hidden h-[400px] overflow-y-scroll">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full [&_span]:text-neutral-600 border-b py-5 flex gap-8 md:gap-5"
            >
              <div className="h-[100px] w-[100px]">
                <Image
                  src={product.images[0]}
                  alt="product image"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-full flex flex-col gap-4 capitalize">
                <div>
                  <b className="text-neutral-600">{product.name}</b>
                  <p className="text-neutral-400">Size: {product.size}</p>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span>PRICE</span>
                    <b className="text-neutral-600">{product.price}</b>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>QUANTIY</span>
                    <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                      <Button>-</Button>
                    </div>
                    <div className="border px-3 py-1">0</div>
                    <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                      <Button>+</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>TOTAL</span>
                    <b className="text-neutral-600">$ 50.00</b>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContainerMD>

      <ContainerSM>
        <p className="text-xl">SUMMARY</p>

        <div className="flex flex-col gap-4 border-b pb-3 [&_b]:text-neutral-600">
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SUBTOTAL</p>
            <b>$ 137.00</b>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-neutral-700">SHIPPING FEE</p>
            <b>$ 18.00</b>
          </div>
        </div>
        <div className="flex justify-between text-lg">
          <b>TOTAL</b>
          <b>$ 155.00</b>
        </div>

        <div className="flex flex-col gap-8 justify-between h-full pb-10">
          <Button
            onClick={moveToCheckout}
            className="w-full rounded-full font-bold bg-black mt-5 text-white"
          >
            CHECK OUT
          </Button>

          <p>NEED HELP ?</p>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
