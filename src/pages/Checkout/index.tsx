import {
  Button,
  Image,
  Accordion,
  AccordionItem,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  ProductType,
  AddressType,
  OrderDetailsType,
  ModalTemplatesType,
} from "@/types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { debitCardSchema } from "@/schema/DebitCardSchema";
import { api, imageUrl, authentication_token } from "@/lib";
import {
  ModalLayout,
  ConfirmationModal,
  ResponseModal,
  LoadingGif,
} from "@/components/Modal/index";
import { routes } from "@/routes";

export default function Shiipping() {
  const location = useLocation();
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTemplate, setCurrentTemplate] = useState<string>("");
  const [checkoutItems, setCheckoutItems] = useState<ProductType[]>([]);
  const [response, setResponse] = useState({ isError: false, message: "" });

  const [userAddress, setUserAddress] = useState<AddressType[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>({
    addressId: "",
    productsId: [],
    totalPrice: 0,
  });

  const calculatedSum = useMemo(() => {
    let subTotal: number = 0;
    checkoutItems.forEach((item) => {
      subTotal += Number(item.price.slice(3)) * Number(item.quantity);
    });
    const total: number = subTotal + 18.0;
    subTotal = Math.floor(subTotal);
    return { subTotal, total };
  }, [checkoutItems]);

  const fetchUserAddress = useMemo(async () => {
    const { data } = await axios.get(`${api}/user/get-address`, {
      headers: { Authorization: authentication_token },
    });
    if (!data.error) setUserAddress(data);
  }, []);

  const selectDeliveryAddress = (id: string) =>
    setOrderDetails((prev) => ({ ...prev, addressId: id }));

  useEffect(() => {
    if (location.state == undefined || authentication_token == undefined) {
      return navigation(routes.login);
    }
    fetchUserAddress;
    setCheckoutItems(location.state);
    setOrderDetails((prev) => ({
      ...prev,
      addressId: userAddress[0]?.id,
      productsId: checkoutItems.map((item) => item.id),
      totalPrice: calculatedSum.total,
    }));
  }, [
    location,
    navigation,
    fetchUserAddress,
    userAddress,
    checkoutItems,
    calculatedSum.total,
  ]);

  const templates: ModalTemplatesType = {
    loaderModal: <LoadingGif />,
    serverResponseModal: (
      <ResponseModal isError={response.isError} message={response.message} />
    ),
    verifyPaymentModal: (
      <ConfirmationModal
        message="After payment, visit your dashboard to confirm your payment"
        onCancle={() => onClose()}
        onContinue={() => placeOrder()}
      />
    ),
  };

  const changeModalContent = (template: string) => {
    if (template in templates) {
      onOpen();
      setCurrentTemplate(template);
    }
  };

  const placeOrder = async () => {
    changeModalContent("loaderModal");
    const response = await axios.post(
      `${api}/payment/accept-payment`,
      orderDetails,
      { headers: { Authorization: authentication_token } }
    );
    if (response.data.error) {
      setResponse({ ...response, isError: true, message: response.data.error });
      changeModalContent("serverResponseModal");
    } else {
      reset();
      navigation(routes.userDashboard);
      window.open(response.data.payment_url, "_blank");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<debitCardSchema>({ resolver: yupResolver(debitCardSchema) });

  const validateInput = async (data: debitCardSchema) => {
    console.log(data);
    changeModalContent("verifyPaymentModal");
  };

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border rounded-lg",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:p-0 p-4 justify-center">
        <div className="w-full md:w-7/12 md- flex flex-col gap-8 md:p-10 border-deep-gray-200 border-r">
          {/* Select Delivery Address */}
          <Accordion>
            <AccordionItem
              key="1"
              aria-label="01. SHIPPING"
              title="01. SHIPPING"
              classNames={{
                heading: "text-lg",
                indicator: "-rotate-90",
              }}
            >
              <div className="flex justify-end pb-4">
                <Button
                  size="sm"
                  type="button"
                  onPress={onOpen}
                  className="py-1 px-2 rounded flex items-center gap-1 border"
                >
                  <FaMapMarkerAlt className="text-deep-red-100" />
                  <p className="text-sm">ADD ADDRESS</p>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAddress &&
                  userAddress?.map((address) => (
                    <label
                      key={address?.id}
                      htmlFor={`${address?.id}`}
                      className="bg-deep-gray-200 rounded p-5 cursor-pointer"
                    >
                      <FaMapMarkerAlt className="text-deep-red-100" />
                      <div className="flex flex-col gap-1 mt-4">
                        <p>{address?.address_line}</p>
                        <p>
                          {address?.city}, {address?.state}
                        </p>
                        <p>{address?.country}</p>
                        <p>{address?.phone_number}</p>
                      </div>
                      <div className="flex justify-end">
                        <input
                          type="radio"
                          name="location"
                          id={`${address?.id}`}
                          checked={
                            orderDetails &&
                            address?.id == orderDetails?.addressId
                          }
                          onChange={() => selectDeliveryAddress(address?.id)}
                        />
                      </div>
                    </label>
                  ))}
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion>
            <AccordionItem
              key="2"
              aria-label="02. PAYMENT"
              title="02. PAYMENT"
              classNames={{
                heading: "text-lg",
                indicator: "-rotate-90",
              }}
            >
              <div className="border rounded-lg p-5 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <p>Credit / Debit Card</p>
                  <p className="text-neutral-500">
                    Safe money transfer using your bank accou k account. We
                    support Mastercard tercard, Visa, Discover and Stripe.
                  </p>
                </div>
                <form className="[&_span]:text-xs [&_span]:text-red-500">
                  <div>
                    <Input
                      type="number"
                      label="Card number"
                      placeholder="123 4567 6789 4321"
                      classNames={InputProps}
                      {...register("card_number")}
                    />
                    <span>{errors?.card_number?.message}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <Input
                        label="Name on card"
                        placeholder="Enter your first name"
                        classNames={InputProps}
                        {...register("card_name")}
                      />
                      <span>{errors?.card_name?.message}</span>
                    </div>
                    <div>
                      <Input
                        type="date"
                        label="Expiry date"
                        classNames={InputProps}
                        {...register("expiry_date")}
                      />
                      <span>{errors?.expiry_date?.message}</span>
                    </div>
                    <div>
                      <Input
                        type="number"
                        label="CVV code"
                        placeholder="***"
                        classNames={InputProps}
                        {...register("cvv")}
                      />
                      <span>{errors?.cvv?.message}</span>
                    </div>
                  </div>
                </form>
              </div>
            </AccordionItem>
          </Accordion>
          <div className="flex mt-5">
            <Button
              onClick={handleSubmit(validateInput)}
              className="bg-deep-green-100 text-white rounded-full px-8 hover:opacity-85"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>

        <div className="w-2 bg-deep-gray-200 shadow-sm mt-5 rounded-full"></div>

        <div className="flex flex-col gap-8 w-full md:w-4/12 md:py-10 md:px-12 py-10 px-5">
          <p className="text-lg">SUMMARY</p>
          <div className="flex flex-col gap-4 border-b pb-3 [&_b]:text-neutral-600 [&_p]:text-neutral-700 text-lg">
            <div className="flex items-center justify-between">
              <p>SUBTOTAL</p>
              <p>NGN {calculatedSum?.subTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>SHIPPING FEE</p>
              <p>NGN 18.00</p>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <b>TOTAL</b>
            <b>NGN {calculatedSum?.total}</b>
          </div>
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg">IN YOUR CART</p>
            <div className="flex flex-col gap-4 md:h-[400px] overflow-y-auto">
              {checkoutItems.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex items-center gap-5 ${
                    index + 1 < checkoutItems?.length && "border-b pb-5"
                  }`}
                >
                  <div className="h-[100px] w-[80px] z-0">
                    <Image
                      src={imageUrl(product?.images[0])}
                      alt="product image"
                      className="object-contain w-full h-full rounded"
                    />
                  </div>
                  <div className="flex flex-col capitalize">
                    <p className="capitalize text-neutral-700 mb-1 text-sm">
                      {product?.name}
                    </p>
                    {product?.category == "fashion" && (
                      <p className="my-0.5">Size: {product?.size}</p>
                    )}
                    <p>Qauntity: ({product?.quantity})</p>
                    <p className="text-lg mt-2 font-semibold">
                      NGN {product?.totalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        {templates[currentTemplate]}
      </ModalLayout>
    </>
  );
}
