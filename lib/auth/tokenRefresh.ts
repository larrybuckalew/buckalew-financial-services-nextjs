import { AuthService } from './authService'
import { TokenService } from './tokenService'

export async function refreshToken() {
  const currentToken = TokenService.getToken()
  
  if (!currentToken) {
    return null
  }

  try {
    // Verify current token
    const decoded = AuthService.verifyToken(currentToken)
    
    // If token is still valid, return it
    if (decoded) {
      return currentToken
    }

    // If token is expired, attempt to refresh
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
      }
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const { token } = await response.json()
    
    // Store new token
    TokenService.setToken(token)
    
    return token
  } catch (error) {
    // If refresh fails, clear token and redirect to login
    TokenService.removeToken()
    window.location.href = '/login'
    return null
  }
}
