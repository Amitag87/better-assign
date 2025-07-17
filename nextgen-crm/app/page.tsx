"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Sidebar } from "@/components/layout/sidebar"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { CustomerList } from "@/components/customers/customer-list"
import { SalesPipeline } from "@/components/deals/sales-pipeline"
import { CampaignList } from "@/components/campaigns/campaign-list"
import type { User } from "@/lib/types"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
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

  const handleLogin = (userData: User, userToken: string) => {
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
        return <CustomerList />
      case "deals":
        return <SalesPipeline />
      case "campaigns":
        return <CampaignList />
      case "settings":
        return (
          <div className="space-y-8">
            {/* Startup Settings Header */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Startup Settings ⚙️</h1>
                <p className="text-indigo-100">Configure your CRM for maximum growth</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "🚀 Growth Hacking Tools",
                  description: "Referral programs, A/B testing, and viral marketing features",
                  color: "from-green-500 to-emerald-600",
                  bgColor: "from-green-50 to-emerald-50",
                },
                {
                  title: "📱 WhatsApp Business API",
                  description: "Bulk messaging, chatbots, and customer support automation",
                  color: "from-green-600 to-green-700",
                  bgColor: "from-green-50 to-green-100",
                },
                {
                  title: "💰 Payment Gateway Setup",
                  description: "Razorpay, Paytm, UPI integration for seamless payments",
                  color: "from-blue-500 to-cyan-600",
                  bgColor: "from-blue-50 to-cyan-50",
                },
                {
                  title: "📊 Startup Analytics",
                  description: "Growth metrics, cohort analysis, and investor reporting",
                  color: "from-purple-500 to-pink-600",
                  bgColor: "from-purple-50 to-pink-50",
                },
                {
                  title: "🎯 Lead Generation",
                  description: "LinkedIn automation, cold email sequences, and lead magnets",
                  color: "from-orange-500 to-red-600",
                  bgColor: "from-orange-50 to-red-50",
                },
                {
                  title: "🏆 Team Collaboration",
                  description: "Slack integration, task management, and performance tracking",
                  color: "from-indigo-500 to-purple-600",
                  bgColor: "from-indigo-50 to-purple-50",
                },
              ].map((setting, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br ${setting.bgColor} hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${setting.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}
                    >
                      <div className="w-6 h-6 bg-white rounded-lg opacity-90"></div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">{setting.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{setting.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Ready to configure</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return <AnalyticsDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} user={user} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </main>
    </div>
  )
}
