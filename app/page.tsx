"use client"

import { useState, useCallback } from "react"
import { AppHeader } from "@/components/app-header"
import { HeroSection } from "@/components/client/hero-section"
import { LogisticsForm } from "@/components/client/logistics-form"
import { PaymentSection } from "@/components/client/payment-section"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { generateMockOrders } from "@/lib/mock-data"
import type { DeliverySlot, Order, OrderStatus } from "@/lib/types"

type ClientStep = "selection" | "logistics" | "payment"

export default function Page() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [orders, setOrders] = useState<Order[]>(() => generateMockOrders(18))

  // Client flow state
  const [clientStep, setClientStep] = useState<ClientStep>("selection")
  const [selectedSlot, setSelectedSlot] = useState<DeliverySlot | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    instructions: "",
  })

  const handleToggleMode = useCallback(() => {
    setIsAdmin((prev) => !prev)
  }, [])

  const handleUpdateForm = useCallback((data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }, [])

  const handleOrderComplete = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev])
  }, [])

  const handleUpdateStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, remaining: newStatus === "livre_solde" ? 0 : o.remaining }
          : o
      )
    )
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppHeader isAdmin={isAdmin} onToggle={handleToggleMode} />

      {isAdmin ? (
        <AdminDashboard orders={orders} onUpdateStatus={handleUpdateStatus} />
      ) : (
        <main>
          {clientStep === "selection" && (
            <HeroSection
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
              onContinue={() => {
                if (selectedSlot) setClientStep("logistics")
              }}
            />
          )}
          {clientStep === "logistics" && (
            <LogisticsForm
              formData={formData}
              onUpdateForm={handleUpdateForm}
              onBack={() => setClientStep("selection")}
              onContinue={() => setClientStep("payment")}
            />
          )}
          {clientStep === "payment" && selectedSlot && (
            <PaymentSection
              selectedSlot={selectedSlot}
              formData={formData}
              onBack={() => setClientStep("logistics")}
              onComplete={handleOrderComplete}
            />
          )}
        </main>
      )}

      <footer className="border-t border-border bg-card py-6 text-center">
        <p className="text-xs text-muted-foreground">
          MonBelier &copy; 2025 &mdash; Livraison de moutons pour l{"'"}Aid El Kebir
        </p>
      </footer>
    </div>
  )
}
