import { Image, Button } from "@nextui-org/react";
import { ContainerLG, ContainerMD, ContainerSM } from "../../layout/Container";
import productImg from "../../assets/tshirt-img.png";
import productImg2 from "../../assets/dress-shirt-img.png";

export default function SingleProduct() {
  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        <div className="flex justify-center items-center">
          <Image width={300} height={300} src={productImg} />
        </div>
      </ContainerMD>

      <ContainerSM>
        <div className="text-center flex flex-col gap-8">
          <div className="border-b pb-8 flex flex-col gap-5">
            <p className="first-letter:capitalize text-xl font-bold">
              breathable slim sport vest
            </p>
            <b className="text-lg">$ 59.00</b>
          </div>

          <div>
            <p className="text-neutral-400">PRODUCT</p>
            <div className="flex gap-4 items-center justify-center pt-3">
              <Image
                src={productImg}
                width={40}
                height={40}
                alt="product image"
                className="object-contain cursor-pointer"
              />
              <Image
                src={productImg2}
                width={40}
                height={40}
                alt="product image"
                className="object-contain cursor-pointer"
              />
              <Image
                src={productImg}
                width={40}
                height={40}
                alt="product image"
                className="object-contain cursor-pointer"
              />
              <Image
                src={productImg2}
                width={40}
                height={40}
                alt="product image"
                className="object-contain cursor-pointer"
              />
            </div>
          </div>

          <div className="md:px-4 flex flex-col gap-4">
            <p className="text-neutral-400">SIZE</p>

            <div className="grid grid-cols-5 gap-4">
              <div className="bg-app-gray-50 p-2 cursor-pointer">XS</div>
              <div className="bg-app-gray-50 p-2 cursor-pointer">S</div>
              <div className="bg-app-gray-50 p-2 cursor-pointer">M</div>
              <div className="bg-app-gray-50 p-2 cursor-pointer">L</div>
              <div className="bg-app-gray-50 p-2 cursor-pointer">XL</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-neutral-400">QUANTIY</p>
            <div className="flex items-center justify-center gap-5">
              <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                <Button>-</Button>
              </div>
              <div className="border px-5 py-1">0</div>
              <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                <Button>+</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button className="bg-black text-white rounded-full font-bold">
            ADD TO CART
          </Button>
          <Button className="border rounded-full font-bold">BUY NOW</Button>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
