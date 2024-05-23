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
  useDisclosure,
} from "@nextui-org/react";
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { products } from "@/dummy/products";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";

export default function Products() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const actions = ["View", "Edit", "Delete"];

  const viewProduct = (id: string) => navigation(`/shop/single/${id}`);

  const deleteProduct = async (id: string) => {
    console.log(id);
    onOpen();
  };

  return (
    <>
      <div className="bg-white rounded-xl p-5 flex flex-col gap-4 md:gap-8">
        <div className="hidden px-4 md:flex items-center justify-between border-b pb-5">
          <div className="flex items-baseline gap-2">
            <b className="text-3xl">300</b>
            <p className="text-neutral-400 text-sm italic">Products</p>
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

          <div>
            <Link
              to="/dashboard/add-products"
              className="py-2 px-2 rounded flex items-center gap-1 font-semibold bg-deep-gray-200 hover:bg-white"
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
            tbody: "capitalize py-4 text-sm",
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
                      <Image
                        src={product.images[0]}
                        classNames={{ img: "rounded-full h-[50px] w-[50px]" }}
                      />
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
                      <DropdownItem
                        className="py-1 my-2 hover:bg-deep-gray-200"
                        onClick={() => viewProduct(product.id)}
                      >
                        View
                      </DropdownItem>
                      <DropdownItem className="py-1 my-2 hover:bg-deep-gray-200">
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        className="py-1 my-2 hover:bg-deep-gray-200"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        message="Are you sure you want to delete user"
      />
    </>
  );
}
