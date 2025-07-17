import { type NextRequest, NextResponse } from "next/server"
import { mockCustomers } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const customer = mockCustomers.find((c) => c.id === params.id)

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  return NextResponse.json(customer)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await request.json()
    const customerIndex = mockCustomers.findIndex((c) => c.id === params.id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    mockCustomers[customerIndex] = { ...mockCustomers[customerIndex], ...updates }

    return NextResponse.json(mockCustomers[customerIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const customerIndex = mockCustomers.findIndex((c) => c.id === params.id)

  if (customerIndex === -1) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  mockCustomers.splice(customerIndex, 1)

  return NextResponse.json({ message: "Customer deleted successfully" })
}
