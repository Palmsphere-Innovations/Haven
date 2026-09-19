export type HandoverTab = "incoming" | "outgoing" | "history"

export interface IncomingHandover {
  id: string
  reference: string
  propertyAddress: string
  landlord: string
  landlordName: string
  outgoingAgent: string
  outgoingAgentCode: string
  targetHandoverDate: string
  daysRemaining: number
  imageUrl: string
  scopeTier: string
  scopeDescription: string
  tenancyStatus: string
  tenantName: string
  rentPcm: number
  astExpiry: string
  dpsId: string
  keysCount: string
  cp12Status: string
  eicrStatus: string
  epcRating: string
}

export interface OutgoingHandover {
  id: string
  reference: string
  propertyAddress: string
  landlord: string
  incomingAgent: string
  incomingAgentCode: string
  scopeTier: string
  status: string
  initiatedDate: string
}

export interface HistoryHandover {
  id: string
  auditId: string
  propertyAddress: string
  outgoingParty: string
  incomingParty: string
  scopeTier: string
  status: string
  completedDate: string
}