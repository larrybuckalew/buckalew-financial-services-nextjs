'use client'

import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-brand-light rounded-brand p-6">
        <h1 className="text-3xl text-brand-primary mb-6">
          Welcome, {user?.name || 'User'}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="brand-card">
            <h2 className="text-xl text-brand-secondary mb-4">Quick Actions</h2>
            <ul className="space-y-3">
              <li>
                <a href="/profile" className="text-brand-text hover:text-brand-secondary transition-colors">
                  Edit Profile
                </a>
              </li>
              <li>
                <a href="/quote" className="text-brand-text hover:text-brand-secondary transition-colors">
                  Get a Quote
                </a>
              </li>
              <li>
                <a href="/appointments" className="text-brand-text hover:text-brand-secondary transition-colors">
                  Schedule Appointment
                </a>
              </li>
            </ul>
          </div>

          <div className="brand-card">
            <h2 className="text-xl text-brand-secondary mb-4">Recent Activity</h2>
            <p className="text-brand-text">
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}