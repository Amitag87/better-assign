"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building2, Shield, Globe, Lock } from "lucide-react"

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("vikram.singh@nextgencrm.in")
  const [password, setPassword] = useState("admin123")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/backend/api/auth/login", {
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
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">NextGen CRM</h1>
                <p className="text-xs text-blue-400 font-medium">Enterprise Solution</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1 text-green-400">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Secure Platform</span>
              </div>
              <div className="text-gray-400">Trusted by Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Left Panel - Professional Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 leading-tight text-white">
                Enterprise Customer
                <br />
                <span className="text-blue-400">Relationship Management</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Streamline your business operations with professional-grade CRM solutions
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Enterprise Security</h3>
                  <p className="text-gray-300">Bank-grade security with advanced encryption and compliance standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Global Scale</h3>
                  <p className="text-gray-300">
                    Built for enterprise operations with multi-region support and scalability
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2 text-white">Data Protection</h3>
                  <p className="text-gray-300">GDPR compliant with advanced data protection and privacy controls</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-600">
              <p className="text-sm text-gray-300 mb-2">Professional Solution</p>
              <p className="text-white font-medium">"Increased our operational efficiency by 40%"</p>
              <p className="text-blue-400 text-sm">- Enterprise Client</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-900">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">NextGen CRM</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your enterprise account</p>
            </div>

            <Card className="border-gray-700 shadow-xl bg-gray-800">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive" className="border-red-600 bg-red-900/50">
                      <AlertDescription className="text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="text-sm text-gray-400 bg-gray-700/50 p-4 rounded-lg">
                    <p className="font-medium text-gray-300 mb-2">Demo Account:</p>
                    <p>Email: vikram.singh@nextgencrm.in</p>
                    <p>Password: admin123</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-gray-500 mt-8">Protected by enterprise-grade security protocols</p>
          </div>
        </div>
      </div>
    </div>
  )
}
