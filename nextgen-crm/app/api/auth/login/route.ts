import { type NextRequest, NextResponse } from "next/server"
import { mockUsers } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simple authentication (in real app, use proper password hashing)
    const user = mockUsers.find((u) => u.email === email)

    if (!user || password !== "india123") {
      return NextResponse.json({ error: "गलत लॉगिन विवरण / Invalid credentials" }, { status: 401 })
    }

    // Generate a simple token (in real app, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return NextResponse.json({
      user,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "सर्वर त्रुटि / Server error" }, { status: 500 })
  }
}
