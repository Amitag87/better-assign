"use client"

import { Users, TrendingUp, MessageCircle, BarChart3, Settings, LogOut, Building2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "deals", label: "Sales Pipeline", icon: TrendingUp },
  { id: "campaigns", label: "Campaigns", icon: MessageCircle },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeTab, onTabChange, onLogout, user }) {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">NextGen CRM</h1>
            <p className="text-xs text-gray-400">Enterprise</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-10 px-3 text-sm font-medium",
                    activeTab === item.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.label}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Menu */}
      <div className="p-4 border-t border-gray-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-12 px-3 text-gray-300 hover:bg-gray-700">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
            <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Profile Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Billing</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Team</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:bg-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
