import { useState, ChangeEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { BiCloudUpload } from "react-icons/bi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/schema/addProductSchema";
import { api, authentication_token, imageUrl } from "@/lib";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";

export default function AddProduct() {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [productImages, setproductImages] = useState<string[]>([]);
  const [replacedImages, setReplacedImages] = useState<string[]>([]);
  const filesLength: number[] = [0, 1, 2, 3];
  const categories: string[] = ["fasion", "electronics", "jewelry"];

  type FormFields =
    | "productName"
    | "quantity"
    | "category"
    | "description"
    | "status"
    | "price";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: yupResolver(ProductSchema),
    //  Set default values for input fields when editing a product.
    defaultValues: {
      productName: location.state?.name || "",
      category: location.state?.category || "",
      price: location.state?.price || "",
      quantity: location.state?.quantity || 0,
      status: location.state?.status || "",
      description: location.state?.description || "",
    },
  });
  /**
   * This effect hook is used to handle editing of products.
   * It sets the form values and preview images when the location state is available.
   */
  useEffect(() => {
    if (location.state) {
      const { name, category, price, quantity, status, description, images } =
        location.state;
      setValue("productName", name);
      setValue("category", category);
      setValue("price", price);
      setValue("quantity", quantity);
      setValue("status", status);
      setValue("description", description);
      setproductImages(images);
    }
  }, [location, setValue]);

  // Handle Image Selection
  const handleImage = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const newFiles = [...files];
      const newPreviewImages = [...previewImages];

      newFiles[index] = selectedFile;
      newPreviewImages[index] = URL.createObjectURL(selectedFile);
      setFiles(newFiles);
      setPreviewImages(newPreviewImages);

      if (!replacedImages.includes(productImages[index])) {
        setReplacedImages([...replacedImages, productImages[index]]);
      }
    }
  };

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => console.log("Confirm"),
    confirmationMessage: "",
    response,
  });

  const handleChangeModalContent = (template: string) => {
    changeModalContent({
      template,
      templates,
      onOpen,
      setCurrentTemplate,
    });
  };

  // Handles Editing Of Products
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(name as FormFields, value);
  };
  const handleApiRequest = async (data: ProductSchema, endpoint: string) => {
    handleChangeModalContent("01");
    const price = location.state == null ? `NGN ${data.price}` : data.price;
    const formData = new FormData();
    files.forEach((file: File) => formData.append("file", file));
    formData.append("name", data.productName);
    formData.append("category", data.category);
    formData.append("price", price);
    formData.append("quantity", data.quantity);
    formData.append("status", data.status);
    formData.append("description", data.description);
    //Edit
    if (location.state !== null) {
      formData.append("id", location.state.id);
      formData.append("replacedImageIds", JSON.stringify(replacedImages));
      if (files.length < 1) {
        formData.append("images", JSON.stringify(productImages));
      }
    }
    try {
      const request = await axios.put(`${api}/products/${endpoint}`, formData, {
        headers: { Authorization: authentication_token },
      });
      const response = await request.data;
      if (response.error) {
        setResponse({ isError: true, message: response.error });
        onOpen();
      } else {
        setResponse({ isError: false, message: response.message });
        onOpen();
        reset();
        setFiles([]);
        setPreviewImages([]);
      }
    } catch (error) {
      setResponse({
        isError: true,
        message: "Something went wrong. Please try again.",
      });
    }
    handleChangeModalContent("03");
  };

  const onSubmit = (data: ProductSchema) => {
    location.state == null
      ? handleApiRequest(data, "create")
      : handleApiRequest(data, "edit");
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-sm md:p-0 p-4 justify-center">
        <form className="w-full md:w-10/12 flex flex-col gap-8 md:p-5">
          <div className="flex flex-col gap-4">
            <p className="text-xl ml-3">Product Information</p>
            <div className="flex flex-col gap-4 [&_span]:text-red-500 [&_span]:text-xs [&_span]:ml-31">
              <div>
                <Input
                  placeholder="Product Name"
                  classNames={{
                    base: "border",
                    input: "border-0 outline-none bg-transparent",
                  }}
                  {...register("productName")}
                  onChange={handleInputChange}
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
                    listbox: "bg-white",
                    value: "capitalize",
                    selectorIcon: "hidden",
                    base: "border capitalize",
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
                      base: "h-32 border",
                    }}
                    {...register("description")}
                  />
                  <span>{errors?.description?.message}</span>
                </div>
              </div>
              <div className="px-2">
                <p className="text-xl">Product Images</p>
                <div className="grid grid-cols-2 gap-8 p-4">
                  {filesLength.map((index) => (
                    <label
                      key={index}
                      htmlFor={`${index}`}
                      className="rounded h-36 cursor-pointer flex items-center justify-center border my-2 py-2 relative"
                    >
                      <input
                        type="file"
                        id={`${index}`}
                        className="hidden"
                        onChange={(e) => handleImage(e, index)}
                      />
                      {(previewImages[index] !== undefined ||
                        productImages[index] !== undefined) && (
                        <Image
                          src={
                            previewImages[index] ||
                            imageUrl(productImages[index])
                          }
                          alt="Product Image"
                          width={200}
                          height={130}
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
                {location.state == null && <p>NGN</p>}
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
              className="bg-deep-green-200 text-white py-2 px-3 rounded font-semibold text-sm hover:opacity-65"
            >
              {location.state == null ? "CREATE PRODUCT" : "EDIT PRODUCT"}
            </Button>
          </div>
        </form>
      </div>

      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
