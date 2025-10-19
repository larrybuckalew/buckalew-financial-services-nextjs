export const TokenService = {
  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token)
      document.cookie = `token=${token}; path=/; max-age=86400`
    }
  },

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken')
    }
    return null
  },

  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  },

  isTokenValid(): boolean {
    const token = this.getToken()
    // TODO: Implement actual token validation logic
    return !!token
  }
}
