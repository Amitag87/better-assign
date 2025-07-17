"use client"

import { Users, TrendingUp, MessageCircle, BarChart3, Settings, LogOut, Rocket, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
  user: any
}

const menuItems = [
  { id: "dashboard", label: "Growth Dashboard", icon: BarChart3, badge: "🚀" },
  { id: "customers", label: "Customer Base", icon: Users, badge: "👥" },
  { id: "deals", label: "Revenue Pipeline", icon: TrendingUp, badge: "💰" },
  { id: "campaigns", label: "Growth Campaigns", icon: MessageCircle, badge: "📱" },
  { id: "settings", label: "Startup Settings", icon: Settings, badge: "⚙️" },
]

export function Sidebar({ activeTab, onTabChange, onLogout, user }: SidebarProps) {
  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white h-screen flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full filter blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-white/20 relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">
              NextGen CRM
            </h1>
            <p className="text-xs text-orange-200">Startup Edition</p>
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold">
                {user?.name?.charAt(0) || "F"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <div className="flex items-center space-x-2">
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-0.5">
                  {user?.role === "admin" ? "Founder" : user?.role === "sales" ? "Growth Lead" : "Marketing Head"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-orange-200">Territory: {user?.territory || "Pan India"}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 relative z-10">
        <div className="mb-4">
          <p className="text-xs font-medium text-orange-200 uppercase tracking-wider mb-2">Startup Growth Tools</p>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left text-sm p-3 rounded-xl transition-all duration-200 group",
                    activeTab === item.id
                      ? "bg-gradient-to-r from-orange-500/30 to-pink-500/30 text-white border border-orange-400/50 shadow-lg backdrop-blur-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white hover:scale-105",
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-lg group-hover:scale-110 transition-transform">{item.badge}</span>
                </Button>
              </li>
            )
          })}
        </ul>

        {/* Growth Metrics */}
        <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">Growth Metrics</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-white/70">Monthly Growth</span>
              <span className="text-green-400 font-bold">+28%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Revenue Target</span>
              <span className="text-orange-400 font-bold">₹10L</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 relative z-10">
        <Button
          variant="ghost"
          className="w-full justify-start text-white/80 hover:bg-red-500/20 hover:text-white p-3 rounded-xl transition-all duration-200"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
