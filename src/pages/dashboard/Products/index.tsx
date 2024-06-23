import { useEffect, useMemo, useState } from "react";
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
import { api, authentication_token, imageUrl, divideAndInsertBr } from "@/lib";
import { ProductType } from "@/types/index";
import {
  ModalLayout,
  ConfirmationModal,
  ResponseModal,
  LoadingGif,
} from "@/components/Modal";
import { ModalTemplateType } from "@/types/index";

export default function Products() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [currentTemplate, setCurrenttemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    index: number;
    id: string | number;
  }>({ index: 0, id: 0 });
  
  const FetchProducts = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${api}/products/`, {
      headers: { Authorization: authentication_token },
    });
    if(data.error){
      setResponse({ isError: true, message: data.error });
      onOpen();
      setCurrenttemplate("responseModal");
    }else{
      setProducts(data);
    }
    setIsLoading(false);
  };
  const searchResult = useMemo(() => {
    return products.filter((product: ProductType) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  const changeModalContent = (template: string) => {
    if (template in templates) {
      onOpen();
      setCurrenttemplate(template);
    }
  };
  const DeleteProduct = async () => {
    changeModalContent("loaderModal");
    const request = await axios.delete(
      `${api}/products/delete/${selectedProduct.id}`,
      {
        headers: { Authorization: authentication_token },
      }
    );
    const response = await request.data;
    if (response.error) {
      setResponse({ isError: true, message: response.error });
      onOpen();
    } else {
      setResponse({ isError: false, message: response.message });
      changeModalContent("responseModal");
      onOpen();
      products.splice(selectedProduct.index, 1);
      setProducts([...products]);
    }
  };
  const OpenDeleteProductModal = (index: number, id: string | number) => {
    setSelectedProduct({ ...selectedProduct, index, id });
    changeModalContent("deleteModal");
  };
  const ViewProduct = (product: ProductType) =>
    navigation(`/shop/single`, { state: product });

  const EditProduct = (product: ProductType) => {
    navigation(`/dashboard/product/edit`, { state: product });
  };
  const templates: ModalTemplateType = {
    loaderModal: <LoadingGif />,
    responseModal: (
      <ResponseModal isError={response.isError} message={response.message} />
    ),
    deleteModal: (
      <ConfirmationModal
        onCancle={() => onClose()}
        onContinue={() => DeleteProduct()}
        message="Are you sure you want to delete this product ?"
      />
    ),
  };
  useEffect(() => {
    FetchProducts();
  }, []);

  return isLoading ? (
    <p className="text-2xl text-neutral-400">Loading...</p>
  ) : (
    <>
      <div className="bg-white text-dark-gray-100 rounded-xl flex flex-col gap-4 md:gap-8">
        <div className="hidden px-4 md:flex items-center justify-between">
          <form className="flex w-1/2 items-center gap-2 border rounded-lg px-2">
            <BiSearch size={18} className="text-deep-gray-100" />
            <Input
              size="sm"
              type="search"
              placeholder="Type to search..."
              classNames={{
                base: "h-10 border-l outline-0",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal hover:border-01",
              }}
              style={{ outline: "0" }}
              onValueChange={setQuery}
            />
          </form>
          <div>
            <Link
              to="/dashboard/product/create"
              className="py-2 px-2 rounded-lg flex items-center gap-1 font-semibold bg-deep-green-50 text-deep-green-100"
            >
              <BiAddToQueue />
              <p className="text-sm">ADD PRODUCT</p>
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm ml-3">
            ({products && searchResult?.length}) Products
          </p>
          <Table
            classNames={{
              th: "uppercase bg-dark-gray-200",
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
              <TableColumn>Qty</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            {products && products?.length > 0 ? (
              <TableBody>
                {searchResult.map((product, index) => (
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
                    <TableCell>{product?.quantity}</TableCell>
                    <TableCell>
                      <Dropdown>
                        <DropdownTrigger className="cursor-pointer">
                          ...
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Dynamic Actions"
                          className="z-10 bg-white text-sm"
                        >
                          <DropdownItem
                            className="py-1 my-1 rounded text-deep-green-100 hover:bg-deep-green-50"
                            onClick={() => ViewProduct(product)}
                          >
                            View
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => EditProduct(product)}
                            className="py-1 my-1 rounded text-deep-green-100 hover:bg-deep-green-50"
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            className="py-1 my-1 rounded text-deep-green-100 hover:bg-deep-green-50"
                            onClick={() =>
                              OpenDeleteProductModal(index, product?.id)
                            }
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            )}
          </Table>
        </div>
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
// const viewProduct = (product: ProductType) =>
//   navigation(`/dashboard/product-view`, { state: product });
