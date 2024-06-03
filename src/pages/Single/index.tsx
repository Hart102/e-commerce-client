import axios from "axios";
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProductType } from "@/types/index";
import {
  api,
  imageUrl,
  authentication_token,
  setCartCount,
  getCartCount,
} from "@/lib";

export default function SingleProduct() {
  const location = useLocation();
  const navigation = useNavigate();
  const [product, setProduct] = useState<ProductType>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(0);
  const sizes = ["XS", "S", "M", "L", "XL"];

  const selectImage = (imageIndex: number) => setSelectedImageIndex(imageIndex);
  const setSize = (text: string) => setSelectedSize(text);
  const increaseQty = () => setQuantity(quantity + 1);
  const deCreaseQty = () => quantity !== 0 && setQuantity(quantity - 1);

  const addToCart = async () => {
    const { data } = await axios.put(
      `${api}/cart/add-to-cart`,
      {
        productId: product?.id,
        size: selectedSize || "",
        quantity: quantity,
      },
      { headers: { Authorization: authentication_token } }
    );
    if (data.total_items) {
      setCartCount(data.total_items);
      getCartCount();
    }
  };

  useEffect(() => {
    if (location.state == undefined) return navigation("/");
    setProduct(location.state);
  }, [location, navigation]);

  return (
    <div className="flex md:flex-row text-sm md:p-0 p-4 justify-center">
      <div className="w-full md:w-7/12 md- flex flex-col gap-8 md:bg-deep-gray-2001 md:p-10">
        <div className="flex justify-center items-center">
          <Image
            src={imageUrl(product?.images[selectedImageIndex] || "")}
            classNames={{ img: "w-[550px] h-[500px]" }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full md:w-4/12 md:py-10 md:px-12 py-10 px-5">
        <div className="text-center flex flex-col gap-8">
          <div className="border-b pb-8 flex flex-col gap-5">
            <p className="first-letter:capitalize text-xl font-bold">
              {product?.name}
            </p>
            <div className="flex gap-3 mx-auto">
              PRICE: <b>{product?.price}</b>
            </div>
          </div>
          <div>
            <p>PRODUCT</p>
            <div className="flex gap-4 items-center justify-center pt-3">
              {product &&
                product?.images.map((image, index) => (
                  <Image
                    key={index}
                    src={imageUrl(image)}
                    alt="product image"
                    classNames={{
                      img: "rounded-full h-[50px] w-[50px] cursor-pointer",
                    }}
                    onClick={() => selectImage(index)}
                  />
                ))}
            </div>
          </div>
          {product && product?.category == "fashion" && (
            <div className="md:px-4 flex flex-col gap-4">
              <p>SIZE</p>
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
            <p>QUANTIY</p>
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
      </div>
    </div>
  );
}
