"use client";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { logout } from "@/utils/client/apiClient";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const onLogout = async () => {
    await logout()
    router.push("/login")
  }
  
  return (
    <div className={`container`}>
      <Button onClick={onLogout} useLoading={true}>
        Logout
      </Button>
      <Navbar active="/user" />
    </div>
  );
}
