import { type NextRequest, NextResponse } from "next/server"
import { mockCampaigns } from "@/lib/data"
import type { Campaign } from "@/lib/types"

export async function GET() {
  return NextResponse.json(mockCampaigns)
}

export async function POST(request: NextRequest) {
  try {
    const campaignData = await request.json()

    const newCampaign: Campaign = {
      id: Date.now().toString(),
      ...campaignData,
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        converted: 0,
      },
    }

    mockCampaigns.push(newCampaign)

    return NextResponse.json(newCampaign, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}
