"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, IndianRupee } from "lucide-react"
import type { Deal } from "@/lib/types"

const stageColors = {
  lead: "bg-blue-100 text-blue-800",
  proposal: "bg-purple-100 text-purple-800",
  negotiation: "bg-yellow-100 text-yellow-800",
  "closed-won": "bg-green-100 text-green-800",
  "closed-lost": "bg-red-100 text-red-800",
}

const stageLabels = {
  lead: "लीड / Lead",
  proposal: "प्रस्ताव / Proposal",
  negotiation: "बातचीत / Negotiation",
  "closed-won": "सफल / Closed Won",
  "closed-lost": "असफल / Closed Lost",
}

export function SalesPipeline() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    try {
      const response = await fetch("/api/deals")
      const data = await response.json()
      setDeals(data)
    } catch (error) {
      console.error("डील डेटा लोड नहीं हो सका / Failed to fetch deals:", error)
    } finally {
      setLoading(false)
    }
  }

  const dealsByStage = deals.reduce(
    (acc, deal) => {
      if (!acc[deal.stage]) {
        acc[deal.stage] = []
      }
      acc[deal.stage].push(deal)
      return acc
    },
    {} as Record<string, Deal[]>,
  )

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)
  const activeDeals = deals.filter((deal) => !deal.stage.includes("closed"))

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">डील डेटा लोड हो रहा है... / Loading deals...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">बिक्री पाइपलाइन / Sales Pipeline</h2>
          <p className="text-muted-foreground">
            बिक्री प्रक्रिया के माध्यम से अपने सौदों को ट्रैक करें / Track your deals through the sales process
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" />
          नई डील / Add Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">कुल पाइपलाइन मूल्य / Total Pipeline Value</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatIndianCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">
              {totalValue >= 10000000
                ? `${(totalValue / 10000000).toFixed(1)} करोड़ / Crores`
                : totalValue >= 100000
                  ? `${(totalValue / 100000).toFixed(1)} लाख / Lakhs`
                  : `${totalValue.toLocaleString()} रुपये / Rupees`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">सक्रिय डील / Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDeals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">सफलता दर / Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        {Object.entries(stageLabels).map(([stage, label]) => (
          <div key={stage} className="space-y-4">
            <h3 className="font-semibold text-lg border-b-2 border-orange-200 pb-2">{label}</h3>
            <div className="space-y-3">
              {(dealsByStage[stage] || []).map((deal) => (
                <Card key={deal.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-400">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{deal.title}</CardTitle>
                    <CardDescription className="text-xs">अपेक्षित: / Expected: {deal.expectedCloseDate}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-green-600">{formatIndianCurrency(deal.value)}</span>
                        <Badge className={stageColors[stage as keyof typeof stageColors]}>{deal.probability}%</Badge>
                      </div>
                      {deal.paymentTerms && (
                        <div className="text-xs text-muted-foreground">भुगतान: / Payment: {deal.paymentTerms}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
