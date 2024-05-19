import React, { useState } from "react";
import { IconType } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateToString } from "@/utils/client/date";

export default function Input(props: {
  name: string;
  type: "text" | "number" | "date" | "textarea";
  label?: string;
  placeholder?: string;
  icon?: IconType;
}) {
  const [date, setDate] = useState(new Date());

  if (props.type !== "date") {
    return (
      <div>
        {props.label && (
          <label className="block mb-3 text-black">{props.label}</label>
        )}

        <div className="relative mb-6">
          {props.icon && (
            <div className={`absolute flex items-center pl-2 pointer-events-none ${props.type === "textarea" ? "pt-2.5" : "inset-y-0 start-0"}`}>
              {<props.icon className="fill-gray text-gray w-[24px] h-[24px]" />}
            </div>
          )}
          {props.type === "textarea" ? (
            <textarea 
            placeholder={props.placeholder}
            className={`border-2 border-gray text-black text-md rounded-lg block w-full ${
                props.icon ? "pl-10" : "pl-2"
              } p-2 focus:border-black disabled:bg-blackground invalid:border-error invalid:text-error focus:invalid:border-error focus:invalid:ring-error`}></textarea>
          ) : (
            <input
              type={props.type}
              name={props.name}
              className={`border-2 border-gray text-black text-md rounded-lg block w-full ${
                props.icon ? "pl-10" : "pl-2"
              } p-2 focus:border-black disabled:bg-blackground invalid:border-error invalid:text-error focus:invalid:border-error focus:invalid:ring-error`}
              placeholder={props.placeholder}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {props.label && (
        <label className="block mb-3 text-black">{props.label}</label>
      )}
      <div className="flex mb-6 border-2 border-gray bg-white rounded-lg overflow-hidden">
        {props.icon && (
          <div className="flex items-center pl-2 pointer-events-none ">
            {<props.icon className="fill-gray w-[24px] h-[24px]" />}
          </div>
        )}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date ?? new Date())}
          dateFormat="dd/MM/yyyy"
          className={` text-black text-md w-96 block p-2 focus:border-transparent outline-none`}
        />
        <input
          type={props.type}
          name={props.name}
          value={formatDateToString(date)}
          className="invisible"
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
}
