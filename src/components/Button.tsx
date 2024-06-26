import React, { useState } from "react";
import Loading from "./Loading";

interface ButtonProps {
  onClick: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  useLoading?: boolean;
  alwayLoading?: boolean;
}

export default function Button(props: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const onClickHandle = async () => {
    setIsLoading(true)
    await props.onClick()
    if(!props.alwayLoading) {
      setIsLoading(false)
    }
  }

  if(props.useLoading && isLoading) {
    return (
      <Loading />      
    )
  }

  return (
    <div
      className={`flex items-center bg-primary hover:bg-primaryHover text-white border-0 py-2 px-6 gap-3 focus:outline-none cursor-pointer rounded text-md ${props.className}`}
      onClick={onClickHandle}
    >
      {props.children}
    </div>
  );
}
