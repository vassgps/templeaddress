import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ToastConfig from "./toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Temple Address",
  description: "Temple Address",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastConfig />
        {children}
      </body>
    </html>
  );
}
