import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

// Datos de experiencia laboral
const experiences = [
  {
    title: "Python Backend",
    company: "Rapihogar",
    period: "Noviembre 2024 - Febrero 2025",
    responsibilities: [
      "Mantenimiento de API REST productiva, asegurando su estabilidad y rendimiento.",
      "Mejora de funcionalidades, optimizando y ampliando las capacidades del sistema según los requerimientos.",
      "Reestructuración de código, aplicando buenas prácticas para mejorar su eficiencia y mantenibilidad.",
      "Resolución de problemas para el equipo de operaciones, analizando requerimientos e implementando mejoras.",
    ],
  },
  {
    title: "Data Analytics | Python Developer",
    company: "Encode SA",
    period: "Mayo 2023 - Noviembre 2024",
    responsibilities: [
      "Desarrollo y mantenimiento de tableros de datos para visualización de métricas y toma de decisiones.",
      "Ajuste de modelos de machine learning, optimizando su rendimiento según los datos.",
      "Gestión de bases de datos relacionales y no relacionales, asegurando su disponibilidad y calidad.",
      "Trabajo con metodologías ágiles (Scrum y Kanban), usando Jira para la planificación y seguimiento.",
    ],
  },
  {
    title: "Implementación de sistemas",
    company: "Encode SA",
    period: "Marzo 2020 - Mayo 2023",
    responsibilities: [
      "Implementación de nuevos sistemas a clientes, asegurando una transición ordenada, configuración y optimización de procesos.",
      "Capacitación y soporte a los clientes, brindando formación, corrigiendo datos erróneos y proponiendo mejoras.",
      "Análisis de requerimientos, documentando necesidades y oportunidades de mejora sugeridas por clientes.",
      "Elaboración de documentación, creando y actualizando manuales de usuario con mejores prácticas.",
      "Gestión de incidencias en GitLab, reportando bugs y colaborando en su resolución.",
      "Coordinación y comunicación entre áreas, organizando tareas y facilitando el trabajo en equipo.",
    ],
  },
]

export default function ExperienceSection() {
  return (
    <section className="py-20 bg-white text-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Trayectoria</Badge>
          <h2 className="text-3xl font-bold mb-4">Experiencia Profesional</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mi recorrido profesional en el campo de la tecnología y análisis de datos
          </p>
        </div>

        {/* Línea de tiempo vertical */}
        <div className="relative max-w-4xl mx-auto">
          {/* Línea vertical */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#00B8D9]/20 z-0"></div>

          {/* Experiencias */}
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative z-10 flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Punto en la línea de tiempo */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-[#00B8D9] border-4 border-white shadow-md"></div>

              {/* Contenido */}
              <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pl-12 md:pr-6" : "md:pr-12 md:pl-6"}`}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden h-full">
                  {/* Barra de color en la parte superior */}
                  <div className="h-2 bg-[#00B8D9]"></div>
                  <CardHeader className="pb-2 pt-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <Badge variant="outline" className="text-xs font-normal whitespace-nowrap">
                        {exp.period}
                      </Badge>
                    </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
