import { Box, Button, Link, SxProps, Theme, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import { useSetRecoilState } from "recoil";
import DatePicker from "../../../../components/DatePicker/DatePicker";
import Form from "../../../../components/Form/Form";
import Logo from "../../../../components/Logo/Logo";
import TextField from "../../../../components/TextField/TextField";
import useRegister from "../../../../services/auth/hooks/useRegister";
import { loginRenderState } from "../../../../states/auth/atom";
import { RegisterRequestDto } from "../../../../types/auth/RegisterRequestDto";
import IRegisterForm, {
  registerFormSchema,
} from "../../../../validations/auth/Register.schema";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const setLoginRender = useSetRecoilState(loginRenderState);
  const handleLoginRender = () => {
    setLoginRender(true);
  };

  const { mutate: register } = useRegister();

  const handleSubmit = async (
    values: RegisterRequestDto,
    actions: FormikHelpers<RegisterRequestDto>
  ) => {
    const validatedValues = registerFormSchema.cast(values) as IRegisterForm;

    const body = {... validatedValues, birthdate: validatedValues.birthdate}

    register(validatedValues, {
      onSuccess: (data: any) => {
        setLoginRender(true);
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            actions.setFieldError("email", "Email já cadastrado");
          }
        }
      },
    });
  };

  return (
    <Box className='registerBox'>
      <Logo />
      <Typography>Criar Conta</Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          birthdate: dayjs().startOf("D").format('YYYY-MM-DD'),
          password: "",
          confirmPassword: "",
        }}
        validateOnMount={false}
        validationSchema={registerFormSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete={"off"}>
            <TextField
              id='name'
              data-testid='name'
              label='Nome'
              placeholder='Nome'
              error={!!errors.name && touched.name}
              helperText={errors.name}
              onInputChange={(e) => setFieldValue("name", e.target.value)}
              onInputBlur={handleBlur}
              value={values.name}
              autoComplete='off'
              required
            />
            <TextField
              id='email'
              data-testid='email'
              label='Email'
              placeholder='Email'
              error={!!errors.email && touched.email}
              helperText={errors.email}
              onInputChange={(e) => setFieldValue("email", e.target.value)}
              onInputBlur={handleBlur}
              value={values.email}
              autoComplete='off'
              required
            />
            <DatePicker
              id='birthdate'
              label={"Data de nascimento"}
              placeholder={"Data de nascimento"}
              error={!!errors.birthdate && touched.birthdate}
              helperText={errors.birthdate}
              onChange={(value) => {
                setFieldValue("birthdate", value?.format("YYYY-MM-DD"));
              }}
              onBlur={() => {
                setFieldTouched("birthdate", true);
              }}
              value={values.birthdate}
              required
            />
            <TextField
              id='password'
              data-testid='password'
              label='Senha'
              placeholder='Senha'
              error={!!errors.password && touched.password}
              helperText={errors.password}
              onInputChange={(e) => setFieldValue("password", e.target.value)}
              onInputBlur={handleBlur}
              value={values.password}
              type='password'
              autoComplete='off'
              required
            />
            <TextField
              id='confirmPassword'
              data-testid='confirmPassword'
              label='Confirmar Senha'
              placeholder='Confirmar Senha'
              error={!!errors.confirmPassword && touched.confirmPassword}
              helperText={errors.confirmPassword}
              onInputChange={(e) =>
                setFieldValue("confirmPassword", e.target.value)
              }
              onInputBlur={handleBlur}
              value={values.confirmPassword}
              type='password'
              autoComplete='off'
              required
            />
            <Button type='submit' size='large' fullWidth >
              Registrar
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        component='button'
        underline='none'
        onClick={handleLoginRender}
        sx={{
          top: "93%",
          color: "#000000",
          height: "28px",
          position: "absolute",
          fontFamily: "Zen Kurenaido",
          fontSize: "12px",
        }}
      >
        Já possui uma conta? Iniciar sessão.
      </Link>
    </Box>
  );
};

export default Register;
