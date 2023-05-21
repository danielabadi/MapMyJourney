import * as yup from "yup";

export const registerFormSchema = yup.object({
  name: yup.string().min(5, 'Nome deve ter no mínimo 5 caracteres').required("Nome é um campo obrigatório"),
  email: yup.string().email('Insira um email válido').required("Email é um campo obrigatório"),
  birthdate: yup
    .string()
    .required("Data de nascimento é um campo obrigatório"),
  password: yup.string().min(5, 'Senha deve ter no mínimo 5 caracteres').required("Senha é um campo obrigatório"),
  confirmPassword: yup
    .string()
    .required("Confirmar senha é um campo obrigatório")
    .test('passwords-match', 'Senhas devem ser iguais', 
    function (value) {       
      return this.parent.password === value     
    }),
});

type IRegisterForm = yup.InferType<typeof registerFormSchema>;
export default IRegisterForm;
