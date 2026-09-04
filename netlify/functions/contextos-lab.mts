import { createLabContextOSRuntime } from '../../contextos/factory';

interface NetlifyEnv {
  get(name: string): string | undefined;
}

declare const Netlify: { env: NetlifyEnv };

type RateBucket = { count: number; resetAt: number };

let runtimeInstance: ReturnType<typeof createLabContextOSRuntime> | undefined;
let rateBuckets: Map<string, RateBucket> | undefined;

function getRuntime() {
  runtimeInstance ??= createLabContextOSRuntime();
  return runtimeInstance;
}

function getRateBuckets() {
  rateBuckets ??= new Map<string, RateBucket>();
  return rateBuckets;
}

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...headers,
    },
  });
}

function allowedOrigins(): Set<string> {
  const raw = Netlify.env.get('CONTEXTOS_ALLOWED_ORIGINS') ?? '';
  return new Set(raw.split(',').map((value) => value.trim()).filter(Boolean));
}

function corsHeaders(request: Request): HeadersInit | null {
  const origin = request.headers.get('origin');
  if (!origin) return {};
  if (!allowedOrigins().has(origin)) return null;
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-headers': 'content-type',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    vary: 'Origin',
  };
}

function clientKey(request: Request): string {
  return (
    request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

function rateLimit(request: Request): { ok: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = Number(Netlify.env.get('CONTEXTOS_RATE_WINDOW_MS') ?? 60_000);
  const maxRequests = Number(Netlify.env.get('CONTEXTOS_RATE_MAX') ?? 30);
  const key = clientKey(request);
  const buckets = getRateBuckets();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (current.count >= maxRequests) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  return { ok: true };
}

export default async (request: Request) => {
  const cors = corsHeaders(request);
  if (cors === null) return json({ error: 'ORIGIN_NOT_ALLOWED' }, 403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

  const url = new URL(request.url);
  if (url.pathname === '/api/contextos/v0.1/health') {
    if (request.method !== 'GET') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);
    return json(
      {
        service: 'context-os-runtime',
        version: '0.1.0',
        executionMode: 'LAB_MOCK',
        authority: 'NONE',
        environment: 'NETLIFY_FUNCTION_LAB',
      },
      200,
      cors,
    );
  }

  if (url.pathname !== '/api/contextos/v0.1/execute') {
    return json({ error: 'NOT_FOUND' }, 404, cors);
  }
  if (request.method !== 'POST') return json({ error: 'METHOD_NOT_ALLOWED' }, 405, cors);

  const limited = rateLimit(request);
  if (!limited.ok) {
    return json(
      { error: 'RATE_LIMITED', retryAfterSeconds: limited.retryAfter },
      429,
      { ...cors, 'retry-after': String(limited.retryAfter ?? 1) },
    );
  }

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > 65_536) return json({ error: 'PAYLOAD_TOO_LARGE' }, 413, cors);

  try {
    const raw = await request.text();
    if (raw.length > 65_536) return json({ error: 'PAYLOAD_TOO_LARGE' }, 413, cors);
    const body = JSON.parse(raw);
    const result = await getRuntime().execute(body);
    const status =
      result.status === 'EXECUTED' ? 200 :
      result.status === 'NEEDS_INPUT' || result.status === 'NEEDS_CONSENT' ? 422 :
      result.status === 'DENIED' ? 403 : 500;
    return json(result, status, cors);
  } catch (error) {
    console.error('Context.OS Runtime LAB function error', error);
    return json({ error: 'CONTEXTOS_RUNTIME_ERROR' }, 500, cors);
  }
};

export const config = {
  path: ['/api/contextos/v0.1/health', '/api/contextos/v0.1/execute'],
};
