"use client"

import { useState } from "react"
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  MapPin,
  Clock,
  Banknote,
  Copy,
  PartyPopper,
  ShieldCheck,
} from "lucide-react"
import type { DeliverySlot, Order } from "@/lib/types"

interface PaymentSectionProps {
  selectedSlot: DeliverySlot
  formData: {
    name: string
    phone: string
    email: string
    address: string
    city: string
    zipCode: string
    instructions: string
  }
  onBack: () => void
  onComplete: (order: Order) => void
}

export function PaymentSection({ selectedSlot, formData, onBack, onComplete }: PaymentSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [orderId, setOrderId] = useState("")

  function handlePayment() {
    setIsProcessing(true)
    setTimeout(() => {
      const id = `MB-${String(Math.floor(1000 + Math.random() * 9000))}`
      setOrderId(id)

      const order: Order = {
        id,
        clientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        instructions: formData.instructions,
        deliverySlot: selectedSlot,
        status: "acompte_paye",
        totalPrice: 300,
        deposit: 100,
        remaining: 200,
        createdAt: new Date().toISOString(),
      }

      onComplete(order)
      setCompleted(true)
      setIsProcessing(false)
    }, 2000)
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <PartyPopper className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
            Commande confirm&eacute;e !
          </h2>
          <p className="mt-2 text-muted-foreground">Votre mouton est r&eacute;serv&eacute;.</p>

          <div className="mt-6 w-full rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Commande n&deg;</span>
              <span className="rounded-md bg-primary/10 px-3 py-1 font-mono text-lg font-bold text-primary">
                {orderId}
              </span>
              <button
                onClick={() => navigator.clipboard?.writeText(orderId)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary"
                aria-label="Copier le num&eacute;ro de commande"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 w-full rounded-xl border border-border bg-card p-5 text-left">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Adresse de livraison</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.address}, {formData.zipCode} {formData.city}
                  </p>
                  {formData.instructions && (
                    <p className="mt-1 text-xs text-muted-foreground/80">{formData.instructions}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Cr&eacute;neau</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSlot === "J+1" ? "Lendemain (J+1)" : "Sur-lendemain (J+2)"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Reste &agrave; payer</p>
                  <p className="text-lg font-bold text-foreground">200&euro; en esp&egrave;ces</p>
                  <p className="text-xs text-muted-foreground">
                    &Agrave; r&eacute;gler au livreur lors de la r&eacute;ception.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <Banknote className="h-4 w-4 shrink-0" />
            <span>Pensez &agrave; pr&eacute;parer 200&euro; en esp&egrave;ces pour le livreur.</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Step indicator */}
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-1 items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-primary" />
          <div className="h-1.5 flex-1 rounded-full bg-primary" />
          <div className="h-1.5 flex-1 rounded-full bg-primary" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">3/3</span>
      </div>

      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        R&eacute;capitulatif & Paiement
      </h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        V&eacute;rifiez votre commande avant de payer l{"'"}acompte.
      </p>

      {/* Summary Card */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          R&eacute;capitulatif
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Mouton entier</span>
            <span className="font-medium text-foreground">300&euro;</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              Cr&eacute;neau : {selectedSlot === "J+1" ? "Lendemain" : "Sur-lendemain"}
            </span>
            <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {selectedSlot}
            </span>
          </div>
          <div className="border-t border-dashed border-border" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Acompte (en ligne)</span>
            <span className="font-semibold text-primary">-100&euro;</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Reste &agrave; payer (livraison)</span>
            <span className="text-lg font-bold text-foreground">200&euro;</span>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Livraison chez</span>
        </div>
        <p className="mt-2 font-medium text-foreground">{formData.name}</p>
        <p className="text-sm text-muted-foreground">
          {formData.address}, {formData.zipCode} {formData.city}
        </p>
        {formData.instructions && (
          <p className="mt-1 text-xs text-muted-foreground/80">{formData.instructions}</p>
        )}
      </div>

      {/* Security notice */}
      <div className="mb-6 flex items-center gap-2 rounded-lg bg-secondary px-4 py-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-xs text-muted-foreground">
          Paiement s&eacute;curis&eacute;. Vos donn&eacute;es sont prot&eacute;g&eacute;es.
        </p>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:opacity-60"
      >
        {isProcessing ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
            Traitement en cours...
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            {"Payer l'acompte (100\u20ac)"}
          </>
        )}
      </button>
    </div>
  )
}
