'use client'

import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main>
        {/* Your contact page content here */}
        <p>Feel free to reach out to us through the contact form below.</p>
        <Link href="/contact">Contact Us</Link>
      </main>
    </div>
  )
}
