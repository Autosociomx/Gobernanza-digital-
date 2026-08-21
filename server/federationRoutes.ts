import type { Express } from 'express';
import path from 'path';
import fs from 'fs/promises';
import Database from 'better-sqlite3';
import { createHash, randomUUID } from 'node:crypto';
import { resolveCitizenIntent } from '../shared/federation/runtime';
import type { CitizenIntent, MunicipalityCatalog } from '../shared/federation/types';

const db = new Database('government_data.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS federated_receipts (
    receipt_id TEXT PRIMARY KEY,
    intent_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    payload_hash TEXT NOT NULL,
    previous_hash TEXT,
    payload_json TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_federated_receipts_intent
  ON federated_receipts(intent_id, created_at);
`);

async function loadTepicCatalog(): Promise<MunicipalityCatalog> {
  const catalogPath = path.join(
    process.cwd(),
    'data',
    'municipality',
    'tepic',
    'services.json',
  );
  const raw = await fs.readFile(catalogPath, 'utf-8');
  return JSON.parse(raw) as MunicipalityCatalog;
}

function canonicalHash(value: unknown) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

export function registerFederationRoutes(app: Express) {
  app.post('/api/federation/resolve', async (req, res) => {
    try {
      const intent = req.body as CitizenIntent;
      const catalog = await loadTepicCatalog();
      const intentId = intent.intent_id || randomUUID();
      const resolution = resolveCitizenIntent({ ...intent, intent_id: intentId }, catalog);
      const createdAt = new Date().toISOString();

      const previous = db.prepare(`
        SELECT payload_hash
        FROM federated_receipts
        WHERE intent_id = ?
        ORDER BY created_at DESC
        LIMIT 1
      `).get(intentId) as { payload_hash?: string } | undefined;

      const evidencePayload = {
        intent_id: intentId,
        event_type: 'INTENT_RESOLVED',
        created_at: createdAt,
        resolution,
      };
      const payloadHash = canonicalHash(evidencePayload);
      const receiptId = randomUUID();

      db.prepare(`
        INSERT INTO federated_receipts
          (receipt_id, intent_id, event_type, created_at, payload_hash, previous_hash, payload_json)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(
        receiptId,
        intentId,
        'INTENT_RESOLVED',
        createdAt,
        payloadHash,
        previous?.payload_hash || null,
        JSON.stringify(evidencePayload),
      );

      return res.status(resolution.status === 'INVALID_INTENT' ? 400 : 200).json({
        intent_id: intentId,
        resolution,
        receipt: {
          receipt_id: receiptId,
          intent_id: intentId,
          event_type: 'INTENT_RESOLVED',
          created_at: createdAt,
          payload_hash: payloadHash,
          previous_hash: previous?.payload_hash || null,
        },
      });
    } catch (error: any) {
      console.error('Federation resolve error:', error);
      return res.status(500).json({ error: 'No fue posible resolver la intención.' });
    }
  });

  app.get('/api/federation/intents/:intentId/receipts', (req, res) => {
    const rows = db.prepare(`
      SELECT receipt_id, intent_id, event_type, created_at, payload_hash, previous_hash
      FROM federated_receipts
      WHERE intent_id = ?
      ORDER BY created_at ASC
    `).all(req.params.intentId);

    return res.json({ intent_id: req.params.intentId, receipts: rows });
  });
}
