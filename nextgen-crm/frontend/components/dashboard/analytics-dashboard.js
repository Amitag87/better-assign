"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, MessageCircle, IndianRupee, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "2,456",
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
      description: "Active customer accounts",
    },
    {
      title: "Revenue",
      value: "₹1,25,00,000",
      change: "+28.4%",
      changeType: "positive",
      icon: IndianRupee,
      description: "Monthly recurring revenue",
    },
    {
      title: "Active Deals",
      value: "89",
      change: "+8.2%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Deals in pipeline",
    },
    {
      title: "Campaign Performance",
      value: "94.2%",
      change: "-2.1%",
      changeType: "negative",
      icon: MessageCircle,
      description: "Average open rate",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      title: "New customer registered",
      description: "Rajesh Kumar from Tech Solutions Pvt Ltd",
      time: "2 hours ago",
      type: "customer",
    },
    {
      id: 2,
      title: "Deal moved to negotiation",
      description: "₹25,00,000 - ERP Implementation project",
      time: "4 hours ago",
      type: "deal",
    },
    {
      id: 3,
      title: "Campaign launched",
      description: "Q4 Business Solutions - 2,500 recipients",
      time: "1 day ago",
      type: "campaign",
    },
    {
      id: 4,
      title: "Payment received",
      description: "₹5,00,000 from Hyderabad Textiles Ltd",
      time: "2 days ago",
      type: "payment",
    },
  ]

  return (
    <div className="space-y-8 bg-gray-900 min-h-screen p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New Customer
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Icon className="h-4 w-4 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="flex items-center text-sm">
                  {stat.changeType === "positive" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={stat.changeType === "positive" ? "text-green-400" : "text-red-400"}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart Area */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Revenue Overview</CardTitle>
            <CardDescription className="text-gray-400">Monthly revenue and growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-700 rounded-lg border-2 border-dashed border-gray-600">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-300 font-medium">Revenue Chart</p>
                <p className="text-gray-500 text-sm">Interactive chart will be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "customer"
                        ? "bg-blue-500"
                        : activity.type === "deal"
                          ? "bg-green-500"
                          : activity.type === "campaign"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Top Performing Regions</CardTitle>
            <CardDescription className="text-gray-400">Sales performance by territory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { region: "Maharashtra", revenue: "₹45,00,000", growth: "+15%" },
                { region: "Karnataka", revenue: "₹32,00,000", growth: "+12%" },
                { region: "Tamil Nadu", revenue: "₹28,00,000", growth: "+8%" },
                { region: "Gujarat", revenue: "₹20,00,000", growth: "+22%" },
              ].map((region) => (
                <div key={region.region} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{region.region}</p>
                    <p className="text-sm text-gray-400">{region.revenue}</p>
                  </div>
                  <span className="text-sm text-green-400 font-medium">{region.growth}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="justify-start h-10 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Users className="mr-2 h-4 w-4" />
                Add New Customer
              </Button>
              <Button
                variant="outline"
                className="justify-start h-10 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Create Deal
              </Button>
              <Button
                variant="outline"
                className="justify-start h-10 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Launch Campaign
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
