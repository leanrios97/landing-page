"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, FileCode, FileSpreadsheet, ChevronLeft, ChevronRight } from "lucide-react"
import { type GitHubRepo, getGitHubRepositories, mapLanguageToColor } from "@/services/github-service"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioSection() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [allProjects, setAllProjects] = useState<GitHubRepo[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cargar proyectos iniciales (5)
  useEffect(() => {
    async function fetchRepositories() {
      try {
        setLoading(true)
        const response = await getGitHubRepositories(5, 0)

        if (response.success && response.data.length > 0) {
          setProjects(response.data)
          setTotalCount(response.count)
        } else {
          setProjects([])
        }
      } catch (error) {
        console.error("Error fetching repositories:", error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [])

  // Cargar todos los proyectos cuando se solicite
  const loadAllProjects = async () => {
    if (allProjects.length > 0) {
      setShowAllProjects(true)
      return
    }

    try {
      setLoading(true)
      // Obtener todos los proyectos (o al menos una cantidad mayor)
      const response = await getGitHubRepositories(100, 0)

      if (response.success && response.data.length > 0) {
        setAllProjects(response.data)
        setShowAllProjects(true)
      }
    } catch (error) {
      console.error("Error fetching all repositories:", error)
    } finally {
      setLoading(false)
    }
  }

  // Volver al carrusel
  const backToCarousel = () => {
    setShowAllProjects(false)
  }

  // Navegar a la izquierda
  const navigateLeft = () => {
    pauseAutoplay()
    setActiveIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  // Navegar a la derecha
  const navigateRight = () => {
    pauseAutoplay()
    setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  // Seleccionar un proyecto específico
  const selectProject = (index: number) => {
    pauseAutoplay()
    setActiveIndex(index)
  }

  // Pausar el autoplay temporalmente cuando el usuario interactúa
  const pauseAutoplay = () => {
    setIsPaused(true)

    // Limpiar cualquier timeout existente
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current)
    }

    // Reanudar el autoplay después de 5 segundos de inactividad
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

  // Configurar autoplay para el carrusel
  useEffect(() => {
    if (!showAllProjects && projects.length > 0 && !isPaused) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % projects.length)
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [projects.length, showAllProjects, isPaused])

  // Actualizar la posición del carrusel cuando cambia el índice activo
  useEffect(() => {
    if (carouselRef.current && !showAllProjects) {
      const scrollPosition = activeIndex * (320 + 24) // card width + gap
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }, [activeIndex, showAllProjects])

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [])

  // Renderizar esqueletos durante la carga
  if (loading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden border-none bg-[#0A192F]/80">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // Renderizar mensaje si no hay proyectos
  if (!loading && projects.length === 0) {
    return (
      <div className="text-center text-white">
        <p>No se encontraron proyectos disponibles.</p>
      </div>
    )
  }

  // Función para renderizar un proyecto
  const renderProject = (project: GitHubRepo, index: number, isCarousel = false) => {
    const IconComponent = project.technology === "Jupyter Notebook" ? FileSpreadsheet : FileCode
    const isActive = isCarousel && index === activeIndex

    return (
      <Card
        key={project.repo_id}
        className={`${
          isCarousel
            ? `min-w-[320px] md:min-w-[400px] max-w-[400px] flex-shrink-0 overflow-hidden border-none snap-center transition-all duration-300 cursor-pointer ${
                isActive ? "scale-105 z-10" : "scale-95 opacity-70"
              }`
            : "overflow-hidden border-none"
        }`}
        style={{
          background: `linear-gradient(135deg, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.8) 100%)`,
          boxShadow: `0 10px 30px -15px rgba(${
            mapLanguageToColor(project.technology) === "#0A192F"
              ? "10, 25, 47"
              : mapLanguageToColor(project.technology)
                  .substring(1)
                  .match(/.{2}/g)
                  ?.map((hex: string) => Number.parseInt(hex, 16))
                  .join(", ")
          }, 0.5)`,
          borderLeft: `4px solid ${mapLanguageToColor(project.technology)}`,
        }}
        onClick={isCarousel ? () => selectProject(index) : undefined}
      >
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white">{project.name.replace(/_/g, " ").replace(/-/g, " ")}</h3>
            <div
              className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              style={{
                backgroundColor: `${mapLanguageToColor(project.technology)}30`,
                color: mapLanguageToColor(project.technology),
              }}
            >
              <IconComponent className="h-3 w-3" />
              <span>{project.technology}</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-4">{project.description || "No description provided"}</p>
          {project.updated && <p className="text-xs text-gray-400 mb-2">Actualizado: {project.updated}</p>}
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white w-full"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.code_url, "_blank")
            }}
          >
            <Github className="mr-2 h-4 w-4" />
            Ver Código
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="relative">
      {!showAllProjects ? (
        // Vista de carrusel
        <>
          <div className="relative">
            {/* Botón de navegación izquierda */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#0A192F]/80 hover:bg-[#00B8D9]/80 text-white rounded-full p-2 shadow-lg transform -translate-x-1/2"
              onClick={navigateLeft}
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Carrusel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x snap-mandatory px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {projects.map((project, index) => renderProject(project, index, true))}
            </div>

            {/* Botón de navegación derecha */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#0A192F]/80 hover:bg-[#00B8D9]/80 text-white rounded-full p-2 shadow-lg transform translate-x-1/2"
              onClick={navigateRight}
              aria-label="Siguiente proyecto"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indicadores de paso */}
          <div className="mt-8 flex justify-center gap-4">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-[#00B8D9] scale-125" : "bg-gray-500 hover:bg-gray-400"
                }`}
                onClick={() => selectProject(index)}
                aria-label={`Ver proyecto ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : (
        // Vista de todos los proyectos
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project) => renderProject(project, 0))}
        </div>
      )}

      <div className="text-center mt-12">
        <Button
          variant="outline"
          className="border-[#00B8D9] text-[#00B8D9] hover:bg-[#00B8D9]/10"
          onClick={showAllProjects ? backToCarousel : loadAllProjects}
        >
          {showAllProjects ? "Volver al Carrusel" : `Ver Todos los Proyectos (${totalCount})`}
        </Button>
      </div>
    </div>
  )
}
