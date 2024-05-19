"use client";
import Input from "@/components/Input";
import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar";
import Topbar from "@/components/Topbar";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosCalendar, IoIosDocument, IoIosText } from "react-icons/io";

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
      <form className="px-10 pt-8">
        <ProgressBar steps={[1, 2, 3]} progresses={[50, 0, 0]} />
        <div className="mt-8">
          <Input
            label="ชื่อการหาร"
            type="text"
            placeholder="ค่ากับข้าว"
            name="name"
            icon={IoIosDocument}
          />
          <Input
            label="วันที่"
            type="date"
            name="date"
            icon={IoIosCalendar}
          />
          <Input
            label="รายละเอียดการหาร"
            type="textarea"
            name="desceiption"
            placeholder="หารค่ากับข้าวที่ไปกินกันที่สยาม"
            icon={IoIosText}
          />
        </div>
      </form>
      <Navbar active="/" />
    </div>
  );
}
