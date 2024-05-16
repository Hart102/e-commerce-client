import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import AddCategory from "../../../components/Add-category";
import { products } from "../../../dummy/products";

export default function Categories() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const actions = ["View", "Delete"];

  const viewProduct = (id: string) => navigation(`/dashboard/orders/${id}`);

  return (
    <>
      <div className="bg-deep-gray-200 p-4 md:p-8">
        <div className="hidden px-4 md:flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <b className="text-3xl">4</b>
            <p className="text-neutral-400 text-sm italic">Categories</p>
          </div>

          <div>
            <Button
              // to="/dashboard/add-category"
              onPress={onOpen}
              className="py-2 px-2 rounded flex items-center gap-1 font-semibold bg-white hover:bg-white"
            >
              <BiAddToQueue />
              <p className="text-sm">ADD CATEGORY</p>
            </Button>
          </div>
        </div>
        <Table
          classNames={{
            base: "text-center",
            th: "text-neutral-400",
            tbody: "capitalize bg-white py-4 text-sm",
          }}
        >
          <TableHeader>
            <TableColumn>
              <div className="text-start">
                <b>Name</b>
              </div>
            </TableColumn>
            <TableColumn>Products</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                <div className="text-start">electronics</div>
              </TableCell>

              <TableCell>10</TableCell>
              <TableCell>published</TableCell>
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
      </div>
      <AddCategory isOpen={isOpen} onClose={onClose} />
    </>
  );
}
