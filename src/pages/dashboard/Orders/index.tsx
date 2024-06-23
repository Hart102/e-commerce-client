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
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, authentication_token, imageUrl, dateOptions } from "@/lib";
import {
  ModalLayout,
  ConfirmationModal,
  ResponseModal,
  LoadingGif,
} from "@/components/Modal/index";
import { OrderType, ModalTemplateType } from "@/types/index";

export default function Orders() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [currentTemplate, setCurrenttemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    FetchOrders();
  }, []);

  const FetchOrders = async () => {
    const { data } = await axios.get(`${api}/transactions/fetch-all-orders`, {
      headers: { Authorization: authentication_token },
    });
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      setCurrenttemplate("responseModal");
      onOpen();
    } else {
      setOrders(data);
    }
  };
  const changeModalContent = (template: string) => {
    if (template in templates) {
      onOpen();
      setCurrenttemplate(template);
    }
  };
  const DeleteOrder = async () => {
    changeModalContent("loaderModal");
    const { data } = await axios.delete(
      `${api}/transactions/delete-order/${orders[index].id}`,
      {
        headers: { Authorization: authentication_token },
      }
    );
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      changeModalContent("responseModal");
      onOpen();
    } else {
      orders.splice(index, 1);
      setOrders([...orders]);
      setResponse({ isError: false, message: data.message });
      changeModalContent("responseModal");
      onOpen();
    }
  };
  const templates: ModalTemplateType = {
    loaderModal: <LoadingGif />,
    responseModal: (
      <ResponseModal isError={response.isError} message={response.message} />
    ),
    deleteModal: (
      <ConfirmationModal
        onCancle={() => onClose()}
        onContinue={() => DeleteOrder()}
        message="Are you sure you want to delete this record ?"
      />
    ),
  };
  const openDeleteModal = (index: number) => {
    setIndex(index);
    changeModalContent("deleteModal");
    onOpen();
  };
  const viewProduct = (id: string) =>
    navigation("/dashboard/order", { state: id });

  return (
    <>
      <div className="bg-white text-dark-gray-100 flex flex-col gap-4">
        <form className="flex w-1/2 items-center gap-2 border rounded-lg px-2 md:ml-4">
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
        <Table
          classNames={{
            base: "text-center",
            th: "uppercase bg-dark-gray-200",
            tbody: "capitalize py-4 text-sm",
          }}
        >
          <TableHeader>
            <TableColumn>
              <div className="text-start">Basic Info</div>
            </TableColumn>
            <TableColumn>order id</TableColumn>
            <TableColumn>Customer</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          {orders && orders.length > 0 ? (
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order?.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={imageUrl(order?.images[0])}
                        classNames={{ img: "rounded-full h-[50px] w-[50px]" }}
                      />
                      {order?.name}
                    </div>
                  </TableCell>
                  <TableCell>{order?.transaction_reference}</TableCell>
                  <TableCell>{order?.firstname}</TableCell>
                  <TableCell>
                    {new Date(order?.createdAt).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </TableCell>
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
                          onClick={() => viewProduct(order?.id)}
                        >
                          View
                        </DropdownItem>
                        <DropdownItem
                          className="py-1 my-1 rounded text-deep-green-100 hover:bg-deep-green-50"
                          onClick={() => openDeleteModal(index)}
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
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
