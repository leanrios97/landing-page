"use client"

import { useEffect, useState } from "react"
import { registerPageVisit } from "@/services/api-service"

export default function PageVisitTracker() {
  const [registered, setRegistered] = useState(false)

  useEffect(() => {
    // Registrar la visita solo una vez al cargar la página
    if (!registered) {
      const registerVisit = async () => {
        try {
          await registerPageVisit()
          setRegistered(true)
          console.log("Visita registrada correctamente")
        } catch (error) {
          console.error("Error al registrar visita:", error)
        }
      }

      // Pequeño retraso para asegurar que la página se ha cargado completamente
      const timer = setTimeout(() => {
        registerVisit()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [registered])

  // Este componente no renderiza nada visible
  return null
}
