import { SERVER_BASE_URL } from '@/shared/config/api/constants';
import { getToken } from '@/shared/config/api/services';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

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

    const socket = io(`${SERVER_BASE_URL}/attendance?ngrok-skip-browser-warning=true`, {
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
    payload: {attendanceToken: string, additionalInfo: Record<string, string>},
    callback: (response: any) => void
  ){
    try {
      const socket = socketRef.current;
      if (!socket) return;
      socket.emit("record-attendance", {
        eventId,
        attendanceToken: payload.attendanceToken,
        additionalInfo: payload.additionalInfo
      }, (response: any) => {
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