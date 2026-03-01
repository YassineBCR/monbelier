"use client"

import { Package, Euro, Truck, CheckCircle2 } from "lucide-react"
import type { Order } from "@/lib/types"

interface KpiCardsProps {
  orders: Order[]
}

export function KpiCards({ orders }: KpiCardsProps) {
  const totalOrders = orders.length
  const totalDeposits = orders.reduce((sum, o) => sum + o.deposit, 0)
  const pendingDeliveries = orders.filter((o) => o.status !== "livre_solde").length
  const remainingCash = orders.filter((o) => o.status !== "livre_solde").reduce((sum, o) => sum + o.remaining, 0)
  const completedOrders = orders.filter((o) => o.status === "livre_solde").length

  const kpis = [
    {
      label: "Commandes totales",
      value: totalOrders,
      icon: Package,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Acomptes encaiss\u00e9s",
      value: `${totalDeposits.toLocaleString("fr-FR")}\u20ac`,
      icon: Euro,
      color: "text-primary bg-primary/10",
    },
    {
      label: "Livraisons en attente",
      value: pendingDeliveries,
      subtitle: `${remainingCash.toLocaleString("fr-FR")}\u20ac \u00e0 encaisser`,
      icon: Truck,
      color: "text-amber-700 bg-amber-100",
    },
    {
      label: "Livr\u00e9es & sold\u00e9es",
      value: completedOrders,
      icon: CheckCircle2,
      color: "text-primary bg-primary/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon
        return (
          <div
            key={kpi.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{kpi.label}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${kpi.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{kpi.value}</p>
            {kpi.subtitle && (
              <p className="mt-0.5 text-xs text-muted-foreground">{kpi.subtitle}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}
