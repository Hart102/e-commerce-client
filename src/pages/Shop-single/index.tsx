import { useEffect, useState } from "react";
import { Image, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingBag, FaEye } from "react-icons/fa";
import { Element, Link } from "react-scroll";
import { products } from "@/dummy/products";
import { ProductType } from "@/types/index";

export default function ShopSingle() {
  const navigation = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [unit, setUnit] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedProduct, setSelectedProdct] = useState<ProductType>(
    products[0]
  );

  const selectProduct = (id: string) => {
    if (id) {
      const product = products.find((product) => product.id === id);
      if (product) {
        setSelectedProdct(product);
        setSelectedImage(product.images[0]);
      }
    }
  };
  useEffect(() => {
    if (id) {
      selectProduct(id);
    } else {
      return navigation("/");
    }
  }, [navigation, id]);

  const switchImage = (src: string) => setSelectedImage(src);
  const increaseUnits = () => setUnit(unit + 1);
  const descreaseUnits = () => unit !== 0 && setUnit(unit - 1);

  return (
    <div className="px-5 md:px-10 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Element name="preview" className="w-full md:w-1/2 flex flex-col gap-4">
          <div>
            <Image
              width={300}
              height={200}
              alt="NextUI hero Image with delay"
              src={selectedImage}
              className="h-[350px]"
            />
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 mx-auto md:mx-0">
            {selectedProduct.images.map((image, index) => (
              <Image
                key={index}
                width={50}
                height={100}
                src={image}
                alt="NextUI hero Image with delay"
                className="cursor-pointer"
                onClick={() => switchImage(image)}
              />
            ))}
          </div>
        </Element>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <p className="capitalize">{selectedProduct.category}</p>
          <h2 className="text-3xl font-bold capitalize">
            {selectedProduct.name}
          </h2>

          <div className="flex gap-2">
            <Button onClick={descreaseUnits}>-</Button>
            <div className="border py-1 px-3 flex items-center">{unit}</div>
            <Button onClick={increaseUnits}>+</Button>
          </div>

          <div className="flex items-center flex-wrap gap-8">
            <Button className="flex items-center text-sm bg-app-yellow-100 text-white rounded ">
              <FaShoppingBag />
              ADD TO BAG
            </Button>

            <b>{selectedProduct.price}</b>
          </div>
          <div className="capitalize text-sm flex gap-2">
            <b>({selectedProduct.units})</b>{" "}
            <p className="text-gray-700">Products remaning</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col gap-3 my-16">
        <div className="relative border-b">
          <h3 className="text-xl font-bold">Description</h3>
          <div className="absolute w-[110px] h-[2px] bg-app-yellow-100"></div>
        </div>
        <p className="leading-6 text-gray-700 text-sm">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
      </div>

      <div>
        <h2 className="text-3xl font-bold md:my-16">Related Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 border rounded p-5"
            >
              <div className="flex justify-center">
                <Image
                  width={150}
                  height={100}
                  src={product.images[0]}
                  alt="NextUI hero Image with delay"
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p>{product.name}</p>
              </div>
              <div className="flex justify-between items-center">
                <b>{product.price}</b>
                <Link to="preview" smooth={true} duration={500}>
                  <FaEye
                    onClick={() => selectProduct(product.id)}
                    className="text-deep-gray-100 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
