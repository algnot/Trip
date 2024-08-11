import { useRef, useState } from "react";
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
  handleValidate?: (value: any) => string | false;
  onSubmit: (value: any) => Promise<string | false>;
}) {
  const formRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const form = formRef.current;
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    if (props.handleValidate) {
      const validated = props.handleValidate(formValues ?? {});
      if (validated) {
        setLoading(false);
        setError(validated);
        return;
      }
    }
    const resSubmit = await props.onSubmit(formValues ?? {});
    setLoading(false);
    if(resSubmit) {
      setError(resSubmit);
      return;
    }
    props.onClose()
  };

  return (
    <form
      ref={formRef}
      className="fixed z-10 top-0 left-0 w-full h-full flex justify-center items-center"
    >
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
        {loading && (
          <center className="mx-auto">
            <svg
              className="w-8 h-8 animate-spin fill-gray fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                className="fill-primary"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                className="fill-gray"
              />
            </svg>
            <div className="sr-only">Loading...</div>
          </center>
        )}
        <div className={`${loading ? "hidden" : ""}`}>
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
          {error && <div className="text-error mb-3">{error}</div>}
          <Button onClick={handleSubmit} className="justify-center ml-auto">
            {props.confirmText ?? "ยืนยัน"}
          </Button>
        </div>
      </div>
    </form>
  );
}
