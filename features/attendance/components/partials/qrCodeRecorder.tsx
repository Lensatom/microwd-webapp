"use client";

import { useEffect, useState } from "react";
import { useQrCodeScanner, useRecordAttendanceSocket } from "../../hooks";

export default function QRCodeRecorder({  eventId}: { eventId: string }) {
  const { decodedResult, isRunning, error, readerId } = useQrCodeScanner();
  const { recordAttendance } = useRecordAttendanceSocket(eventId)
  const [recordSuccessful, setRecordSuccessful] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isRunning || !decodedResult) return;
    const attendanceToken = decodedResult.split("?token=")[1];
    if (!attendanceToken) return
    recordAttendance(attendanceToken, (response) => {
      setRecordSuccessful(response.success);
    });
  }, [isRunning, decodedResult]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      {recordSuccessful === true && (<p style={{ color: "green" }}>Attendance recorded successfully!</p>
      )}
      {recordSuccessful === false && (
        <p style={{ color: "red" }}>Failed to record attendance. Please try again.</p>
      )}

      <div id={readerId} className="w-100 rounded-xl overflow-hidden" />
      <h1 className="mt-5 font-bold text-xl text-center w-112.5">Now scan the event QR Code to record your attendance</h1>

      {error && (
        <p style={{ color: "#b00020", marginTop: 8 }}>
          {error} {error.includes("HTTPS") ? " If you're not on HTTPS, switch to a secure origin or use localhost." : ""}
        </p>
      )}
    </div>
  );
}
