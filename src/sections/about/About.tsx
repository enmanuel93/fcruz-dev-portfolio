import type { ReactElement } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/i18n/useLocale";
import { getAnimationDelay } from "@/lib/animation";

const ANIMATION_STEP_MS = 100;

export const About = (): ReactElement => {
  const { about, highlights, ui } = useLocale().content;

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <SectionHeader
          title={ui.about.title}
          description={ui.about.description}
        />

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="space-y-5 text-muted-foreground leading-relaxed animate-fade-in animation-delay-100">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[68ch]">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="panel divide-y divide-border self-start rounded-2xl">
            {highlights.map((item, idx) => (
              <li
                key={item.title}
                className="flex gap-4 p-5 animate-fade-in"
                style={{ animationDelay: getAnimationDelay(idx, ANIMATION_STEP_MS) }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-accent">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
