// Art. 74 LNETB — Integración OAuth 2.0 PKCE con Llave MX (identidad digital federal)
// CLIENT_ID pendiente de registro ante CEDN en llavemx.gob.mx

const CLIENT_ID = 'PENDIENTE_REGISTRO_CEDN';
const REDIRECT_URI = `${window.location.origin}/auth/llavemx/callback`;
const AUTH_ENDPOINT = 'https://llavemx.gob.mx/oauth/authorize';
const TOKEN_ENDPOINT = 'https://llavemx.gob.mx/oauth/token';

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

export async function initiateLlaveMXLogin(): Promise<void> {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = crypto.randomUUID();

  sessionStorage.setItem('llave_mx_verifier', verifier);
  sessionStorage.setItem('llave_mx_state', state);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email curp',
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  });

  window.location.href = `${AUTH_ENDPOINT}?${params.toString()}`;
}

export async function handleLlaveMXCallback(code: string, returnedState: string): Promise<{ idToken: string; curp: string }> {
  const verifier = sessionStorage.getItem('llave_mx_verifier');
  const savedState = sessionStorage.getItem('llave_mx_state');

  if (!verifier || returnedState !== savedState) {
    throw new Error('Estado OAuth inválido — posible CSRF');
  }

  sessionStorage.removeItem('llave_mx_verifier');
  sessionStorage.removeItem('llave_mx_state');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      code,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error al obtener token Llave MX: ${response.status}`);
  }

  const { id_token, curp } = await response.json();
  return { idToken: id_token, curp };
}
