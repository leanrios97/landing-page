"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Star, Plus } from "lucide-react"
import TestimonialModal from "@/components/testimonial-modal"
import { getReviews } from "@/services/api-service"
import { Skeleton } from "@/components/ui/skeleton"

interface Testimonial {
  id: number
  name: string
  position: string
  company?: string
  avatar?: string
  rating: number
  text: string
  service: string
}

export default function TestimonialsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true)
        const result = await getReviews()

        if (result.success && result.data) {
          setTestimonials(result.data)
        } else {
          // Si no hay reseñas o hay un error, establecemos un array vacío
          setTestimonials([])
        }
      } catch (err) {
        console.error("Error al cargar testimonios:", err)
        setError("No se pudieron cargar los testimonios")
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Siempre mostramos la sección, incluso si no hay testimonios
  return (
    <section className="py-20 bg-[#F8FAFC] text-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Testimonios</Badge>
          <h2 className="text-3xl font-bold mb-4">Lo Que Dicen Mis Clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {testimonials.length > 0
              ? "Experiencias reales de clientes que han confiado en mis servicios para resolver sus desafíos tecnológicos"
              : "Sé el primero en compartir tu experiencia trabajando conmigo"}
          </p>
        </div>

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
        ) : error ? (
          <div className="text-center text-red-500 mb-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              // Mostrar testimonios existentes
              testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4 border-2 border-[#00B8D9]">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-[#0A192F]">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">
                            {testimonial.position}
                            {testimonial.company && `, ${testimonial.company}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-[#00B8D9]/10 text-[#00B8D9] border-[#00B8D9]/30">
                        {testimonial.service}
                      </Badge>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <div className="relative">
                      <Quote className="absolute top-0 left-0 h-6 w-6 text-[#00B8D9]/20 -translate-x-2 -translate-y-2" />
                      <p className="text-gray-700 italic pl-4">{testimonial.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Mensaje cuando no hay testimonios
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center">
                <Card className="border-none shadow-lg p-8 bg-[#00B8D9]/5">
                  <CardContent className="flex flex-col items-center">
                    <Quote className="h-12 w-12 text-[#00B8D9]/30 mb-4" />
                    <h3 className="text-xl font-medium mb-2">Aún no hay comentarios</h3>
                    <p className="text-gray-600 mb-6">
                      Sé el primero en compartir tu experiencia trabajando conmigo. Tu opinión es muy valiosa.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tarjeta para añadir un nuevo testimonio - siempre visible */}
            <Card
              className={`border-dashed border-2 border-gray-300 bg-transparent shadow-none hover:border-[#00B8D9] transition-colors cursor-pointer flex items-center justify-center ${
                testimonials.length === 0 ? "col-span-1 md:col-span-2 lg:col-span-3 mx-auto max-w-md w-full" : ""
              }`}
              onClick={() => setIsModalOpen(true)}
            >
              <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                <div className="h-16 w-16 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-[#00B8D9]" />
                </div>
                <h3 className="font-medium text-[#0A192F] mb-2">Comparte tu experiencia</h3>
                <p className="text-sm text-gray-500 mb-4">¿Has trabajado conmigo? Me encantaría conocer tu opinión.</p>
                <Button
                  variant="outline"
                  className="border-[#00B8D9] text-[#00B8D9] hover:bg-[#00B8D9]/10"
                  onClick={() => setIsModalOpen(true)}
                >
                  Añadir comentario
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <TestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
