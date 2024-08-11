"use client";
import Navbar from "@/components/Navbar";
import { useUser } from "@/utils/client/apiClient";
import Image from "next/image";
import SkeletonTextLoading from "@/components/SkeletonTextLoading";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, _] = useUser();

  return (
    <div className={`container`}>
      <div className="px-10 pt-8">
        <div className="flex items-center gap-6">
          <Image
            width={54}
            height={54}
            className="inline-block rounded-full"
            alt={`user-${user?.data?.name}`}
            src={user?.data?.imageUrl}
            overrideSrc="/asset/icon/user.png"
          />
          <div>
            <div>สวัสดี</div>
            <div>{user?.data?.name || <SkeletonTextLoading />}</div>
          </div>
        </div>
        <Button onClick={async () => {router.push("/trip/create/1")}} className="w-fit my-5 px-3">
          <FaPlus className="fill-white" />
          เพิ่มการหารใหม่
        </Button>
      </div>
      <Navbar active="/" />
    </div>
  );
}
