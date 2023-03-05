import { InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import React, { FC } from "react";

interface IOption {
  value: any;
  text: string;
}

type IProps = {
  options: IOption[];
} & SelectProps;

const SelectField: FC<IProps> = React.memo(({ options, ...props }) => {
  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props}>
        {options.map((o) => (
          <MenuItem value={o.value} key={o.value}>
            {o.text}
          </MenuItem>
        ))}
      </Select>
    </>
  );
});

export default SelectField;
