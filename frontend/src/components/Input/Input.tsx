import { useState } from "react";
import {
  IconButton,
  InputAdornment,
  InputBase,
  InputBaseProps,
  SxProps,
  Theme,
} from "@mui/material";
import { HiEye, HiEyeOff } from "react-icons/hi";

const iconButtonStyles: SxProps<Theme> = {
  color: "#000000",
  margin: 0,
  height: "inherit",
  paddingRight: "12px",
};

const inputStyles: SxProps<Theme> = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  border: "1px solid",
  borderColor: "#000000",
  "&.Mui-focused": {
    borderColor: "#000000",
    backgroundColor: "#ffffff",
  },
  "&.Mui-error": {
    borderColor: "#ff0000",
  },
  "label + &": {
    marginTop: "1.125rem",
  },
  "&.MuiInputBase-multiline": {
    py: "0.125rem",
    px: 0,
  },
  "& .MuiInputBase-input": {
    borderRadius: "0.25rem",
    position: "relative",
    backgroundColor: "#fffff",
    color: "#000000",
    fontSize: "0.75rem",
    lineHeight: "0.938rem",
    height: "33px",
    fontWeight: 400,
    padding: "0.5rem 0.75rem",
    boxSizing: "border-box",
  },
};

const multilineInputStyles: SxProps<Theme> = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  border: "1px solid",
  borderColor: "#000000",
  "&.Mui-focused": {
    borderColor: "#000000",
    backgroundColor: "#ffffff",
  },
  "&.Mui-error": {
    borderColor: "#ff0000",
  },
  "label + &": {
    marginTop: "1.125rem",
  },
  "&.MuiInputBase-multiline": {
    height: "85px",
    py: "0.125rem",
    px: 0,
  },
  "& .MuiInputBase-input": {
    borderRadius: "0.25rem",
    position: "relative",
    backgroundColor: "#fffff",
    color: "#000000",
    fontSize: "0.75rem",
    lineHeight: "0.938rem",
    height: "85px !important",
    fontWeight: 400,
    padding: "0.5rem 0.75rem",
    boxSizing: "border-box",
  },
};


export interface InputProps extends InputBaseProps {
  innerRef?: React.Ref<any>;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  value,
  type,
  onChange,
  onBlur,
  endAdornment,
  startAdornment,
  innerRef,
  multiline,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const pwdAdornment = (
    <InputAdornment position='end'>
      <IconButton
        aria-label='toggle password visibility'
        onClick={handleClickShowPassword}
        edge='end'
        sx={iconButtonStyles}
      >
        {showPassword ? <HiEye size={"20px"} /> : <HiEyeOff size={"20px"} />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <InputBase
      id={id}
      placeholder={placeholder ? placeholder : " "}
      value={value}
      type={
        type && type === "password"
          ? showPassword
            ? "text"
            : "password"
          : type
      }
      endAdornment={
        type && type === "password"
          ? pwdAdornment
          : endAdornment
          ? endAdornment
          : null
      }
      startAdornment={startAdornment}
      onChange={onChange}
      onBlur={onBlur}
      ref={innerRef}
      multiline={multiline}
      sx={multiline ? multilineInputStyles : inputStyles}
      {...rest}
    />
  );
};

export default Input;
