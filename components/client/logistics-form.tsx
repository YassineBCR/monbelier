"use client"

import { useState } from "react"
import { User, Phone, Mail, MapPin, Home, FileText, ArrowLeft, ArrowRight } from "lucide-react"

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  city: string
  zipCode: string
  instructions: string
}

interface LogisticsFormProps {
  formData: FormData
  onUpdateForm: (data: Partial<FormData>) => void
  onBack: () => void
  onContinue: () => void
}

export function LogisticsForm({ formData, onUpdateForm, onBack, onContinue }: LogisticsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Nom requis"
    if (!formData.phone.trim()) newErrors.phone = "T\u00e9l\u00e9phone requis"
    if (!formData.email.trim()) newErrors.email = "Email requis"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email invalide"
    if (!formData.address.trim()) newErrors.address = "Adresse requise"
    if (!formData.city.trim()) newErrors.city = "Ville requise"
    if (!formData.zipCode.trim()) newErrors.zipCode = "Code postal requis"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (validate()) onContinue()
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
          <div className="h-1.5 flex-1 rounded-full bg-border" />
        </div>
        <span className="text-sm font-medium text-muted-foreground">2/3</span>
      </div>

      <h2 className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
        Informations de livraison
      </h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">
        Renseignez vos coordonn&eacute;es et votre adresse de livraison.
      </p>

      {/* Personal info section */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <User className="h-4 w-4" />
          Coordonn&eacute;es
        </h3>
        <div className="flex flex-col gap-3">
          <FieldInput
            icon={<User className="h-4 w-4" />}
            label="Nom complet"
            placeholder="Mohamed Bouzidi"
            value={formData.name}
            error={errors.name}
            onChange={(v) => onUpdateForm({ name: v })}
          />
          <FieldInput
            icon={<Phone className="h-4 w-4" />}
            label="T&eacute;l&eacute;phone"
            placeholder="06 12 34 56 78"
            type="tel"
            value={formData.phone}
            error={errors.phone}
            onChange={(v) => onUpdateForm({ phone: v })}
          />
          <FieldInput
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            placeholder="mohamed@email.com"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={(v) => onUpdateForm({ email: v })}
          />
        </div>
      </div>

      {/* Address section */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Adresse de livraison
        </h3>
        <div className="flex flex-col gap-3">
          <FieldInput
            icon={<Home className="h-4 w-4" />}
            label="Adresse"
            placeholder="12 Rue des Lilas"
            value={formData.address}
            error={errors.address}
            onChange={(v) => onUpdateForm({ address: v })}
            large
          />
          <div className="grid grid-cols-2 gap-3">
            <FieldInput
              label="Ville"
              placeholder="Paris"
              value={formData.city}
              error={errors.city}
              onChange={(v) => onUpdateForm({ city: v })}
            />
            <FieldInput
              label="Code postal"
              placeholder="75020"
              value={formData.zipCode}
              error={errors.zipCode}
              onChange={(v) => onUpdateForm({ zipCode: v })}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                Instructions pour le livreur
              </span>
            </label>
            <textarea
              placeholder="Code d'entr&eacute;e, &eacute;tage, b&acirc;timent..."
              value={formData.instructions}
              onChange={(e) => onUpdateForm({ instructions: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90"
      >
        Continuer vers le paiement
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )
}

interface FieldInputProps {
  icon?: React.ReactNode
  label: string
  placeholder: string
  value: string
  error?: string
  onChange: (value: string) => void
  type?: string
  large?: boolean
}

function FieldInput({ icon, label, placeholder, value, error, onChange, type = "text", large }: FieldInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {icon ? (
          <span className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{icon}</span>
            {label}
          </span>
        ) : (
          label
        )}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          error ? "border-destructive" : "border-input"
        } ${large ? "text-base" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
