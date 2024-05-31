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
import AddAddress from "@/components/Add-address";
import { ProductType, AddressType, PaymentCardType } from "@/types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { debitCardSchema } from "@/schema/DebitCardSchema";
import { api, imageUrl, authentication_token } from "@/lib";
import ServerResponseModal from "@/components/Modal/ServerResponse";
import MasterCardImage from "@/assets/mastercard.svg";

export default function Shiipping() {
  const location = useLocation();
  const navigation = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkoutItems, setCheckoutItems] = useState<ProductType[]>([]);
  const [userDetails, setUserDetails] = useState<AddressType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState({ isError: false, message: "" });
  const [paymentCards, setPaymentCards] = useState<PaymentCardType[]>([]);
  const [sum, setSum] = useState<{ subTotal: number; total: number }>({
    subTotal: 0,
    total: 0,
  });

  const calculateSum = useMemo(() => {
    let subTotal: number = 0;
    checkoutItems.forEach((item) => {
      subTotal += Number(item.price.slice(1)) * Number(item.quantity);
    });
    const total: number = subTotal + 18.0;
    return { subTotal, total };
  }, [checkoutItems]);

  const getUserAddress = async () => {
    const { data } = await axios.get(`${api}/user/get-address`, {
      headers: { Authorization: authentication_token },
    });
    if (!data.error) setUserDetails(data);
  };

  const getPaymentCards = async () => {
    const { data } = await axios.get(`${api}/checkout/get-payment-card`, {
      headers: { Authorization: authentication_token },
    });
    if (data.error) {
      setModalData({ isError: true, message: data.error });
      setIsModalOpen(true);
    } else {
      setPaymentCards(data.cards);
      console.log(paymentCards);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<debitCardSchema>({ resolver: yupResolver(debitCardSchema) });
  // Add New Payment Card
  const onSubmit = async (data: debitCardSchema) => {
    const request = await axios.put(`${api}/checkout/add-payment-card`, data, {
      headers: { Authorization: authentication_token },
    });
    const response = await request.data;
    if (response.error) {
      setModalData({ isError: true, message: response.error });
      setIsModalOpen(true);
    } else {
      setModalData({ isError: false, message: response.message });
      setIsModalOpen(true);
      onClose();
      reset();
    }
  };

  useEffect(() => {
    if (location.state == undefined || authentication_token == undefined) {
      return navigation("/");
    }
    getUserAddress();
    getPaymentCards();
    setCheckoutItems(location.state);
    setSum(calculateSum);
  }, [location, navigation, calculateSum]);

  const InputProps = {
    label: "mb-16",
    inputWrapper: "px-0 flex",
    input: "p-2 outline-none border rounded-lg",
    base: "text-sm text-neutral-500 mb-2 py-2",
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:p-0 p-4 justify-center">
        <div className="w-full md:w-7/12 md- flex flex-col gap-8 md:p-10 border-r">
          {/* SELCET ADDRESS */}
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
                  className="py-1 px-2 border rounded-full flex items-center gap-1 hover:bg-black hover:text-white"
                >
                  <FaMapMarkerAlt />
                  <p className="text-sm">ADD ADDRESS</p>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userDetails &&
                  userDetails?.map((address) => (
                    <label
                      key={address?.id}
                      htmlFor={`${address?.id}`}
                      className="border rounded p-5 cursor-pointer"
                    >
                      <FaMapMarkerAlt />
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
                        />
                      </div>
                    </label>
                  ))}
              </div>
            </AccordionItem>
          </Accordion>

          {/* SELECT CARD */}
          <Accordion>
            <AccordionItem
              key="2"
              aria-label="02. SELECT PAYMENT CARD"
              title="02. SELECT PAYMENT CARD"
              classNames={{
                heading: "text-lg",
                indicator: "-rotate-90",
              }}
            >
              <div className="flex flex-col gap-8 mb-3 md:ml-7">
                {paymentCards &&
                  paymentCards.map((card) => (
                    <div key={card?.id} className="flex gap-4">
                      <input type="radio" id={`${card?.id}`} name="radio" />
                      <label
                        htmlFor={`${card?.id}`}
                        className="flex gap-4 items-center border-b cursor-pointer"
                      >
                        <Image src={MasterCardImage} width={50} />
                        <div>
                          <p>****1234</p>
                          <p>Expires in {card?.expiry_date}</p>
                        </div>
                      </label>
                    </div>
                  ))}
              </div>
            </AccordionItem>
          </Accordion>

          {/* ADD NEW CARD */}
          <Accordion>
            <AccordionItem
              key="2"
              aria-label="03. ADD NEW CARD"
              title="03. ADD NEW CARD"
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
              onClick={handleSubmit(onSubmit)}
              className={`bg-dark-blue-100 text-white rounded px-8 hover:opacity-85`}
            >
              PLACE ORDER
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full md:w-4/12 md:py-10 md:px-12 py-10 px-5">
          <p className="text-lg">SUMMARY</p>
          <div className="flex flex-col gap-4 border-b pb-3 [&_b]:text-neutral-600 [&_p]:text-neutral-700 text-lg">
            <div className="flex items-center justify-between">
              <p>SUBTOTAL</p>
              <p>${sum?.subTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>SHIPPING FEE</p>
              <p>$18.00</p>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <b>TOTAL</b>
            <b>${sum?.total}</b>
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
                      {product?.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddAddress isOpen={isOpen} onClose={onClose} />

      <ServerResponseModal
        isError={modalData.isError}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalData.message}
      />
    </>
  );
}
