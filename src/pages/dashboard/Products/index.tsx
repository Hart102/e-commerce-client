import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Pagination,
  Button,
} from "@nextui-org/react";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../../dummy/products";
import { ProductType } from "../../../types/index";
import Search from "../../../components/Search";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState<ProductType[]>([]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">Products</h3>
        <Link
          to="/dashboard/add-products"
          className="bg-neutral-700 text-white py-2 px-3 rounded font-bold text-sm hover:opacity-65"
        >
          Add Product
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <Search items={products} searchResponse={setSearchResult} />

        <Table
          aria-label="Example table with custom cells"
          className="text-sm shadow-lg py-5"
          classNames={{
            th: "text-neutral-700",
          }}
        >
          <TableHeader>
            <TableColumn>Image</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Created at</TableColumn>
            <TableColumn>Created at</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Product not found"}>
            {searchResult.map((product, index) => (
              <TableRow
                key={index}
                className="text-neutral-500 capitalize text-center"
              >
                <TableCell>
                  <User
                    avatarProps={{
                      size: "md",
                      radius: "sm",
                      src: product.images[0],
                    }}
                    description={""}
                    name={""}
                    classNames={{ base: "w-[50px] mx-auto" }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell
                  className={`${
                    product.status == "enabled"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <span
                    className={`rounded-2xl py-1 px-2 ${
                      product.status == "enabled"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
                <TableCell className="flex justify-center gap-4">
                  <Tooltip
                    content="Details"
                    className="text-sm bg-neutral-900 text-white rounded-full px-2"
                  >
                    <Link
                      to={`/online-store/shop-single/${product.id}`}
                      className="cursor-pointer active:opacity-50"
                    >
                      <FaEye size={14} />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content="Delete"
                    className="text-sm bg-neutral-900 text-white rounded-full px-2"
                  >
                    <span className="cursor-pointer active:opacity-50">
                      <FaPencilAlt size={14} />
                    </span>
                  </Tooltip>
                  <Tooltip
                    color="danger"
                    content="Delete user"
                    className="text-sm bg-red-600 text-white rounded-full px-2"
                  >
                    <span className="text-danger cursor-pointer active:opacity-50">
                      <FaTrashAlt size={14} className="text-red-600" />
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between gap-5 text-sm md:px-5 my-5">
          <p className="text-small text-default-500">
            Page: {currentPage} of (10)
          </p>
          <div className="flex items-center flex-col1 gap-4">
            <Button
              size="sm"
              variant="flat"
              onPress={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              className="border rounded py-1 hover:bg-neutral-900 hover:text-white"
            >
              Previous
            </Button>
            <Pagination
              total={10}
              color="secondary"
              page={currentPage}
              classNames={{
                cursor: "px-2 border border-app-yellow-200 outline-none",
                item: "mx-1 px-2 border",
              }}
              onChange={setCurrentPage}
            />
            <Button
              size="sm"
              variant="flat"
              onPress={() =>
                setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
              }
              className="border rounded py-1 hover:bg-neutral-900 hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
