// Función para verificar si la API está disponible
export async function checkApiAvailability() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/"

    // Intentamos hacer una petición simple para verificar la conexión
    const response = await fetch(`${apiUrl}`, {
      method: "HEAD",
      headers: {
        "Content-Type": "application/json",
      },
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(5000),
    })

    return response.ok
  } catch (error) {
    console.error("Error al verificar disponibilidad de la API:", error)
    return false
  }
}

// Función para obtener las reseñas desde la API
export async function getResenias(limit = 5, offset = 0) {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Obteniendo reseñas de:", `${apiUrl}resenias/?limit=${limit}&offset=${offset}`)
    console.log("Client Secret disponible:", !!clientSecret)
    console.log("Client Secret valor:", clientSecret)

    const response = await fetch(`${apiUrl}resenias/?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de reseñas: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener las reseñas:", error)
    // Devolvemos un mensaje de error más descriptivo
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Error desconocido al obtener reseñas",
    }
  }
}

// Función para obtener certificaciones desde la API
export async function getCertificaciones() {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Obteniendo certificaciones de:", `${apiUrl}certificaciones/`)
    console.log("Client Secret disponible:", !!clientSecret)

    const response = await fetch(`${apiUrl}certificaciones/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de certificaciones: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener las certificaciones:", error)
    // Devolvemos un mensaje de error más descriptivo
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Error desconocido al obtener certificaciones",
    }
  }
}

// Función para obtener frases desde la API
export async function getFrases() {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Obteniendo frases de:", `${apiUrl}frases/`)
    console.log("Client Secret disponible:", !!clientSecret)

    const response = await fetch(`${apiUrl}frases/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de frases: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener las frases:", error)
    // Devolvemos un mensaje de error más descriptivo
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : "Error desconocido al obtener frases",
    }
  }
}

// Función para registrar una visita a la página
export async function registerPageVisit() {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")

    // Recopilamos la información necesaria
    const data = {
      ip_address: "0.0.0.0", // La IP real será capturada por el servidor
      path: window.location.pathname,
      method: "GET",
      user_agent: navigator.userAgent,
      referer: document.referrer || null,
      accept_language: navigator.language || "",
    }

    console.log("Registrando visita a:", `${apiUrl}page-visits/`)
    console.log("Datos de visita:", data)

    const response = await fetch(`${apiUrl}page-visits/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error al registrar visita: ${response.status}`, errorText)
      // No lanzamos error para no interrumpir la experiencia del usuario
      return { success: false }
    }

    return await response.json()
  } catch (error) {
    console.error("Error al registrar visita:", error)
    // No devolvemos error para no interrumpir la experiencia del usuario
    return { success: false }
  }
}

// Función para enviar el formulario de contacto
export async function submitContactForm(formData: any) {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Enviando formulario de contacto a:", `${apiUrl}contacto/`)
    console.log("Client Secret disponible:", !!clientSecret)
    console.log("Client Secret valor:", clientSecret)
    console.log("Datos a enviar:", formData)

    const response = await fetch(`${apiUrl}contacto/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      body: JSON.stringify(formData),
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de contacto: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al enviar el formulario de contacto:", error)
    // Devolvemos un mensaje de error más descriptivo
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al enviar el formulario",
    }
  }
}

// Función para enviar una nueva reseña
export async function submitResenia(reseniaData: any) {
  try {
    // Aseguramos que la URL termine con una barra
    const apiUrl = ensureTrailingSlash(process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/")
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Enviando reseña a:", `${apiUrl}resenias/`)
    console.log("Client Secret disponible:", !!clientSecret)
    console.log("Client Secret valor:", clientSecret)
    console.log("Datos a enviar:", reseniaData)

    const response = await fetch(`${apiUrl}resenias/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      body: JSON.stringify(reseniaData),
      // Añadimos un timeout para no esperar demasiado
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de reseña: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al enviar la reseña:", error)
    // Devolvemos un mensaje de error más descriptivo
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido al enviar la reseña",
    }
  }
}

// Función auxiliar para asegurar que la URL termine con una barra
function ensureTrailingSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`
}

// Alias to match the expected export name
export const submitTestimonial = submitResenia
export const getReviews = getResenias
