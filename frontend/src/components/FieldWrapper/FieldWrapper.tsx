import {
  FormControl,
  InputLabel,
  SxProps,
  Theme,
} from "@mui/material";

const formControlStyles: SxProps<Theme> = {
  height: "51px",

  "& label": {
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "#000000",
    height: '18px',
    "&.Mui-focused": {
      color: "#000000",
    },
    "&.Mui-error": {
      color: "#000000",
    },
    transform: "none",
  },
  "& .MuiInputLabel-asterisk": {
    color: "#FF0000",
  },
};

export interface FieldWrapperProps {
  children: React.ReactNode;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  htmlFor?: string | undefined;
  label?: string;
  multiline?: boolean | undefined;
}

const FieldWrapper: React.FC<FieldWrapperProps> = ({
  children,
  error,
  helperText,
  disabled,
  htmlFor,
  required,
  label,
  multiline,
}) => {
  return (
    <FormControl
      variant='standard'
      error={error}
      required={required}
      disabled={disabled}
      sx={multiline ? {... formControlStyles, height: '103px'} : formControlStyles}
    >
      <InputLabel shrink htmlFor={htmlFor}>
        {label}
      </InputLabel>
      {children}
    </FormControl>
  );
};

export default FieldWrapper;
