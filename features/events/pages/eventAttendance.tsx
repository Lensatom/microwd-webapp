"use client"

import { QRCodeCanvas } from "qrcode.react"
import { useAttendanceSocket } from "../hooks"

function EventAttendance() {

  const event = {
    id: "12345",
    name: "Sample Event",
    date: "2024-06-01",
    location: "Sample Location"
  }

  const { attendanceToken } = useAttendanceSocket(event)

  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <QRCodeCanvas
        value={attendanceToken || ""}
        size={window.innerHeight - 100}
        bgColor="#ffffff"
        fgColor="#000000"
        level="Q"
      />
    </div>
  )
}

export default EventAttendance