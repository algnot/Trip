import React from "react";
import { IconType } from "react-icons";

export default function Input(props: {
  name: string;
  type: "text" | "number" | "date";
  label?: string;
  placeholder?: string;
  icon?: IconType;
}) {
  return (
    <div>
      {props.label && (
        <label className="block mb-3 text-black">{props.label}</label>
      )}

      <div className="relative mb-6">
        {props.icon && (
          <div className="absolute inset-y-0 start-0 flex items-center pl-2 pointer-events-none">
            {<props.icon className="fill-gray w-[24px] h-[24px]" />}
          </div>
        )}
        <input
          type={props.type}
          name={props.name}
          className={`border-2 border-gray text-black text-md rounded-lg block w-full ${props.icon ? "pl-10" : "pl-2"} p-2 focus:border-black disabled:bg-blackground invalid:border-error invalid:text-error focus:invalid:border-error focus:invalid:ring-error`}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
