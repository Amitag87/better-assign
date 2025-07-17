// Customer data structure
export const CustomerSchema = {
  id: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  gstNumber: "",
  city: "",
  state: "",
  status: "active", // 'active' | 'inactive'
  createdAt: "",
  interactions: [],
}

// Interaction data structure
export const InteractionSchema = {
  id: "",
  type: "call", // 'call' | 'email' | 'meeting' | 'whatsapp'
  description: "",
  date: "",
  userId: "",
}

// Deal data structure
export const DealSchema = {
  id: "",
  title: "",
  customerId: "",
  value: 0, // in INR
  stage: "lead", // 'lead' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: 0,
  expectedCloseDate: "",
  createdAt: "",
  updatedAt: "",
  paymentTerms: "",
}

// Campaign data structure
export const CampaignSchema = {
  id: "",
  name: "",
  type: "email", // 'email' | 'sms' | 'whatsapp'
  status: "draft", // 'draft' | 'active' | 'completed' | 'paused'
  targetAudience: "",
  content: "",
  scheduledDate: "",
  metrics: {
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
  },
}

// User data structure
export const UserSchema = {
  id: "",
  name: "",
  email: "",
  role: "admin", // 'admin' | 'sales' | 'marketing'
  permissions: [],
  territory: "",
}

// Auth response structure
export const AuthResponseSchema = {
  user: UserSchema,
  token: "",
}
