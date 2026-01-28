"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useEffect, useLayoutEffect, useState } from "react"
import { useGetEventById } from "../api"
import { useAttendanceSocket } from "../hooks"

function EventAttendance({ id}: { id: string }) {
  const welcomeMessages = {
    1: "Welcome to Microwd — the fast, seamless way to take attendance using QR codes.",
    2: "To get started, simply scan the QR code below with your device's camera or a QR code scanner app.",
    3: "Once scanned, your attendance will be recorded instantly. Enjoy your event!",
    4: "Need help? Visit our support page for assistance.",
  }
  const [welcomeMessageKey, setWelcomeMessageKey] = useState<1 | 2 | 3 | 4>(1)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeMessageKey((prevKey: 1 | 2 | 3 | 4) => (prevKey < Object.keys(welcomeMessages).length ? (prevKey + 1) as 1 | 2 | 3 | 4 : 1))
    }, 500)
    return () => clearTimeout(timeout)
  }, [welcomeMessageKey])

  const [qrCodeCanvasSize, setQrCodeCanvasSize] = useState(0)
  const { event, isPending } = useGetEventById({ eventId: id })
  const { attendanceToken } = useAttendanceSocket(event)

  useLayoutEffect(() => {
    const handleResize = () => {
      const deviceHeight = window.innerHeight
      const deviceWidth = window.innerWidth
      const size = Math.max(64, Math.min(deviceHeight, deviceWidth) - 100)
      setQrCodeCanvasSize(size)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (isPending) return <div className="w-full h-screen flex items-center justify-center">Loading event details...</div>
  
  return (
    <div className="w-full h-screen flex justify-center items-center px-24 gap-24">
      <div>
        <QRCodeCanvas
          value={attendanceToken || welcomeMessages[welcomeMessageKey]}
          size={qrCodeCanvasSize}
          bgColor="#ffffff"
          fgColor={"#000000"}
          level="Q"
        />
      </div>
      <div className={`flex flex-col items-center ${attendanceToken ? "w-full" : "w-0"} transition-all duration-2000 ease-in-out overflow-hidden`}>
        <h1 className="text-3xl font-extrabold whitespace-nowrap">{event?.name}</h1>
        <p className="mt-2 whitespace-nowrap">Scan the QR code to mark your attendance.</p>
      </div>
    </div>
  )
}

export default EventAttendance