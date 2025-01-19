import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Shield } from "lucide-react";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "../components/navbar";

export const metadata: Metadata = {
  title: "TitanCheck",
  description: "Agentic identity verification",
  icons: [
    {
      rel: "icon",
      url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>"
    }
  ]
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
