'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { UserRole } from '@/types/auth'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await register(email, password, name)
      router.push('/dashboard')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-background">
      <div className="brand-card w-96 max-w-full">
        <h2 className="text-2xl mb-6 text-brand-primary font-bold text-center">
          Create Your Account
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-brand mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-brand-text">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border rounded-brand brand-input"
              placeholder="Enter your full name"
            />
          </div>
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
          <div className="mb-4">
            <label className="block mb-2 text-brand-text">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-brand brand-input"
              placeholder="Create a strong password"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-brand-text">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-brand brand-input"
              placeholder="Confirm your password"
            />
          </div>
          <button 
            type="submit" 
            className="brand-button w-full"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <a 
            href="/login" 
            className="text-brand-secondary hover:underline"
          >
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  )
}