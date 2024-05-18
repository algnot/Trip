"use client";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@/utils/client/firebaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isUserLogin, login } from "@/utils/client/apiClient";
import Button from "@/components/Button";
import Image from "next/image";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { isLogged } = await isUserLogin();
      if (isLogged) {
        router.push("/");
      }
    };

    checkUser();

    getRedirectResult(auth).then(async (auth) => {
      const user = await login(auth);

      if (user) {
        router.push("/");
      }
    });
  }, [router]);

  const signIn = async () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="container flex flex-col">
      <div className="px-10 pt-40">
        <Image src="/favicon.ico" alt="icon" width={32} height={32} />
        <div className="text-4xl font-bold mt-4">ทาโร่ช่วยหาร</div>
        <div className="text-xl font-bold mt-4">
          (น.) โปรแกรมคิดเงินที่จะช่วยให้คุณไม่ต้องคิดเลขหารค่ากับข้าวกับเพื่อนให้เหนื่อยอีกต่อไป
        </div>
      </div>
      
      <div className="w-100 h-100 py-10 px-5 mt-auto bottom-0 bg-white rounded-t-lg">
        <Button onClick={signIn} useLoading={true} alwayLoading={true} className="font-black">
          <Image src="/asset/icon/google-logo.svg" alt="google-icon" width={25} height={25} />
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
