import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutMe() {
  return (
    <section className="py-20 bg-white text-[#0A192F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Sobre mí</Badge>
          <h2 className="text-3xl font-bold mb-4">¿Quién Soy?</h2>
        </div>

        <Card className="border-none shadow-lg max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Soy un profesional especializado en análisis de datos, ciencia de datos y desarrollo backend con Python,
                comprometido con el aprendizaje continuo y la resolución efectiva de problemas.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Mi experiencia abarca el desarrollo y mantenimiento de APIs REST, optimización de código, creación de
                tableros de visualización de datos, ajuste de modelos de machine learning y gestión de bases de datos
                relacionales y no relacionales.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Me destaco por mis habilidades en análisis de requerimientos, comunicación efectiva y trabajo en equipo.
                Tengo experiencia trabajando con metodologías ágiles como Scrum y Kanban, utilizando herramientas como
                Jira para la planificación y seguimiento de proyectos.
              </p>

              <p className="text-lg leading-relaxed">
                Actualmente estoy completando mi formación como Técnico Superior en Ciencia de Datos e Inteligencia
                Artificial, mientras continúo ampliando mis conocimientos en tecnologías como FastAPI, Django,
                TensorFlow, Docker, y plataformas cloud como GCP y AWS.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
