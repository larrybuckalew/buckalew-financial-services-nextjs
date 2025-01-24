"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    const formData = new FormData(event.currentTarget)

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/dashboard",
      redirect: false,
    })

    if (result?.error) {
      console.error("Login error:", result.error)
      setError("Invalid credentials")
      return
    }

    if (result?.url) router.push(result.url)
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sign in</h2>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 p-4 text-red-600 rounded">{error}</div>
          )}
          <input
            name="email"
            type="email"
            required
            className="block w-full rounded border p-2"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            required
            className="block w-full rounded border p-2"
            placeholder="Password"
          />
          <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
