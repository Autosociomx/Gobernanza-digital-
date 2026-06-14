export interface C5Stats {
  totalReports: number;
  pendingReports: number;
  criticalReports: number;
  todayReports: number;
  totalWorks: number;
  worksInProgress: number;
  totalBudget: number;
  totalSpent: number;
  budgetExecution: number;
  registeredCitizens: number;
  activeAgencies: number;
}

export interface Report {
  id: string;
  citizen_phone?: string;
  raw_message: string;
  category: string;
  urgency: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
  sentiment: string;
  agency_id: string;
  agency_name?: string;
  status: 'PENDING'|'IN_PROGRESS'|'RESOLVED'|'CLOSED';
  ai_summary?: string;
  location_text?: string;
  municipality: string;
  created_at: string;
  resolved_at?: string;
}

export interface PublicWork {
  id: string;
  iun: string;
  name: string;
  type: string;
  status: 'PLANNED'|'IN_PROGRESS'|'COMPLETED'|'SUSPENDED';
  agency_name?: string;
  municipality: string;
  budget: number;
  spent: number;
  progress: number;
  beneficiaries: number;
  start_date?: string;
  end_date?: string;
  contractor?: string;
}

export interface Agency {
  id: string;
  name: string;
  cluster: string;
  contact_email?: string;
  head_name?: string;
  active: number;
}

export interface BotSimResult {
  folio: string;
  report_id: string;
  reply: string;
  classification: {
    category: string;
    urgency: string;
    sentiment: string;
    summary: string;
    agency_id: string;
    confidence: number;
    processing_ms: number;
  };
}

const BASE = '/api';

export const getC5Stats = async (): Promise<C5Stats> => {
  const r = await fetch(`${BASE}/c5/stats`);
  return r.json();
};

export const getReports = async (limit = 50): Promise<Report[]> => {
  const r = await fetch(`${BASE}/reports?limit=${limit}`);
  return r.json();
};

export const updateReportStatus = async (id: string, status: string): Promise<void> => {
  await fetch(`${BASE}/reports/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
};

export const getPublicWorks = async (): Promise<PublicWork[]> => {
  const r = await fetch(`${BASE}/works`);
  return r.json();
};

export const getAgencies = async (): Promise<Agency[]> => {
  const r = await fetch(`${BASE}/agencies`);
  return r.json();
};

export const simulateBotMessage = async (message: string, phone = '5218001234567', municipality = 'Tepic'): Promise<BotSimResult> => {
  const r = await fetch(`${BASE}/bot/whatsapp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, message, municipality })
  });
  return r.json();
};
