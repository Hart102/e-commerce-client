import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContainerLG, ContainerMD, ContainerSM } from "@/layout/Container";
import { ProductType } from "@/types/index";
import { imageUrl } from "@/lib";

export default function ProductView() {
  const location = useLocation();
  const [product, setProduct] = useState<ProductType>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const selectImage = (imageIndex: number) => setSelectedImageIndex(imageIndex);

  useEffect(() => {
    setProduct(location.state);
  }, [location]);

  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        <div className="flex justify-center items-center pt-10">
          <Image
            src={imageUrl(product?.images[selectedImageIndex] || "")}
            // classNames={{ img: "w-[400px] h-[300px]" }}
            classNames={{ img: "w-[500px] h-[500px]" }}
          />
        </div>
      </ContainerMD>
      <ContainerSM>
        <div className="text-center flex flex-col gap-8">
          <div className="border-b pb-8 flex flex-col gap-5">
            <p className="first-letter:capitalize text-xl font-bold">
              {product?.name}
            </p>
            <div className="flex gap-2 mx-auto">
              PRICE:
              <b>{product?.price}</b>
            </div>
            <div className="flex gap-2 mx-auto">
              QUANTITY:
              <b>({product?.quantity})</b>
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
                      img: "rounded-full h-[40px] w-[100px] cursor-pointer",
                    }}
                    onClick={() => selectImage(index)}
                  />
                ))}
            </div>
          </div>
          <p className="text-start first-letter:uppercase">
            {product?.description}
          </p>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
