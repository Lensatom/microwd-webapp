"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQrCodeScanner } from "../hooks";

export default function QRCodeRecorder() {
  const { decodedResult, isRunning, readerId } = useQrCodeScanner();
  const router = useRouter();

  useEffect(() => {
    if (!isRunning || !decodedResult) return;
    const eventId = decodedResult.split("/attendance/")[1];
    if (!eventId) return
    router.push(`/attendance/${eventId}`);
  }, [isRunning, decodedResult]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      <div id={readerId} className="w-100 rounded-xl overflow-hidden" />
      <h1 className="mt-5 font-bold text-xl text-center w-112.5">Scan the event QR Code to continue</h1>
    </div>
  );
}
