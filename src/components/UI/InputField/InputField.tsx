import { TextField, TextFieldProps } from "@mui/material";
import React, { FC } from "react";
import InputMask, { Props } from "react-input-mask";

const InputField: FC<TextFieldProps & { mask?: string }> = React.memo(({ type = "text", ...props }) => {
  const { className, mask, value, onChange, name, onBlur, error, helperText } = props;
  return mask ? (
    // @ts-ignore
    <InputMask
      mask={mask}
      className={className}
      value={value}
      onChange={onChange}
      name={name}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
    >
      {(inputProps: TextFieldProps & Props) => (
        <TextField
          inputProps={{
            autoComplete: "new-password",
            form: {
              autoComplete: "off",
            },
          }}
          {...inputProps}
          {...props}
          type={type}
        />
      )}
    </InputMask>
  ) : (
    <TextField
      inputProps={{
        autoComplete: "new-password",
        form: {
          autoComplete: "off",
        },
      }}
      {...props}
      type={type}
    />
  );
});

export default InputField;
