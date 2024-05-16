import { Input, Button, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { FaAngleRight, FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import { ContainerLG } from "../../layout/Container";

export default function Login() {
  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border-b",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };

  return (
    <ContainerLG>
      <div className="w-full md:w-4/12 hidden md:flex justify-center gap-8 md:bg-deep-gray-200">
        <Image
          width={500}
          className="h-full"
          src="https://contents.mediadecathlon.com/p2188247/1cr1/…dc/crop-top-t-shirt-grey.jpg?format=auto&f=1024x0"
        />
      </div>

      <div className="w-full md:w-4/12 md:py-10 md:px-16 py-10 px-5 bg-white">
        <form className="flex flex-col gap-5">
          <div>
            <Input placeholder="Email" classNames={InputProps} />
            <Input placeholder="Password" classNames={InputProps} />
          </div>
          <div className="flex justify-between text-neutral-500">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <p>keep me logged in</p>
            </div>
            <Link to="" className="flex items-center gap-1">
              Register
              <FaAngleRight />
            </Link>
          </div>

          <Button className="bg-black text-white w-full rounded-full my-7">
            LOGIN
          </Button>

          <div className="flex flex-col items-center justify-center gap-4 text-neutral-500 my- my-5">
            <p>LOGIN BY</p>
            <div className="flex gap-4">
              <FaGoogle
                size={30}
                className="rounded-full bg-neutral-300 p-2 cursor-pointer"
              />
              <FaTwitter
                size={30}
                className="rounded-full bg-neutral-300 p-2 cursor-pointer"
              />
              <FaFacebook
                size={30}
                className="rounded-full bg-neutral-300 p-2 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </div>
    </ContainerLG>
  );
}
