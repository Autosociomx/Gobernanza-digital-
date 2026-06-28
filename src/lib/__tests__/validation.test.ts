import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidString } from '../validation';

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('rejects emails without @', () => {
    expect(isValidEmail('notanemail')).toBe(false);
  });

  it('rejects emails over 254 chars', () => {
    const longEmail = 'a'.repeat(250) + '@b.co';
    expect(isValidEmail(longEmail)).toBe(false);
  });

  it('rejects emails with spaces', () => {
    expect(isValidEmail('user @example.com')).toBe(false);
    expect(isValidEmail(' user@example.com')).toBe(false);
  });
});

describe('isValidString', () => {
  it('accepts non-empty strings within limit', () => {
    expect(isValidString('hello')).toBe(true);
    expect(isValidString('hello', 10)).toBe(true);
  });

  it('rejects empty strings and whitespace-only', () => {
    expect(isValidString('')).toBe(false);
    expect(isValidString('   ')).toBe(false);
  });

  it('rejects strings over the max length', () => {
    expect(isValidString('a'.repeat(501))).toBe(false);
    expect(isValidString('abc', 2)).toBe(false);
  });

  it('rejects non-string values', () => {
    expect(isValidString(null)).toBe(false);
    expect(isValidString(42)).toBe(false);
    expect(isValidString(undefined)).toBe(false);
    expect(isValidString({})).toBe(false);
  });
});
