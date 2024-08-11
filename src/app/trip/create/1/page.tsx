"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormPopup from "@/components/FormPopup";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  IoIosCalendar,
  IoIosCard,
  IoIosDocument,
  IoIosText,
  IoIosArrowForward,
} from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";

export default function CreateTrip() {
  const router = useRouter();
  const [isShowCreatePayment, setIsShowCreatePayment] =
    useState<boolean>(false);

  return (
    <div className="container">
      {isShowCreatePayment && (
        <FormPopup
          title="เพิ่มการชำระเงินใหม่"
          icon={MdOutlinePayment}
          onClose={() => setIsShowCreatePayment(false)}
          inputList={[
            {
              type: "text",
              name: "paymentNumber",
              label: "หมายเลขพร้อมเพย์",
              useLocal: true,
              placeholder: "หมายเลขพร้อมเพย์",
            },
          ]}
          onSubmit={(value) => {
            console.log(value);
          }}
        />
      )}
      <Topbar
        topic="รายละเอียดการหาร"
        onBack={() => {
          router.push("/");
        }}
      />
      <div className="px-10 pt-8">
        <ProgressBar steps={[1, 2, 3]} progresses={[50, 0, 0]} />
        <Form
          className="mt-8"
          confirmText={<>ต่อไป <IoIosArrowForward className="fill-white" /></>}
          inputList={[
            {
              type: "text",
              name: "name",
              label: "ชื่อการหาร",
              useLocal: true,
              icon: IoIosDocument,
              placeholder: "ค่ากับข้าว",
            },
            {
              type: "date",
              name: "date",
              label: "วันที่",
              useLocal: true,
              icon: IoIosCalendar,
              placeholder: "ค่ากับข้าว",
            },
            {
              type: "textarea",
              name: "desceiption",
              label: "รายละเอียดการหาร",
              useLocal: true,
              icon: IoIosText,
              placeholder: "เลือกการชำระเงิน",
            },
            {
              type: "select",
              name: "payment",
              useLocal: true,
              icon: IoIosCard,
              placeholder: "เลือกการชำระเงิน",
              options: [
                { value: "fox", label: "Fox" },
                { value: "Butterfly", label: "Butterfly" },
                { value: "Honeybee", label: "Honeybee" },
              ],
              beforeInput: (
                <>
                  <div className="block mb-3 text-black">การชำระเงิน</div>
                  <Button
                    onClick={async () => setIsShowCreatePayment(true)}
                    className="justify-start mb-3"
                  >
                    <FaPlus className="fill-white" />
                    เพิ่มการชำระเงินใหม่
                  </Button>
                </>
              ),
            },
          ]}
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </div>
      <Navbar active="/" />
    </div>
  );
}
