// The only place that reads import.meta.env. Everything else imports from here,
// so a missing variable surfaces in one spot instead of deep inside a component.

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const emailJsConfig: Readonly<EmailJsConfig> = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const isEmailJsConfigured = (config: EmailJsConfig): boolean =>
  Boolean(config.serviceId && config.templateId && config.publicKey);
