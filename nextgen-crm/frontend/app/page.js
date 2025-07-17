"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "../components/auth/login-form"
import { Sidebar } from "../components/layout/sidebar"
import { AnalyticsDashboard } from "../components/dashboard/analytics-dashboard"

export default function Home() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }
  }, [])

  const handleLogin = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", userToken)
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setActiveTab("dashboard")
  }

  if (!user || !token) {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AnalyticsDashboard />
      case "customers":
        return (
          <div className="bg-gray-900 min-h-screen p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Customer Management</h1>
              <p className="text-gray-400">Customer management features will be implemented here</p>
            </div>
          </div>
        )
      case "deals":
        return (
          <div className="bg-gray-900 min-h-screen p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Sales Pipeline</h1>
              <p className="text-gray-400">Sales pipeline features will be implemented here</p>
            </div>
          </div>
        )
      case "campaigns":
        return (
          <div className="bg-gray-900 min-h-screen p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Marketing Campaigns</h1>
              <p className="text-gray-400">Campaign management features will be implemented here</p>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="bg-gray-900 min-h-screen p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    title: "Account Settings",
                    description: "Manage your profile, password, and account preferences",
                  },
                  {
                    title: "Team Management",
                    description: "Add team members, assign roles, and manage permissions",
                  },
                  {
                    title: "Integrations",
                    description: "Connect with third-party tools and services",
                  },
                  {
                    title: "Billing & Usage",
                    description: "View your subscription, usage, and billing information",
                  },
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors"
                  >
                    <h3 className="font-semibold text-white mb-2">{setting.title}</h3>
                    <p className="text-gray-400 text-sm">{setting.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      default:
        return <AnalyticsDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} user={user} />
      <main className="flex-1 overflow-auto bg-gray-900">{renderContent()}</main>
    </div>
  )
}
