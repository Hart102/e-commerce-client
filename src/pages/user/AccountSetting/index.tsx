import { Input, Button } from "@nextui-org/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  editDetailsSchema,
  // resetPasswordSchema,
} from "@/schema/AccountSettingSchema";

export default function AccountSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editDetailsSchema>({ resolver: yupResolver(editDetailsSchema) });

  const handleDetails = (data: editDetailsSchema) => {
    console.log(data);
  };

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none bg-deep-gray-50",
    base: "text-sm text-neutral-500 mb-2 py-2 z-0",
  };

  return (
    <div>
      <div className="flex flex-col gap-8 [&_span]:text-xs [&_span]:text-red-500">
        <h1 className="text-xl md:text-3xl font-bold">Account Setting</h1>

        <form className="w-full md:w-1/2">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                label="First Name"
                labelPlacement="outside"
                placeholder="tim"
                classNames={InputProps}
                {...register("firstname")}
              />
              <span>{errors?.firstname?.message}</span>
            </div>
            <div>
              <Input
                label="Last Name"
                labelPlacement="outside"
                placeholder="*****"
                classNames={InputProps}
                {...register("lastname")}
              />
              <span>{errors?.lastname?.message}</span>
            </div>
            <div>
              <Input
                label="Email"
                labelPlacement="outside"
                placeholder="tim@gmail.com"
                classNames={InputProps}
                {...register("email")}
              />
              <span>{errors?.email?.message}</span>
            </div>
            <div>
              <Input
                label="Phone"
                labelPlacement="outside"
                placeholder="090 123 456"
                classNames={InputProps}
                {...register("phone")}
              />
              <span>{errors?.phone?.message}</span>
            </div>
          </div>

          <Button
            onClick={handleSubmit(handleDetails)}
            className="bg-deep-green-200 text-white rounded-lg mt-5"
          >
            Save Details
          </Button>
        </form>

        <form className="mt-10">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="password"
                label="Password"
                labelPlacement="outside"
                placeholder="*****"
                classNames={InputProps}
              />
            </div>
            <div>
              <Input
                type="password"
                label="New password"
                labelPlacement="outside"
                placeholder="*****"
                classNames={InputProps}
              />
            </div>
          </div>

          <Button className="bg-deep-green-200 text-white rounded-lg">
            Save Password
          </Button>
        </form>
      </div>
    </div>
  );
}
