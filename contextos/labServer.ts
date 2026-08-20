import express from 'express';
import { createLabContextOSRuntime } from './factory';

const app = express();
const runtime = createLabContextOSRuntime();
const port = Number(process.env.CONTEXTOS_PORT ?? 3011);
const host = process.env.CONTEXTOS_HOST ?? '127.0.0.1';
const allowedOrigins = new Set(
  (process.env.CONTEXTOS_ALLOWED_ORIGINS ?? 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
);

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ error: 'ORIGIN_NOT_ALLOWED' });
  }
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/contextos/v0.1/health', (_req, res) => {
  res.json({
    service: 'context-os-runtime',
    version: '0.1.0',
    executionMode: 'LAB_MOCK',
    authority: 'NONE',
  });
});

app.post('/api/contextos/v0.1/execute', async (req, res) => {
  try {
    const result = await runtime.execute(req.body);
    const httpStatus =
      result.status === 'EXECUTED' ? 200 :
      result.status === 'NEEDS_INPUT' || result.status === 'NEEDS_CONSENT' ? 422 :
      result.status === 'DENIED' ? 403 : 500;
    res.status(httpStatus).json(result);
  } catch (error) {
    console.error('Context.OS Runtime error', error);
    res.status(500).json({ error: 'CONTEXTOS_RUNTIME_ERROR' });
  }
});

app.listen(port, host, () => {
  console.log(`Context.OS Runtime v0.1 LAB_MOCK on http://${host}:${port}`);
});
