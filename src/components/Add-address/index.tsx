import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { FaTimes } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addAddressSchema } from "@/schema/addressSchema";

export default function AddAddress({
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
  } = useForm<addAddressSchema>({ resolver: yupResolver(addAddressSchema) });

  const onSubmit = (data: addAddressSchema) => {
    console.log(data);
  };

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border-b",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };
  return (
    <div>
      <Modal
        size={"2xl"}
        isOpen={isOpen}
        onClose={onClose}
        classNames={{ closeButton: "hidden" }}
        className="fixed top-0 -left-1 h-screen w-screen bg-overLay"
      >
        <ModalContent className="flex flex-col justify-center items-center">
          {(onClose) => (
            <div className="w-full md:w-6/12 mx-auto">
              <ModalBody>
                <form className="bg-white rounded-lg p-5 flex flex-col gap-12 z-10">
                  <div>
                    <div className="flex justify-end">
                      <FaTimes
                        size={30}
                        onClick={onClose}
                        className="border rounded-full p-2 cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col gap-1 md:px-10">
                      <h1 className="text-xl font-bold">
                        New Shipping Address
                      </h1>
                      <p className="text-neutral-500">
                        Add new shipping address for your order delivery.
                      </p>
                    </div>
                  </div>
                  <div className="md:px-10 md:py-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 [&_span]:text-red-500 [&_span]:text-xs">
                      <div>
                        <Input
                          label="Address"
                          placeholder="No, 7 aba oweri road"
                          classNames={InputProps}
                          {...register("address")}
                        />
                        <span>{errors?.address?.message}</span>
                      </div>
                      <div>
                        <Input
                          label="City"
                          placeholder="Aba"
                          classNames={InputProps}
                          {...register("city")}
                        />
                        <span>{errors?.city?.message}</span>
                      </div>
                      <div>
                        <Input
                          label="State"
                          placeholder="Abia state"
                          classNames={InputProps}
                          {...register("state")}
                        />
                        <span>{errors?.state?.message}</span>
                      </div>

                      <div>
                        <Input
                          label="Country"
                          placeholder="Nigeria"
                          classNames={InputProps}
                          {...register("country")}
                        />
                        <span>{errors?.country?.message}</span>
                      </div>
                      <div>
                        <Input
                          label="Zip Code"
                          placeholder="11400"
                          classNames={InputProps}
                          {...register("zipcode")}
                        />
                        <span>{errors?.zipcode?.message}</span>
                      </div>
                      <div>
                        <Input
                          label="Phone Number"
                          placeholder="+234 456 789"
                          classNames={InputProps}
                          {...register("phone")}
                        />
                        <span>{errors?.phone?.message}</span>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="light"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-black text-white rounded-full px-20 mt-5"
                      >
                        SAVE
                      </Button>
                    </div>
                  </div>
                </form>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
