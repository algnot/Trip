"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SelectInput from "@/components/Select";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import {
  IoIosCalendar,
  IoIosCard,
  IoIosDocument,
  IoIosText,
  IoIosArrowForward
} from "react-icons/io";

export default function CreateTrip() {
  const router = useRouter();

  return (
    <div className="container">
      <Topbar
        topic="รายละเอียดการหาร"
        onBack={() => {
          router.push("/");
        }}
      />
      <div className="px-10 pt-8">
        <ProgressBar steps={[1, 2, 3]} progresses={[50, 0, 0]} />
        <form className="mt-8">
          <Input
            label="ชื่อการหาร"
            type="text"
            placeholder="ค่ากับข้าว"
            name="name"
            useLocal={true}
            icon={IoIosDocument}
          />
          <Input
            label="วันที่"
            type="date"
            name="date"
            useLocal={true}
            icon={IoIosCalendar}
          />
          <Input
            label="รายละเอียดการหาร"
            type="textarea"
            name="desceiption"
            useLocal={true}
            placeholder="หารค่ากับข้าวที่ไปกินกันที่สยาม"
            icon={IoIosText}
          />
          <div className="block mb-3 text-black">การชำระเงิน</div>
          <Button onClick={async () => {}} className="justify-start mb-3">
            <FaPlus className="fill-white" />
            เพิ่มการชำระเงินใหม่
          </Button>
          <SelectInput
            name="payment"
            icon={IoIosCard}
            placeholder="เลือกการชำระเงิน"
            options={[
              { value: "fox", label: "Fox" },
              { value: "Butterfly", label: "Butterfly" },
              { value: "Honeybee", label: "Honeybee" },
            ]}
          />
          <Button onClick={async () => {}} className="justify-center mb-3 ml-auto w-fit">
            ต่อไป <IoIosArrowForward className="fill-white test-md" />
          </Button>
        </form>
      </div>
      <Navbar active="/" />
    </div>
  );
}
