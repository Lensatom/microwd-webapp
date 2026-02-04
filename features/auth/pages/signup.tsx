"use client"

import { storeToken } from "@/shared/config/api/services";
import { UserContext } from "@/shared/contexts/userContext";
import { GoalIcon } from "lucide-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useSignupWithGoogle } from "../api";
import GoogleSignInButton from "../components/googleSignInButton";

function Signup() {
  const { signupWithGoogle } = useSignupWithGoogle();

  const { setUser } = useContext(UserContext)!;

  const handleSignupWithGoogle = async (credential: string) => {
    try {
      const { token: responseToken, user } = await signupWithGoogle(credential);
      await storeToken(responseToken);
      setUser(user);
    } catch (error) {
      toast.error("Signup with Google failed. Please try again.");
    }
  }

  return (
    <>
    <div className="w-full h-screen bg-primary text-white flex flex-col lg:flex-row justify-center items-center">
      <div className="w-full lg:w-1/2 lg:h-full bg-primary flex justify-center items-center lg:pl-44 border-r border-gray-200/20">
        <GoalIcon size={300} className="text-primary-light hidden lg:block" />
        <GoalIcon size={100} className="text-primary-light lg:hidden" />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center gap-8 lg:pr-44 pt-12 lg:pt-0 px-4 lg:px-0">
        <h1 className="text-5xl font-extrabold text-primary-light">Microwd</h1>
        <p className="text-primary-light/50 text-sm text-center">
          Take attendance easier, faster and more securely.<br />
          Signup with Google to continue
        </p>
        <GoogleSignInButton onCredential={handleSignupWithGoogle} />
      </div>
    </div>
    </>
  )
}

export default Signup