import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useId, useState } from 'react';

function useQrCodeScanner() {
  const [isRunning, setIsRunning] = useState(false);
  const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);
  const [decodedResult, setDecodedResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const readerId = useId();
  
  useEffect(() => {
    const instance = new Html5Qrcode(readerId);
    setQrScanner(instance);
  }, []);

  useEffect(() => {
    if (!qrScanner) return;
    startScanner();

    return () => {
      qrScanner
        .stop()
        .catch(() => {})
        .finally(() => {
          try {
            qrScanner.clear();
          } catch {}
        });
    };
  }, [qrScanner]);

  const startScanner = async () => {
    if (!qrScanner) return;

    try {
      if (!isSecureContext) {
        throw new Error(
          "Camera access requires HTTPS (or localhost over HTTP)."
        );
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera streaming not supported by this browser.");
      }

      const cameras = await Html5Qrcode.getCameras();
      if (!cameras || cameras.length === 0) {
        throw new Error("No camera device found.");
      }

      await qrScanner.start(
        { facingMode: "environment" },
        { fps: 10 },
        async (decoded) => {
          setDecodedResult(decoded);
        },
        () => {}
      );
      setIsRunning(true);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    decodedResult,
    readerId,
    error
  }
}

export default useQrCodeScanner