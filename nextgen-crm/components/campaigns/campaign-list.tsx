"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Mail, MessageSquare, MessageCircle } from "lucide-react"
import type { Campaign } from "@/lib/types"

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  paused: "bg-yellow-100 text-yellow-800",
}

const statusLabels = {
  draft: "मसौदा / Draft",
  active: "सक्रिय / Active",
  completed: "पूर्ण / Completed",
  paused: "रोका गया / Paused",
}

export function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch("/api/campaigns")
      const data = await response.json()
      setCampaigns(data)
    } catch (error) {
      console.error("अभियान डेटा लोड नहीं हो सका / Failed to fetch campaigns:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">अभियान डेटा लोड हो रहा है... / Loading campaigns...</div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">मार्केटिंग अभियान / Marketing Campaigns</h2>
          <p className="text-muted-foreground">
            अपने मार्केटिंग अभियानों का प्रबंधन करें और प्रदर्शन ट्रैक करें / Manage your marketing campaigns and track performance
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          नया अभियान / Create Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {campaigns.map((campaign) => {
          const deliveryRate =
            campaign.metrics.sent > 0 ? (campaign.metrics.delivered / campaign.metrics.sent) * 100 : 0
          const openRate =
            campaign.metrics.delivered > 0 ? (campaign.metrics.opened / campaign.metrics.delivered) * 100 : 0
          const clickRate = campaign.metrics.opened > 0 ? (campaign.metrics.clicked / campaign.metrics.opened) * 100 : 0
          const conversionRate =
            campaign.metrics.clicked > 0 ? (campaign.metrics.converted / campaign.metrics.clicked) * 100 : 0

          return (
            <Card key={campaign.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    {campaign.type === "email" ? (
                      <Mail className="h-5 w-5 text-blue-600" />
                    ) : campaign.type === "sms" ? (
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    ) : (
                      <MessageCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.targetAudience}</CardDescription>
                    </div>
                  </div>
                  <Badge className={statusColors[campaign.status]}>{statusLabels[campaign.status]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">निर्धारित: / Scheduled: {campaign.scheduledDate}</div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">भेजे गए / Sent</div>
                    <div className="text-2xl font-bold">{campaign.metrics.sent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">पहुंचे / Delivered</div>
                    <div className="text-2xl font-bold">{campaign.metrics.delivered.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">खोले गए / Opened</div>
                    <div className="text-2xl font-bold">{campaign.metrics.opened.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="font-medium">क्लिक किए / Clicked</div>
                    <div className="text-2xl font-bold">{campaign.metrics.clicked.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>डिलीवरी दर / Delivery Rate</span>
                    <span>{deliveryRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={deliveryRate} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>ओपन रेट / Open Rate</span>
                    <span>{openRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={openRate} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>क्लिक रेट / Click Rate</span>
                    <span>{clickRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={clickRate} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>रूपांतरण दर / Conversion Rate</span>
                    <span>{conversionRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={conversionRate} className="h-2" />
                </div>

                <div className="text-xs text-muted-foreground bg-orange-50 p-2 rounded">
                  <strong>संदेश पूर्वावलोकन / Message Preview:</strong>
                  <br />
                  {campaign.content.substring(0, 100)}...
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
