import * as yup from "yup";

export const editDetailsSchema = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  email: yup.string().email().required("This field is required"),
  phone: yup.string().required("This field is required"),
});

export type editDetailsSchema = yup.InferType<typeof editDetailsSchema>;

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("This field is required"),
  newPassword: yup.string().required("This field is required"),
});

export type resetPasswordSchema = yup.InferType<typeof resetPasswordSchema>;
