"use client"

import type React from "react"
import { useState } from "react"

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  role: "admin" | "cook"
  full_name: string
}

interface LoginPageProps {
  onLogin: (userData: User, tokens: { access: string; refresh: string }) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!username.trim() || !password.trim()) {
      setError("Foydalanuvchi nomi va parolni kiriting")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Muvaffaqiyatli login
        onLogin(data.user, { access: data.access, refresh: data.refresh })
      } else {
        // Login xatoligi
        setError(data.detail || data.error || "Noto'g'ri login yoki parol")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Server bilan bog'lanishda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bolalar Bog'chasi</h1>
          <h2 className="text-xl text-gray-600">Tizimga kirish</h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Foydalanuvchi nomi
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              id="username"
              type="text"
              placeholder="Foydalanuvchi nomini kiriting"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Parol
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              id="password"
              type="password"
              placeholder="Parolni kiriting"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Kirish...
                </div>
              ) : (
                "Kirish"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">Test foydalanuvchilar:</p>
          <div className="bg-gray-50 p-3 rounded">
            <p>
              <strong>Admin:</strong> admin / admin123
            </p>
            <p>
              <strong>Oshpaz:</strong> cook / cook123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
