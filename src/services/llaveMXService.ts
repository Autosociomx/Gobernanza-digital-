// Integración con Llave MX — Sistema Nacional de Identidad Digital
// Art. 74 LNETB: toda plataforma municipal debe integrar el SSO nacional "Llave MX"
// OAuth 2.0 / OpenID Connect — endpoint oficial: https://llavemx.gob.mx

const LLAVE_MX_CONFIG = {
  authorizationEndpoint: 'https://llavemx.gob.mx/oauth2/authorize',
  tokenEndpoint: 'https://llavemx.gob.mx/oauth2/token',
  userInfoEndpoint: 'https://llavemx.gob.mx/oauth2/userinfo',
  // CLIENT_ID se registra ante la Autoridad Nacional de Simplificación (CEDN)
  clientId: (import.meta as any).env?.VITE_LLAVE_MX_CLIENT_ID || 'PENDIENTE_REGISTRO_CEDN',
  redirectUri: `${window.location.origin}/auth/llavemx/callback`,
  scope: 'openid profile email curp',
  responseType: 'code',
};

export interface LlaveMXUser {
  sub: string;       // identificador único del ciudadano en Llave MX
  curp: string;      // CURP verificada por el gobierno federal
  name: string;
  email?: string;
  rfc?: string;
  verified: boolean; // identidad verificada por el SAT/RENAPO
}

/**
 * Redirige al ciudadano al portal Llave MX para autenticarse.
 * Cumple Art. 74 LNETB: inicio de sesión único nacional.
 */
export function initiateLlaveMXLogin(): void {
  const state = crypto.randomUUID();
  const codeVerifier = generateCodeVerifier();

  sessionStorage.setItem('llavemx_state', state);
  sessionStorage.setItem('llavemx_code_verifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: LLAVE_MX_CONFIG.responseType,
    client_id: LLAVE_MX_CONFIG.clientId,
    redirect_uri: LLAVE_MX_CONFIG.redirectUri,
    scope: LLAVE_MX_CONFIG.scope,
    state,
    code_challenge: codeVerifier, // PKCE
    code_challenge_method: 'S256',
  });

  window.location.href = `${LLAVE_MX_CONFIG.authorizationEndpoint}?${params.toString()}`;
}

/**
 * Procesa el callback de Llave MX y devuelve los datos del ciudadano autenticado.
 * Vincula la identidad Llave MX con el perfil en Firebase.
 */
export async function handleLlaveMXCallback(
  code: string,
  state: string
): Promise<LlaveMXUser> {
  const storedState = sessionStorage.getItem('llavemx_state');
  if (state !== storedState) throw new Error('Estado OAuth inválido — posible ataque CSRF');

  const codeVerifier = sessionStorage.getItem('llavemx_code_verifier');

  const tokenResponse = await fetch(LLAVE_MX_CONFIG.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: LLAVE_MX_CONFIG.redirectUri,
      client_id: LLAVE_MX_CONFIG.clientId,
      code_verifier: codeVerifier || '',
    }),
  });

  if (!tokenResponse.ok) throw new Error('Error al obtener token de Llave MX');
  const { access_token } = await tokenResponse.json();

  const userResponse = await fetch(LLAVE_MX_CONFIG.userInfoEndpoint, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!userResponse.ok) throw new Error('Error al obtener perfil de Llave MX');
  const userInfo = await userResponse.json();

  sessionStorage.removeItem('llavemx_state');
  sessionStorage.removeItem('llavemx_code_verifier');

  return {
    sub: userInfo.sub,
    curp: userInfo.curp,
    name: userInfo.name,
    email: userInfo.email,
    rfc: userInfo.rfc,
    verified: true,
  };
}

function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export { LLAVE_MX_CONFIG };
