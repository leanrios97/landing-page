import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap } from "lucide-react"
import CertificacionesSection from "@/components/certificaciones-section"
import Link from "next/link"

const education = [
  {
    type: "education",
    title: "Téc. Superior en Ciencia de Datos e Inteligencia Artificial",
    institution: "Colegio Universitario IES",
    year: "2020 - Actualidad",
    description: "Cursado 100% | Trabajo final en curso",
    linkNotas: "https://www.notion.so/Tecnicatura-en-inteligencia-artificial-y-ciencia-de-datos-1ad43dc0554f80238fd6e58451b7e028"
  },
]

export default function EducationSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <div className="flex items-center mb-6">
          <GraduationCap className="h-6 w-6 text-[#00B8D9] mr-2" />
          <h3 className="text-2xl font-bold">Educación</h3>
        </div>
        <div className="space-y-4">
          {education.map((item, index) => (
            <Card key={index} className="border-none shadow hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <Badge variant="outline" className="text-xs font-normal">
                    {item.year}
                  </Badge>
                </div>
                <p className="text-sm text-[#00B8D9] font-medium">{item.institution}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="mt-3">
                    <Link
                     href={item.linkNotas}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#00B8D9] hover:underline"
                    >
                      Ver notas
                    </Link>
                  </div>
              </CardContent>
              
            </Card>
          ))}
        </div>
      </div>

      <div>
        <CertificacionesSection />
      </div>
    </div>
  )
}
