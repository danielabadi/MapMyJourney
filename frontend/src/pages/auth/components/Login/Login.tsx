import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Form from "../../../../components/Form/Form";
import Logo from "../../../../components/Logo/Logo";
import TextField from "../../../../components/TextField/TextField";
import {
  autoLoginState,
  isLoggedInState,
  loginRenderState,
} from "../../../../states/auth/atom";
import { LoginRequestDto } from "../../../../types/auth/LoginRequestDto";
import ILoginForm, {
  loginFormSchema,
} from "../../../../validations/auth/Login.schema";
import "./Login.css";
import axios from "axios";
import useLogin from "../../../../services/auth/hooks/useLogin";

function Login() {
    const [autoLogin, setAutoLogin] = useRecoilState(autoLoginState);
    const setLoginRender = useSetRecoilState(loginRenderState);
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const navigate = useNavigate();

    const { mutate: login } = useLogin();
  
    const handleLoginRender = () => {
      setLoginRender(false);
    };
  
    const handleSubmit = async (
      values: LoginRequestDto,
      actions: FormikHelpers<LoginRequestDto>
    ) => {
      const validatedValues = loginFormSchema.cast(values) as ILoginForm;
  
      login(validatedValues, {
        onSuccess: (data: any) => {
          setIsLoggedIn(true);
          navigate("/home");
        },
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              actions.setFieldError("email", "Email ou senha incorretos");
              actions.setFieldError("password", "Email ou senha incorretos");
            }
          }
        },
      });
    };
  
    const handleAutoLogin = () => {
      setAutoLogin(!autoLogin);
    };
  
    return (
      <Box className='loginBox'>
      <Logo />
      <Typography>Iniciar Sessão</Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnMount={false}
        validationSchema={loginFormSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete={"off"}>
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
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={autoLogin}
                  onClick={handleAutoLogin}
                />
              }
              sx={{ fontFamily: "Zen Kurenaido", fontSize: "12px" }}
              label='Lembre-se de mim'
            />
            <Button type='submit' size='large' fullWidth>
              Continuar
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        component='button'
        underline='none'
        onClick={handleLoginRender}
        sx={{
          top: "88%",
          color: "#000000",
          height: "28px",
          position: "absolute",
          fontFamily: "Zen Kurenaido",
          fontSize: "12px",
        }}
      >
        Novo por aqui? Registre-se agora!
      </Link>
    </Box>
    );
  }
  
  export default Login;