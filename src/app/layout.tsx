import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Providers from "@/app/providers/Providers";
import { cn } from "@/lib/utils"

import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata = {
  title: 'Arena Experience',
  description: ''
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Providers>
          <Toaster richColors position="top-right" />
          <div className={fontSans.className}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
