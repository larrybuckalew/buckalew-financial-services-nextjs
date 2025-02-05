'use client'

import React, { 
  createContext, 
  useState, 
  useContext, 
  useEffect 
} from 'react'
import { 
  User, 
  UserRole, 
  AuthTokens 
} from '@/types/auth'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateProfile: (profileData: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for existing token and validate
    const validateSession = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const response = await fetch('/api/auth/validate', {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })

          if (!response.ok) {
            throw new Error('Token validation failed')
          }

          const data = await response.json()
          setUser(data.user)
          setIsAuthenticated(true)
        } catch {
          // Token invalid, logout
          logout()
        }
      }
    }

    validateSession()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const { user, tokens } = await response.json()
      
      // Store tokens
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)

      setUser(user)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const { user, tokens } = await response.json()
      
      // Store tokens
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)

      setUser(user)
      setIsAuthenticated(true)
      router.push('/dashboard')
    } catch (error) {
      setUser(null)
      setIsAuthenticated(false)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setIsAuthenticated(false)
    router.push('/login')
  }

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(profileData)
      })

      if (!response.ok) {
        throw new Error('Profile update failed')
      }

      const updatedUser = await response.json()
      setUser(prevUser => ({
        ...prevUser!,
        ...updatedUser
      }))
    } catch (error) {
      console.error('Profile update failed', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin: user?.role === UserRole.ADMIN,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}