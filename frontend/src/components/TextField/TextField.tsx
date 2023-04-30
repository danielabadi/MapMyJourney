import { ChangeEvent } from "react";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import Input from "../Input/Input";

export interface TextFieldProps {
  children?: React.ReactNode;
  id: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  select?: boolean;
  type?: string;
  value?: string | number | undefined | null;
  loading?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  onInputChange?: (event: ChangeEvent<any>) => void | undefined;
  onInputBlur?:
    | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  error,
  label,
  helperText,
  select,
  placeholder,
  onInputChange,
  onInputBlur,
  value,
  type,
  required,
  disabled,
  multiline,
  loading,
  readOnly,
  autoComplete,
  ...props
}) => {
  return (
    <FieldWrapper
      disabled={disabled}
      error={error}
      helperText={helperText}
      htmlFor={id}
      label={label}
      required={required}
      multiline={multiline}
    >
      <Input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onInputChange}
        onBlur={onInputBlur}
        error={error}
        multiline={multiline}
        readOnly={readOnly}
        autoComplete={autoComplete}
        {...props}
      />
    </FieldWrapper>
  );
};

export default TextField;
