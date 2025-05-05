"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { checkApiAvailability } from "@/services/api-service"

export default function ApiStatus() {
  const [isApiAvailable, setIsApiAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    async function checkApi() {
      setIsChecking(true)
      const available = await checkApiAvailability()
      setIsApiAvailable(available)
      setIsChecking(false)
    }

    checkApi()
  }, [])

  if (isChecking) {
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
        <AlertTitle className="text-blue-800">Verificando conexión</AlertTitle>
        <AlertDescription className="text-blue-700">Comprobando la conexión con el servidor...</AlertDescription>
      </Alert>
    )
  }

  if (isApiAvailable === false) {
    return (
      <Alert className="bg-red-50 border-red-200 mb-4">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Error de conexión</AlertTitle>
        <AlertDescription className="text-red-700">
          No se pudo conectar con el servidor. Por favor, verifica que el servidor esté en ejecución y que las variables
          de entorno estén configuradas correctamente.
        </AlertDescription>
      </Alert>
    )
  }

  return null
}
