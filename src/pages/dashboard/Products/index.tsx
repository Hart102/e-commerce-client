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
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { products } from "../../../dummy/products";

export default function Products() {
  const navigation = useNavigate();
  const actions = ["View", "Edit", "Delete"];

  const viewProduct = (id: string) => navigation(`/shop/single/${id}`);

  return (
    <>
      <div className="hidden px-4 md:flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <b className="text-3xl">300</b>
          <p className="text-neutral-400 text-sm italic">Products</p>
        </div>

        <form className="flex w-1/2 items-center gap-2 bg-[#F7F7F7] shadow rounded px-2">
          <BiSearch size={18} className="text-app-gray-100" />
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

        <div>
          <Link
            to="/dashboard/add-products"
            className="py-2 px-2 rounded flex items-center gap-1 font-semibold bg-[#F7F7F7] hover:bg-white"
          >
            <BiAddToQueue />
            <p className="text-sm">ADD PRODUCT</p>
          </Link>
        </div>
      </div>
      <Table
        classNames={{
          base: "text-center",
          th: "text-neutral-400",
          tr: "capitalize py-4 bg-[#F7F7F7] shadow",
        }}
      >
        <TableHeader>
          <TableColumn>
            <div className="flex items-center gap-4">
              <input type="checkbox" className="cursor-pointer" />
              <b>Basic Info</b>
            </div>
          </TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-4">
                  <input type="checkbox" className="cursor-pointer" />
                  <div className="flex items-center gap-4">
                    <Image src={product.images[0]} width={50} />
                    {product.name}
                  </div>
                </div>
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.price}</TableCell>
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
                        className="py-2 hover:bg-[#F7F7F7]"
                        onClick={() => viewProduct(product.id)}
                      >
                        {action}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
