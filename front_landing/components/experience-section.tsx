"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

// Datos de experiencia laboral (ahora en orden cronológico)
const experiences = [
  {
    title: "Implementación de sistemas",
    company: "Encode SA",
    period: "Marzo 2020 - Mayo 2023",
    startDate: "2020-03",
    endDate: "2023-05",
    responsibilities: [
      "Implementación de nuevos sistemas a clientes, asegurando una transición ordenada, configuración y optimización de procesos.",
      "Capacitación y soporte a los clientes, brindando formación, corrigiendo datos erróneos y proponiendo mejoras.",
      "Análisis de requerimientos, documentando necesidades y oportunidades de mejora sugeridas por clientes.",
      "Elaboración de documentación, creando y actualizando manuales de usuario con mejores prácticas.",
      "Gestión de incidencias en GitLab, reportando bugs y colaborando en su resolución.",
      "Coordinación y comunicación entre áreas, organizando tareas y facilitando el trabajo en equipo.",
    ],
  },
  {
    title: "Data Analytics | Python Developer",
    company: "Encode SA",
    period: "Mayo 2023 - Noviembre 2024",
    startDate: "2023-05",
    endDate: "2024-11",
    responsibilities: [
      "Desarrollo y mantenimiento de tableros de datos para visualización de métricas y toma de decisiones.",
      "Ajuste de modelos de machine learning, optimizando su rendimiento según los datos.",
      "Gestión de bases de datos relacionales y no relacionales, asegurando su disponibilidad y calidad.",
      "Trabajo con metodologías ágiles (Scrum y Kanban), usando Jira para la planificación y seguimiento.",
    ],
  },
  {
    title: "Python Backend",
    company: "Rapihogar",
    period: "Noviembre 2024 - Febrero 2025",
    startDate: "2024-11",
    endDate: "2025-02",
    responsibilities: [
      "Mantenimiento de API REST productiva, asegurando su estabilidad y rendimiento.",
      "Mejora de funcionalidades, optimizando y ampliando las capacidades del sistema según los requerimientos.",
      "Reestructuración de código, aplicando buenas prácticas para mejorar su eficiencia y mantenibilidad.",
      "Resolución de problemas para el equipo de operaciones, analizando requerimientos e implementando mejoras.",
    ],
  },
]

export default function ExperienceSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white text-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Trayectoria</Badge>
          <h2 className="text-3xl font-bold mb-4">Experiencia profesional</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mi recorrido profesional en el campo de la tecnología y análisis de datos
          </p>
        </div>

        {/* Línea de tiempo horizontal */}
        <div className="relative max-w-6xl mx-auto mb-20">
          {/* Contenedor con scroll horizontal en móviles */}
          <div className="overflow-x-auto pb-10">
            <div className="flex flex-col">
              {/* Línea horizontal con períodos coloreados */}
              <div className="relative">
                {/* Línea base */}
                <div className="absolute left-0 right-0 h-1 bg-gray-200 top-6"></div>

                {/* Segmentos coloreados para cada período */}
                <div className="flex justify-between min-w-[768px] md:min-w-0">
                  {experiences.map((exp, index) => {
                    // Calculamos el ancho proporcional de cada segmento
                    const width = index === 0 ? "33%" : index === 1 ? "33%" : "34%"
                    return (
                      <div
                        key={`segment-${index}`}
                        className={`h-1 absolute top-6 z-0 transition-all duration-300 ${
                          hoveredCard === index ? "bg-[#00B8D9]" : "bg-[#00B8D9]/30"
                        }`}
                        style={{
                          left: `${index * 33}%`,
                          width: width,
                        }}
                      ></div>
                    )
                  })}
                </div>

                {/* Puntos y fechas en la línea */}
                <div className="flex justify-between min-w-[768px] md:min-w-0">
                  {experiences.map((exp, index) => (
                    <div
                      key={`point-${index}`}
                      className="relative flex flex-col items-center"
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-4 border-white shadow-md z-10 transition-all duration-300 ${
                          hoveredCard === index ? "bg-[#00B8D9] scale-125" : "bg-[#00B8D9]/70"
                        }`}
                      ></div>
                      <div
                        className={`mt-4 text-sm font-medium transition-all duration-300 ${
                          hoveredCard === index ? "text-[#00B8D9] font-bold" : "text-[#0A192F]"
                        }`}
                      >
                        {exp.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tarjetas de experiencia */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {experiences.map((exp, index) => (
                  <Card
                    key={`card-${index}`}
                    className={`border-none shadow-lg overflow-hidden h-full transition-all duration-300 ${
                      hoveredCard === index ? "shadow-2xl scale-105 border-2 border-[#00B8D9]/30" : "hover:shadow-xl"
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Barra de color en la parte superior */}
                    <div
                      className={`h-2 transition-all duration-300 ${
                        hoveredCard === index ? "bg-[#00B8D9]" : "bg-[#00B8D9]/70"
                      }`}
                    ></div>
                    <CardHeader className="pb-2 pt-6">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <div className="flex items-center text-[#00B8D9] text-sm font-medium mt-1">
                        <Building2 className="h-4 w-4 mr-1" />
                        {exp.company}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
