"use client"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, X, AlertCircle, Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

// URL del webhook de n8n
const WEBHOOK_URL = "http://localhost:5678/webhook/33e8e5a7-2809-405c-8954-e03fe95cf26f/chat"

// Interfaz para los mensajes del chat
interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      text: "¡Hola! 👋",
      sender: "bot",
      timestamp: new Date(),
    },
    {
      id: "welcome-2",
      text: "¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generar un ID de sesión único al cargar el componente
  useEffect(() => {
    // Intentar recuperar el ID de sesión del almacenamiento local
    const savedSessionId = localStorage.getItem("n8n-chat-session-id")
    if (savedSessionId) {
      setSessionId(savedSessionId)
      console.log("[ChatWidget] Restored session ID:", savedSessionId)

      // Intentar recuperar mensajes anteriores
      const savedMessages = localStorage.getItem("n8n-chat-messages")
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages)
          // Convertir las cadenas de fecha a objetos Date
          const messagesWithDates = parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
          setMessages(messagesWithDates)
          console.log("[ChatWidget] Restored messages:", messagesWithDates.length)
        } catch (e) {
          console.error("[ChatWidget] Error parsing saved messages:", e)
        }
      }
    } else {
      // Generar un nuevo ID de sesión
      const newSessionId = `web-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      setSessionId(newSessionId)
      localStorage.setItem("n8n-chat-session-id", newSessionId)
      console.log("[ChatWidget] Generated new session ID:", newSessionId)
    }
  }, [])

  // Guardar mensajes en el almacenamiento local cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("n8n-chat-messages", JSON.stringify(messages))
    }
  }, [messages])

  // Abrir/cerrar el chat
  const toggleChat = () => {
    setIsOpen(!isOpen)

    // Si estamos abriendo el chat, enfocar el campo de entrada
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }

  // Manejar clics fuera del chat para cerrarlo
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Enviar mensaje
  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    // Añadir mensaje del usuario
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      console.log("[ChatWidget] Sending message to webhook:", {
        chatInput: inputMessage,
        sessionId: sessionId,
        source: "website",
      })

      // Enviar mensaje al webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: inputMessage,
          sessionId: sessionId,
          source: "website",
          metadata: {
            url: window.location.href,
            userAgent: navigator.userAgent,
          },
        }),
      })

      console.log("[ChatWidget] Response status:", response.status)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      // Obtener el texto de la respuesta para logging
      const responseText = await response.text()
      console.log("[ChatWidget] Raw response:", responseText)

      // Intentar parsear la respuesta como JSON
      let data
      try {
        data = JSON.parse(responseText)
        console.log("[ChatWidget] Parsed response data:", data)
      } catch (e) {
        console.error("[ChatWidget] Error parsing response as JSON:", e)
        data = { message: responseText }
      }

      // Extraer el mensaje de la respuesta con mejor manejo de diferentes formatos
      let botResponseText = "Lo siento, no pude procesar tu mensaje."

      if (data) {
        if (typeof data === "string") {
          botResponseText = data
        } else if (data.output) {
          botResponseText = data.output
        } else if (data.message) {
          botResponseText = data.message
        } else if (data.response) {
          botResponseText = data.response
        } else if (data.text) {
          botResponseText = data.text
        } else if (data.content) {
          botResponseText = data.content
        } else if (data.answer) {
          botResponseText = data.answer
        } else {
          // Si no encontramos un campo conocido, convertimos todo el objeto a string
          botResponseText = "Lo siento, no pude procesar tu mensaje correctamente."
        }
      }

      console.log("[ChatWidget] Extracted bot response:", botResponseText)

      // Añadir respuesta del bot
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("[ChatWidget] Error sending message:", error)

      // Añadir mensaje de error
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Hacer scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Limpiar la conversación
  const clearConversation = () => {
    // Mantener solo los mensajes de bienvenida
    setMessages([
      {
        id: "welcome-1",
        text: "¡Hola! 👋",
        sender: "bot",
        timestamp: new Date(),
      },
      {
        id: "welcome-2",
        text: "¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])

    // Generar un nuevo ID de sesión
    const newSessionId = `web-session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    setSessionId(newSessionId)
    localStorage.setItem("n8n-chat-session-id", newSessionId)
    console.log("[ChatWidget] Generated new session ID:", newSessionId)

    // Limpiar el almacenamiento local
    localStorage.removeItem("n8n-chat-messages")
  }

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-[#00B8D9] hover:bg-[#00B8D9]/80 text-white shadow-lg transition-all duration-300"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {/* Ventana de chat */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="fixed bottom-24 right-6 z-40 w-[350px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 transition-all duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="bg-[#0A192F] text-white p-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Asistente Virtual</h3>
              <p className="text-xs text-gray-300">¿En qué puedo ayudarte hoy?</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#0A192F]/50"
                onClick={clearConversation}
                title="Nueva conversación"
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#0A192F]/50"
                onClick={() => setIsOpen(false)}
                title="Cerrar chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error && (
            <Alert className="m-2 bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-xs text-yellow-700">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col h-[calc(100%-56px)]">
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-[#00B8D9] text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Entrada de mensaje */}
            <div className="border-t p-3 flex items-center">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 mr-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#00B8D9] hover:bg-[#00B8D9]/80"
                size="icon"
              >
                {isLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
