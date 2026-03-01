export type DeliverySlot = "J+1" | "J+2"

export type OrderStatus = "acompte_paye" | "en_livraison" | "livre_solde"

export interface Order {
  id: string
  clientName: string
  phone: string
  email: string
  address: string
  city: string
  zipCode: string
  instructions: string
  deliverySlot: DeliverySlot
  status: OrderStatus
  totalPrice: number
  deposit: number
  remaining: number
  createdAt: string
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  acompte_paye: "Acompte Pay\u00e9",
  en_livraison: "En Livraison",
  livre_solde: "Livr\u00e9 & Sold\u00e9",
}

export const STATUS_COLORS: Record<OrderStatus, string> = {
  acompte_paye: "bg-amber-100 text-amber-800 border-amber-200",
  en_livraison: "bg-blue-100 text-blue-800 border-blue-200",
  livre_solde: "bg-primary/15 text-primary border-primary/20",
}
