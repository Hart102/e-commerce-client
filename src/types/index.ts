export type ModalTemplatesType = {
  verifyPaymentModal: JSX.Element;
  serverResponseModal: JSX.Element;
  loaderModal: JSX.Element;
  [key: string]: JSX.Element;
};

export type ProductType = {
  id: string;
  images: string[];
  name: string;
  price: string;
  category: string;
  quantity: number;
  size: string;
  description: string;
  createdAt: string;
  status: string;
  isChecked: boolean;
  totalPrice: string | number;
};

export type AddressType = {
  id: string;
  user_id: string;
  address_line: string;
  city: string;
  country: string;
  phone_number: string;
  state: string;
  zip_code: string;
};

export type PaymentCardType = {
  id: string;
  user_id: string;
  card_number: string;
  card_name: string;
  cvv: string;
  expiry_date: string;
};

export type OrderDetailsType = {
  addressId?: string | undefined;
  paymentCardId?: string | undefined;
  productsId?: string[];
  totalPrice?: string | number;
};
