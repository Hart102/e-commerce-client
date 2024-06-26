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
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api, authentication_token, imageUrl, dateOptions } from "@/lib";
import { ModalLayout } from "@/components/Modal";
import ModalTemplates, {
  changeModalContent,
} from "@/components/Modal/CompleteModal";
import { OrderType } from "@/types/index";

export default function Orders() {
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [searchString, setSearchString] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  const searchResult = useMemo(() => {
    return orders.filter((order) => {
      return (
        order.transaction_reference
          .toString()
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase()) ||
        order.firstname
          .toString()
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      );
    });
  }, [orders, searchString]);

  useEffect(() => {
    FetchOrders();
  }, []);

  const FetchOrders = async () => {
    const { data } = await axios.get(`${api}/transactions/fetch-all-orders`, {
      headers: { Authorization: authentication_token },
    });
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      handleChangeModalContent("03");
      onOpen();
    } else {
      setOrders(data);
    }
  };

  const DeleteOrder = async () => {
    handleChangeModalContent("01");
    const { data } = await axios.delete(
      `${api}/transactions/delete-order/${orders[index].id}`,
      {
        headers: { Authorization: authentication_token },
      }
    );
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      handleChangeModalContent("03");
    } else {
      orders.splice(index, 1);
      setOrders([...orders]);
      setResponse({ isError: false, message: data.message });
      handleChangeModalContent("03");
    }
  };

  const templates = ModalTemplates({
    onCancle: onClose,
    onContinue: () => DeleteOrder(),
    confirmationMessage: "Are you sure you want to delete this ?",
    response,
  });

  const handleChangeModalContent = (template: string) => {
    changeModalContent({
      template,
      templates,
      onOpen,
      setCurrentTemplate,
    });
  };

  const openDeleteModal = (index: number) => {
    setIndex(index);
    handleChangeModalContent("02");
  };
  const viewProduct = (id: string) =>
    navigation("/dashboard/order", { state: id });

  return (
    <>
      <div className="bg-white text-dark-gray-100 flex flex-col gap-4">
        <form className="w-full md:w-1/2 px-4">
          <Input
            size="sm"
            type="search"
            placeholder="Search category by name"
            classNames={{
              base: "h-10 text-sm outline-0 border rounded-lg",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal hover:border-0",
            }}
            style={{ outline: "0" }}
            onValueChange={setSearchString}
          />
        </form>
        <Table
          classNames={{
            base: "text-center overflow-x-scroll md:overflow-x-auto",
            th: "capitalize bg-dark-gray-200",
            tbody: "capitalize py-4 text-sm",
          }}
        >
          <TableHeader>
            <TableColumn>
              <div className="text-start">Basic Info</div>
            </TableColumn>
            <TableColumn>order id</TableColumn>
            <TableColumn>payment status</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          {searchResult && searchResult.length > 0 ? (
            <TableBody>
              {searchResult.map((order, index) => (
                <TableRow key={order?.id} className="hover:bg-deep-gray-50">
                  <TableCell>
                    <div className="md:flex items-center gap-4">
                      <Image
                        src={imageUrl(order?.images[0])}
                        className="hidden md:block"
                        classNames={{ img: "rounded-full h-[50px] w-[50px]" }}
                      />
                      {order?.name}
                    </div>
                  </TableCell>
                  <TableCell>{order?.transaction_reference}</TableCell>
                  <TableCell
                    className={
                      order?.payment_status == "success"
                        ? "text-deep-blue-100"
                        : "text-deep-red-100"
                    }
                  >
                    {order?.payment_status}
                  </TableCell>
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
