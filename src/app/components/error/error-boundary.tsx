<<<<<<< HEAD:src/app/components/error/error-boundary.tsx
﻿import React from "react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
=======
"use client"
import React from "react"

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/components/error/error-boundary.tsx
    super(props)
    this.state = { hasError: false }
  }

<<<<<<< HEAD:src/app/components/error/error-boundary.tsx
  static getDerivedStateFromError(): State {
=======
  static getDerivedStateFromError() {
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/components/error/error-boundary.tsx
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
<<<<<<< HEAD:src/app/components/error/error-boundary.tsx
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => this.setState({ hasError: false })}
=======
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/components/error/error-boundary.tsx
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
<<<<<<< HEAD:src/app/components/error/error-boundary.tsx

    return this.props.children
  }
}
=======
    return this.props.children
  }
}
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/components/error/error-boundary.tsx
