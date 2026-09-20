export type TradeCategory =
  | "all"
  | "plumbing"
  | "electrical"
  | "heating-gas"
  | "general-building"
  | "specialist"

export interface Vendor {
  id: string
  name: string
  tradeCategory: TradeCategory
  tradeLabel: string
  accreditation: string
  leadContact: string
  phone: string
  baseLocation: string
  rating: number
  reviewCount: number
  responseSla: string
  badgeText: string
  completedJobsCount: number
  mandateTag: string
  insuranceLimit: string
  iconType: "fire" | "bolt" | "water" | "roofing" | "key" | "carpenter"
}