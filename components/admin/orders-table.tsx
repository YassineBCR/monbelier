"use client"

import { MapPin, Phone, Truck, CheckCircle2 } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/types"

interface OrdersTableProps {
  orders: Order[]
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void
}

export function OrdersTable({ orders, onUpdateStatus }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center">
        <Truck className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">Aucune commande trouv&eacute;e</p>
        <p className="text-xs text-muted-foreground/70">Essayez de modifier vos filtres.</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  #ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Adresse
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  T&eacute;l&eacute;phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statut
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Reste
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`border-b border-border/50 transition-colors hover:bg-secondary/30 ${
                    idx % 2 === 0 ? "" : "bg-secondary/20"
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-semibold text-foreground">{order.id}</span>
                    <span className="ml-2 rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {order.deliverySlot}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{order.clientName}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </td>
                  <td className="max-w-[200px] px-4 py-3">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm text-foreground">{order.address}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.zipCode} {order.city}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`tel:${order.phone}`}
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {order.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[order.status]}`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-bold ${order.remaining > 0 ? "text-foreground" : "text-primary"}`}>
                      {order.remaining > 0 ? `${order.remaining}\u20ac` : "Sold\u00e9"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`tel:${order.phone}`}
                        className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        title="Appeler"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      {order.status === "acompte_paye" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "en_livraison")}
                          className="flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-2 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                          title="Partir en livraison"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span className="hidden xl:inline">Livraison</span>
                        </button>
                      )}
                      {order.status === "en_livraison" && (
                        <button
                          onClick={() => onUpdateStatus(order.id, "livre_solde")}
                          className="flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                          title="Livr&eacute; & Encaiss&eacute;"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="hidden xl:inline">Encaiss&eacute;</span>
                        </button>
                      )}
                      {order.status === "livre_solde" && (
                        <span className="flex items-center gap-1 rounded-lg bg-primary/5 px-2.5 py-2 text-xs font-medium text-primary">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-3 lg:hidden">
        {orders.map((order) => (
          <MobileOrderCard key={order.id} order={order} onUpdateStatus={onUpdateStatus} />
        ))}
      </div>
    </>
  )
}

function MobileOrderCard({
  order,
  onUpdateStatus,
}: {
  order: Order
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-foreground">{order.id}</span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {order.deliverySlot}
            </span>
          </div>
          <p className="mt-0.5 text-sm font-medium text-foreground">{order.clientName}</p>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[order.status]}`}
        >
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="mb-3 flex items-start gap-2 rounded-lg bg-secondary/50 p-2.5">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-sm text-foreground">{order.address}</p>
          <p className="text-xs text-muted-foreground">
            {order.zipCode} {order.city}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${order.phone}`}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            Appeler
          </a>
          <span className="text-sm font-bold text-foreground">
            {order.remaining > 0 ? `${order.remaining}\u20ac` : "Sold\u00e9"}
          </span>
        </div>
        <div>
          {order.status === "acompte_paye" && (
            <button
              onClick={() => onUpdateStatus(order.id, "en_livraison")}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <Truck className="h-4 w-4" />
              Livrer
            </button>
          )}
          {order.status === "en_livraison" && (
            <button
              onClick={() => onUpdateStatus(order.id, "livre_solde")}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <CheckCircle2 className="h-4 w-4" />
              Encaisser
            </button>
          )}
          {order.status === "livre_solde" && (
            <span className="flex items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Termin&eacute;
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
