export type JobUrgency = 'urgent' | 'routine'
export type JobStatus = 'in_progress' | 'awaiting_parts' | 'scheduled' | 'completed'
export type InvoiceStatus = 'paid' | 'submitted' | 'overdue'

export interface IncomingJobRequest{
  id: string
  urgency: JobUrgency
  capAmount: string
  property: string
  title: string
  trade: string
  priority: string
  accessProtocol: string
  accessCode?: string
  dispatchedBy: string
  loggedAgo: string
}

export interface ActiveJob {
  id: string
  jobRef: string
  property: string
  location: string
  scope: string
  poNumber: string
  scheduledTime: string
  status: JobStatus
  statusLabel: string
}

export interface VendorInvoice {
  id: string
  invoiceNumber: string
  poNumber: string
  property: string
  date: string
  amount: string
  status: InvoiceStatus
  statusLabel: string
}