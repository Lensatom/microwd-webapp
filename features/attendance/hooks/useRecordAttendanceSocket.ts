import { SERVER_BASE_URL } from '@/shared/config/api/constants'
import { getToken } from '@/shared/config/api/services';
import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { IAttendance } from '../interfaces';

function useRecordAttendanceSocket(eventId: any) {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    handleSocketConnection();
    return () => {
      if (socketRef.current) {
        socketRef.current?.disconnect()
      }
    }
  }, [])

  async function handleSocketConnection() {
    const token = await getToken();

    const socket = io(`${SERVER_BASE_URL}/events?ngrok-skip-browser-warning=true`, {
      transports: ['websocket'],
      auth: { token }
    })

    socketRef.current = socket;
    
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id)
    })

    socket.on("attendance-error", (error:any) => {
      console.log("an attendance error occurred:", error)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })
  }

  function recordAttendance(
    payload: {attendanceToken: string, userData: IAttendance},
    callback: (response: any) => void
  ){
    try {
      const socket = socketRef.current;
      console.log("Recording attendance for token:", payload.attendanceToken);
      if (!socket) return;
      console.log("Hello from recordAttendance");
      console.log("Emitting record-attendance event");
      socket.emit("record-attendance", {
        eventId,
        attendanceToken: payload.attendanceToken,
        userData: payload.userData
      }, (response: any) => {
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