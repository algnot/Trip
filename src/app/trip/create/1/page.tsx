"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";
import FormPopup from "@/components/FormPopup";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Topbar from "@/components/Topbar";
import { addPayment, useUser } from "@/utils/client/apiClient";
import { isNumeric } from "@/utils/client/string";
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
  const [user, refetchUser] = useUser();

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
          onSubmit={async (value) => {
            const response = await addPayment(value.paymentNumber);
            if (!response) {
              return "เกิดข้อผิดพลาดบางอย่าง กรุณาลองใหม่อีกครั้ง";
            }
            await refetchUser();
            return false;
          }}
          handleValidate={(value) => {
            if (!isNumeric(value.paymentNumber)) {
              return "หมายเลขพร้อมเพย์ต้องเป็นตัวเลขเท่านั้น";
            }
            const userPayment: Array<string> = user.data?.payments ?? []
            if(userPayment.includes(value.paymentNumber)) {
              return "หมายเลขพร้อมเพย์มีอยู่แล้ว";
            }
            return false;
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
          confirmText={
            <>
              ต่อไป <IoIosArrowForward className="fill-white" />
            </>
          }
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
              options:
                user.data?.payments?.map(
                  (value: Array<string>, index: number) => {
                    return {
                      value: value,
                      label: `พร้อมเพย์ ${value}`
                    };
                  }
                ) ?? [],
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
