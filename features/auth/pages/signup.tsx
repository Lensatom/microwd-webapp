"use client"

import { GoalIcon } from "lucide-react"
import Script from "next/script"
import { useSignupWithGoogle } from "../api"

function Signup() {
  const { signupWithGoogle } = useSignupWithGoogle();

  const handleSignupWithGoogle = (token: {credential: string}) => {
    console.log("Google token received:", token);
    signupWithGoogle(token.credential);
  }

  const initializeGoogle = () => {
    window.google.accounts.id.initialize({
      client_id: "917373415110-5tuqtm15lqs3ac49svt3sera30su4ern.apps.googleusercontent.com",
      callback: handleSignupWithGoogle,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );
  };

  return (
    <>
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={initializeGoogle}
    />
    <div className="w-full h-screen bg-primary-light text-white flex">
      <div className="w-1/2 h-full bg-primary flex justify-center items-center">
        <GoalIcon size={350} className="text-primary-light" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center gap-8">
        <h1 className="text-5xl font-extrabold text-primary">Microwd</h1>
        <p className="text-gray-600 text-sm w-1/2 text-center">Take attendance easier, faster and more securely. Signup with Google to continue</p>
        <div id="googleBtn"></div>
        {/* <Button type="button" className="bg-transparent border border-primary text-primary">
          <Image src={googleImage} alt="Google Logo" width={20} height={20} className="fill-primary" />
          Continue with Google
        </Button> */}
      </div>
    </div>
    </>
  )
}

export default Signup