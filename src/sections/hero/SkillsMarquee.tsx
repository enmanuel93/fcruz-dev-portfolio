import type { ReactElement } from "react";

interface SkillsMarqueeProps {
  skills: readonly string[];
}

export const SkillsMarquee = ({ skills }: SkillsMarqueeProps): ReactElement => {
  return (
    <div className="mt-20 animate-fade-in animation-delay-600">
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Technologies I work with
      </p>
      <div className="relative overflow-hidden">
        {/* The list is rendered twice and the marquee slides it by -50%, which
            lands exactly on the start of the copy and makes the loop seamless. */}
        <div className="flex animate-marquee">
          {[...skills, ...skills].map((skill, idx) => (
            <div key={`${skill}-${idx}`} className="flex-shrink-0 px-8 py-4">
              <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
