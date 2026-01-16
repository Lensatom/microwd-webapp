"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useAttendanceSocket } from "../hooks"
import { useLayoutEffect, useState } from "react"

function EventAttendance() {
  const [qrCodeCanvasSize, setQrCodeCanvasSize] = useState(0)

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

  const event = {
    id: "12345",
    name: "Sample Event",
    date: "2024-06-01",
    location: "Sample Location"
  }

  const { attendanceToken} = useAttendanceSocket(event)

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
        <h1 className="text-3xl font-extrabold">The Forge Conference</h1>
        <p className="mt-2">Scan the QR code to mark your attendance.</p>
      </div>
    </div>
  )
}

export default EventAttendance