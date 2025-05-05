"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star, Plus, ChevronLeft, ChevronRight, Linkedin } from "lucide-react"
import ReseniaModal from "@/components/resenia-modal"
import { getResenias } from "@/services/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

// Mapeo de valores de servicio a etiquetas
const SERVICIO_LABELS: Record<string, string> = {
  automatizacion: "Automatizaciones",
  ciencia: "Ciencia de Datos",
  backend: "Desarrollo Backend",
  analisis: "Análisis de Datos",
  ingenieria: "Ingeniería de Datos",
}

interface Resenia {
  id: number
  nombre: string
  posicion: string
  empresa: string
  avatar?: string
  calificacion: number
  resenia: string
  servicio: string
  creado_en: string
  linkedin?: string
}

interface PaginationInfo {
  count: number
  next: string | null
  previous: string | null
}

export default function ReseniasSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [resenias, setResenias] = useState<Resenia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo>({
    count: 0,
    next: null,
    previous: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 5

  useEffect(() => {
    async function fetchResenias() {
      try {
        setLoading(true)
        console.log("Iniciando carga de reseñas...")
        const offset = (currentPage - 1) * limit
        const result = await getResenias(limit, offset)
        console.log("Resultado de getResenias:", result)

        if (result.success && result.data) {
          setResenias(result.data)
          setPagination({
            count: result.count || 0,
            next: result.next,
            previous: result.previous,
          })
          setTotalPages(Math.ceil((result.count || 0) / limit))
        } else {
          // Si hay un error específico, lo mostramos
          if (result.error) {
            setError(result.error)
          } else {
            setError("No se pudieron cargar las reseñas")
          }
          setResenias([])
        }
      } catch (err) {
        console.error("Error al cargar reseñas:", err)
        setError("No se pudieron cargar las reseñas")
        setResenias([])
      } finally {
        setLoading(false)
      }
    }

    fetchResenias()
  }, [currentPage])

  const handleNextPage = () => {
    if (pagination.next) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (pagination.previous) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Siempre mostramos la sección, incluso si no hay reseñas
  return (
    <section className="py-20 bg-[#F8FAFC] text-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Reseñas</Badge>
          <h2 className="text-3xl font-bold mb-4">Lo que dicen de mí</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {resenias.length > 0 || pagination.count > 0
              ? "Experiencias reales de clientes que han confiado en mis servicios para resolver sus desafíos tecnológicos"
              : "Sé el primero en compartir tu experiencia trabajando conmigo"}
          </p>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-8">
            <p>{error}</p>
            <p className="text-sm mt-2">Verifica la conexión con el backend y las variables de entorno.</p>
          </div>
        )}

        {loading ? (
          // Esqueletos de carga
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center">
                      <Skeleton className="h-12 w-12 rounded-full mr-4" />
                      <div>
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resenias.length > 0 ? (
                // Mostrar reseñas existentes
                resenias.map((resenia) => (
                  <Card key={resenia.id} className="border-none shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium text-[#0A192F]">{resenia.nombre}</h3>
                            {resenia.linkedin && (
                              <Link
                                href={resenia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-[#0077B5] hover:text-[#0077B5]/80"
                                title="Ver perfil de LinkedIn"
                              >
                                <Linkedin className="h-4 w-4" />
                              </Link>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            {resenia.posicion}
                            {resenia.empresa && `, ${resenia.empresa}`}
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-[#00B8D9]/10 text-[#00B8D9] border-[#00B8D9]/30">
                          {SERVICIO_LABELS[resenia.servicio] || resenia.servicio}
                        </Badge>
                      </div>

                      <div className="flex mb-4">
                        {[...Array(resenia.calificacion)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - resenia.calificacion)].map((_, i) => (
                          <Star key={i + resenia.calificacion} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>

                      <div className="relative">
                        <Quote className="absolute top-0 left-0 h-6 w-6 text-[#00B8D9]/20 -translate-x-2 -translate-y-2" />
                        <p className="text-gray-700 italic pl-4 mb-4">{resenia.resenia}</p>
                        {resenia.creado_en && (
                          <p className="text-xs text-gray-500 text-right">{formatDate(resenia.creado_en)}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Mensaje cuando no hay reseñas
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                  <Card className="border-none shadow-lg p-8 bg-[#00B8D9]/5">
                    <CardContent className="flex flex-col items-center">
                      <Quote className="h-12 w-12 text-[#00B8D9]/30 mb-4" />
                      <h3 className="text-xl font-medium mb-2">Aún no hay reseñas</h3>
                      <p className="text-gray-600 mb-6">
                        Sé el primero en compartir tu experiencia trabajando conmigo. Tu opinión es muy valiosa.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tarjeta para añadir una nueva reseña - siempre visible en la vista principal */}
              <Card
                className={`border-dashed border-2 border-gray-300 bg-transparent shadow-none hover:border-[#00B8D9] transition-colors cursor-pointer flex items-center justify-center ${
                  resenias.length === 0 ? "col-span-1 md:col-span-2 lg:col-span-3 mx-auto max-w-md w-full" : ""
                }`}
                onClick={() => setIsModalOpen(true)}
              >
                <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-[#00B8D9]" />
                  </div>
                  <h3 className="font-medium text-[#0A192F] mb-2">Comparte tu experiencia</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    ¿Has trabajado conmigo? Me encantaría conocer tu opinión.
                  </p>
                  <Button
                    variant="outline"
                    className="border-[#00B8D9] text-[#00B8D9] hover:bg-[#00B8D9]/10"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Añadir reseña
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Paginación */}
            {pagination.count > limit && (
              <div className="flex justify-center items-center mt-12 space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={!pagination.previous}
                  className={!pagination.previous ? "opacity-50 cursor-not-allowed" : ""}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={!pagination.next}
                  className={!pagination.next ? "opacity-50 cursor-not-allowed" : ""}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <ReseniaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
