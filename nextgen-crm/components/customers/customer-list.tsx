"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Building,
  Users,
  TrendingUp,
  PhoneIcon as WhatsApp,
  Star,
  Zap,
} from "lucide-react"
import type { Customer } from "@/lib/types"
import { CustomerForm } from "./customer-form"

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers")
      const data = await response.json()
      setCustomers(data)
    } catch (error) {
      console.error("Failed to fetch customers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCustomerAdded = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer])
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Users className="h-6 w-6 text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading your customer base...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Startup Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Customer Base</h1>
                  <p className="text-blue-100">Build relationships that scale your startup 🚀</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-300" />
                  <span className="font-medium">35% Monthly Growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="font-medium">4.8/5 Customer Rating</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Customer
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter((c) => c.status === "active").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">+{Math.floor(customers.length * 0.15)}</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">WhatsApp Ready</p>
                <p className="text-2xl font-bold text-gray-900">{Math.floor(customers.length * 0.85)}</p>
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <WhatsApp className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search customers by name, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <Button variant="outline" className="h-12 border-gray-300 bg-transparent">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-3 rounded-lg">
          <span className="font-semibold text-gray-900">{filteredCustomers.length}</span> customers found
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer, index) => (
          <Card
            key={customer.id}
            className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:scale-105 relative overflow-hidden"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                index % 4 === 0
                  ? "from-blue-400 to-cyan-500"
                  : index % 4 === 1
                    ? "from-green-400 to-emerald-500"
                    : index % 4 === 2
                      ? "from-orange-400 to-pink-500"
                      : "from-purple-400 to-indigo-500"
              }`}
            ></div>

            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback
                      className={`font-bold text-white bg-gradient-to-br ${
                        index % 4 === 0
                          ? "from-blue-400 to-cyan-500"
                          : index % 4 === 1
                            ? "from-green-400 to-emerald-500"
                            : index % 4 === 2
                              ? "from-orange-400 to-pink-500"
                              : "from-purple-400 to-indigo-500"
                      }`}
                    >
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg text-gray-900">{customer.name}</CardTitle>
                    <p className="text-sm text-gray-600 font-medium">{customer.company}</p>
                  </div>
                </div>
                <Badge
                  className={`${
                    customer.status === "active"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-gray-100 text-gray-800 border-gray-200"
                  } border`}
                >
                  {customer.status === "active" ? "🟢 Active" : "⚪ Inactive"}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Mail className="mr-2 h-4 w-4 text-blue-500" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Phone className="mr-2 h-4 w-4 text-green-500" />
                {customer.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                {customer.city}, {customer.state}
              </div>
              {customer.gstNumber && (
                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Building className="mr-2 h-4 w-4 text-purple-500" />
                  <span className="font-mono text-xs">GST: {customer.gstNumber}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Since:</span> {customer.createdAt}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">{customer.interactions.length} interactions</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <WhatsApp className="mr-1 h-3 w-3" />
                  WhatsApp
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Mail className="mr-1 h-3 w-3" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && <CustomerForm onClose={() => setShowForm(false)} onCustomerAdded={handleCustomerAdded} />}
    </div>
  )
}
