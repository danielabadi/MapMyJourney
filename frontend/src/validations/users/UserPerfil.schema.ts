import * as yup from "yup";

export const userPerfilFormSchema = yup.object({
  name: yup.string().min(5, 'Nome deve ter no mínimo 5 caracteres').required("Nome é um campo obrigatório"),
  email: yup.string().email().required("Email é um campo obrigatório"),
  birthdate: yup
    .string()
    .required("Data de nascimento é um campo obrigatório"),
  description: yup.string(),
  password: yup.string().min(5, 'Senha deve ter no mínimo 5 caracteres').required("Senha é um campo obrigatório"),
  newPassword: yup.string().min(5, 'Senha deve ter no mínimo 5 caracteres'),
  confirmPassword: yup
  .string()
  .test('passwords-match', 'Senhas devem ser iguais', 
    function (value) {       
      return this.parent.newPassword === value     
    }),
});

type IUserPerfilForm = yup.InferType<typeof userPerfilFormSchema>;
export default IUserPerfilForm;
