"use client"

import { MapPin, Phone, Navigation, Banknote } from "lucide-react"
import type { Order } from "@/lib/types"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types"

interface DriverViewProps {
  orders: Order[]
}

export function DriverView({ orders }: DriverViewProps) {
  const activeOrders = orders.filter((o) => o.status !== "livre_solde")

  if (activeOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
        <Navigation className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">Aucune livraison en cours</p>
        <p className="text-xs text-muted-foreground/70">Toutes les commandes sont sold&eacute;es.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Vue chauffeur ({activeOrders.length} livraison{activeOrders.length > 1 ? "s" : ""})
        </h3>
      </div>
      {activeOrders.map((order) => (
        <div key={order.id} className="rounded-xl border border-border bg-card p-4">
          <div className="mb-2 flex items-start justify-between">
            <span className="font-mono text-xs font-semibold text-muted-foreground">{order.id}</span>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[order.status]}`}
            >
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          <div className="mb-3 rounded-lg bg-secondary/70 p-3">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{order.address}</p>
                <p className="text-sm text-foreground">
                  {order.zipCode} {order.city}
                </p>
                {order.instructions && (
                  <p className="mt-1 text-xs text-muted-foreground">{order.instructions}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-bold text-foreground">{order.remaining}&euro; &agrave; encaisser</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${order.phone}`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                title="Appeler"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${order.address}, ${order.zipCode} ${order.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Navigation className="h-4 w-4" />
                Maps
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
