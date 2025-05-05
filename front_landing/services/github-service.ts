export interface GitHubRepo {
  repo_id: number
  name: string
  description: string
  technology: string
  updated: string
  code_url: string
}

export interface GitHubReposResponse {
  success: boolean
  count: number
  next: string | null
  previous: string | null
  data: GitHubRepo[]
}

export async function getGitHubRepositories(limit = 5, offset = 0): Promise<GitHubReposResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_URL_BACK || "http://localhost:8000/api/"
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

    console.log("Obteniendo repositorios de:", `${apiUrl}github-repos/?limit=${limit}&offset=${offset}`)
    console.log("Client Secret disponible:", !!clientSecret)

    const response = await fetch(`${apiUrl}github-repos/?limit=${limit}&offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientSecret}`,
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Error en respuesta de repositorios: ${response.status}`, errorText)
      throw new Error(`Error ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log("Repositorios obtenidos:", data)
    return data
  } catch (error) {
    console.error("Error al obtener repositorios:", error)
    return {
      success: false,
      count: 0,
      next: null,
      previous: null,
      data: [],
    }
  }
}

export function mapLanguageToColor(language: string | null): string {
  const colors: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#2b7489",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    "Jupyter Notebook": "#DA5B0B",
    Java: "#b07219",
    "C#": "#178600",
    PHP: "#4F5D95",
  }

  return language && colors[language] ? colors[language] : "#00B8D9"
}

export function getLanguageIcon(language: string | null): string {
  const icons: Record<string, string> = {
    Python: "FileCode",
    TypeScript: "FileCode",
    JavaScript: "FileCode",
    HTML: "FileCode",
    CSS: "FileCode",
    "Jupyter Notebook": "FileSpreadsheet",
    Java: "FileCode",
    "C#": "FileCode",
    PHP: "FileCode",
  }

  return language && icons[language] ? icons[language] : "Code"
}
