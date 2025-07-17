"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, Zap, TrendingUp, Users, Star } from "lucide-react"

interface LoginFormProps {
  onLogin: (user: any, token: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("vikram.singh@nextgencrm.in")
  const [password, setPassword] = useState("india123")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      onLogin(data.user, data.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : "लॉगिन में समस्या / Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Rocket className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NextGen CRM</h1>
                <p className="text-xs text-orange-600 font-medium">For Indian Startups</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1 text-green-600">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">4.8/5 Rating</span>
              </div>
              <div className="text-gray-600">10,000+ Startups Trust Us</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Panel - Value Props */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Scale Your Startup
                <br />
                <span className="text-orange-200">10x Faster</span>
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Join 10,000+ Indian startups using NextGen CRM to grow from idea to IPO
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Setup in 5 Minutes</h3>
                  <p className="text-orange-100">
                    No complex setup. Start selling immediately with our startup-friendly interface
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Grow Revenue by 300%</h3>
                  <p className="text-orange-100">
                    Track every lead, close more deals, and scale your revenue like successful startups
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Built for Indian Market</h3>
                  <p className="text-orange-100">WhatsApp integration, GST compliance, and regional language support</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <p className="text-sm text-orange-100 mb-2">💡 Startup Success Story</p>
              <p className="text-white font-medium">"We scaled from ₹10L to ₹10Cr ARR using NextGen CRM"</p>
              <p className="text-orange-200 text-sm">- Founder, Bangalore Tech Startup</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Rocket className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">NextGen CRM</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Founder! 🚀</h2>
              <p className="text-gray-600">Continue building your startup empire</p>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-lg"
                      placeholder="founder@yourstartup.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-lg"
                      placeholder="Enter your password"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertDescription className="text-red-800">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold text-lg shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Logging in...</span>
                      </div>
                    ) : (
                      "Start Growing 🚀"
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-600 bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-lg border border-orange-200">
                    <p className="font-medium text-gray-800 mb-2">🎯 Demo Account (Try Now!):</p>
                    <p>Email: vikram.singh@nextgencrm.in</p>
                    <p>Password: india123</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                🔒 Trusted by 10,000+ Indian startups • 99.9% uptime • Bank-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
