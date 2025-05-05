"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin, Check, AlertCircle, Twitter, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitContactForm } from "@/services/api-service"

// Tipos de servicios ofrecidos
const servicios = [
  { id: "automatizacion", nombre: "Automatizaciones" },
  { id: "ciencia", nombre: "Ciencia de Datos" },
  { id: "backend", nombre: "Desarrollo Backend" },
  { id: "analisis", nombre: "Análisis de Datos" },
  { id: "ingenieria", nombre: "Ingenieria de Datos" },
]

// Motivos de contacto
const motivos = [
  { id: "consulta", nombre: "Consulta general" },
  { id: "presupuesto", nombre: "Solicitud de presupuesto" },
  { id: "colaboracion", nombre: "Propuesta de colaboración" },
  { id: "laboral", nombre: "Oportunidad laboral" },
  { id: "otro", nombre: "Otro motivo" },
]

interface FormData {
  nombre: string
  email: string
  telefono: string
  motivo: string
  servicio: string
  mensaje: string
  ubicacion: {
    latitud: number | null
    longitud: number | null
  }
}

interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
  motivo?: string
  servicio?: string
  mensaje?: string
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "",
    servicio: "",
    mensaje: "",
    ubicacion: {
      latitud: null,
      longitud: null,
    },
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [statusMessage, setStatusMessage] = useState("")

  // Obtener la ubicación del usuario cuando el componente se monta
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            ubicacion: {
              latitud: position.coords.latitude,
              longitud: position.coords.longitude,
            },
          }))
        },
        (error) => {
          console.log("Error obteniendo la ubicación:", error.message)
        },
      )
    }
  }, [])

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }

    if (!formData.motivo) {
      newErrors.motivo = "Selecciona un motivo de contacto"
    }

    if (!formData.servicio) {
      newErrors.servicio = "Selecciona un servicio"
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const result = await submitContactForm({
        ...formData,
        ubicacion: formData.ubicacion.latitud
          ? `${formData.ubicacion.latitud}, ${formData.ubicacion.longitud}`
          : "No disponible",
      })

      if (result.success) {
        setSubmitStatus("success")
        setStatusMessage("¡Mensaje enviado con éxito! Te contactaré pronto.")

        // Resetear el formulario
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          motivo: "",
          servicio: "",
          mensaje: "",
          ubicacion: formData.ubicacion, // Mantenemos la ubicación
        })
      } else {
        setSubmitStatus("error")
        setStatusMessage(result.message || "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setStatusMessage("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6">Envíame un Mensaje</h3>

          {submitStatus && (
            <Alert
              className={`mb-6 ${
                submitStatus === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              {submitStatus === "success" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle className={submitStatus === "success" ? "text-green-800" : "text-red-800"}>
                {submitStatus === "success" ? "Éxito" : "Error"}
              </AlertTitle>
              <AlertDescription className={submitStatus === "success" ? "text-green-700" : "text-red-700"}>
                {statusMessage}
              </AlertDescription>
            </Alert>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre" className={errors.nombre ? "text-red-500" : ""}>
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={`border-gray-300 focus-visible:ring-[#00B8D9] ${errors.nombre ? "border-red-500" : ""}`}
                />
                {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Tu email"
                  className={`border-gray-300 focus-visible:ring-[#00B8D9] ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono" className={errors.telefono ? "text-red-500" : ""}>
                Teléfono
              </Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                type="tel"
                placeholder="Tu número de teléfono"
                className={`border-gray-300 focus-visible:ring-[#00B8D9] ${errors.telefono ? "border-red-500" : ""}`}
              />
              {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motivo" className={errors.motivo ? "text-red-500" : ""}>
                  Motivo de contacto
                </Label>
                <Select value={formData.motivo} onValueChange={(value) => handleSelectChange("motivo", value)}>
                  <SelectTrigger
                    id="motivo"
                    className={`border-gray-300 focus:ring-[#00B8D9] ${errors.motivo ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona un motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {motivos.map((motivo) => (
                      <SelectItem key={motivo.id} value={motivo.id}>
                        {motivo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.motivo && <p className="text-xs text-red-500">{errors.motivo}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="servicio" className={errors.servicio ? "text-red-500" : ""}>
                  Servicio de interés
                </Label>
                <Select value={formData.servicio} onValueChange={(value) => handleSelectChange("servicio", value)}>
                  <SelectTrigger
                    id="servicio"
                    className={`border-gray-300 focus:ring-[#00B8D9] ${errors.servicio ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Selecciona un servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {servicios.map((servicio) => (
                      <SelectItem key={servicio.id} value={servicio.id}>
                        {servicio.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.servicio && <p className="text-xs text-red-500">{errors.servicio}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje" className={errors.mensaje ? "text-red-500" : ""}>
                Mensaje
              </Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Cuéntame más sobre tu proyecto o consulta"
                className={`min-h-[120px] border-gray-300 focus-visible:ring-[#00B8D9] ${
                  errors.mensaje ? "border-red-500" : ""
                }`}
              />
              {errors.mensaje && <p className="text-xs text-red-500">{errors.mensaje}</p>}
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-4">
              <MapPin className="h-3 w-3 mr-1" />
              {formData.ubicacion.latitud
                ? "Tu ubicación será compartida para una mejor asistencia"
                : "Ubicación no disponible"}
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-6">Información de Contacto</h3>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mr-4">
              <Mail className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="text-[#0A192F] mt-1">
                <a href="mailto:rios.leandro.data@gmail.com" className="hover:text-[#00B8D9]">
                  rios.leandro.data@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mr-4">
              <Phone className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Teléfono</h4>
              <p className="text-[#0A192F] mt-1">
                <a href="tel:+5493513373826" className="hover:text-[#00B8D9]">
                  +54 9 351 337-3826
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mr-4">
              <MessageSquare className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">WhatsApp</h4>
              <p className="text-[#0A192F] mt-1">
                <a
                  href="https://wa.me/5493513373826?text=Hola%20Leandro,%20vi%20tu%20portfolio%20y%20me%20gustaría%20contactarte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00B8D9]"
                >
                  Enviar mensaje por WhatsApp
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-[#00B8D9]/10 flex items-center justify-center mr-4">
              <MapPin className="h-5 w-5 text-[#00B8D9]" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Ubicación</h4>
              <p className="text-[#0A192F] mt-1">Córdoba, Argentina</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4">Conectemos</h3>
          <p className="text-gray-600 mb-6">Sígueme en redes sociales o revisa mi trabajo en GitHub</p>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/leanrios97"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#00B8D9] transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/leandro-agustin-rios-38a1911a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#00B8D9] transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/Leanriosdata"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#00B8D9] transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:rios.leandro.data@gmail.com"
              className="h-10 w-10 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#00B8D9] transition-colors"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
