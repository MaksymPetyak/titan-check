import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "../components/navbar";

export const metadata: Metadata = {
  title: "TitanCheck",
  description: "Agentic identity verification",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${GeistSans.variable}`}>
      <body className="h-full">
        <TRPCReactProvider>
          <div className="flex flex-col h-full">
            <Navbar />
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
