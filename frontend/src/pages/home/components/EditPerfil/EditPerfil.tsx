import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import { HiX } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { showEditPerfilState } from "../../../../states/actionbar/atom";
import EditPerfilForm from "./components/EditPerfilForm";
import useEdit from "../../../../services/users/hooks/useEdit";
import { userResponseDto } from "../../../../types/users/userResponseDto";
import { UserPerfilRequestDto } from "../../../../types/users/UserPerfilRequestDto";
import IUserPerfilForm, { userPerfilFormSchema } from "../../../../validations/users/UserPerfil.schema";

const EditPerfil: React.FC = () => {
  const [showEditPerfil, setShowEditPerfil] =
    useRecoilState(showEditPerfilState);

  const { mutate: edit } = useEdit();
  const userData: userResponseDto = JSON.parse(sessionStorage.getItem('userData')!);

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | undefined
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;

    setShowEditPerfil(false);
  };

  const handleSubmit = async (
    values: UserPerfilRequestDto,
    actions: FormikHelpers<UserPerfilRequestDto>
  ) => {
    const validatedValues = userPerfilFormSchema.cast(
      values
    ) as IUserPerfilForm;

    edit(validatedValues, {
      onSuccess: (data: any) => {
        let newUserData: userResponseDto = {
          id: userData.id,
          email: validatedValues.email,
          name: validatedValues.name,
          birthdate: validatedValues.birthdate,
          description: validatedValues.description ?? '',
        }
        sessionStorage.setItem('userData', JSON.stringify(newUserData));
        actions.setFieldValue("password", "");
        actions.setFieldValue("newPassword", "");
        actions.setFieldValue("confirmPassword", "");
        setShowEditPerfil(false);
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            actions.setFieldError("password", "Senha incorreta");
          }
        }
      },
    });
  };

  let defaultInitValues: UserPerfilRequestDto = {
    name: userData.name,
    email: userData.email,
    birthdate: dayjs(userData.birthdate).add(1, 'day').format('YYYY-MM-DD'),
    description: userData.description ?? '',
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={defaultInitValues}
      validateOnMount={false}
      validationSchema={userPerfilFormSchema}
      onSubmit={handleSubmit}
    >
      {({ submitForm }) => (
        <Dialog
          open={showEditPerfil}
          onClose={handleClose}
          hideBackdrop={true}
        >
          <DialogTitle>
            <Box display='flex' flexDirection='row'>
              <Box flexGrow={1}>
                Editar Perfil
              </Box>
              <Box display='flex'>
                <IconButton
                  onClick={() => {
                    handleClose({}, undefined);
                  }}
                  sx={{
                    paddingTop: "10px",
                    marginRight: "8px",
                    color: "#808080",
                  }}
                >
                  <HiX size={"30px"} />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent>
            <EditPerfilForm />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={() => submitForm()}>
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditPerfil;
