import { SERVER_BASE_URL } from '@/shared/config/api/constants'
import { getToken } from '@/shared/config/api/services'
import { APP_URL } from '@/shared/constants'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function useAttendanceSocket(event: any) {
  let socket: any;
  const [attendanceToken, setAttendanceToken] = useState<string | null>(null)
  
  useEffect(() => {
    if (!event) return;
    handleSocketConnection();
    return () => {
      socket?.disconnect()
    }
  }, [event])

  async function handleSocketConnection() {
    const token = await getToken();
    socket = io(`${SERVER_BASE_URL}/events?ngrok-skip-browser-warning=true`, {
      transports: ['websocket'],
      auth: { token }
    })
    
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id)
    })
    
    socket.on("new-attendance-token", (data:any) => {
      const { attendanceToken: receivedAttendanceToken } = data
      console.log("Received new attendance token:", receivedAttendanceToken)
      const qrMessage = `${APP_URL}/attendance/${event._id}/record?token=${receivedAttendanceToken}`
      setAttendanceToken(qrMessage)
    })

    socket.on("attendance-error", (error:any) => {
      console.log("an attendance error occurred:", error)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })
    
    socket.emit("stream-attendance-tokens", {event})
  }

  return {
    attendanceToken
  }
}

export default useAttendanceSocket