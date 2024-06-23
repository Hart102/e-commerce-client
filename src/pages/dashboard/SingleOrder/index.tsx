import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { api, authentication_token, dateOptions, imageUrl } from "@/lib";
import { ModalLayout, ResponseModal } from "@/components/Modal";
import { CustomerOrderType } from "@/types/index";

export type ModalTemplateType = {
  [key: string]: JSX.Element;
  responseModal: JSX.Element;
};

export default function SingleOrder() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigation = useNavigate();
  const [currentTemplate, setCurrenttemplate] = useState<string>("");
  const [response, setResponse] = useState({ isError: false, message: "" });
  const [orderDetails, setOrderDetails] = useState<CustomerOrderType>();

  const FetchCustomersAndOrderDetails = async () => {
    const { data } = await axios.get(
      `${api}/transactions/fetch-customers-and-orderDetails/${location.state}`,
      { headers: { Authorization: authentication_token } }
    );
    if (data.error) {
      setResponse({ isError: true, message: data.error });
      changeModalContent("responseModal");
      onOpen();
    } else {
      setOrderDetails(data[0]);
    }
  };
  useEffect(() => {
    if (location.state == null) {
      navigation("/");
    }
    FetchCustomersAndOrderDetails();
  }, [location.state, navigation]);

  const changeModalContent = (template: string) => {
    if (template in templates) {
      onOpen();
      setCurrenttemplate(template);
    }
  };

  const templates: ModalTemplateType = {
    responseModal: (
      <ResponseModal isError={response.isError} message={response.message} />
    ),
  };

  return (
    <>
      <div className="w-full flex flex-col gap-8 text-dark-gray-100 md:p-5">
        <div className="flex gap-2 items-baseline">
          <p className="text-2xl font-semibold">Order</p>
          <span className="capitalize text-sm px-2 rounded text-white bg-orange-500">
            Success
          </span>
        </div>
        {orderDetails && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded flex flex-col gap-2 p-4">
                <p className="text-xl font-semibold">Customer Details</p>
                <div className="flex flex-col gap-1">
                  <p className="capitaize">
                    {orderDetails?.firstname} {orderDetails?.lastname}
                  </p>
                  <p>{orderDetails?.email}</p>
                  <Link to="" className="text-deep-blue-100">
                    View profile
                  </Link>
                </div>
              </div>
              <div className="border rounded flex flex-col gap-2 p-4">
                <p className="text-xl font-semibold">Shipping Address</p>
                <div className="flex flex-col gap-1 capitalize">
                  <p>{orderDetails?.address_line}</p>
                  <p>
                    {orderDetails?.city}, {orderDetails?.state}
                  </p>
                  <p>{orderDetails?.country}</p>
                  <p>Contact No: {orderDetails?.phone_number}</p>
                  <p>Zipe Code: {orderDetails?.zipe_code}</p>
                </div>
              </div>
              <div className="border rounded flex flex-col gap-2 p-4">
                <p className="text-xl font-semibold">Order Details</p>
                <div className="flex flex-col gap-1">
                  <p>Order ID: {orderDetails?.transaction_reference}</p>
                  <p>
                    Order Date:{" "}
                    {new Date(orderDetails?.createdAt).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </p>
                  <p>Order Total: {orderDetails?.total_price}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-x-scroll">
                <Table
                  classNames={{
                    base: "text-center",
                    th: "uppercase bg-dark-gray-200",
                    tbody: "capitalize py-4 bg-white text-sm",
                  }}
                >
                  <TableHeader>
                    <TableColumn>
                      <div className="text-start">
                        <b>Basic Info</b>
                      </div>
                    </TableColumn>
                    <TableColumn>OderId</TableColumn>
                    <TableColumn>Customer</TableColumn>
                    <TableColumn>Date</TableColumn>
                    <TableColumn>Quantity</TableColumn>
                    <TableColumn>Total</TableColumn>
                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src={imageUrl(orderDetails?.images[0])}
                              classNames={{
                                img: "rounded-full h-[50px] w-[50px]",
                              }}
                            />
                            {orderDetails?.name}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {orderDetails?.transaction_reference}
                      </TableCell>
                      <TableCell>{orderDetails?.firstname}</TableCell>
                      <TableCell>
                        {new Date(orderDetails?.createdAt).toLocaleDateString(
                          "en-US",
                          dateOptions
                        )}
                      </TableCell>
                      <TableCell>{orderDetails?.demanded_quantity}</TableCell>
                      <TableCell>{orderDetails?.total_price}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="w-full flex justify-end border-t pt-5 px-4 md:px-8">
                <div className="w-full md:w-1/3 flex flex-col gap-5">
                  <div className="flex justify-between border-b pb-2">
                    <p>Sub Total :</p>
                    <p>$80.00</p>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <p>Shipping Cost :</p>
                    <p>$10.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Grand Total :</p>
                    <p>$90.00</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
