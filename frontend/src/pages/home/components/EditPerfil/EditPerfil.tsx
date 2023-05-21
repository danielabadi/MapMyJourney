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

const dialogStyles: SxProps<Theme> = {
  "& .MuiDialog-paper": {
    width: "500px",
    height: "625px",
    borderRadius: "12px",
    color: "#000000",
    position: "absolute",
    top: "60px",
    right: "auto",
    margin: "0",
  },

  "& .MuiDialogTitle-root": {
    height: "72px",
    padding: "0",
  },

  "& .MuiDialogContent-root": {
    padding: "0",
    height: "458px",
    display: "inline-block",
  },

  "& .MuiDialogActions-root": {
    height: "55px",
    padding: "0",
  },

  "& .MuiFormControl-root": {
    width: "400px",
  },
};

const typographyStyles: SxProps<Theme> = {
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "40px",
  lineHeight: "40px",
  fontFamily: "Zen Kurenaido",
  color: "#000000",
  textShadow: "1px solid #000000",
  textAlign: "center",
  paddingY: "16px",
  marginLeft: "80px",
};

const buttonStyles: SxProps<Theme> = {
  height: "30px",
  backgroundColor: "#073064",
  color: "#ffffff",
  borderRadius: "5px",
  fontFamily: "Zen Kurenaido",
  marginTop: "0px",
  fontSize: "16px",
  lineHeight: "20px",
  width: "400px",

  "&:hover": {
    backgroundColor: "#073064",
  },
};

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

    const submittedValues = {
      ...validatedValues,
      newPassword: validatedValues.newPassword == '' ? undefined : validatedValues.newPassword,
      confirmPassword: validatedValues.confirmPassword == '' ? undefined : validatedValues.confirmPassword,
    };

    edit(submittedValues, {
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
          sx={dialogStyles}
          open={showEditPerfil}
          onClose={handleClose}
          hideBackdrop={true}
        >
          <DialogTitle>
            <Box display='flex' flexDirection='row'>
              <Box flexGrow={1} sx={typographyStyles}>
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
            <Button sx={buttonStyles} onClick={() => submitForm()}>
              Editar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  );
};

export default EditPerfil;
