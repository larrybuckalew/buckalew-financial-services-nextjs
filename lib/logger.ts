interface LogEntry {
  level: 'info' | 'warn' | 'error'
  message: string
  timestamp: Date
  context?: Record<string, any>
}

export class Logger {
  private static instance: Logger
  private logs: LogEntry[] = []

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private log(level: LogEntry['level'], message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context
    }

    this.logs.push(entry)

    // Console output
    switch (level) {
      case 'info':
        console.log(`[INFO] ${message}`, context)
        break
      case 'warn':
        console.warn(`[WARN] ${message}`, context)
        break
      case 'error':
        console.error(`[ERROR] ${message}`, context)
        break
    }

    // TODO: Implement remote logging or file logging
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }

  error(message: string, context?: Record<string, any>) {
    this.log('error', message, context)
  }

  getLogs(level?: LogEntry['level'], limit: number = 100): LogEntry[] {
    let filteredLogs = this.logs

    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level)
    }

    return filteredLogs.slice(-limit)
  }
}

// Singleton export
export const logger = Logger.getInstance()
