import * as yup from "yup";

export const debitCardSchema = yup.object().shape({
  cardNumber: yup.string().required("This field is required"),
  cardName: yup.string().required("This field is required"),
  cvvCode: yup.string().required("This field is required"),
  expiryDate: yup.string().required("This field is required"),
});

export type debitCardSchema = yup.InferType<typeof debitCardSchema>;
