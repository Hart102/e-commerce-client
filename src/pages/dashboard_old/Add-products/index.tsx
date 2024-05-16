import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Textarea, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductSchema } from "../../../schema/addProductSchema";
import { useState, ChangeEvent } from "react";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: yupResolver(ProductSchema) });

  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const filesLength: number[] = [0, 1, 2, 3];

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

  // const removeImage = (index: number) => {
  //   const newFiles = [...files];
  //   newFiles.splice(index, 1);
  //   setFiles(newFiles);
  // };
  const onSubmit = (data: ProductSchema) => {
    const formData = new FormData();
    files.forEach((file: File) => formData.append("file", file));

    formData.append("name", data.productName);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("status", status);
    formData.append("units", data.units);

    console.log(data);
  };

  const InputProps = {
    label: "mb-16 font-bold",
    inputWrapper: "px-0 flex",
    input: "px-2 outline-none border rounded",
    base: "text-sm text-neutral-600 my-2",
  };

  return (
    <>
      <div className="flex items-center justify-between p-5 bg-white rounded-t-2xl">
        <h3 className="text-2xl font-bold text-neutral-500">Add Products</h3>
        <Link
          to="/dashboard/products"
          className="bg-deep-gray-100 py-2 px-3 rounded text-sm font-bold hover:opacity-65"
        >
          Back to Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 bg-white p-4">
        <form className="w-full md:w-8/12 flex flex-col gap-5 md:p-4 [&_b]:text-xl [&_b]:text-neutral-500">
          <div className="flex flex-col gap-8">
            <b>Product Information</b>
            <div className="text-sm text-neutral-600 [&_p]:text-red-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Input
                    type="text"
                    placeholder="Product Name"
                    labelPlacement="outside"
                    label="Name"
                    classNames={InputProps}
                    {...register("productName")}
                  />
                  <p>{errors?.productName?.message}</p>
                </div>

                <div>
                  <Input
                    type="number"
                    label="Units"
                    placeholder="9"
                    labelPlacement="outside"
                    classNames={InputProps}
                    {...register("units")}
                  />
                  <p>{errors?.units?.message}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="font-bold">
                  Select category
                </label>
                <select
                  className="px-2 py-3 rounded bg-transparent border outline-none"
                  {...register("category")}
                >
                  <option value="fashion">Fashion</option>
                  <option value="electronics">Electronics</option>
                </select>
                <p className="text-red-500">{errors?.category?.message}</p>
              </div>

              <div className="shadow rounded-md md:px-4 p-2">
                <span className="font-bold">Status</span>
                <div className="flex flex-col gap-8">
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="active"
                        onChange={() => setStatus("active")}
                      />
                      <label htmlFor="active">Active</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="disable"
                          onChange={() => setStatus("disable")}
                        />
                        <label htmlFor="disable">Disable</label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Sales price"
                      placeholder="$0.00"
                      labelPlacement="outside"
                      classNames={InputProps}
                      {...register("price")}
                    />
                    <p>{errors?.price?.message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <b>Product Images</b>
            <div className="grid grid-cols-2 md:grid-cols-4 p-2 bg-app-gray-50 rounded-lg [&_p]:text-red-500">
              {filesLength.map((index) => (
                <label
                  key={index}
                  htmlFor={`${index}`}
                  className="rounded h-36 w-32 cursor-pointer flex items-center justify-center relative text-app-gray-200"
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
                      className="object-contain h-full w-full ring-0 outline-0 border-0"
                    />
                  )}
                  <div className="z-10 absolute top-0 w-full h-full flex items-center justify-center">
                    <FaCamera />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <b>Product Descriptions</b>
            <div>
              <Textarea
                placeholder="Describe product"
                {...register("description")}
                classNames={{
                  base: "border resize-none h-36 text-sm overflow-y-scroll",
                  input: "outline-none",
                }}
              />
              <p className="text-red-500">{errors?.description?.message}</p>
            </div>
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-2 font-bold bg-deep-gray-100 rounded"
          >
            Create Product
          </Button>
        </form>
      </div>
    </>
  );
}
