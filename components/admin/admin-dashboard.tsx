"use client"

import { useState } from "react"
import { LayoutGrid, Car } from "lucide-react"
import type { Order, OrderStatus } from "@/lib/types"
import { KpiCards } from "./kpi-cards"
import { OrderFilters } from "./order-filters"
import { OrdersTable } from "./orders-table"
import { DriverView } from "./driver-view"

interface AdminDashboardProps {
  orders: Order[]
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void
}

export function AdminDashboard({ orders, onUpdateStatus }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
  const [viewMode, setViewMode] = useState<"table" | "driver">("table")

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== "all" && order.deliverySlot !== activeTab) return false
    if (statusFilter !== "all" && order.status !== statusFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        order.clientName.toLowerCase().includes(q) ||
        order.phone.includes(q) ||
        order.id.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
            Centre de livraison
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            G&eacute;rez vos commandes et vos livraisons en temps r&eacute;el.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "table"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Tableau</span>
          </button>
          <button
            onClick={() => setViewMode("driver")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              viewMode === "driver"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Car className="h-4 w-4" />
            <span className="hidden sm:inline">Chauffeur</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <KpiCards orders={orders} />

        {viewMode === "table" && (
          <>
            <OrderFilters
              activeTab={activeTab}
              onTabChange={setActiveTab}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
            />
            <OrdersTable orders={filteredOrders} onUpdateStatus={onUpdateStatus} />
          </>
        )}

        {viewMode === "driver" && <DriverView orders={filteredOrders.length ? filteredOrders : orders} />}
      </div>
    </div>
  )
}
