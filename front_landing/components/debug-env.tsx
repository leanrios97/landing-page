"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug } from "lucide-react"

export default function DebugEnv() {
  const [showDebug, setShowDebug] = useState(false)

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
          onClick={() => setShowDebug(true)}
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96">
      <Card>
        <CardHeader className="bg-gray-100 py-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Variables de Entorno</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowDebug(false)}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 text-xs">
          <div className="space-y-2">
            <div>
              <strong>NEXT_PUBLIC_URL_BACK:</strong>{" "}
              <code className="bg-gray-100 p-1 rounded">{process.env.NEXT_PUBLIC_URL_BACK || "No definido"}</code>
            </div>
            <div>
              <strong>NEXT_PUBLIC_CLIENT_SECRET:</strong>{" "}
              <code className="bg-gray-100 p-1 rounded">
                {process.env.NEXT_PUBLIC_CLIENT_SECRET
                  ? `${process.env.NEXT_PUBLIC_CLIENT_SECRET.substring(0, 5)}...`
                  : "No definido"}
              </code>
            </div>
            <div className="pt-2">
              <strong>URL completa para reseñas:</strong>{" "}
              <code className="bg-gray-100 p-1 rounded break-all">
                {`${process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/"}resenias/`}
              </code>
            </div>
            <div>
              <strong>URL completa para contacto:</strong>{" "}
              <code className="bg-gray-100 p-1 rounded break-all">
                {`${process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/"}contacto/`}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
