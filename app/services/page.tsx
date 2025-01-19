'use client'

import Link from 'next/link'

const services = [
  {
    title: 'Financial Planning',
    description: 'Comprehensive financial planning services tailored to your needs.',
    link: '/services/financial-planning'
  },
  {
    title: 'Investment Management',
    description: 'Expert investment management services to grow your wealth.',
    link: '/services/investment-management'
  },
  {
    title: 'Insurance Solutions',
    description: 'Protection strategies to secure your family\'s financial future.',
    link: '/services/insurance'
  },
  {
    title: 'Retirement Planning',
    description: 'Planning for a secure and comfortable retirement.',
    link: '/services/retirement-planning'
  }
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.title} className="mb-4">
            <Link href={service.link}>
              <span className="text-blue-500">{service.title}</span>
            </Link>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

