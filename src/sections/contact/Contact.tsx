import type { ReactElement } from "react";
import { useLocale } from "@/i18n/useLocale";
import { ContactForm } from "./ContactForm";

export const Contact = (): ReactElement => {
  const { contactInfo, ui } = useLocale().content;

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-br from-primary/20 via-surface to-surface animate-fade-in">
          <div
            className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-primary/25 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="dot-field pointer-events-none absolute right-8 top-8 h-32 w-48 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"
            aria-hidden="true"
          />

          <div className="relative grid lg:grid-cols-[1fr_1.1fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {ui.contact.titleStart}{" "}
                <span className="text-accent">{ui.contact.titleAccent}</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                {ui.contact.intro}
              </p>

              <ul className="mt-8 space-y-2">
                {contactInfo.map((item) => {
                  const content = (
                    <>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60 text-accent">
                        <item.icon className="size-[18px]" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs text-muted-foreground">{item.label}</span>
                        <span className="block font-medium">{item.value}</span>
                      </span>
                    </>
                  );

                  return (
                    <li key={item.label}>
                      {/* "#" means there is nothing to open, so it is plain text. */}
                      {item.href === "#" ? (
                        <div className="flex items-center gap-4 p-2">{content}</div>
                      ) : (
                        <a
                          href={item.href}
                          className="-mx-0 flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-background/40"
                        >
                          {content}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-background/40 p-4">
                <span className="relative mt-1.5 flex size-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
                  <span className="relative size-2.5 rounded-full bg-success" />
                </span>
                <div>
                  <p className="font-medium">{ui.contact.availableTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {ui.contact.availableText}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
