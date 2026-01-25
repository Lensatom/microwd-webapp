"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useLayoutEffect, useState } from "react"
import { useGetEventById } from "../api"
import { useAttendanceSocket } from "../hooks"

function EventAttendance({ id}: { id: string }) {
  const [qrCodeCanvasSize, setQrCodeCanvasSize] = useState(0)
  const { event } = useGetEventById({ eventId: id })
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

  return (
    <div className="w-full h-screen grid grid-cols-2 items-center bg-white px-24 gap-24">
      <div>
        <QRCodeCanvas
          value={attendanceToken || ""}
          size={qrCodeCanvasSize}
          bgColor="#ffffff"
          fgColor="#000000"
          level="Q"
        />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-extrabold">{event?.name}</h1>
        <p className="mt-2">Scan the QR code to mark your attendance.</p>
      </div>
    </div>
  )
}

export default EventAttendance