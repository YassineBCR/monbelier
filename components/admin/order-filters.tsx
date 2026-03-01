"use client"

import { Search, Filter } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { OrderStatus } from "@/lib/types"

interface OrderFiltersProps {
  activeTab: string
  onTabChange: (tab: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  statusFilter: OrderStatus | "all"
  onStatusFilterChange: (s: OrderStatus | "all") => void
}

export function OrderFilters({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            Toutes
          </TabsTrigger>
          <TabsTrigger value="J+1" className="flex-1 sm:flex-none">
            J+1 (Demain)
          </TabsTrigger>
          <TabsTrigger value="J+2" className="flex-1 sm:flex-none">
            J+2 (Apr&egrave;s-demain)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search & Status filter */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher par nom ou t&eacute;l&eacute;phone..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-lg border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as OrderStatus | "all")}
            className="w-full appearance-none rounded-lg border border-input bg-card py-2.5 pl-10 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto"
          >
            <option value="all">Tous les statuts</option>
            <option value="acompte_paye">Acompte Pay&eacute;</option>
            <option value="en_livraison">En Livraison</option>
            <option value="livre_solde">Livr&eacute; & Sold&eacute;</option>
          </select>
        </div>
      </div>
    </div>
  )
}
