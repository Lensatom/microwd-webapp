"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useQrCodeScanner, useRecordAttendanceSocket } from "../../hooks";

interface IQRCodeRecorderProps {
  eventId: string;
  additionalInfo: Record<string, string>;
}

export default function QRCodeRecorder({ eventId, additionalInfo }: IQRCodeRecorderProps) {
  const { decodedResult, isRunning, error, readerId } = useQrCodeScanner();
  const { recordAttendance } = useRecordAttendanceSocket(eventId)
  
  const [recordSuccessful, setRecordSuccessful] = useState<{ success: boolean, message: string } | null>(null);
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
      setRecordSuccessful(response);
      if (response.success) {
        redirect(`/attendance/${eventId}/record/success`);
      }
      setIsScanning(false);
    });
  }, [isRunning, decodedResult, additionalInfo]);

  return (
    <div className="fixed inset-0 z-10 bg-black">
      <div id={readerId} className="absolute inset-0 w-screen h-screen overflow-hidden" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center text-white/90">
        <p className="text-base font-medium">Now scan the event QR Code to record your attendance</p>
        {recordSuccessful === null && <p className="mt-2 text-sm text-white/70">Waiting to scan QR code...</p>}
        {recordSuccessful?.success === true && (
          <p className="mt-2 text-sm text-green-400">Attendance recorded successfully!</p>
        )}
        {recordSuccessful?.success === false && (
          <p className="mt-2 text-sm text-red-400">{recordSuccessful.message}. Please try again.</p>
        )}
      </div>
    </div>
  );
}