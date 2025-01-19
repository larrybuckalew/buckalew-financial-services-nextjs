'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
  name: z.string().optional()
})

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(RegisterSchema)
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('Registration successful')
        setError(null)
      } else {
        setError(result.message || 'Registration failed')
        setSuccess(null)
      }
    } catch (err) {
      setError('Network error')
      setSuccess(null)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input 
          {...register('email')}
          type="email" 
          placeholder="Email" 
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      
      <div>
        <input 
          {...register('password')}
          type="password" 
          placeholder="Password" 
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      
      <div>
        <input 
          {...register('name')}
          type="text" 
          placeholder="Name (optional)" 
          className="w-full p-2 border rounded"
        />
      </div>
      
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        Register
      </button>
    </form>
  )
}
