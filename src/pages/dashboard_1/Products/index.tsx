import {
  Image,
  Avatar,
  Badge,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { BiBell } from "react-icons/bi";
import SideBar from "../../../components/Navigation/SideBar";
import { products } from "../../../dummy/products";

[#F7F7F7];
export default function Products() {
  return (
    <div className="w-full text-sm md:p-5 flex">
      <SideBar />
      <div className="w-full flex flex-col gap-4">
        <nav className="bg-white rounded-tr-xl p-5">
          <div className="container mx-auto flex justify-between items-center">
            <p className="text-lg font-semibold">OVERVIEW</p>

            <div className="flex items-center gap-6">
              <div className="flex items-start">
                <BiBell size={20} />
                <div className="rounded-full bg-red-500 text-white flex items-center justify-center h-[10px] w-[10px] -mt-[4px] -ml-[8px]"></div>
              </div>
              <div>
                <Badge size="sm">
                  <Avatar
                    isBordered
                    radius="full"
                    classNames={{ img: "rounded-full" }}
                    src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
                  />
                </Badge>
              </div>
            </div>
          </div>
        </nav>

        <div className="md:pl-3">
          <div className="grid grid-cols-4 gap-8 md:p-5 bg-white">
            {products.map((product) => (
              <Card className="rounded-xl shadow-lg overflow-hidden">
                <CardHeader className="flex justify-center bg-[#10182F]">
                  <Image width={100} src={product.images[0]} />
                </CardHeader>
                <CardBody className="flex flex-col gap-2 bg-white">
                  <b className="text-neutral-500 uppercase line-clamp-1">
                    {product.name}
                  </b>
                  <p className="line-clamp-2 text-neutral-400">
                    {product.description}
                  </p>

                  <b>{product.price}</b>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
