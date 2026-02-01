"use client";

import { useEffect, useState } from "react";
import { useQrCodeScanner, useRecordAttendanceSocket } from "../../hooks";
import { IAttendance } from "../../interfaces";
import { redirect } from "next/navigation";

interface IQRCodeRecorderProps {
  eventId: string;
  additionalInfo: Record<string, string>;
}

export default function QRCodeRecorder({ eventId, additionalInfo }: IQRCodeRecorderProps) {
  const { decodedResult, isRunning, error, readerId } = useQrCodeScanner();
  const { recordAttendance } = useRecordAttendanceSocket(eventId)
  
  const [recordSuccessful, setRecordSuccessful] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) return;
    setIsScanning(true);
    if (!isRunning || !decodedResult) {
      setIsScanning(false);
      return
    };
    const attendanceToken = decodedResult.split("?token=")[1];
    if (!attendanceToken) {
      setIsScanning(false);
      return
    };
    recordAttendance({attendanceToken, additionalInfo}, (response) => {
      setRecordSuccessful(response.success);
      if (response.success) {
        redirect(`/attendance/${eventId}/record/success`);
      }
      setIsScanning(false);
    });
  }, [isRunning, decodedResult, additionalInfo]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      {recordSuccessful === null && <p>Waiting to scan QR code...</p>}
      {recordSuccessful === true && <p style={{ color: "green" }}>Attendance recorded successfully!</p>}
      {recordSuccessful === false && <p style={{ color: "red" }}>Failed to record attendance. Please try again.</p>}

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
