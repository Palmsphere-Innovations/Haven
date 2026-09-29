export interface StatMetric {
  title: string;
  value: string;
  subtitle: string;
  badgeText?: string;
  badgeType?: 'neutral' | 'urgent' | 'accent' | 'error';
  icon: string;
  footNote?: string;
}

export interface LandlordGrant {
  id: string;
  principal: string;
  portfolioReg: string;
  status: 'Active Authority' | 'Pending' | 'Suspended';
  tier: string;
  tierType: 'primary' | 'secondary';
  properties: string[];
  extraUnitsCount?: number;
  grantDate: string;
  expiryDate: string;
  spendLimit: string;
  redacted?: boolean;
}

export interface WorkOrder {
  id: string;
  title: string;
  property: string;
  tenant: string;
  contractor: string;
  amount: string;
  status: 'Quote Approved' | 'Awaiting Sign-off' | 'Dispatched' | 'Sign-off Requested';
  exceedsCap?: boolean;
  capNotice?: string;
}

export interface Inspection {
  id: string;
  property: string;
  type: string;
  date: string;
  status: 'Notified' | 'Draft' | 'Confirmed';
}

export interface ComplianceItem {
  id: string;
  title: string;
  property: string;
  landlord: string;
  status: 'Urgent' | 'Passed' | 'Valid';
  badgeText: string;
  extraInfo?: string;
}