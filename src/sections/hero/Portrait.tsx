import type { ReactElement } from "react";
import { profileBase as profile } from "@/data/profile";
import { useLocale } from "@/i18n/useLocale";

export const Portrait = (): ReactElement => {
  const { portrait } = useLocale().content.ui;

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
      {/* <div
        className="dot-field pointer-events-none absolute -right-12 top-12 h-64 w-44 [mask-image:linear-gradient(to_left,black,transparent)]"
        aria-hidden="true"
      /> */}
      <div
        className="pointer-events-none absolute inset-8 rounded-[2rem] bg-primary/45 blur-3xl"
        aria-hidden="true"
      />

      <div className="animate-portrait-reveal relative rounded-[1.75rem] border border-accent/35 bg-gradient-to-b from-primary/30 via-surface to-surface p-2 shadow-[0_40px_80px_-40px] shadow-primary/70">
        <img
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={448}
          height={560}
          className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
        />
      </div>

      <div className="panel absolute -left-4 top-10 rounded-2xl px-4 py-3 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.8)] sm:-left-8 animate-float">
        <div className="text-2xl font-bold tabular-nums text-accent">
          {profile.yearsOfExperience}
        </div>
        <div className="text-xs text-muted-foreground">{portrait.yearsOfExperience}</div>
      </div>

      <div className="panel absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.8)] sm:-right-6 animate-float animation-delay-500">
        <span className="relative flex size-3" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
          <span className="relative size-3 rounded-full bg-success" />
        </span>
        <div>
          <div className="text-xs text-muted-foreground">{portrait.availableForWork}</div>
          <div className="text-sm font-medium">{portrait.workTypes}</div>
        </div>
      </div>
    </div>
  );
};
