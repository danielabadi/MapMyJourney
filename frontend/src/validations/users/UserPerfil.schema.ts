import * as yup from "yup";

export const userPerfilFormSchema = yup.object({
  name: yup.string().required("Nome é um campo obrigatório"),
  email: yup.string().email().required("Email é um campo obrigatório"),
  birthdate: yup
    .string()
    .required("Data de nascimento é um campo obrigatório"),
  description: yup.string(),
  password: yup.string().required("Senha é um campo obrigatório"),
  newPassword: yup.string(),
  confirmPassword: yup.string(),
});

type IUserPerfilForm = yup.InferType<typeof userPerfilFormSchema>;
export default IUserPerfilForm;
