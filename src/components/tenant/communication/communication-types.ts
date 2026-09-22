export interface MessageAttachment {
  id: string
  name: string
  size: string
  type: "pdf" | "image"
  url?: string
  previewUrl?: string
}

export interface ChatMessage {
  id: string
  sender: "agent" | "tenant" | "system"
  senderName: string
  senderAvatar?: string
  timestamp: string
  text: string
  readStatus?: "read" | "delivered" | "sent"
  attachment?: MessageAttachment
}

export interface BuildingContact {
  id: string
  title: string
  subtitle: string
  phone: string
  type: "concierge" | "superintendent" | "emergency"
}