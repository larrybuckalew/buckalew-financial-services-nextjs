import crypto from 'crypto'
import { validate as validateUuid } from 'uuid'

export class CommonUtils {
  // Generate a cryptographically secure random string
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  // Sanitize input to prevent XSS
  static sanitizeInput(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validate UUID
  static isValidUuid(uuid: string): boolean {
    return validateUuid(uuid)
  }

  // Deep clone an object
  static deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as T
    }

    const clonedObj = {} as T
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = this.deepClone(obj[key])
      }
    }

    return clonedObj
  }

  // Debounce function
  static debounce<F extends (...args: any[]) => any>(
    func: F, 
    delay: number
  ): F {
    let timeoutId: NodeJS.Timeout | null = null

    return ((...args: Parameters<F>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        func(...args)
        timeoutId = null
      }, delay)
    }) as F
  }

  // Throttle function
  static throttle<F extends (...args: any[]) => any>(
    func: F, 
    limit: number
  ): F {
    let inThrottle: boolean

    return ((...args: Parameters<F>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }) as F
  }

  // Convert camelCase to snake_case
  static camelToSnakeCase(str: string): string {
    return str.replace(
      /[A-Z]/g, 
      letter => `_${letter.toLowerCase()}`
    )
  }

  // Convert snake_case to camelCase
  static snakeToCamelCase(str: string): string {
    return str.replace(
      /_([a-z])/g, 
      (_, letter) => letter.toUpperCase()
    )
  }

  // Mask sensitive information
  static maskSensitiveInfo(
    value: string, 
    visibleChars: number = 4
  ): string {
    if (value.length <= visibleChars * 2) {
      return value
    }

    const start = value.slice(0, visibleChars)
    const end = value.slice(-visibleChars)
    const maskLength = value.length - (visibleChars * 2)
    const mask = '*'.repeat(maskLength)

    return `${start}${mask}${end}`
  }

  // Generate a unique identifier
  static generateUniqueId(): string {
    return crypto
      .randomBytes(16)
      .toString('hex')
  }

  // Retry an async operation with exponential backoff
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error as Error
        const delay = baseDelay * Math.pow(2, attempt)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }
}