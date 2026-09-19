export type ScreeningStatus = 
  | 'flagged'
  | 'pending'
  | 'in_progress'
  | 'credit_check'
  | 'approved';

export interface ApplicantRecord {
  id: string;
  name: string;
  email: string;
  applicantType: 'Sole Applicant' | 'With Guarantor' | 'Joint Applicant';
  property: string;
  rent: string;
  startDate: string;
  status: ScreeningStatus;
  statusDetails?: string;
  submittedAt: string;
  slaRemaining: string;
  providers: string[];
  creditScore?: string;
  riskLevel?: string;
  isSelected?: boolean;
}