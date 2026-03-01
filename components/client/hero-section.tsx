"use client"

import Image from "next/image"
import { Calendar, Clock, Package, CheckCircle2, ArrowRight, Euro } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { DeliverySlot } from "@/lib/types"

interface HeroSectionProps {
  selectedSlot: DeliverySlot | null
  onSelectSlot: (slot: DeliverySlot) => void
  onContinue: () => void
}

const slots = [
  {
    id: "J+1" as DeliverySlot,
    label: "Lendemain (J+1)",
    subtitle: "Livraison demain matin",
    remaining: 85,
    total: 100,
    icon: Clock,
  },
  {
    id: "J+2" as DeliverySlot,
    label: "Sur-lendemain (J+2)",
    subtitle: "Livraison dans 2 jours",
    remaining: 50,
    total: 100,
    icon: Calendar,
  },
]

export function HeroSection({ selectedSlot, onSelectSlot, onContinue }: HeroSectionProps) {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {/* Hero Banner */}
      <div className="mb-8 text-center">
        <div className="relative mx-auto mb-6 h-40 w-full overflow-hidden rounded-2xl sm:h-48">
          <Image
            src="/images/sheep-hero.jpg"
            alt="Mouton dans un pr&eacute; verdoyant"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary/90 px-4 py-1.5 backdrop-blur-sm">
              <Package className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Aid El Kebir 2025</span>
            </div>
          </div>
        </div>
        <h2 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          <span className="text-balance">Votre mouton, livr&eacute; chez vous</span>
        </h2>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
          Choisissez votre cr&eacute;neau de livraison et r&eacute;glez un acompte pour r&eacute;server.
        </p>
      </div>

      {/* Slot Cards */}
      <div className="mb-6 flex flex-col gap-3">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot.id
          const percentage = (slot.remaining / slot.total) * 100
          const Icon = slot.icon
          return (
            <button
              key={slot.id}
              onClick={() => onSelectSlot(slot.id)}
              className={`group relative flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-md"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{slot.label}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{slot.subtitle}</p>
                  </div>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Places restantes</span>
                    <span className="font-semibold text-foreground">
                      {slot.remaining}/{slot.total}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Pricing Summary */}
      <div className="mb-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Euro className="h-4 w-4" />
          <span>D&eacute;tail du prix</span>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Mouton entier</span>
            <span className="font-medium text-foreground">300&euro;</span>
          </div>
          <div className="border-t border-dashed border-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Acompte &agrave; r&eacute;gler maintenant</span>
            <span className="text-lg font-bold text-primary">100&euro;</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Reste &agrave; payer &agrave; la livraison : 200&euro; (esp&egrave;ces)
          </p>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={!selectedSlot}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        Continuer
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )
}
