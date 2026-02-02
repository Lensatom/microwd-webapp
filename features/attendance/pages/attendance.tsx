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
    <div className="fixed inset-0 z-10 bg-black">
      <div id={readerId} className="absolute inset-0 w-screen h-screen overflow-hidden" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center text-white/90">
        <p className="text-base font-medium">Scan the event QR Code to continue</p>
      </div>
    </div>
  );
}
