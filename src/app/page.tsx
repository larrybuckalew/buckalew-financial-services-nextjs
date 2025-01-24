import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl px-6 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900">
          Welcome to Buckalew Financial Services
        </h1>
        <p className="mb-12 text-xl text-gray-600">
          Professional financial planning, retirement solutions, and insurance services
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Financial Planning</h3>
            <p className="text-gray-600">Comprehensive tools for your financial future</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Retirement Solutions</h3>
            <p className="text-gray-600">Expert guidance for retirement planning</p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Insurance Services</h3>
            <p className="text-gray-600">Protecting what matters most</p>
          </div>
        </div>
      </div>
    </div>
  )
}
