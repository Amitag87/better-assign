export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  gstNumber?: string
  city: string
  state: string
  status: "active" | "inactive"
  createdAt: string
  interactions: Interaction[]
}

export interface Interaction {
  id: string
  type: "call" | "email" | "meeting" | "whatsapp"
  description: string
  date: string
  userId: string
}

export interface Deal {
  id: string
  title: string
  customerId: string
  value: number // in INR
  stage: "lead" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  probability: number
  expectedCloseDate: string
  createdAt: string
  updatedAt: string
  paymentTerms?: string
}

export interface Campaign {
  id: string
  name: string
  type: "email" | "sms" | "whatsapp"
  status: "draft" | "active" | "completed" | "paused"
  targetAudience: string
  content: string
  scheduledDate: string
  metrics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
  }
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "sales" | "marketing"
  permissions: string[]
  territory?: string
}

export interface AuthResponse {
  user: User
  token: string
}
