import React, { useState } from "react";
import { IconType } from "react-icons";
import Select from "react-tailwindcss-select";
// doc: https://www.npmjs.com/package/react-tailwindcss-select

interface Option {
    value: string;
    label: string;
}

export default function SelectInput(props: {
  name: string;
  options: Option[];
  label?: string;
  icon?: IconType;
  placeholder?: string;
}) {
  const [selected, setSelected] = useState(null);
  const [output, setOutput] = useState("null");

  const handleChange = (value: any) => {    
    if(value) {
        setOutput(value?.value ?? "")
    }
    setSelected(value);
  };

  return (
    <div>
      {props.label && (
        <label className="block mb-3 text-black">{props.label}</label>
      )}
      <div className="relative mb-6 bg-white rounded-lg border-2 border-gray">
        {props.icon && (
          <div
            className={`absolute flex items-center pl-2 pointer-events-none inset-y-0 start-0`}
          >
            {<props.icon className="fill-gray text-gray w-[24px] h-[24px]" />}
          </div>
        )}
        <Select
          value={selected}
          primaryColor="primary"
          onChange={handleChange}
          isSearchable={true}
          placeholder={props.placeholder}
          searchInputPlaceholder="ค้นหา"
          noOptionsMessage="ไม่พบข้อมูลที่ค้นหา"
          options={props.options}
          classNames={{
            menuButton: (isDisabled) =>
              `flex  text-black  block w-full ${props.icon ? "pl-10" : "pl-2"}`,
            menu: "absolute z-10 w-full bg-white border-2 rounded py-2 mt-3 text-sm text-gray",
            listItem: (isSelected) =>
              `block transition duration-200 px-2.5 py-2.5 cursor-pointer select-none truncate rounded hover:bg-background ${
                isSelected?.isSelected && " text-gray bg-background"
              }`,
          }}  
        />
        <input
          type="text"
          name={props.name}
          value={output}
          className="hidden"
        />
      </div>
    </div>
  );
}
