import * as yup from "yup";

export const registerFormSchema = yup.object({
  name: yup.string().required("Nome é um campo obrigatório"),
  email: yup.string().email().required("Email é um campo obrigatório"),
  birthdate: yup
    .string()
    .required("Data de nascimento é um campo obrigatório"),
  password: yup.string().required("Senha é um campo obrigatório"),
  confirmPassword: yup
    .string()
    .required("Confirmar senha é um campo obrigatório"),
});

type IRegisterForm = yup.InferType<typeof registerFormSchema>;
export default IRegisterForm;
