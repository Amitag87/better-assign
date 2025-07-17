import { NextResponse } from "next/server"
import { mockUsers } from "../../../lib/data.js"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // Simple authentication (in real app, use proper password hashing)
    const user = mockUsers.find((u) => u.email === email)

    if (!user || password !== "admin123") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate a simple token (in real app, use JWT)
    const token = `token_${user.id}_${Date.now()}`

    return NextResponse.json({
      user,
      token,
    })
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
