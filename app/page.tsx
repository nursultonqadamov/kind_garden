"use client"

import { useState, useEffect } from "react"
import LoginPage from "@/components/login-page"
import AdminDashboard from "@/components/admin-dashboard"
import CookDashboard from "@/components/cook-dashboard"

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  role: "admin" | "cook"
  full_name: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Page title ni o'zgartirish
    document.title = user
      ? `${user.role === "admin" ? "Admin Panel" : "Oshpaz Paneli"} - Bolalar Bog'chasi`
      : "Kirish - Bolalar Bog'chasi"
  }, [user])

  useEffect(() => {
    // Faqat bir marta authentication tekshirish
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      setLoading(false)
      setIsAuthenticated(false)
      return
    }

    try {
      const response = await fetch("/api/auth/profile/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        // Token noto'g'ri yoki muddati tugagan
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (userData: User, tokens: { access: string; refresh: string }) => {
    localStorage.setItem("access_token", tokens.access)
    localStorage.setItem("refresh_token", tokens.refresh)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setUser(null)
    setIsAuthenticated(false)
  }

  // Loading holatida
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  // Agar authentication yo'q bo'lsa - Login page
  if (!isAuthenticated || !user) {
    return <LoginPage onLogin={handleLogin} />
  }

  // Authentication bor - Role bo'yicha dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === "admin" ? (
        <AdminDashboard user={user} onLogout={handleLogout} />
      ) : user.role === "cook" ? (
        <CookDashboard user={user} onLogout={handleLogout} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Noto'g'ri rol</h1>
            <p className="text-gray-600 mt-2">Sizning rolingiz aniqlanmadi</p>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Qayta login qiling
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
