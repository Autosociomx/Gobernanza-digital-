export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function isValidString(val: unknown, max = 500): val is string {
  return typeof val === 'string' && val.trim().length > 0 && val.length <= max;
}
