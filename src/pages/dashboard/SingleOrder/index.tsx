import { Link } from "react-router-dom";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { products } from "../../../dummy/products";

export default function SingleOrder() {
  return (
    <div className="w-full flex flex-col gap-8 md:bg-deep-gray-200 md:p-5">
      <div className="flex gap-2 items-baseline">
        <p className="text-2xl font-semibold">Order</p>
        <span className="capitalize text-sm px-2 rounded text-white bg-orange-500">
          Success
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded flex flex-col gap-2 p-4">
          <p className="text-xl font-semibold">Customer Details</p>
          <div className="flex flex-col gap-1">
            <p>John Alex</p>
            <p>anderalex@example.com</p>
            <p>+998 99 22123456</p>
            <Link to="" className="text-deep-blue-100">
              View profile
            </Link>
          </div>
        </div>

        <div className="border rounded flex flex-col gap-2 p-4">
          <p className="text-xl font-semibold">Shipping Address</p>
          <div className="flex flex-col gap-1">
            <p>No, 7 aba oweri road</p>
            <p>Aba, Abia state</p>
            <p>Nigeria</p>
            <p>Contact No. +91 99999 12345</p>
          </div>
        </div>

        <div className="border rounded flex flex-col gap-2 p-4">
          <p className="text-xl font-semibold">Order Details</p>
          <div className="flex flex-col gap-1">
            <p>Order ID: FC001</p>
            <p>Order Date: October 22, 2023</p>
            <p>Order Total: $734.28</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="overflow-x-scroll">
          <Table
            classNames={{
              base: "text-center",
              th: "text-neutral-400",
              tbody: "capitalize py-4 bg-white text-sm",
            }}
          >
            <TableHeader>
              <TableColumn>
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="cursor-pointer" />
                  <b>Basic Info</b>
                </div>
              </TableColumn>
              <TableColumn>OderId</TableColumn>
              <TableColumn>Customer</TableColumn>
              <TableColumn>Date & Time</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Total</TableColumn>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="cursor-pointer" />
                    <div className="flex items-center gap-4">
                      <Image
                        src={products[0].images[0]}
                        classNames={{ img: "rounded-full h-[50px] w-[50px]" }}
                      />
                      {products[0].name}
                    </div>
                  </div>
                </TableCell>

                <TableCell>{"123"}</TableCell>
                <TableCell>{"Hart"}</TableCell>
                <TableCell>{"01 May 2023 (10:12 am)"}</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$ 3.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="w-full flex justify-end border-t pt-5 px-4 md:px-8">
          <div className="w-full md:w-1/3 flex flex-col gap-5">
            <div className="flex justify-between border-b pb-2">
              <p>Sub Total :</p>
              <p>$80.00</p>
            </div>
            <div className="flex justify-between border-b pb-2">
              <p>Shipping Cost :</p>
              <p>$10.00</p>
            </div>
            <div className="flex justify-between">
              <p>Grand Total :</p>
              <p>$90.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
