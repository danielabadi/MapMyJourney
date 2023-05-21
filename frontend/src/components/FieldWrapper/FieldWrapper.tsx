import {
  FormControl,
  FormHelperText,
  InputLabel,
  SxProps,
  Theme,
} from "@mui/material";

const formControlStyles: SxProps<Theme> = {
  height: "50px",

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
  '& .MuiFormHelperText-root': {
    fontSize: '9px',
    fontWeight: 500,
    color: "#FF0000",
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
      sx={multiline ? { ...formControlStyles, height: '103px', marginBottom: '2px', }
        : { ...formControlStyles, marginBottom: disabled ? '6px' : '16px', }}
    >
      <InputLabel shrink htmlFor={htmlFor}>
        {label}
      </InputLabel>
      {children}
      {!multiline && !disabled && (
        <FormHelperText>
          {helperText && error ? helperText : ' '}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FieldWrapper;
