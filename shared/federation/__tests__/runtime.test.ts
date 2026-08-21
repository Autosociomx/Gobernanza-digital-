import { describe, expect, it } from 'vitest';
import { tepicCatalog } from '../catalog';
import { resolveCitizenIntent } from '../runtime';
import type { MunicipalityCatalog } from '../types';

const catalog: MunicipalityCatalog = {
  schema_version: '0.1',
  municipality: 'Tepic',
  state: 'Nayarit',
  services: [
    {
      id: 'tepic.reporte_servicios_publicos',
      name: 'Reporte de bache o luminaria',
      family: 'servicios_publicos',
      authority: 'Ayuntamiento de Tepic',
      office: 'por verificar con directorio oficial',
      citizen_description: 'Reportes urbanos.',
      source_status: 'por_verificar',
      legal_effect: 'none_in_demo',
      orbe_actions: ['informar', 'orientar'],
      restricted_actions: ['cerrar_reporte_sin_evidencia'],
      integration: {
        mode: 'external_portal',
        url: 'https://app.tepic.gob.mx/click/',
        status: 'verificado',
        can_issue_official_folio: true,
      },
    },
  ],
};

describe('federated intent runtime', () => {
  it('routes a Tepic public-lighting report without requiring identity for resolution', () => {
    const result = resolveCitizenIntent({
      action: 'report',
      subject: 'public-lighting',
      territory: { municipality: 'Tepic', state: 'Nayarit' },
      details: { description: 'Luminaria apagada', lat: 21.5039, lng: -104.8947 },
    }, catalog);

    expect(result.status).toBe('ROUTE_FOUND');
    expect(result.service_id).toBe('tepic.reporte_servicios_publicos');
    expect(result.authority).toBe('Ayuntamiento de Tepic');
    expect(result.consent_required).toContain('location');
    expect(result.official_effect).toBe('NONE_UNTIL_EXTERNAL_ACCEPTANCE');
    expect(result.integration?.mode).toBe('external_portal');
  });

  it('uses the repository canonical catalog and its verified Click por Tepic bridge', () => {
    const result = resolveCitizenIntent({
      action: 'report',
      subject: 'public-lighting',
      territory: { municipality: 'Tepic', state: 'Nayarit' },
    }, tepicCatalog);

    expect(result.status).toBe('ROUTE_FOUND');
    expect(result.source_status).toBe('por_verificar');
    expect(result.integration).toEqual(expect.objectContaining({
      mode: 'external_portal',
      url: 'https://app.tepic.gob.mx/click/',
      status: 'verificado',
    }));
  });

  it('does not pretend to route another municipality', () => {
    const result = resolveCitizenIntent({
      action: 'report',
      subject: 'public-lighting',
      territory: { municipality: 'Xalisco', state: 'Nayarit' },
    }, catalog);

    expect(result.status).toBe('UNSUPPORTED_TERRITORY');
    expect(result.next_state).toBe('NO_ROUTE');
  });

  it('rejects unsupported intents deterministically', () => {
    const result = resolveCitizenIntent({
      action: 'report',
      subject: 'pothole',
      territory: { municipality: 'Tepic', state: 'Nayarit' },
    }, catalog);

    expect(result.status).toBe('NO_ROUTE');
    expect(result.official_effect).toBe('INFORMATION_ONLY');
  });
});
