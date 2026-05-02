import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import { contactSchema } from '@/schemas/contact';

interface ContactFormLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  required: string;
  invalidEmail: string;
  minMessage: string;
}

interface ContactFormProps {
  labels: ContactFormLabels;
}

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

export default function ContactForm({ labels }: ContactFormProps) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): FieldErrors {
    const result = contactSchema.safeParse(values);
    if (result.success) return {};
    const fieldErrors: FieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FieldErrors;
      if (field === 'name' && !fieldErrors.name) {
        fieldErrors.name = labels.required;
      } else if (field === 'email' && !fieldErrors.email) {
        fieldErrors.email = issue.code === 'invalid_format' ? labels.invalidEmail : labels.required;
      } else if (field === 'message' && !fieldErrors.message) {
        fieldErrors.message = issue.code === 'too_small' ? labels.minMessage : labels.required;
      }
    }
    return fieldErrors;
  }

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 0);
  }

  if (submitted) {
    return (
      <div className="text-center py-xl" data-testid="success-state">
        <span className="material-symbols-outlined filled text-5xl text-secondary block mb-md">
          check_circle
        </span>
        <h3 className="text-h3 font-display font-bold text-on-surface mb-sm">{labels.successTitle}</h3>
        <p className="text-body-lg text-on-surface-variant">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-lg">
      {/* Name */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-name" className="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
          {labels.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder={labels.namePlaceholder}
          aria-describedby={errors.name ? 'error-name' : undefined}
          className={`bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors ${
            errors.name ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-primary'
          }`}
        />
        {errors.name && (
          <p id="error-name" className="text-error text-body-sm">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-email" className="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
          {labels.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder={labels.emailPlaceholder}
          aria-describedby={errors.email ? 'error-email' : undefined}
          className={`bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors ${
            errors.email ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-primary'
          }`}
        />
        {errors.email && (
          <p id="error-email" className="text-error text-body-sm">{errors.email}</p>
        )}
      </div>

      {/* Phone (optional) */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-phone" className="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
          {labels.phone}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder={labels.phonePlaceholder}
          className="bg-surface-container border border-outline-variant/40 rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-xs">
        <label htmlFor="contact-message" className="text-label-caps uppercase tracking-wider text-on-surface font-semibold">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          placeholder={labels.messagePlaceholder}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={`bg-surface-container border rounded-lg px-md py-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none transition-colors resize-none ${
            errors.message ? 'border-error focus:border-error' : 'border-outline-variant/40 focus:border-primary'
          }`}
        />
        {errors.message && (
          <p id="error-message" className="text-error text-body-sm">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-primary text-on-primary rounded-xl px-md py-sm text-label-caps uppercase tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all duration-300 active:scale-95 disabled:opacity-60"
      >
        {submitting ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
