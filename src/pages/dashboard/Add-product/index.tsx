import { Input, Textarea, Button } from "@nextui-org/react";
import { BiCloudUpload } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../../../schema/addProductSchema";
import { ContainerLG } from "../../../layout/Container";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: yupResolver(ProductSchema) });

  const onSubmit = (data: ProductSchema) => {
    console.log(data);
  };

  return (
    <ContainerLG columnReverse="flex-col">
      <div className="w-full md:w-10/12 flex flex-col gap-8 md:bg-deep-gray-200 md:p-5">
        <div className="flex flex-col gap-4">
          <p className="text-xl ml-3">Product Information</p>

          <form className="flex flex-col gap-4 [&_span]:text-red-500 [&_span]:text-xs [&_span]:ml-3">
            <div>
              <Input
                placeholder="Product Name"
                classNames={{
                  input: "border-0 outline-none bg-deep-gray-50 px-2",
                }}
                {...register("productName")}
              />
              <span>{errors?.productName?.message}</span>
            </div>

            <div className="w-full px-2">
              <div>
                <select
                  {...register("category")}
                  className="w-full px-2 py-3 bg-deep-gray-50 outline-none"
                >
                  <option value="fashion">Fashion</option>
                  <option value="electronics">Jewerrey</option>
                  <option value="electronics">Electronics</option>
                </select>

                <span>{errors?.category?.message}</span>
              </div>
            </div>

            <div className="px-2">
              <div>
                <Textarea
                  placeholder="Describe product"
                  classNames={{
                    base: "h-32 bg-deep-gray-50",
                    input: "outline-none",
                  }}
                  {...register("description")}
                />
                <span>{errors?.description?.message}</span>
              </div>
            </div>

            <div className="px-2">
              <p className="text-xl">Product Images</p>
              <div className="grid grid-cols-2 gap-4 p-4 bg-deep-gray-50">
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
      </div>

      <div className="flex flex-col gap-8 w-full md:w-4/12 p-5 bg-white">
        <div className="flex flex-col gap-5 [&_span]:text-red-500 [&_span]:text-xs [&_span]:ml-3">
          <p className="text-xl">Status</p>
          <div className="[&_label]:cursor-pointer flex items-center gap-8">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="active"
                value="active"
                {...register("status")}
              />
              <label htmlFor="active" className="text-app-gray-200">
                Active
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="disable"
                value="disabled"
                {...register("status")}
              />
              <label htmlFor="disable" className="text-app-gray-200">
                Disable
              </label>
            </div>
          </div>
          <span>{errors?.status?.message}</span>

          <div>
            <Input
              placeholder="Quantity"
              classNames={{
                inputWrapper: "bg-deep-gray-50 px-2",
                input: "border-0 outline-none",
              }}
              {...register("quantity")}
            />
            <span>{errors?.quantity?.message}</span>
          </div>

          <div>
            <Input
              placeholder="Price"
              classNames={{
                inputWrapper: "bg-deep-gray-50 px-2",
                input: "border-0 outline-none",
              }}
              {...register("price")}
            />
            <span>{errors?.price?.message}</span>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-black text-white py-2 px-3 rounded font-semibold text-sm hover:opacity-65"
          >
            CREATE PROPERTY
          </Button>
        </div>
      </div>
    </ContainerLG>
  );
}
