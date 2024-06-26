import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, useDisclosure } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCategorySchema } from "@/schema/addCategorySchema";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";
import { api, authentication_token } from "@/lib";

type CategoryWithProductCount = {
  id: number;
  name: string;
  status: "published" | "unpublished";
  createdAt: Date;
  product_count: number;
};

export default function EditAndDeleteCategory({
  close,
  category,
}: {
  close: () => void;
  category?: CategoryWithProductCount;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });

  useEffect(() => {
    if (category) {
      console.log("EDit:", category);
    }
  }, []);

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => console.log("add category page"),
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addCategorySchema>({ resolver: yupResolver(addCategorySchema) });

  const handleApiRequest = async (data: addCategorySchema) => {
    handleChangeModalContent("01");
    const request = await axios.put(`${api}/categories/create`, data, {
      headers: { Authorization: authentication_token },
    });
    const response = request.data;
    if (response.error) {
      setResponse({ isError: true, message: response.error });
      handleChangeModalContent("03");
    } else {
      close();
      reset();
      setResponse({ isError: false, message: response.message });
      handleChangeModalContent("03");
    }
  };

  const onSubmit = async (data: addCategorySchema) => {
    handleApiRequest(data);
  };

  return (
    <>
      {/* <form className="pt-4 pb-8 flex flex-col gap-4 text-sm [&_span]:text-red-500 [&_span]:text-xs">
        <div className="flex flex-col gap-4 px-4">
          <div>
            <p className="text-lg font-semibold mb-5 text-dark-gray-100">
              Create Product Categories
            </p>
          </div>
          <div>
            <Input
              placeholder="Category Name"
              classNames={{
                inputWrapper: "px-0",
                input: "bg-white rounded-lg outline-none px-2",
              }}
              {...register("name")}
            />
            {errors?.name?.message && <span>{errors?.name?.message}</span>}
          </div>
          <div className="[&_label]:cursor-pointer flex items-center gap-4 text-neutral-500">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="active"
                value="published"
                {...register("status")}
              />
              <label htmlFor="active" className="text-app-gray-200">
                Publish
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="unpublished"
                value="unpublished"
                {...register("status")}
              />
              <label htmlFor="unpublished" className="text-app-gray-200">
                Unpublished
              </label>
            </div>
          </div>
          {errors?.status?.message && <span>{errors?.status?.message}</span>}
        </div>
        <div className="px-4">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-deep-green-50 rounded font-semibold text-dark-gray-100"
          >
            CREATE
          </Button>
        </div>
      </form> */}

      <form className="min-h-[80vh] flex items-center text-dark-gray-100">
        <div className="w-full md:w-1/2 mx-auto flex flex-col gap-4">
          <Input
            placeholder="Category Name"
            classNames={{
              inputWrapper: "px-0",
              input: "bg-white rounded-lg outline-none px-2 border",
            }}
            {...register("name")}
          />
          {errors?.name?.message && <span>{errors?.name?.message}</span>}

          <div className="flex items-center gap-2 [&_span]:text-red-500 [&_span]:text-xs">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="active"
                value="published"
                {...register("status")}
              />
              <label htmlFor="active" className="text-app-gray-200">
                Publish
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="unpublished"
                value="unpublished"
                {...register("status")}
              />
              <label htmlFor="unpublished" className="text-app-gray-200">
                Unpublished
              </label>
            </div>
            {errors?.status?.message && <span>{errors?.status?.message}</span>}
          </div>

          <div>
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-deep-green-200 rounded font-semibold text-white"
            >
              CREATE
            </Button>
          </div>
        </div>
      </form>

      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}

// export default function EditAndDeleteCategory() {
//   return <div></div>;
// }
