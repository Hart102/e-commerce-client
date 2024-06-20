import { Image } from "@nextui-org/react";
import LoadingGif from "@/assets/loading.gif";

export default function Loader() {
  return (
    <div className="flex justify-center py-5">
      <Image src={LoadingGif} width={70} className="mx-auto" />
    </div>
  );
}
