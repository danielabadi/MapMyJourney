import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { SxProps, Theme } from "@mui/material";

export interface DatePickerProps {
  id: string;
  label: string;
  placeholder: string;
  value: string | null;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  onChange: (value: dayjs.Dayjs | null) => void;
  onBlur: () => void;
}

const datePickerStyles: SxProps<Theme> = {
  "& .MuiInputBase-root": {
    borderRadius: "5px",
    border: "1px solid",
    borderColor: "#000000",
    backgroundColor: "#ffffff",

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
    "& .MuiInputBase-input": {
      borderRadius: "5px",
      position: "relative",
      backgroundColor: "#fffff",
      color: "#000000",
      fontSize: "0.75rem",
      lineHeight: "0.938rem",
      height: "33px",
      fontWeight: 400,
      padding: "0.75rem 1rem",
      boxSizing: "border-box",
    },
  },

  "& .MuiSvgIcon-root": {
    color: '#000000',
    height: '20px',
    width: '20px'
  },
};

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  placeholder,
  value,
  error,
  helperText,
  required,
  onChange,
  onBlur,
}) => {
  const a = {
    picker: { flexDirection: "row-reverse" },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <FieldWrapper
        error={error}
        helperText={helperText}
        htmlFor={id}
        label={label}
        required={required}
      >
        <MuiDatePicker
          onChange={onChange}
          format="DD/MM/YYYY"
          sx={datePickerStyles}
          value={dayjs(value)}
        />
      </FieldWrapper>
    </LocalizationProvider>
  );
};

export default DatePicker;
