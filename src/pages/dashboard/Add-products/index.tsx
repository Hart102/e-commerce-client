import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "px-2 outline-none border rounded",
    base: "text-sm text-neutral-600",
  };
  const labelClass =
    "p-5 rounded h-32 w-32 cursor-pointer flex items-center justify-center border";

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between md:px-4 px-2">
        <h3 className="text-3xl font-bold">Add Products</h3>
        <Link
          to="/dashboard/products"
          className="bg-neutral-700 text-white py-2 px-3 rounded text-sm font-bold hover:opacity-65 w-"
        >
          Back to Products
        </Link>
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-4 my-8">
          <div className="w-full md:w-8/12 flex flex-col gap-10 shadow rounded-md md:p-4 p-2">
            <div className="flex flex-col gap-8">
              <b>Product Information</b>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Input
                  type="text"
                  placeholder="Product Name"
                  labelPlacement="outside"
                  label="Name"
                  classNames={InputProps}
                />

                <Select
                  label="Select Category"
                  labelPlacement="outside"
                  classNames={{ base: "flex flex-col" }}
                  // classNames={{
                  //   mainWrapper: "bg-green-500 px-0",
                  //   value: "text-start pl-6",
                  //   base: "flex text-sm bg-white text-neutral-600",
                  //   innerWrapper: "bg-red-500 grid grid-cols-2 w-full",
                  //   selectorIcon: "ml-2 my-auto",

                  //   // innerWrapper: "flex flex-col w-full border rounded",
                  // }}
                >
                  <SelectItem key={"fashion"} value={"fashion"}>
                    Fashion
                  </SelectItem>
                  <SelectItem key={"electronics"} value={"electronics"}>
                    Electronics
                  </SelectItem>
                </Select>

                <Input
                  type="number"
                  label="Units"
                  placeholder="9"
                  labelPlacement="outside"
                  classNames={InputProps}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <b>Product Images</b>
              <div className="flex justify-between1 gap-4 flex-wrap rounded">
                <label htmlFor="file_1" className={labelClass}>
                  <FaCamera className="text-app-gray-200" />
                  <Input
                    type="file"
                    id="file_1"
                    name="file"
                    className="hidden"
                  />
                </label>
                <label htmlFor="file_2" className={labelClass}>
                  <FaCamera className="text-app-gray-200" />
                  <Input
                    type="file"
                    id="file_2"
                    name="file"
                    className="hidden"
                  />
                </label>
                <label htmlFor="file_3" className={labelClass}>
                  <FaCamera className="text-app-gray-200" />
                  <Input
                    type="file"
                    id="file_3"
                    name="file"
                    className="hidden"
                  />
                </label>
                <label htmlFor="file_4" className={labelClass}>
                  <FaCamera className="text-app-gray-200" />
                  <Input
                    type="file"
                    id="file_4"
                    name="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <b>Product Descriptions</b>
              <div>
                <Textarea
                  placeholder="Describe product"
                  classNames={{
                    base: "border resize-none h-28 text-sm",
                    input: "outline-none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
