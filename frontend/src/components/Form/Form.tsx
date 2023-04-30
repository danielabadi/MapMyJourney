import { Box, SxProps, Theme } from "@mui/material";

export interface FormProps {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  sx?: SxProps<Theme> | undefined;
  autoComplete?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  sx,
  autoComplete,
}) => {
  return (
    <Box
      component='form'
      noValidate
      autoComplete={autoComplete}
      onSubmit={onSubmit}
      sx={sx}
    >
      {children}
    </Box>
  );
};

export default Form;
