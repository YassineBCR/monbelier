"use client"

import { Shield, ShoppingBag } from "lucide-react"

interface AppHeaderProps {
  isAdmin: boolean
  onToggle: () => void
}

export function AppHeader({ isAdmin, onToggle }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
            M
          </div>
          <div>
            <h1 className="font-[var(--font-heading)] text-lg font-bold tracking-tight text-foreground">
              MonBelier
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Livraison Aid 2025
            </p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
            isAdmin
              ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
              : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
          }`}
        >
          {isAdmin ? (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Client</span>
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
