export type IntentAction = 'report' | 'query' | 'follow';

export type FederationSubject = 'public-lighting';

export interface CitizenIntent {
  intent_id?: string;
  action: IntentAction;
  subject: FederationSubject | string;
  territory: {
    municipality: string;
    state?: string;
    country?: string;
  };
  details?: {
    description?: string;
    lat?: number;
    lng?: number;
    photo_ref?: string;
  };
}

export interface ServiceIntegration {
  mode: 'external_portal' | 'api' | 'manual_bridge';
  url?: string;
  status?: 'verificado' | 'por_verificar' | 'demo' | 'propuesto';
  can_issue_official_folio?: boolean;
}

export interface MunicipalityService {
  id: string;
  name: string;
  family: string;
  authority: string;
  office: string;
  citizen_description: string;
  source_status: string;
  legal_effect: string;
  orbe_actions: string[];
  restricted_actions: string[];
  integration?: ServiceIntegration;
}

export interface MunicipalityCatalog {
  schema_version: string;
  municipality: string;
  state: string;
  services: MunicipalityService[];
}

export type ResolutionStatus =
  | 'ROUTE_FOUND'
  | 'NO_ROUTE'
  | 'UNSUPPORTED_TERRITORY'
  | 'INVALID_INTENT';

export interface IntentResolution {
  status: ResolutionStatus;
  service_id?: string;
  authority?: string;
  office?: string;
  source_status?: string;
  identity_requirement: 'NONE_FOR_RESOLUTION' | 'EXTERNAL_SYSTEM_DECIDES';
  consent_required: string[];
  integration?: ServiceIntegration;
  official_effect:
    | 'NONE_UNTIL_EXTERNAL_ACCEPTANCE'
    | 'INFORMATION_ONLY';
  next_state:
    | 'INSTITUTIONAL_HANDOFF_PENDING'
    | 'NO_ROUTE'
    | 'INVALID';
  reason?: string;
}

export interface EvidenceReceipt {
  receipt_id: string;
  intent_id: string;
  event_type: 'INTENT_RESOLVED';
  created_at: string;
  payload_hash: string;
  previous_hash: string | null;
}

export interface FederatedResolutionResponse {
  intent_id: string;
  resolution: IntentResolution;
  receipt: EvidenceReceipt;
}
