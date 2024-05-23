import { Avatar, Badge } from "@nextui-org/react";
import { BiBell } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <nav className="bg-white rounded-tr-xl p-5">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-lg font-semibold uppercase">
          {location.pathname.slice(11).replace("-", " ")}
        </p>

        <div className="flex items-center gap-6">
          <div className="flex items-start">
            <BiBell size={20} />
            <div className="rounded-full bg-red-500 text-white flex items-center justify-center h-[10px] w-[10px] -mt-[4px] -ml-[8px]"></div>
          </div>
          <div>
            <Badge size="sm">
              <Avatar
                isBordered
                radius="full"
                classNames={{ img: "rounded-full" }}
                src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
              />
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
}
