import { type NextRequest, NextResponse } from "next/server"
import { mockDeals } from "@/lib/data"
import type { Deal } from "@/lib/types"

export async function GET() {
  return NextResponse.json(mockDeals)
}

export async function POST(request: NextRequest) {
  try {
    const dealData = await request.json()

    const newDeal: Deal = {
      id: Date.now().toString(),
      ...dealData,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    mockDeals.push(newDeal)

    return NextResponse.json(newDeal, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create deal" }, { status: 500 })
  }
}
