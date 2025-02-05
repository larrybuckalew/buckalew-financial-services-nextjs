'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background">
      <div className="brand-card w-96 max-w-full">
        <h2 className="text-2xl mb-6 text-brand-primary font-bold text-center">
          Sign in to Buckalew Financial
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-brand mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-brand-text">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-brand brand-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-brand-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-brand brand-input"
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="brand-button w-full"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a 
            href="/register" 
            className="text-brand-secondary hover:underline"
          >
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  )
}