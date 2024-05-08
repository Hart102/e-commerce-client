import * as yup from "yup";

export const ProductSchema = yup.object().shape({
  productName: yup.string().required("This field is required"),
  units: yup.string().required("This field is required"),
  category: yup.string().required("This field is required"),

  description: yup.string().required("This field is required"),
  status: yup.string(),
  price: yup.string().required("This field is required"),
});

export type ProductSchema = yup.InferType<typeof ProductSchema>;
