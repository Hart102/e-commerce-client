import { useState, ChangeEvent } from "react";
import {
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { BiCloudUpload } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/schema/addProductSchema";
import ServerResponseModal from "@/components/Modal/ServerResponse";
import { api, authentication_token } from "@/lib";

export default function AddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalData, setModalData] = useState({ isError: false, message: "" });
  const filesLength: number[] = [0, 1, 2, 3];
  const categories: string[] = ["fasion", "electronics", "jewelry"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: yupResolver(ProductSchema) });

  const handleImage = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const newFiles = [...files];
      const newPreviewImages = [...previewImages];

      newFiles[index] = selectedFile;
      newPreviewImages[index] = URL.createObjectURL(selectedFile);
      setFiles(newFiles);
      setPreviewImages(newPreviewImages);
    }
  };

  const onSubmit = async (data: ProductSchema) => {
    const formData = new FormData();
    files.forEach((file: File) => formData.append("file", file));
    formData.append("name", data.productName);
    formData.append("category", data.category);
    formData.append("price", `NGN ${data.price}`);
    formData.append("quantity", data.quantity);
    formData.append("status", data.status);
    formData.append("description", data.description);

    setIsLoading(true);
    const request = await axios.put(
      `${api}/products/create_product`,
      formData,
      { headers: { Authorization: authentication_token } }
    );
    const response = await request.data;
    setIsLoading(false);
    if (response.error) {
      setModalData({ isError: true, message: response.error });
      onOpen();
    } else {
      setModalData({ isError: false, message: response.message });
      onOpen();
      reset();
      setFiles([]);
      setPreviewImages([]);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-sm md:p-0 p-4 justify-center bg-white md:bg-transparent">
        <form className="w-full md:w-10/12 flex flex-col gap-8 md:bg-deep-gray-200 md:p-5">
          <div className="flex flex-col gap-4">
            <p className="text-xl ml-3">Product Information</p>
            <div className="flex flex-col gap-4 [&_span]:text-red-500 [&_span]:text-xs [&_span]:ml-31">
              <div>
                <Input
                  placeholder="Product Name"
                  classNames={{
                    base: "bg-deep-gray-50",
                    input: "border-0 outline-none bg-transparent",
                  }}
                  {...register("productName")}
                />
                {errors?.productName?.message && (
                  <span>{errors?.productName?.message}</span>
                )}
              </div>
              <div>
                <Select
                  aria-labelledby="category-select-label"
                  placeholder="Select category"
                  selectionMode="single"
                  className="text-green-400"
                  classNames={{
                    selectorIcon: "hidden",
                    base: "bg-deep-gray-50 capitalize",
                    listbox: "bg-white",
                    value: "capitalize",
                    innerWrapper: "text-start flex",
                  }}
                  {...register("category")}
                >
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="capitalize text-sm my-1 py-2 hover:bg-deep-gray-200"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </Select>
                <span>{errors?.category?.message}</span>
              </div>
              <div>
                <div>
                  <Textarea
                    placeholder="Describe product"
                    classNames={{
                      input: "outline-none",
                      base: "h-32 bg-deep-gray-50",
                    }}
                    {...register("description")}
                  />
                  <span>{errors?.description?.message}</span>
                </div>
              </div>
              <div className="px-2">
                <p className="text-xl">Product Images</p>
                <div className="grid grid-cols-2 gap-4 p-4 bg-deep-gray-50">
                  {filesLength.map((index) => (
                    <label
                      key={index}
                      htmlFor={`${index}`}
                      className="rounded h-36 cursor-pointer flex items-center justify-center border py-2 relative"
                    >
                      <input
                        type="file"
                        id={`${index}`}
                        className="hidden"
                        onChange={(e) => handleImage(e, index)}
                      />
                      {previewImages[index] !== undefined && (
                        <img
                          src={previewImages[index]}
                          className="object-contain h-full w-full"
                        />
                      )}
                      <div className="absolute top-0 left-0 h-full w-full z-10 flex justify-center items-center">
                        <BiCloudUpload size={20} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
        <form className="flex flex-col gap-8 w-full md:w-4/12 p-5 bg-white">
          <div className="flex flex-col gap-5 [&_span]:text-red-500 [&_span]:text-xs">
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
            {errors?.status?.message && <span>{errors?.status?.message}</span>}
            <div>
              <Input
                placeholder="Quantity Eg: 15"
                classNames={{
                  inputWrapper: "bg-deep-gray-50",
                  input: "border-0 outline-none",
                }}
                {...register("quantity")}
              />
              {errors?.quantity?.message && (
                <span>{errors?.quantity?.message}</span>
              )}
            </div>
            <div>
              <div className="flex items-center bg-deep-gray-50 pl-1">
                <p>NGN</p>
                <Input
                  placeholder="0.00"
                  classNames={{
                    inputWrapper: "px-2",
                    input: "border-0 outline-none",
                  }}
                  {...register("price")}
                />
              </div>
              {errors?.price?.message && <span>{errors?.price?.message}</span>}
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className={`bg-black text-white py-2 px-3 rounded font-semibold text-sm hover:opacity-65 ${
                isLoading && "opacity-55"
              }`}
            >
              {isLoading ? "PROCESSING..." : "UPLOAD PRODUCT"}
            </Button>
          </div>
        </form>
      </div>
      <ServerResponseModal
        isError={modalData.isError}
        isOpen={isOpen}
        onClose={onClose}
        message={modalData.message}
      />
    </>
  );
}
