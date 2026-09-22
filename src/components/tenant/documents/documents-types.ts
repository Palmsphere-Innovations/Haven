export type DocumentCategory = 'all' | 'statutory' | 'identity' | 'inventories' | 'notices'

export interface DocumentRecord {
  id: string
  title: string
  subtitle: string
  category: DocumentCategory
  categoryLabel: string
  identifier: string
  status: string
  statusType: 'verified' | 'countersigned' | 'valid' | 'active'
  fileSize?: string
}