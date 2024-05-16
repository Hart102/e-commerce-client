import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContainerLG, ContainerMD, ContainerSM } from "../../layout/Container";
import { ProductType } from "../../types/index";

import { products } from "../../dummy/products";

export default function SingleProduct() {
  const location = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(0);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const selectImage = (imageIndex: number) => setSelectedImageIndex(imageIndex);

  const setSize = (text: string) => setSelectedSize(text);
  const increaseQty = () => setQuantity(quantity + 1);
  const deCreaseQty = () => quantity !== 0 && setQuantity(quantity - 1);

  const addToCart = () => {
    const cartItem = {
      id: product?.id,
      size: selectedSize,
      quantity: quantity,
    };
    console.log(cartItem);
  };

  useEffect(() => {
    const selectedPrducts = products.find((item) => item.id === location.id);
    setProduct(selectedPrducts);
  }, [location]);

  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        <div className="flex justify-center items-center pt-10">
          <Image
            width={300}
            height={300}
            src={product?.images[selectedImageIndex]}
          />
        </div>
      </ContainerMD>

      <ContainerSM>
        <div className="text-center flex flex-col gap-8">
          <div className="border-b pb-8 flex flex-col gap-5">
            <p className="first-letter:capitalize text-xl font-bold">
              {product?.name}
            </p>
            <b className="text-lg">{product?.price}</b>
          </div>

          <div>
            <p className="text-neutral-400">PRODUCT</p>
            <div className="flex gap-4 items-center justify-center pt-3">
              {product &&
                product?.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={40}
                    height={40}
                    alt="product image"
                    className="object-contain cursor-pointer"
                    onClick={() => selectImage(index)}
                  />
                ))}
            </div>
          </div>

          {product && product?.category == "fashion" && (
            <div className="md:px-4 flex flex-col gap-4">
              <p className="text-neutral-400">SIZE</p>
              <div className="grid grid-cols-5 gap-4">
                {sizes &&
                  sizes.map((size, index) => (
                    <Button
                      key={size}
                      onClick={() => setSize(size)}
                      className={`bg-deep-gray-50 ${
                        selectedSize == sizes[index] && "bg-black text-white"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <p className="text-neutral-400">QUANTIY</p>
            <div className="flex items-center justify-center gap-5">
              <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                <Button onClick={deCreaseQty}>-</Button>
              </div>
              <div className="border px-5 py-1">{quantity}</div>
              <div className="border rounded-full h-[25px] w-[25px] flex items-center justify-center">
                <Button onClick={increaseQty}>+</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            onClick={addToCart}
            className="bg-black text-white rounded-full font-bold"
          >
            ADD TO CART
          </Button>
          <Link
            to="/shop/checkout"
            className="text-center py-2 border rounded-full font-bold"
          >
            BUY NOW
          </Link>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
