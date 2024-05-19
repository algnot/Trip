import React from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function Topbar(props: { topic: string; onBack?: () => void }) {
  return (
    <div className="bg-white shadow-sm p-5 flex items-center gap-4 sticky top-0 z-50">
      {props.onBack && (
        <div onClick={props.onBack} className="cursor-pointer">
          <SlArrowLeft className="text-xl" />
        </div>
      )}
      <div>{props.topic}</div>
    </div>
  );
}
