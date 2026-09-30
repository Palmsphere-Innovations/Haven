export type JobPriority = 'urgent' | 'routine'
export type JobStatus = 'In Progress' | 'New Request' | 'Awaiting Parts' | 'Scheduled' | 'Completed'

export interface JobDiagnosticPhoto {
  id: string
  title: string
  reference: string
  imageUrl: string
  alt: string
}

export interface JobAuditEntry {
  id: string
  author: string
  timestamp: string
  message: string
  type: 'engineer' | 'access' | 'dispatch'
}

export interface JobItem {
  id: string
  reference: string
  poNumber: string
  priority: JobPriority
  priorityLabel: string
  status: JobStatus
  title: string
  propertyAddress: string
  postcode: string
  preAuthCap: string
  assignedEngineer?: string
  accessDetails?: string
  conciergePasscode?: string
  keySafeCode?: string
  reportedProblem?: string
  diagnosticPhotos?: JobDiagnosticPhoto[]
  auditLogs?: JobAuditEntry[]
  isFocused?: boolean
}