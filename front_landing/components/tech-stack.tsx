import { Card } from "@/components/ui/card"
import { Database, Server, Code, BarChart2, Workflow, Cpu, Cloud, FileCode } from "lucide-react"

const technologies = [
  {
    name: "Python",
    icon: Code,
    category: "Programación",
  },
  {
    name: "FastAPI / Django",
    icon: Server,
    category: "Frameworks",
  },
  {
    name: "Pandas / NumPy",
    icon: FileCode,
    category: "Análisis de Datos",
  },
  {
    name: "Scikit-Learn / TensorFlow",
    icon: BarChart2,
    category: "Machine Learning",
  },
  {
    name: "SQL Server / PostgreSQL",
    icon: Database,
    category: "Bases de Datos",
  },
  {
    name: "MongoDB",
    icon: Database,
    category: "NoSQL",
  },
  {
    name: "Docker",
    icon: Cpu,
    category: "DevOps",
  },
  {
    name: "Apache Airflow / n8n",
    icon: Workflow,
    category: "Automatización",
  },
  {
    name: "Tableau / Power BI",
    icon: BarChart2,
    category: "Visualización",
  },
  {
    name: "GCP / AWS",
    icon: Cloud,
    category: "Cloud",
  },
]

export default function TechStack() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {technologies.map((tech, index) => (
        <Card
          key={index}
          className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow border-none bg-white"
        >
          <div className="h-12 w-12 rounded-full bg-[#0A192F]/5 flex items-center justify-center mb-4">
            <tech.icon className="h-6 w-6 text-[#00B8D9]" />
          </div>
          <h3 className="font-medium text-[#0A192F] text-center">{tech.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{tech.category}</p>
        </Card>
      ))}
    </div>
  )
}
