"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getFrases } from "@/services/api-service"

// Frases de respaldo en caso de error o mientras se cargan los datos
const fallbackQuotes = [
  {
    frase:
      "Los analfabetos del siglo XXI no serán aquellos que no sepan leer y escribir, sino aquellos que no puedan aprender, desaprender y reaprender.",
    autor: "Alvin Toffler",
  },
  {
    frase:
      "Si no estás dispuesto a aprender, nadie podrá ayudarte. Si estás decidido a aprender, nadie podrá detenerte.",
    autor: "Zig Ziglar",
  },
  {
    frase:
      "Quien deja de aprender es viejo, ya sea a los veinte o a los ochenta. Quien sigue aprendiendo se mantiene joven.",
    autor: "Henry Ford",
  },
  {
    frase: "Lo importante no es dejar de cuestionar. La curiosidad tiene su propia razón de existir.",
    autor: "Albert Einstein",
  },
]

interface Frase {
  id?: number
  frase: string
  autor: string
  creado_en?: string
}

export default function QuotesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [quotes, setQuotes] = useState<Frase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Cargar frases desde la API
  useEffect(() => {
    async function loadFrases() {
      try {
        setLoading(true)
        const result = await getFrases()

        if (result.success && result.data && result.data.length > 0) {
          setQuotes(result.data)
        } else {
          // Si hay un error o no hay datos, usamos las frases de respaldo
          console.log("Usando frases de respaldo debido a error o datos vacíos")
          setQuotes(fallbackQuotes)
          setError(true)
        }
      } catch (err) {
        console.error("Error al cargar frases:", err)
        setQuotes(fallbackQuotes)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadFrases()
  }, [])

  // Autoplay para cambiar automáticamente las citas
  useEffect(() => {
    if (quotes.length === 0) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % quotes.length)
    }, 8000) // Cambiar cada 8 segundos

    return () => clearInterval(interval)
  }, [quotes.length])

  const nextQuote = () => {
    if (quotes.length === 0) return
    setActiveIndex((current) => (current + 1) % quotes.length)
  }

  const prevQuote = () => {
    if (quotes.length === 0) return
    setActiveIndex((current) => (current - 1 + quotes.length) % quotes.length)
  }

  // Si está cargando, mostrar esqueletos
  if (loading) {
    return (
      <div className="relative py-12 bg-[#0A192F] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-6 text-center">
                <Skeleton className="h-12 w-12 mx-auto mb-6 bg-[#00B8D9]/20 rounded-full" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-4 bg-white/20" />
                <Skeleton className="h-6 w-2/3 mx-auto mb-4 bg-white/20" />
                <Skeleton className="h-4 w-32 mx-auto bg-[#00B8D9]/20" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Si no hay frases (incluso después de intentar usar las de respaldo), no mostrar nada
  if (quotes.length === 0) {
    return null
  }

  return (
    <div className="relative py-12 bg-[#0A192F] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 hidden md:flex"
            onClick={prevQuote}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Anterior cita</span>
          </Button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {quotes.map((quote, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Card className="border-none bg-transparent shadow-none">
                    <CardContent className="p-6 text-center">
                      <Quote className="h-12 w-12 mx-auto mb-6 text-[#00B8D9]/50" />
                      <p className="text-xl md:text-2xl font-light italic mb-6 leading-relaxed text-white">
                        "{quote.frase}"
                      </p>
                      <p className="text-[#00B8D9] font-medium text-[#00B8D9]">— {quote.autor}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 hidden md:flex"
            onClick={nextQuote}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Siguiente cita</span>
          </Button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-[#00B8D9]" : "bg-white/30"
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ir a cita ${index + 1}`}
            />
          ))}
        </div>

        {/* Mensaje de error discreto si estamos usando frases de respaldo */}
        {error && (
          <p className="text-xs text-center mt-4 text-white/30">
            Usando frases predeterminadas. No se pudieron cargar las frases desde el servidor.
          </p>
        )}
      </div>
    </div>
  )
}
