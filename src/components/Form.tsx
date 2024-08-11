import { Component, ReactElement, useRef } from "react";
import Input, { InputType } from "./Input";
import SelectInput, { SelectInputType } from "./Select";
import { Option } from "react-tailwindcss-select/dist/components/type";
import Button from "./Button";

export interface InputFormType
  extends Omit<InputType, "type">,
    Omit<SelectInputType, "options"> {
  type: "text" | "number" | "date" | "textarea" | "select";
  options?: Option[];
  arferInput?: ReactElement;
  beforeInput?: ReactElement;
}

export default function Form(props: {
  className?: string;
  inputList: InputFormType[];
  confirmText?: string | ReactElement;
  onSubmit: (value: any) => void;
}) {
  const formRef = useRef(null);

  const handleSubmit = async () => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    props.onSubmit(formValues ?? {});
  };

  return (
    <form ref={formRef} className={props.className}>
      {props.inputList.map((input, _) => {
        if (input.type !== "select") {
          return (
            <div key={input.name}>
              {input.beforeInput}
              <Input
                key={input.name}
                type={input.type}
                label={input.label}
                name={input.name}
                useLocal={input.useLocal}
                icon={input.icon}
                placeholder={input.placeholder}
              />
              {input.arferInput}
            </div>
          );
        } else {
          return (
            <div key={input.name}>
              {input.beforeInput}
              <SelectInput
                name={input.name}
                label={input.label}
                icon={input.icon}
                placeholder={input.placeholder}
                options={input.options ?? []}
              />
              {input.arferInput}
            </div>
          );
        }
      })}
      <Button
        onClick={handleSubmit}
        className="flex justify-center mb-3 ml-auto w-fit text-white"
      >
        {props.confirmText}
      </Button>
    </form>
  );
}
