"use client";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import SelectInput from "@/components/Select";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
import React from "react";
import {
  IoIosCalendar,
  IoIosCard,
  IoIosDocument,
  IoIosText,
} from "react-icons/io";

export default function CreateTrip() {
  const router = useRouter();

  return (
    <div className={`container`}>
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
            icon={IoIosDocument}
          />
          <Input label="วันที่" type="date" name="date" icon={IoIosCalendar} />
          <Input
            label="รายละเอียดการหาร"
            type="textarea"
            name="desceiption"
            placeholder="หารค่ากับข้าวที่ไปกินกันที่สยาม"
            icon={IoIosText}
          />
          <SelectInput
            name="payment"
            label="การชำระเงิน"
            icon={IoIosCard}
            placeholder="เลือกการชำระเงิน"
            options={[
              { value: "fox", label: "Fox" },
              { value: "Butterfly", label: "Butterfly" },
              { value: "Honeybee", label: "Honeybee" },
            ]}
          />
        </form>
      </div>
      <Navbar active="/" />
    </div>
  );
}
