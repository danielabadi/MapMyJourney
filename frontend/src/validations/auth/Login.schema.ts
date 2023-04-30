import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup.string().email().required("Email é um campo obrigatório"),
  password: yup.string().required("Senha é um campo obrigatório"),
});

type ILoginForm = yup.InferType<typeof loginFormSchema>;
export default ILoginForm;
