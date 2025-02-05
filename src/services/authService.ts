import { User, LoginCredentials, RegisterCredentials, AuthTokens, UserRole } from '@/types/auth'

class AuthService {
  private API_URL = '/api/auth'

  async login(credentials: LoginCredentials): Promise<{ user: User, tokens: AuthTokens }> {
    try {
      const response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Auth Error:', error)
      throw error
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User, tokens: AuthTokens }> {
    try {
      const response = await fetch(`${this.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...credentials,
          role: credentials.role || UserRole.USER
        })
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Auth Error:', error)
      throw error
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await fetch(`${this.API_URL}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      })

      if (!response.ok) {
        throw new Error('Token refresh failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Token Refresh Error:', error)
      throw error
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

export default new AuthService()