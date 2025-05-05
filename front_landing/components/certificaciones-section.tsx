"use client"

import { useState, useEffect } from "react"
import { Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getCertificaciones } from "@/services/api-service"
import Link from "next/link"

interface Certificacion {
  id: number
  nombre: string
  plataforma: string
  descripcion: string
  año: number
  link: string
}

// Mapeo de plataformas a colores
const PLATAFORMA_COLORS: Record<string, string> = {
  coursera: "#00B8D9",
  udemy: "#FF5630",
  datacamp: "#36B37E",
  platzi: "#6554C0",
  linkedin: "#0077B5",
}

export default function CertificacionesSection() {
  const [certificaciones, setCertificaciones] = useState<Certificacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCertificaciones() {
      try {
        setLoading(true)
        const result = await getCertificaciones()

        if (result.success && result.data) {
          setCertificaciones(result.data)
        } else {
          setError("No se pudieron cargar las certificaciones")
          setCertificaciones([])
        }
      } catch (err) {
        console.error("Error al cargar certificaciones:", err)
        setError("No se pudieron cargar las certificaciones")
        setCertificaciones([])
      } finally {
        setLoading(false)
      }
    }

    fetchCertificaciones()
  }, [])

  // Obtener el color correspondiente a la plataforma
  const getPlataformaColor = (plataforma: string): string => {
    return PLATAFORMA_COLORS[plataforma.toLowerCase()] || "#00B8D9"
  }

  // Formatear el nombre de la plataforma (primera letra en mayúscula)
  const formatPlataforma = (plataforma: string): string => {
    return plataforma.charAt(0).toUpperCase() + plataforma.slice(1)
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Award className="h-6 w-6 text-[#00B8D9] mr-2" />
        <h3 className="text-2xl font-bold">Certificaciones</h3>
      </div>

      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        // Esqueletos de carga
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-none shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : certificaciones.length > 0 ? (
        // Lista de certificaciones con scroll
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {certificaciones.map((cert) => (
            <Card key={cert.id} className="border-none shadow hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{cert.nombre}</h4>
                  <Badge variant="outline" className="text-xs font-normal">
                    {cert.año}
                  </Badge>
                </div>
                <p className="text-sm font-medium mt-1" style={{ color: getPlataformaColor(cert.plataforma) }}>
                  {formatPlataforma(cert.plataforma)}
                </p>
                <p className="text-sm text-gray-600 mt-2">{cert.descripcion}</p>
                {cert.link && (
                  <div className="mt-3">
                    <Link
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00B8D9] hover:underline"
                    >
                      Ver certificado
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Mensaje cuando no hay certificaciones
        <Card className="border-none shadow">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No hay certificaciones disponibles</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
