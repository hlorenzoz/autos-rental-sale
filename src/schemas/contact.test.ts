import { describe, it, expect } from 'vitest';
import { contactSchema } from './contact';

describe('contactSchema', () => {
  const valid = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555 000 0000',
    message: 'This is a valid message with enough characters.',
  };

  it('accepts a fully valid payload', () => {
    expect(() => contactSchema.parse(valid)).not.toThrow();
  });

  it('accepts payload without phone (optional)', () => {
    const noPhone: Partial<typeof valid> = { ...valid };
    delete noPhone.phone;
    expect(() => contactSchema.parse(noPhone)).not.toThrow();
  });

  it('accepts empty string phone as undefined (optional)', () => {
    expect(() => contactSchema.parse({ ...valid, phone: '' })).not.toThrow();
  });

  it('rejects missing name', () => {
    const noName: Partial<typeof valid> = { ...valid };
    delete noName.name;
    expect(() => contactSchema.parse(noName)).toThrow();
  });

  it('rejects empty name', () => {
    expect(() => contactSchema.parse({ ...valid, name: '' })).toThrow();
  });

  it('rejects missing email', () => {
    const noEmail: Partial<typeof valid> = { ...valid };
    delete noEmail.email;
    expect(() => contactSchema.parse(noEmail)).toThrow();
  });

  it('rejects invalid email format', () => {
    expect(() => contactSchema.parse({ ...valid, email: 'not-an-email' })).toThrow();
  });

  it('rejects missing message', () => {
    const noMessage: Partial<typeof valid> = { ...valid };
    delete noMessage.message;
    expect(() => contactSchema.parse(noMessage)).toThrow();
  });

  it('rejects message shorter than 10 characters', () => {
    expect(() => contactSchema.parse({ ...valid, message: 'short' })).toThrow();
  });

  it('returns typed ContactFormData on success', () => {
    const result = contactSchema.parse(valid);
    expect(result.name).toBe(valid.name);
    expect(result.email).toBe(valid.email);
    expect(result.message).toBe(valid.message);
  });
});
