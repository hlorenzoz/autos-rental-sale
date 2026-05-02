import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactForm from './ContactForm';

const labels = {
  name: 'Full Name',
  namePlaceholder: 'Your name',
  email: 'Email Address',
  emailPlaceholder: 'your@email.com',
  phone: 'Phone (optional)',
  phonePlaceholder: '+1 555 000',
  message: 'Message',
  messagePlaceholder: 'Your message',
  submit: 'Send Message',
  sending: 'Sending…',
  successTitle: 'Message sent!',
  successBody: "We'll get back to you.",
  required: 'This field is required.',
  invalidEmail: 'Please enter a valid email address.',
  minMessage: 'Message must be at least 10 characters.',
};

function fillForm(overrides: Record<string, string> = {}) {
  const defaults = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'This is a long enough message for validation.',
  };
  const values = { ...defaults, ...overrides };
  fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: values.name } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: values.email } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: values.message } });
}

describe('ContactForm', () => {
  it('renders all required fields', () => {
    render(<ContactForm labels={labels} />);
    expect(screen.getByLabelText('Full Name')).toBeDefined();
    expect(screen.getByLabelText('Email Address')).toBeDefined();
    expect(screen.getByLabelText('Message')).toBeDefined();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined();
  });

  it('shows required error when name is empty on submit', async () => {
    render(<ContactForm labels={labels} />);
    fillForm({ name: '' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getAllByText('This field is required.').length).toBeGreaterThan(0);
    });
  });

  it('shows invalid email error', async () => {
    render(<ContactForm labels={labels} />);
    fillForm({ email: 'not-an-email' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeDefined();
    });
  });

  it('shows min-length error when message is too short', async () => {
    render(<ContactForm labels={labels} />);
    fillForm({ message: 'short' });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters.')).toBeDefined();
    });
  });

  it('shows success state on valid submission', async () => {
    render(<ContactForm labels={labels} />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.getByText('Message sent!')).toBeDefined();
    });
  });

  it('hides the form after successful submission', async () => {
    render(<ContactForm labels={labels} />);
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    await waitFor(() => {
      expect(screen.queryByLabelText('Full Name')).toBeNull();
    });
  });
});
