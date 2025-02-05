export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  AGENT = 'agent'
}

export interface User {
  id: string
  email: string
  name?: string
  role: UserRole
  profileComplete: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  role?: UserRole
}