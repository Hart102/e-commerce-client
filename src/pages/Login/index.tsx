import axios from "axios";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schema/register_login_schema";
import { api } from "@/lib";

interface CookieOptions {
  name: string;
  value: string;
  days?: number;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: yupResolver(LoginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    const request = await axios.post(`${api}/user/login`, data);
    const response = await request.data;

    // SET COOKIE FUNCTION
    const setCookie = (options: CookieOptions) => {
      let expires = "";
      if (options.days) {
        const date = new Date();
        date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie =
        options.name + "=" + (options.value || "") + expires + "; path=/";
    };
    setCookie({ name: "online_store", value: response.token });

    console.log(response);
  };

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none",
    base: "text-sm text-neutral-500 mb-2 py- bg-deep-gray-50",
  };

  return (
    <div className="bg-white px-5">
      <form className="w-full md:w-5/12 mx-auto p-5 md:px-10">
        <h1 className="text-2xl font-semibold mb-10">Welcome Back !</h1>

        <div className="flex flex-col gap-8 [&_span]:text-xs [&_span]:text-red-500">
          <div>
            <Input
              type="email"
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
              type="password"
              label="Password"
              labelPlacement="outside"
              placeholder="****"
              classNames={InputProps}
              {...register("password")}
            />
            <span>{errors?.password?.message}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="" className="text-sm text-neutral-500">
            Register
          </Link>
        </div>
        <div className="py-5">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full font-semibold bg-dark-blue-100 text-white rounded-full"
          >
            LOGIN
          </Button>
        </div>
      </form>
    </div>
  );
}
