declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DB_CONNECTION_STRING?: string
      readonly DB_URL?: string
      readonly PAYLOAD_SECRET: string
    }
  }
}

export {}