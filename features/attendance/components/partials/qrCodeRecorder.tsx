"use client";

import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QRCodeRecorder() {
  const [attendanceToken, setAttendanceToken] = useState("");
  const [error, setError] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);

  useEffect(() => {
    const instance = new Html5Qrcode("reader");
    setQrScanner(instance);

    return () => {
      instance
        .stop()
        .catch(() => {})
        .finally(() => {
          // Ensure DOM cleanup for the container
          try {
            instance.clear();
          } catch {
            // ignore
          }
        });
    };
  }, []);

  const startScanner = async () => {
    if (!qrScanner) return;

    try {
      // Basic capability checks
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
        (decoded) => {
          setAttendanceToken(decoded);
          setError("");
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

  const stopScanner = async () => {
    if (!qrScanner) return;
    try {
      await qrScanner.stop();
      setIsRunning(false);
    } catch {
      // ignore
    }
  };

  const onFileSelected = async (file?: File) => {
    if (!qrScanner || !file) return;
    try {
      const result = await qrScanner.scanFileV2(file, true);
      setAttendanceToken(result.decodedText);
      setError("");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        {!isRunning ? (
          <button onClick={startScanner}>Start Scanner</button>
        ) : (
          <button onClick={stopScanner}>Stop Scanner</button>
        )}
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span>Scan from image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileSelected(e.target.files?.[0])}
          />
        </label>
      </div>

      <div id="reader" style={{ width: "100%" }} />

      {error && (
        <p style={{ color: "#b00020", marginTop: 8 }}>
          {error} {error.includes("HTTPS") ? " If you're not on HTTPS, switch to a secure origin or use localhost." : ""}
        </p>
      )}
      <p style={{ marginTop: 8 }}>Scanned Token: {attendanceToken || "—"}</p>
    </>
  );
}
