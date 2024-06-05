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
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiAddToQueue, BiSearch } from "react-icons/bi";
import ConfirmationModal from "@/components/Modal/ConfirmationModal";
import { useEffect, useState } from "react";
import { api, authentication_token, imageUrl, divideAndInsertBr } from "@/lib";
import { ProductType } from "@/types/index";
import ServerResponseModal from "@/components/Modal/ServerResponse";

export default function Products() {
  const navigation = useNavigate();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [responseModalData, setresponseModalData] = useState({
    isError: false,
    message: "",
  });
  const actions = ["View", "Edit", "Delete"];

  const fetchProducts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${api}/products/`, {
      headers: { Authorization: authentication_token },
    });
    setIsLoading(false);
    setProducts(data);
    console.log(data);
  };
  const openCofirmation = (id: string) => {
    setProductId(id);
    if (isModalOpen) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };
  const deleteProduct = async () => {
    setIsModalOpen(false);
    const request = await axios.delete(`${api}/products/delete/${productId}`, {
      headers: { Authorization: authentication_token },
    });
    const response = await request.data;
    if (response.error) {
      setresponseModalData({ isError: true, message: response.error });
      onOpen();
    } else {
      setresponseModalData({ isError: false, message: response.message });
      onOpen();
      fetchProducts;
    }
  };
  // const viewProduct = (product: ProductType) =>
  //   navigation(`/dashboard/product-view`, { state: product });

  const viewProduct = (product: ProductType) =>
    navigation(`/shop/single`, { state: product });

  useEffect(() => {
    fetchProducts();
  }, []);

  return isLoading ? (
    <p className="text-2xl text-neutral-400">Loading...</p>
  ) : (
    <>
      <div className="bg-white rounded-xl p-5 flex flex-col gap-4 md:gap-8">
        <div className="hidden px-4 md:flex items-center justify-between border-b1 pb-51">
          <div className="flex items-baseline gap-2">
            <b className="text-3xl text-deep-green-100">
              {products && products?.length}
            </b>
            <p className="text-sm italic">Products</p>
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
              className="py-2 px-2 rounded flex items-center gap-1 font-semibold bg-deep-green-100 text-white"
            >
              <BiAddToQueue />
              <p className="text-sm">ADD PRODUCT</p>
            </Link>
          </div>
        </div>
        <Table
          classNames={{
            base: "text-center1",
            th: "text-white bg-deep-green-100 uppercase",
            tbody: "py-4 text-sm text-center",
            td: "first-letter:capitalize",
          }}
        >
          <TableHeader>
            <TableColumn>
              <div className="text-start">
                <b>Basic Info</b>
              </div>
            </TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {products && products?.length > 0 ? (
              products.map((product) => (
                <TableRow key={product?.id}>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      {product?.images && product?.images?.length > 0 && (
                        <Image
                          src={imageUrl(product?.images[0])}
                          classNames={{
                            img: "rounded-full h-[50px] w-[50px]",
                          }}
                          alt={product?.name}
                        />
                      )}
                      <div
                        className="first-letter:capitalize text-start"
                        dangerouslySetInnerHTML={{
                          __html: divideAndInsertBr(product?.name),
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product?.category}</TableCell>
                  <TableCell>{product?.status}</TableCell>
                  <TableCell>{product?.price}</TableCell>
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
                          className="py-1 my-1 hover:bg-deep-gray-200"
                          onClick={() => viewProduct(product)}
                        >
                          View
                        </DropdownItem>
                        <DropdownItem className="py-1 my-1 hover:bg-deep-gray-200">
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          className="py-1 my-1 hover:bg-deep-gray-200"
                          onClick={() => openCofirmation(product?.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No products available</TableCell>
                <TableCell>No products available</TableCell>
                <TableCell>No products available</TableCell>
                <TableCell>No products available</TableCell>
                <TableCell>No products available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => openCofirmation("")}
        onContinue={() => deleteProduct()}
        message="Are you sure you want to delete user"
      />
      <ServerResponseModal
        isOpen={isOpen}
        onClose={onClose}
        isError={responseModalData.isError}
        message={responseModalData.message}
      />
    </>
  );
}
