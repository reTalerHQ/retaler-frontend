import React from "react";
import Select from "react-select";
import { Label } from "./ui/label"; // Ensure you have this or replace with a native label

const ReactSelectCustomized = ({ label, error, onChange, ...props }) => {
  return (
    <div className="flex flex-col gap-3">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Select
        maxMenuHeight={200}
        onChange={onChange}
        styles={{
          control: (base, state) => ({
            ...base,
            boxShadow: state.isFocused ? "0 0 0 0.5px #375ED9" : "none",
            backgroundColor: "transparent",
            border: "1px solid #BBBBBB",
            borderColor: state.isFocused ? "#375ED9" : "#CACDF6",
            "&:hover": {
              borderColor: state.isFocused ? "#375ED9" : "#CACDF6",
            },
            fontSize: "14px",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#d1d5dc",
            fontSize: "14px",
          }),
          option: (styles, { isSelected }) => ({
            ...styles,
            border: "0",
            backgroundColor: isSelected ? "#375ED9" : "#fff",
            color: isSelected ? "#fff" : "#000",
            ":active": {
              backgroundColor: "#375ED9",
              color: "#fff",
            },
            ":hover": {
              color: isSelected ? "#CACDF6" : "black",
              backgroundColor: isSelected ? "#375ED9" : "#CACDF6",
            },
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999999,
            fontSize: "14px",
          }),
          indicatorSeparator: (base) => ({
            ...base,
            width: 0,
          }),
        }}
        {...props}
      />
      {error && <p className="mt-0.5 h-1 text-[10px] text-red-500">{error}</p>}
    </div>
  );
};

export default ReactSelectCustomized;
