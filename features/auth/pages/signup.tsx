"use client"

import { Button } from "@/shared/components/ui";
import { storeToken } from "@/shared/config/api/services";
import { GoalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { toast } from "react-toastify";
import { useSignupWithGoogle } from "../api";

function Signup() {
  const router = useRouter();
  const { signupWithGoogle } = useSignupWithGoogle();

  const handleSignupWithGoogle = async (token: {credential: string}) => {
    console.log("Google token received:", token);
    try {
      const { token: responseToken } = await signupWithGoogle(token.credential);
      await storeToken(responseToken);
      router.replace("/");
    } catch (error) {
      toast.error("Signup with Google failed. Please try again.");
      console.error("Signup with Google failed:", error);
    }
  }

  const initializeGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: "917373415110-5tuqtm15lqs3ac49svt3sera30su4ern.apps.googleusercontent.com",
      callback: handleSignupWithGoogle,
      ux_mode: "popup",
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );
  };

  const triggerGoogleSignin = () => {
    try {
      if (window.google?.accounts?.id) {
        // Try One Tap / FedCM prompt; if the browser blocks it,
        // fall back to the visible Google-rendered button below.
        window.google.accounts.id.prompt((notification: any) => {
          const blocked = (notification?.isNotDisplayed && notification.isNotDisplayed())
            || (notification?.isSkippedMoment && notification.isSkippedMoment());
          if (blocked) {
            const container = document.getElementById('googleBtn');
            if (container) {
              container.style.display = '';
            }
          }
        });
        return;
      }
    } catch (e) {
      console.error('Failed to trigger Google sign-in:', e);
    }
  };

  return (
    <>
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initializeGoogle}
    />
    <div className="w-full h-screen bg-primary text-white flex">
      <div className="w-1/2 h-full bg-primary flex justify-center items-center pl-44 border-r border-gray-200/20">
        <GoalIcon size={300} className="text-primary-light" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-8 pr-44">
        <h1 className="text-5xl font-extrabold text-primary-light">
          Microwd
        </h1>
        <p className="text-primary-light/50 text-sm w-1/2 text-center">Take attendance easier, faster and more securely. Signup with Google to continue</p>
        <div id="googleBtn"></div>
        <Button type="button" onClick={triggerGoogleSignin} className="bg-transparent border border-primary-light w-[60%] hover:w-[70%] py-5!">
          Continue with Google
        </Button>
      </div>
    </div>
    </>
  )
}

export default Signup