import express from 'express';
import { createLabContextOSRuntime } from './factory';

const app = express();
const runtime = createLabContextOSRuntime();
const port = Number(process.env.CONTEXTOS_PORT ?? 3011);
const host = process.env.CONTEXTOS_HOST ?? '127.0.0.1';

app.disable('x-powered-by');
app.use(express.json({ limit: '64kb' }));

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
