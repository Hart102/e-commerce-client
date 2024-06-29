import { imageUrl } from "@/lib";
import { Button } from "@nextui-org/react";
import { BiStar } from "react-icons/bi";
import { ProductType } from "@/types/index";

export default function ProductTemplate({
  products,
  onclick,
}: {
  products: ProductType[];
  onclick?: () => void;
}) {
  return products.map((product: ProductType) => (
    <div
      key={product.id}
      onClick={onclick}
      className="p-4 flex flex-col items-center gap-5 rounded-lg shadow-md bg-white border border-transparent hover:border-deep-blue-100 cursor-pointer"
    >
      <img
        width={150}
        src={imageUrl(product?.images[0] || "")}
        className="rounded-lg"
      />
      <div className="w-full mt-2">
        <p className="text-sm text-deep-gray-100 capitalize">
          {product?.category}
        </p>
        <b className="capitalize text-xl1 font-bold">{product?.name}</b>
        <div className="flex flex-wrap items-center gap-2 md:gap-5">
          <div className="flex gap-2 text-yellow-500">
            <BiStar />
            <BiStar />
            <BiStar />
            <BiStar />
            <BiStar />
          </div>
          <p className="text-sm">4.5</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <b>{product?.price}</b>
        <Button
          size="sm"
          className="bg-deep-blue-100 text-white text-sm font-semibold rounded"
        >
          Add
        </Button>
      </div>
    </div>
  ));
}
