interface Window {
  createChat?: (options: {
    webhookUrl: string
    webhookConfig?: {
      method: string
      headers: Record<string, string>
    }
    target?: string
    mode?: "window" | "fullscreen"
    chatInputKey?: string
    chatSessionKey?: string
    metadata?: Record<string, any>
    showWelcomeScreen?: boolean
    defaultLanguage?: string
    initialMessages?: string[]
    i18n?: Record<string, Record<string, string>>
  }) => void
}
