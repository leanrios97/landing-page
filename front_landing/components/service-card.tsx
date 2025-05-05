import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: keyof typeof LucideIcons
  accentColor: string
}

export default function ServiceCard({ title, description, icon, accentColor }: ServiceCardProps) {
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
      {/* Añadimos una barra de color en la parte superior para distinguir mejor dónde empieza la tarjeta */}
      <div className="h-2" style={{ backgroundColor: accentColor }}></div>
      <CardHeader className="pb-2 pt-6">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <Icon className="h-6 w-6" style={{ color: accentColor }} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>  
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
