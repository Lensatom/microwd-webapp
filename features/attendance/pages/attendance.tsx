"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQrCodeScanner } from "../hooks";
import { ChevronLeft } from "lucide-react";

export default function QRCodeRecorder() {
  const { decodedResult, isRunning, readerId } = useQrCodeScanner();
  const router = useRouter();

  useEffect(() => {
    if (!isRunning || !decodedResult) return;
    const eventId = decodedResult.split("/attendance/")[1];
    if (!eventId) return
    router.push(`/attendance/${eventId}/record`);
  }, [isRunning, decodedResult]);

  return (
    <div className="fixed inset-0 z-10 bg-black">
      <div id={readerId} className="absolute inset-0 w-screen h-screen overflow-hidden" />
      <button className="pointer-events-auto cursor-pointer absolute top-4 left-4 p-2 rounded-full bg-primary hover:bg-white/30 transition" onClick={() => router.back()}>
        <ChevronLeft />
      </button>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-center text-white/90">
        <p className="text-sm font-medium bg-primary p-2 rounded-sm">Scan the event QR Code to continue</p>
      </div>
    </div>
  );
}
