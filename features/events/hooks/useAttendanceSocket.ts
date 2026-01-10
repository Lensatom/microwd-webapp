import { SERVER_BASE_URL } from '@/shared/config/api/constants'
import { APP_URL } from '@/shared/constants'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function useAttendanceSocket(event: any) {
  const [attendanceToken, setAttendanceToken] = useState<string | null>(null)

  useEffect(() => {
    const socket = io(`${SERVER_BASE_URL}/events`, {
      transports: ['websocket'],
      // query: { 'ngrok-skip-browser-warning': 'true' },
    })
    
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id)
    })
    
    socket.on("new-attendance-token", (data) => {
      const { attendanceToken: receivedAttendanceToken } = data
      console.log("Received new attendance token:", receivedAttendanceToken)
      const qrMessage = `${APP_URL}/attendance/record?token=${receivedAttendanceToken}`
      setAttendanceToken(qrMessage)
    })

    socket.on("attendance-error", (error) => {
      console.log("an attendance error occurred:", error)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })
    
    socket.emit("stream-attendance-tokens", {data: {event}})

    return () => {
      socket.disconnect()
    }
  }, [])

  return {
    attendanceToken
  }
}

export default useAttendanceSocket