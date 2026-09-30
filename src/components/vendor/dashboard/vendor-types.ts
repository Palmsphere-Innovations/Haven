export type JobUrgency = "urgent" | "routine";
export type JobStatus =
  | "in_progress"
  | "awaiting_parts"
  | "scheduled"
  | "completed"
  | "In Progress"
  | "Awaiting Parts"
  | "Scheduled"
  | "Completed";
export type InvoiceStatus =
  | "paid"
  | "submitted"
  | "overdue"
  | "Paid"
  | "Submitted"
  | "Overdue";

export interface IncomingJobRequest {
  id: string;
  priority: string;
  priorityLabel: string;
  cappedPrice: string;
  propertyAddress: string;
  title: string;
  tradeCategory: string;
  accessProtocol: string;
  accessCode?: string;
  dispatchedBy: string;
  timeAgo: string;
  urgency?: JobUrgency;
  property?: string;
}

export interface ActiveJob {
  id: string;
  reference: string;
  property: string;
  location: string;
  scope: string;
  poNumber: string;
  scheduledTime: string;
  status: JobStatus;
  statusLabel?: string;
  isToday?: boolean;
  jobRef?: string;
}

export interface VendorInvoice {
  id: string;
  invoiceRef: string;
  poRef: string;
  property: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
  statusLabel?: string;
  invoiceNumber?: string;
  poNumber?: string;
  dueDate?: string;
}
