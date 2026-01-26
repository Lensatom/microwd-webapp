import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

function useQrCodeScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [decodedResult, setDecodedResult] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const readerId = "qr-reader";

  useEffect(() => {
    if (!isSecureContext) {
      setError("Camera access requires HTTPS or localhost.");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera streaming not supported.");
      return;
    }

    const el = document.getElementById(readerId);
    if (!el) return;

    scannerRef.current = new Html5Qrcode(readerId);

    const start = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (!cameras.length) throw new Error("No camera found");

        await scannerRef.current!.start(
          { facingMode: "environment" },
          { fps: 15 },
          (decodedText) => {
            if (decodedText === decodedResult) return;
            setDecodedResult(decodedText);
          },
          () => {}
        );

        setIsRunning(true);
      } catch (e: any) {
        setError(e.message ?? "Failed to start scanner");
      }
    };

    start();

    return () => {
      const scanner = scannerRef.current;
      if (!scanner) return;

      const state = scanner.getState();

      if (state === Html5QrcodeScannerState.SCANNING) {
        scanner
          .stop()
          .catch(() => {})
          .finally(() => {
            scanner.clear();
            scannerRef.current = null;
          });
      }
    };
  }, []);

  return {
    readerId,
    decodedResult,
    isRunning,
    error,
  };
}

export default useQrCodeScanner;