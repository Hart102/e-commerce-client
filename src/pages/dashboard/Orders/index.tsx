import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { products } from "../../../dummy/products";

export default function Orders() {
  const navigation = useNavigate();
  const actions = ["View", "Delete"];

  const viewProduct = (id: string) => navigation(`/dashboard/orders/${id}`);

  return (
    <>
      <div className="hidden px-4 md:flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <b className="text-3xl">100</b>
          <p className="text-neutral-400 text-sm italic">Orders</p>
        </div>

        <form className="flex w-1/2 items-center gap-2 bg-deep-gray-200 rounded px-2">
          <BiSearch size={18} className="text-deep-gray-100" />
          <Input
            size="sm"
            type="search"
            placeholder="Type to search..."
            classNames={{
              base: "h-10 border-l outline-0",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal hover:border-0",
            }}
            style={{ outline: "0" }}
          />
        </form>
      </div>
      <Table
        classNames={{
          base: "text-center",
          th: "text-neutral-400",
          tbody: "capitalize py-4 bg-deep-gray-200 text-sm",
        }}
      >
        <TableHeader>
          <TableColumn>
            <div className="flex items-center gap-4">
              <input type="checkbox" className="cursor-pointer" />
              <b>Basic Info</b>
            </div>
          </TableColumn>
          <TableColumn>OderId</TableColumn>
          <TableColumn>Customer</TableColumn>
          <TableColumn>Date & Time</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <div className="flex items-center gap-4">
                <input type="checkbox" className="cursor-pointer" />
                <div className="flex items-center gap-4">
                  <Image
                    src={products[0].images[0]}
                    classNames={{ img: "rounded-full h-[50px] w-[50px]" }}
                  />
                  {products[0].name}
                </div>
              </div>
            </TableCell>

            <TableCell>{"123"}</TableCell>
            <TableCell>{"Hart"}</TableCell>
            <TableCell>{"01 May 2023 (10:12 am)"}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger className="cursor-pointer">
                  ...
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Dynamic Actions"
                  items={actions}
                  className="z-10 bg-white text-sm"
                >
                  {actions.map((action) => (
                    <DropdownItem
                      key={action}
                      color="default"
                      className="py-2 hover:bg-deep-gray-200"
                      onClick={() => viewProduct(products[0].id)}
                    >
                      {action}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
