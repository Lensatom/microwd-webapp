"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useAttendanceSocket } from "../hooks"
import { useLayoutEffect, useState } from "react"

function EventAttendance() {

  const [qrCodeCanvasSize, setQrCodeCanvasSize] = useState(0)

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setInitialSize()
    })

    setInitialSize()

    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  function setInitialSize() {
    const deviceHeight = window.innerHeight
    const deviceWidth = window.innerWidth
    setQrCodeCanvasSize(Math.min(deviceHeight, deviceWidth) - 100)
  }

  const event = {
    id: "12345",
    name: "Sample Event",
    date: "2024-06-01",
    location: "Sample Location"
  }

  const { attendanceToken} = useAttendanceSocket(event)

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <QRCodeCanvas
        value={attendanceToken || ""}
        size={qrCodeCanvasSize}
        bgColor="#ffffff"
        fgColor="#000000"
        level="Q"
      />
    </div>
  )
}

export default EventAttendance