import { Input, Textarea, Button } from "@nextui-org/react";
import {
  ContainerLG,
  ContainerMD,
  ContainerSM,
} from "../../../layout/Container";
import { BiCloudUpload } from "react-icons/bi";

export default function AddProduct() {
  return (
    <ContainerLG columnReverse="flex-col">
      <ContainerMD>
        <div className="flex flex-col gap-4">
          <p className="text-2xl ml-5">Product Information</p>

          <form className="flex flex-col gap-4 px-3">
            <Input
              placeholder="Product Name"
              classNames={{
                input: "border-0 outline-none bg-app-gray-50 px-2",
              }}
            />
            <div className="w-full px-2">
              <select className="w-full px-2 py-3 bg-app-gray-50 outline-none">
                <option value="fashion">Fashion</option>
                <option value="electronics">Jewerrey</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            <div className="px-2">
              <Textarea
                placeholder="Describe product"
                classNames={{
                  base: "h-32 bg-app-gray-50",
                  input: "outline-none",
                }}
              />
            </div>

            <div className="px-2">
              <p className="text-2xl">Product Images</p>
              <div className="grid grid-cols-2 gap-4 p-4 bg-app-gray-50">
                <label
                  htmlFor="file_1"
                  className="rounded h-36 cursor-pointer flex items-center justify-center border"
                >
                  <BiCloudUpload size={20} />
                  <input type="file" id="file_1" className="hidden" />
                </label>
                <label
                  htmlFor="file_1"
                  className="rounded h-36 cursor-pointer flex items-center justify-center border"
                >
                  <BiCloudUpload size={20} />
                  <input type="file" id="file_1" className="hidden" />
                </label>
                <label
                  htmlFor="file_1"
                  className="rounded h-36 cursor-pointer flex items-center justify-center border"
                >
                  <BiCloudUpload size={20} />
                  <input type="file" id="file_1" className="hidden" />
                </label>
                <label
                  htmlFor="file_1"
                  className="rounded h-36 cursor-pointer flex items-center justify-center border"
                >
                  <BiCloudUpload size={20} />
                  <input type="file" id="file_1" className="hidden" />
                </label>
              </div>
            </div>
          </form>
        </div>
      </ContainerMD>
      <ContainerSM>
        <div className="flex flex-col gap-5">
          <p>Status</p>
          <div className="[&_label]:cursor-pointer flex items-center gap-8">
            <div className="flex gap-2 items-center">
              <input type="radio" id="active" name="radio" />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="radio" id="disable" name="radio" />
              <label htmlFor="disable">Disable</label>
            </div>
          </div>

          <Input
            placeholder="Quantity"
            classNames={{
              inputWrapper: "border px-2",
              input: "border-0 outline-none",
            }}
          />

          <Input
            placeholder="Price"
            classNames={{
              inputWrapper: "border px-2",
              input: "border-0 outline-none",
            }}
          />

          <Button className=" text-white py-2 px-3 rounded font-bold text-sm hover:opacity-65">
            Create Property
          </Button>
        </div>
      </ContainerSM>
    </ContainerLG>
  );
}
