"use client"

import { useContext } from "react"
import Link from "next/link"
import { toast } from "react-toastify"
import { ArrowRight, CalendarDays, QrCode, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/shared/components/ui"
import { storeToken } from "@/shared/config/api/services"
import { UserContext } from "@/shared/contexts/userContext"
import { useSignupWithGoogle } from "@/features/auth/api"
import GoogleSignInButton from "@/features/auth/components/googleSignInButton"

function About() {
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const setUser = userContext?.setUser
  const { signupWithGoogle } = useSignupWithGoogle()

  const handleSignupWithGoogle = async (credential: string) => {
    try {
      const { token: responseToken, user: authenticatedUser } = await signupWithGoogle(credential)
      await storeToken(responseToken)
      setUser?.(authenticatedUser)
    } catch {
      toast.error("Google authentication failed. Please try again.")
    }
  }

  return (
    <main className="relative min-h-screen bg-primary overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-primary-light text-lg font-extrabold tracking-wide">Microwd</Link>
          <Link href="/signup" className="text-sm text-primary-light/70 hover:text-primary-light transition-colors">Sign in</Link>
        </header>

        <section className="mt-12 lg:mt-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 flex flex-col items-center md:items-start">
            <p className="inline-flex rounded-full border border-primary-light/30 bg-primary-light/10 text-primary-light text-xs px-3 py-1">
              Attendance made effortless
            </p>
            <h1 className="text-center md:text-left text-4xl lg:text-6xl font-extrabold text-white leading-tight">
              Run events with confidence,
              <span className="block text-primary-light">track attendance in seconds.</span>
            </h1>
            <p className="text-center md:text-left text-primary-light/70 max-w-2xl text-sm lg:text-base leading-relaxed">
              Microwd helps organizers create events, collect attendance with continuously rotating QR codes, and export records quickly.
              It is designed for speed during check-ins and clarity after your event ends.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="h-11 px-6">
                <Link href="/events/create">Create an event now</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-primary-light/20 bg-white/5 backdrop-blur-sm p-5 lg:p-6 space-y-4">
              <h2 className="text-white font-semibold">Why teams use Microwd</h2>

              <div className="grid gap-3">
                <div className="rounded-xl bg-primary-light/10 border border-primary-light/20 p-4 flex items-start gap-3">
                  <QrCode className="text-primary-light mt-0.5" size={24} />
                  <div>
                    <h3 className="text-white text-sm font-medium">Rotating QR codes</h3>
                    <p className="text-primary-light/70 text-xs mt-1">Codes rotate during check-in to reduce reuse and help ensure only people physically at the event can submit attendance.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-primary-light/10 border border-primary-light/20 p-4 flex items-start gap-3">
                  <Users className="text-primary-light mt-0.5" size={18} />
                  <div>
                    <h3 className="text-white text-sm font-medium">Live attendance lists</h3>
                    <p className="text-primary-light/70 text-xs mt-1">Keep track of who is checked in, in real time.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-primary-light/10 border border-primary-light/20 p-4 flex items-start gap-3">
                  <CalendarDays className="text-primary-light mt-0.5" size={18} />
                  <div>
                    <h3 className="text-white text-sm font-medium">Simple event workflow</h3>
                    <p className="text-primary-light/70 text-xs mt-1">Create, run, and review events from one dashboard.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-primary-light/10 border border-primary-light/20 p-4 flex items-start gap-3">
                  <ShieldCheck className="text-primary-light mt-0.5" size={18} />
                  <div>
                    <h3 className="text-white text-sm font-medium">Google-auth secured access</h3>
                    <p className="text-primary-light/70 text-xs mt-1">Sign in safely and get started instantly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About