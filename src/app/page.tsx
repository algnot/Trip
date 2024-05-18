"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@/utils/client/apiClient";
import Image from "next/image";
import SkeletonTextLoading from "@/components/SkeletonTextLoading"

export default function Home() {
  const user = useUser();
  
  return (
    <div className={`container`}>
      <div className="px-10 pt-8 flex items-center gap-6">
        <Image
          width={54}
          height={54}
          className="inline-block rounded-full"
          alt={`user-${user?.data?.name}`}
          src={user?.data?.imageUrl}
          overrideSrc="/asset/icon/user-icon.png"
        />
        <div>
          <div>สวัสดี</div>
          <div>{user?.data?.name || <SkeletonTextLoading />}</div>
        </div>
      </div>
      <Navbar active="/" />
    </div>
  );
}
