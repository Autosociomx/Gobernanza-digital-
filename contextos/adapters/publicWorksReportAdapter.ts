import type { ExecutionRequest, ExecutionResult } from '../contracts';
import type { ServiceAdapter } from './types';

export interface PublicWorksAdapterOptions {
  idFactory?: () => string;
}

export function createPublicWorksReportAdapter(options: PublicWorksAdapterOptions = {}): ServiceAdapter {
  const idFactory = options.idFactory ?? (() => crypto.randomUUID());

  return {
    id: 'lab.public-works-report.v1',
    async execute(request: ExecutionRequest): Promise<ExecutionResult> {
      if (request.service.executionMode !== 'LAB_MOCK') {
        return {
          status: 'REJECTED',
          adapterId: this.id,
          executionMode: 'LAB_MOCK',
          resultCode: 'NON_LAB_MODE_BLOCKED',
          message: 'Este adapter sólo puede operar en modo de laboratorio.',
        };
      }

      const subject = request.intent.intent.subject?.trim().toLowerCase();
      if (!subject) {
        return {
          status: 'REJECTED',
          adapterId: this.id,
          executionMode: 'LAB_MOCK',
          resultCode: 'SUBJECT_REQUIRED',
          message: 'El laboratorio requiere identificar bache o luminaria.',
        };
      }
      if (!['bache', 'luminaria'].includes(subject)) {
        return {
          status: 'REJECTED',
          adapterId: this.id,
          executionMode: 'LAB_MOCK',
          resultCode: 'SUBJECT_NOT_SUPPORTED',
          message: 'El laboratorio v0.1 sólo admite bache o luminaria.',
        };
      }

      return {
        status: 'ACCEPTED',
        adapterId: this.id,
        executionMode: 'LAB_MOCK',
        externalReference: `LAB-PW-${idFactory()}`,
        resultCode: 'LAB_REPORT_ACCEPTED',
        message: 'Reporte aceptado en laboratorio. No constituye una orden de trabajo municipal.',
      };
    },
  };
}
