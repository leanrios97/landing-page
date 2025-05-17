import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import PageVisitTracker from "@/components/page-visit-tracker"
import ChatWidget from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Leandro Ríos | Data Scientist & Backend Developer",
  description: "Especialista en automatización, ciencia de datos y desarrollo backend",
  icons: {
    icon: "/icono-pag.ico",
    shortcut: "/icono-pag.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>
        {children}
        <PageVisitTracker />
        <ChatWidget />
      </body>
    </html>
  )
}

