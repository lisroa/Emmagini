"use client";

import Image from "next/image";
import Link from "next/link";
import { RoundButton } from "@/app/components/buttons/RoundButton";
import { CircleUser, Mail } from "lucide-react";
import { useCallback } from "react";
import { signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase/firebase";
import { firebaseGoogleAuthProvider } from "@/config/firebase/google.provider";
import { useRouter } from "next/navigation";
import CleanLocalStorageOnUnmount from "../../app/truco/CleanLocalStorageOnUnmount"



export default function Page() {
  const router = useRouter();

  const onSignInWithGoogle = useCallback(async () => {
    try {
      await signInWithPopup(firebaseAuth, firebaseGoogleAuthProvider);

      return router.push("/app");
    } catch {}
  }, [router]);

  return (
    
    <>
      <CleanLocalStorageOnUnmount/>
        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-black font-bold text-center md:text-2xl text-xl">
              Start to login your Emmagini account
            </h1>
            <h6 className="text-gray-400 font-regular text-center md:text-sm">
              Lorem ipsum dolor sit amet, consectetur
            </h6>
          </div>

          <div className="w-full max-w-sm flex flex-col gap-5 items-center justify-center">
            <RoundButton
              logo={
                <Image
                  className=""
                  src={"/assets/social/google_logo.png"}
                  alt={"Google Logo"}
                  width={20}
                  height={20}
                />
              }
              text={"Continue with google"}
              onClick={onSignInWithGoogle}
            />

            <Link className="w-full" href={"/auth/login/email"}>
              <RoundButton
                logo={<Mail className="text-white" size={20} />}
                text={"Continue with Email"}
                buttonClassName="border border-sky-700 hover:bg-sky-800 bg-sky-700"
                textClassName="text-white"
              />
            </Link>

            <Link className="w-full" href={"/auth/sign-up"}>
              <RoundButton
                logo={<CircleUser className="text-white" size={20} />}
                text={"Create new account"}
                buttonClassName="border border-sky-500 hover:bg-sky-600 bg-sky-500"
                textClassName="text-white"
              />
            </Link>
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <p className="text-gray-400 font-regular text-center text-md">
              Forgot your password?{" "}
              <span className="text-blue-400 hover:text-blue-500">
                <Link href="">Click here</Link>
              </span>
            </p>
          </div>
        </div>
    </>
  );
}
