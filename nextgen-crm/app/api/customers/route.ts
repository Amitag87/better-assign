import { type NextRequest, NextResponse } from "next/server"
import { mockCustomers } from "@/lib/data"
import type { Customer } from "@/lib/types"

export async function GET() {
  return NextResponse.json(mockCustomers)
}

export async function POST(request: NextRequest) {
  try {
    const customerData = await request.json()

    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customerData,
      createdAt: new Date().toISOString().split("T")[0],
      interactions: [],
    }

    mockCustomers.push(newCustomer)

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
