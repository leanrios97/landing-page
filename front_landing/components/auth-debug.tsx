"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthDebug() {
  const [showDebug, setShowDebug] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const testAuth = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/"
      const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

      // Preparamos los headers con múltiples formatos de autenticación
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      if (clientSecret) {
        headers["Authorization"] = `Bearer ${clientSecret}`
        headers["X-Client-Secret"] = clientSecret
        headers["Client-Secret"] = clientSecret
      }

      const response = await fetch(`${apiUrl}`, {
        method: "GET",
        headers,
      })

      if (response.ok) {
        setTestResult({
          success: true,
          message: "Conexión exitosa con la API. La autenticación parece estar funcionando.",
        })
      } else {
        const errorText = await response.text()
        setTestResult({
          success: false,
          message: `Error ${response.status}: ${errorText}`,
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Error desconocido al probar la autenticación",
      })
    }
  }

  if (!showDebug) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-amber-600 text-white hover:bg-amber-700 border-amber-700"
          onClick={() => setShowDebug(true)}
        >
          <Shield className="h-4 w-4 mr-2" />
          Auth Debug
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-96">
      <Card>
        <CardHeader className="bg-amber-100 py-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">Depuración de Autenticación</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowDebug(false)}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 text-xs">
          <div className="space-y-4">
            <div>
              <strong>Client Secret:</strong>{" "}
              <code className="bg-gray-100 p-1 rounded">
                {process.env.NEXT_PUBLIC_CLIENT_SECRET
                  ? `${process.env.NEXT_PUBLIC_CLIENT_SECRET.substring(0, 5)}...`
                  : "No definido"}
              </code>
            </div>

            <div className="space-y-2">
              <p>Headers de autenticación enviados:</p>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {`Authorization: Bearer ${process.env.NEXT_PUBLIC_CLIENT_SECRET || "undefined"}
X-Client-Secret: ${process.env.NEXT_PUBLIC_CLIENT_SECRET || "undefined"}
Client-Secret: ${process.env.NEXT_PUBLIC_CLIENT_SECRET || "undefined"}`}
              </pre>
            </div>

            <Button size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white" onClick={testAuth}>
              Probar Autenticación
            </Button>

            {testResult && (
              <Alert
                className={`mt-2 ${testResult.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                {testResult.success ? (
                  <Shield className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <AlertTitle className={testResult.success ? "text-green-800" : "text-red-800"}>
                  {testResult.success ? "Éxito" : "Error"}
                </AlertTitle>
                <AlertDescription className={testResult.success ? "text-green-700" : "text-red-700"}>
                  {testResult.message}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
