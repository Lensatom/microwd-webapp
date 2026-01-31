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
  const [qrCodeCanvasSize, setQrCodeCanvasSize] = useState({min: 0 , max: 0})

  const { event, isPending } = useGetEventById({ eventId: id })
  const { attendanceToken } = useAttendanceSocket(event)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWelcomeMessageKey((prevKey: 1 | 2 | 3 | 4) => (prevKey < Object.keys(welcomeMessages).length ? (prevKey + 1) as 1 | 2 | 3 | 4 : 1))
    }, 500)
    return () => clearTimeout(timeout)
  }, [welcomeMessageKey])

  useLayoutEffect(() => {
    const handleResize = () => {
      const deviceHeight = window.innerHeight
      const deviceWidth = window.innerWidth
      const min_size = Math.max(64, Math.min(deviceHeight, deviceWidth))
      const max_size = Math.max(64, Math.max(deviceHeight, deviceWidth))
      setQrCodeCanvasSize({min: min_size, max: max_size})
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  
  return (
    <div className={`
      w-full h-screen flex justify-center items-center bg-primary overflow-hidden
      ${!isPending && "bg-white"} transition-all duration-1000 delay-700 ease-in-out
    `}>
      <div
        className={`bg-white w-0 h-0 rounded-full overflow-hidden flex justify-center transition-all duration-1500 ease-in-out flex-col items-center`}
        style={{
          width: !isPending ? `${qrCodeCanvasSize.max * 2}px` : "0",
          height: !isPending ? `${qrCodeCanvasSize.max * 2}px` : "0"
        }}
      >
        <div>
          <QRCodeCanvas
            value={attendanceToken || welcomeMessages[welcomeMessageKey]}
            size={qrCodeCanvasSize.min - 100}
            bgColor="transparent"
            fgColor={"#000000"}
            level="Q"
          />
        </div>
        <div className={`flex flex-col items-center mt-2 overflow-hidden`}>
          <h1 className="text-3xl font-extrabold whitespace-nowrap text-primary">{event?.name}</h1>
          <p className={`
            whitespace-nowrap text-primary/80 text-sm font-medium opacity-0
            ${attendanceToken ? "opacity-100" : "opacity-0"}
            transition-all duration-2000 ease-in-out
          `}>
            Scan the QR code to submit your attendance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventAttendance