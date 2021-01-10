import React from "react";
import "./customSelector";

type Props = {
  value: string;
  onChange: Function;
  children: React.ReactNode;
  label: string;
};

const CustomSelector: React.FC<Props> = (props): JSX.Element => {
  return (
    <select
      value={props.value}
      className="selector w-100"
      onChange={(e) => props.onChange(e)}
    >
      <option hidden value="">
        {props.label}
      </option>
      {props.children}
    </select>
  );
};

export default CustomSelector;
