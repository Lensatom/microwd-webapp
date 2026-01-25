import { SERVER_BASE_URL } from '@/shared/config/api/constants'
import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

function useRecordAttendanceSocket(eventId: any) {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const socket = io(`${SERVER_BASE_URL}/events`, {
      transports: ['websocket'],
    })
    socketRef.current = socket;
    
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id)
    })

    socket.on("attendance-error", (error: any) => {
      console.log("an attendance error occurred:", error)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  function recordAttendance(token: string, callback: (response: any) => void) {
    try {
      const socket = socketRef.current;
      console.log("Recording attendance for token:", token);
      if (!socket) return;
      console.log("Emitting record-attendance event");
      socket.emit("record-attendance", {eventId, token}, (response: any) => {
        console.log("Received response for record-attendance:", response);
        callback(response);
      })
    } catch (error) {
      return error
    }
  }

  return {
    recordAttendance
  }
}

export default useRecordAttendanceSocket