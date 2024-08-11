import { useRef } from "react";
import { IconType } from "react-icons";
import { IoMdInformationCircle, IoMdClose } from "react-icons/io";
import Input, { InputType } from "./Input";
import Button from "./Button";

export default function FormPopup(props: {
  title?: string;
  confirmText?: string;
  icon?: IconType;
  onClose: Function;
  inputList: InputType[];
  onSubmit: (value:any) => void;
}) {
  const formRef = useRef(null);

  const handleSubmit = async () => {
    const form = formRef.current;
    if(!form) {
      return
    }
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    props.onSubmit(formValues ?? {})
  }

  return (
    <form ref={formRef} className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-7 rounded-md w-[450px] shadow-md">
        <div className="flex text-lg justify-between items-center pb-3 border-b-2 border-b-gray mb-6">
          <div className="flex">
            {props.icon ? (
              <props.icon className="fill-black w-[24px] h-[24px] mr-2" />
            ) : (
              <IoMdInformationCircle className="fill-black w-[24px] h-[24px] mr-2" />
            )}
            {props.title ?? "Form"}
          </div>
          <IoMdClose
            onClick={() => props.onClose()}
            className="fill-black w-[24px] h-[24px] cursor-pointer"
          />
        </div>
        {props.inputList.map((input, _) => {
          return (
            <Input
              key={input.name}
              type={input.type}
              label={input.label}
              name={input.name}
              useLocal={input.useLocal}
              placeholder={input.placeholder}
            />
          );
        })}
        <Button onClick={handleSubmit} className="justify-center ml-auto">
          {props.confirmText ?? "ยืนยัน"}
        </Button>
      </div>
    </form>
  );
}
