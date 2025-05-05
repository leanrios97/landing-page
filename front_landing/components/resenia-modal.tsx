"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitResenia } from "@/services/api-service"

// Opciones de servicio que coinciden exactamente con SERVICIO_CHOICES del backend
const SERVICIO_OPTIONS = [
  { value: "automatizacion", label: "Automatizaciones" },
  { value: "ciencia", label: "Ciencia de Datos" },
  { value: "backend", label: "Desarrollo Backend" },
  { value: "analisis", label: "Análisis de Datos" },
  { value: "ingenieria", label: "Ingeniería de Datos" },
  { value: "trabajo", label: "Trabajamos juntos" },
]

interface ReseniaModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReseniaModal({ isOpen, onClose }: ReseniaModalProps) {
  const [calificacion, setCalificacion] = useState(5)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    posicion: "",
    empresa: "",
    servicio: "",
    resenia: "",
    linkedin: "", 
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const reseniaData = {
        ...formData,
        calificacion, // Usamos calificacion en lugar de rating para coincidir con el modelo
      }

      const result = await submitResenia(reseniaData)

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage("¡Gracias por compartir tu experiencia! Tu reseña ha sido enviada correctamente.")

        // Resetear el formulario después de un envío exitoso
        setTimeout(() => {
          setFormData({
            nombre: "",
            posicion: "",
            empresa: "",
            servicio: "",
            resenia: "",
            linkedin: "",
          })
          setCalificacion(5)
          onClose()
        }, 2000)
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Hubo un error al enviar tu reseña. Por favor, intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error al enviar la reseña:", error)
      setSubmitStatus("error")
      setStatusMessage("Hubo un error al enviar tu reseña. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Comparte tu experiencia</DialogTitle>
          <DialogDescription>
            Tu opinión es muy valiosa. Comparte tu experiencia trabajando conmigo para ayudar a otros a conocer mis
            servicios.
          </DialogDescription>
        </DialogHeader>

        {submitStatus && (
          <Alert
            className={`mb-4 ${
              submitStatus === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={submitStatus === "success" ? "text-green-700" : "text-red-700"}>
              {statusMessage}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="posicion">Cargo</Label>
              <Input
                id="posicion"
                name="posicion"
                value={formData.posicion}
                onChange={handleChange}
                placeholder="Tu cargo"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                placeholder="Nombre de la empresa"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://www.linkedin.com/in/tu-perfil"
              className="border-gray-300 focus-visible:ring-[#00B8D9]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servicio">Servicio contratado</Label>
            <Select value={formData.servicio} onValueChange={(value) => handleSelectChange("servicio", value)}>
              <SelectTrigger id="servicio">
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {SERVICIO_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Calificación</Label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCalificacion(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || calificacion) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resenia">Tu reseña</Label>
            <Textarea
              id="resenia"
              name="resenia"
              value={formData.resenia}
              onChange={handleChange}
              placeholder="Comparte tu experiencia trabajando conmigo..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#00B8D9] hover:bg-[#00B8D9]/80 w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar reseña"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
