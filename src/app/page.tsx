"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMemo, useState } from "react";

export default function HomePage() {
  const { publicKey, connected, signMessage } = useWallet();
  const [signatureBase64, setSignatureBase64] = useState<string>("");

  const address = useMemo(() => publicKey?.toBase58() ?? "", [publicKey]);

  async function onSignMessage() {
    try {
      if (!signMessage) {
        alert("This wallet does not support message signing.");
        return;
      }
      const msg = new TextEncoder().encode("Sign in to My App");
      const sig = await signMessage(msg);
      // Convert signature bytes to base64 for display
      const b64 = btoa(String.fromCharCode(...sig));
      setSignatureBase64(b64);
    } catch (e) {
      console.error(e);
      alert("Signing cancelled or failed.");
    }
  }

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 24,
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Solana Wallet Connect (Next.js + TS)</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Devnet connection. Click connect, then try signing a message.
      </p>

      <div style={{ margin: "18px 0" }}>
        <WalletMultiButton />
      </div>

      {connected ? (
        <div
          style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}
        >
          <div>
            <strong>Connected:</strong> ✅
          </div>
          <div style={{ wordBreak: "break-all", marginTop: 8 }}>
            <strong>Address:</strong> {address}
          </div>

          <button
            onClick={onSignMessage}
            style={{
              marginTop: 14,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            Sign Message
          </button>

          {signatureBase64 ? (
            <div style={{ marginTop: 12, wordBreak: "break-all" }}>
              <strong>Signature (base64):</strong> {signatureBase64}
            </div>
          ) : null}
        </div>
      ) : (
        <div
          style={{ padding: 16, border: "1px solid #eee", borderRadius: 12 }}
        >
          Not connected yet.
        </div>
      )}
    </main>
  );
}
