import type { ReactElement } from "react";
import { profileBase as profile } from "@/data/profile";
import { useLocale } from "@/i18n/useLocale";

export const Portrait = (): ReactElement => {
  const { portrait } = useLocale().content.ui;

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
      <div className="animate-fade-in relative rounded-[1.75rem] border border-border p-2">
        <img
          src={profile.photo.src}
          alt={profile.photo.alt}
          width={448}
          height={560}
          className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
        />
      </div>

      <div className="panel absolute -left-4 top-10 rounded-2xl px-4 py-3 sm:-left-8">
        <div className="text-2xl font-bold tabular-nums text-accent">
          {profile.yearsOfExperience}
        </div>
        <div className="text-xs text-muted-foreground">{portrait.yearsOfExperience}</div>
      </div>

      <div className="panel absolute -bottom-6 right-2 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-right-6">
        <span className="size-2.5 rounded-full bg-success" aria-hidden="true" />
        <div>
          <div className="text-xs text-muted-foreground">{portrait.availableForWork}</div>
          <div className="text-sm font-medium">{portrait.workTypes}</div>
        </div>
      </div>
    </div>
  );
};
