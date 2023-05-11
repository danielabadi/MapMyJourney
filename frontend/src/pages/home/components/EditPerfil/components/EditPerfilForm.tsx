import { SxProps, Theme } from "@mui/material";
import { useFormikContext } from "formik";
import DatePicker from "../../../../../components/DatePicker/DatePicker";
import Form from "../../../../../components/Form/Form";
import TextField from "../../../../../components/TextField/TextField";
import IUserPerfilForm from "../../../../../validations/users/UserPerfil.schema";

const formStyles: SxProps<Theme> = {
  display: "grid",
  position: "relative",
  justifyContent: "center",
  height: '458px'
};

const EditPerfilForm: React.FC = () => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleBlur,
    handleSubmit,
  } = useFormikContext<IUserPerfilForm>();

  return (
    <Form onSubmit={handleSubmit} sx={formStyles}>
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
        disabled
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
        id='description'
        data-testid='description'
        label='Descrição - Conte mais sobre você'
        placeholder='Adicione uma descrição'
        error={!!errors.description && touched.description}
        helperText={errors.description}
        onInputChange={(e) => setFieldValue("description", e.target.value)}
        onInputBlur={handleBlur}
        value={values.description}
        autoComplete='off'
        multiline
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
        id='newPassword'
        data-testid='newPassword'
        label='Nova Senha'
        placeholder='Nova Senha'
        error={!!errors.newPassword && touched.newPassword}
        helperText={errors.newPassword}
        onInputChange={(e) => setFieldValue("newPassword", e.target.value)}
        onInputBlur={handleBlur}
        value={values.newPassword}
        type='password'
        autoComplete='off'
      />
      <TextField
        id='confirmPassword'
        data-testid='confirmPassword'
        label='Confirmar Nova Senha'
        placeholder='Confirmar Nova Senha'
        error={!!errors.confirmPassword && touched.confirmPassword}
        helperText={errors.confirmPassword}
        onInputChange={(e) =>
          setFieldValue("confirmPassword", e.target.value)
        }
        onInputBlur={handleBlur}
        value={values.confirmPassword}
        type='password'
        autoComplete='off'
      />
    </Form>
  );
};

export default EditPerfilForm;
