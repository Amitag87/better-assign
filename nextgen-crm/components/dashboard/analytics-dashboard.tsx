"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  MessageCircle,
  IndianRupee,
  ArrowUpRight,
  Target,
  Zap,
  Rocket,
  Trophy,
  Plus,
  PhoneIcon as WhatsApp,
} from "lucide-react"

export function AnalyticsDashboard() {
  const growthStats = [
    {
      title: "Monthly Revenue",
      value: "₹8.5L",
      target: "₹10L",
      change: "+28%",
      icon: IndianRupee,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      title: "Customer Growth",
      value: "2,456",
      target: "3,000",
      change: "+35%",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      title: "Active Deals",
      value: "89",
      target: "100",
      change: "+12%",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      title: "WhatsApp Campaigns",
      value: "18",
      target: "25",
      change: "+22%",
      icon: MessageCircle,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
    },
  ]

  const startupActivities = [
    {
      id: 1,
      title: "🎉 New customer from Bangalore!",
      description: "Rajesh Kumar - Tech Solutions (₹2.5L deal potential)",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "🚀 Deal moved to final stage",
      description: "₹25L ERP project - 90% probability to close",
      time: "4 hours ago",
      type: "deal",
    },
    {
      id: 3,
      title: "📱 WhatsApp campaign launched",
      description: "Diwali Special - 2,500 messages sent, 85% delivered",
      time: "1 day ago",
      type: "campaign",
    },
    {
      id: 4,
      title: "💰 Payment received!",
      description: "₹5L from Hyderabad Textiles - Monthly target 50% achieved",
      time: "2 days ago",
      type: "payment",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Startup Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Growth Dashboard</h1>
                  <p className="text-orange-100">Scale your startup like a unicorn 🦄</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="font-medium">Top 10% Growth Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-300" />
                  <span className="font-medium">85% of Monthly Target</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">₹8.5L</div>
              <div className="text-orange-200">This Month's Revenue</div>
              <Badge className="bg-white/20 text-white mt-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +28% Growth
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {growthStats.map((stat) => {
          const Icon = stat.icon
          const progress =
            (Number.parseInt(stat.value.replace(/[₹,L]/g, "")) / Number.parseInt(stat.target.replace(/[₹,L]/g, ""))) *
            100
          return (
            <Card
              key={stat.title}
              className={`border-0 shadow-lg bg-gradient-to-br ${stat.bgColor} hover:scale-105 transition-all duration-300 group`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge className="bg-white/80 text-gray-700 text-xs">Target: {stat.target}</Badge>
                </div>
                <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-semibold">{stat.change}</span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{Math.round(progress)}% of target achieved</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Startup Growth Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Revenue Growth Trajectory
                </CardTitle>
                <CardDescription className="text-indigo-100">Your startup's growth story</CardDescription>
              </div>
              <Button variant="secondary" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Goal
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-indigo-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-600 font-medium mb-2">Interactive Growth Chart</p>
                <p className="text-gray-500 text-sm">Revenue, customers, and growth metrics visualization</p>
                <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600" size="sm">
                  <Zap className="h-4 w-4 mr-1" />
                  View Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Startup Activity Feed */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-xl">🚀 Startup Activity</CardTitle>
            <CardDescription className="text-orange-100">Real-time business updates</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {startupActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white hover:from-orange-50 hover:to-pink-50 transition-all duration-200 border border-gray-100 hover:border-orange-200"
                >
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "deal"
                          ? "bg-blue-500"
                          : activity.type === "campaign"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Startup Tools */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center">
              <WhatsApp className="h-5 w-5 mr-2 text-green-600" />
              WhatsApp Business Tools
            </CardTitle>
            <CardDescription>Connect with customers on their favorite platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Bulk WhatsApp Campaign
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-green-200 hover:bg-green-50 bg-transparent"
              >
                <Users className="mr-2 h-4 w-4" />
                Import WhatsApp Contacts
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900 flex items-center">
              <Target className="h-5 w-5 mr-2 text-purple-600" />
              Growth Hacking Tools
            </CardTitle>
            <CardDescription>Scale your startup with proven strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
                <Rocket className="mr-2 h-4 w-4" />
                Launch Referral Program
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-purple-200 hover:bg-purple-50 bg-transparent"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                A/B Test Campaigns
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
