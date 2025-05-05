import { ChevronRight, Github, Mail, Twitter, MessageSquare } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TechStack from "@/components/tech-stack"
import ServiceCard from "@/components/service-card"
import PortfolioSection from "@/components/portfolio-section"
import EducationSection from "@/components/education-section"
import ContactSection from "@/components/contact-section"
import AboutMe from "@/components/about-me"
import ReseniasSection from "@/components/resenias-section"
import QuotesCarousel from "@/components/quotes-carousel"
import ExperienceSection from "@/components/experience-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      {/* Hero Section con Foto de Perfil */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] to-[#0A192F]/80 z-10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"></div>
        </div>
        <div className="container relative z-20 mx-auto px-4 py-24 sm:py-32">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Foto de Perfil */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-[#00B8D9] shadow-lg flex-shrink-0 mb-8 md:mb-0">
              <img src="/images/profile.png" alt="Leandro Ríos" className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col items-start max-w-3xl">
              <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">
                Data Analyst | Data Scientist | Data Engineer | Python dev
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-center md:text-left">
                Leandro Ríos
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-tight text-center md:text-left">
                Transformando Datos en <span className="text-[#00B8D9]">Soluciones Inteligentes</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed text-center md:text-left">
                Apasionado por la automatización, el análisis de datos y el desarrollo backend, 
                trabajo con equipos para mejorar la eficiencia y generar insights accionables.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">
                  <a href="#portfolio" className="flex items-center">
                    Ver Mi Trabajo
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="border-[#00B8D9] text-[#00B8D9] hover:bg-[#00B8D9]/10">
                  <a href="#contacto">Contactarme</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrusel de Frases Motivacionales */}
      <QuotesCarousel />

      {/* Sección Sobre Mí */}
      <AboutMe />

      {/* Sección de Experiencia Profesional */}
      <ExperienceSection />

      {/* Tech Stack Section */}
      <section className="bg-[#F4F4F4] text-[#0A192F] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Stack tecnologico</Badge>
            <h2 className="text-3xl font-bold mb-4">Tecnologías con las que trabajo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Utilizando herramientas y frameworks modernos para construir soluciones robustas y escalables
            </p>
          </div>
          <TechStack />
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-[#0A192F] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Portfolio</Badge>
            <h2 className="text-3xl font-bold mb-4">Proyectos Destacados</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Una selección de mis trabajos recientes en automatización, ciencia de datos y desarrollo backend
            </p>
          </div>

          <PortfolioSection />
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-20 bg-[#F4F4F4] text-[#0A192F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Credenciales</Badge>
            <h2 className="text-3xl font-bold mb-4">Educación y certificaciones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Mi formación académica y certificaciones profesionales</p>
          </div>

          <EducationSection />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white text-[#0A192F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Servicios</Badge>
            <h2 className="text-3xl font-bold mb-4">Lo que ofrezco</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones integrales adaptadas a las necesidades de tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ServiceCard
              title="Automatizaciones"
              description="Optimiza tus flujos de trabajo y elimina tareas repetitivas con soluciones de automatización personalizadas."
              icon="Settings"
              accentColor="#A3FF12"
            />
            <ServiceCard
              title="Ciencia de Datos"
              description="Extrae insights significativos de tus datos con análisis avanzados y machine learning."
              icon="BarChart2"
              accentColor="#00B8D9"
            />
            <ServiceCard
              title="Desarrollo Backend"
              description="Construye sistemas backend robustos y escalables utilizando Python y frameworks modernos."
              icon="Code"
              accentColor="#0A192F"
            />
            <ServiceCard
              title="Análisis de Datos"
              description="Transforma datos brutos en inteligencia empresarial accionable con análisis exhaustivos."
              icon="Database"
              accentColor="#00B8D9"
            />
            <ServiceCard
              title="Ingeniería de Datos"
              description="Diseño y construcción de infraestructuras para recolección, procesamiento y almacenamiento eficiente de datos."
              icon="Layers"
              accentColor="#A3FF12"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios">
        <ReseniasSection />
      </section>


      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white text-[#0A192F]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white">Contacto</Badge>
            <h2 className="text-3xl font-bold mb-4">Trabajemos juntos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ¿Interesado en mis servicios? Contáctame para discutir cómo puedo ayudarte con tu próximo proyecto
            </p>  
          </div>

          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold">Leandro Ríos</h3>
              <p className="text-gray-400 mt-2">Data Analyst | Data Scientist | Data Engineer | Python dev</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://github.com/leanrios97" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/leandro-agustin-rios-38a1911a1/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://x.com/Leanriosdata" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://wa.me/5493513373826?text=Hola%20Leandro,%20vi%20tu%20portfolio%20y%20me%20gustaría%20contactarte"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageSquare className="h-6 w-6" />
                <span className="sr-only">WhatsApp</span>
              </Link>
              <Link
                href="mailto:rios.leandro.data@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Leandro Ríos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
