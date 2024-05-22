import {
  Modal,
  ModalContent,
  ModalBody,
  Input,
  Button,
} from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCategorySchema } from "@/schema/addCategorySchema";

export default function AddCategory({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addCategorySchema>({ resolver: yupResolver(addCategorySchema) });

  const onSubmit = (data: addCategorySchema) => {
    console.log(data);
  };
  return (
    <Modal
      size={"2xl"}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ closeButton: "hidden" }}
      className="fixed -top-1 -left-1 h-screen w-screen bg-overLay"
    >
      <ModalContent className="flex flex-col justify-center items-center">
        {(onClose) => (
          <div className="w-full md:w-5/12 mx-auto">
            <ModalBody>
              <form className="bg-white rounded-lg px-5 pt-4 pb-8 flex flex-col gap-4 text-sm [&_span]:text-red-500 [&_span]:text-xs">
                <div className="flex justify-end">
                  <FaTimes
                    size={30}
                    onClick={onClose}
                    className="border rounded-full p-2 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-4 px-4">
                  <div>
                    <p className="text-lg mb-5">Create Product Categories</p>
                  </div>

                  <div>
                    <Input
                      placeholder="Category Name"
                      classNames={{
                        inputWrapper: "px-0",
                        input: "border-0 outline-none bg-deep-gray-50 px-2",
                      }}
                      {...register("name")}
                    />
                    {errors?.name?.message && (
                      <span>{errors?.name?.message}</span>
                    )}
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
                        id="disable"
                        value="disable"
                        {...register("status")}
                      />
                      <label htmlFor="disable" className="text-app-gray-200">
                        Disable
                      </label>
                    </div>
                  </div>
                  {errors?.status?.message && (
                    <span>{errors?.status?.message}</span>
                  )}
                </div>

                <div className="px-4">
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="w-full bg-black text-white rounded"
                  >
                    CREATE
                  </Button>
                </div>
              </form>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
