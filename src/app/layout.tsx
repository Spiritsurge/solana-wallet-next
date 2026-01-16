import type { Metadata } from "next";
import SolanaProviders from "./providers";

export const metadata: Metadata = {
  title: "Solana Wallet Connect Demo",
  description: "Next.js + TS + Solana wallet adapter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
