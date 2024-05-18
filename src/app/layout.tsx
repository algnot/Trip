import { Prompt } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const font = Prompt({ weight: "300", subsets: ["thai", "latin"] });

export const metadata: Metadata = {
  title: "Trip",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
