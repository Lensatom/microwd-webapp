"use client"

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import Loader from "@/shared/components/ui/loader";

type GoogleSignInButtonProps = {
  onCredential: (credential: string) => void;
  clientId?: string;
  className?: string;
};

export default function GoogleSignInButton({ onCredential, clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "917373415110-5tuqtm15lqs3ac49svt3sera30su4ern.apps.googleusercontent.com", className }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const renderedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const initAndRender = () => {
    const google = (window as any).google;
    if (!google?.accounts?.id || !containerRef.current) return;

    if (!initializedRef.current) {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: (response: { credential: string }) => onCredential(response.credential),
        ux_mode: "popup",
      });
      initializedRef.current = true;
    }

    if (!renderedRef.current && containerRef.current) {
      google.accounts.id.renderButton(containerRef.current, {
        theme: "filled_black",
        size: "large",
        text: "continue_with",
        shape: "pill",
        logo_alignment: "center",
      });
      renderedRef.current = true;
      setReady(true);
    }
  };

  useEffect(() => {
    const google = (window as any).google;
    if (google?.accounts?.id) {
      initAndRender();
    }
  }, []);

  return (
    <div className={className}>
      <Script
        id="google-identity-services"
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => {
          initAndRender();
        }}
      />
      <div ref={containerRef} />
      {!ready ? <Loader label="Loading Google…" /> : null}
    </div>
  );
}
