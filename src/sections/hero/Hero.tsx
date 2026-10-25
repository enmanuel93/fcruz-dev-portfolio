import { FolderGit2, MessageSquare } from "lucide-react";
import type { ReactElement } from "react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FaEnvelope } from "react-icons/fa";
import { contactInfo } from "@/data/contact";
import { CONTACT_HREF, PROJECTS_HREF } from "@/data/navigation";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/socials";
import type { SocialLink } from "@/types/content";
import { FloatingDots } from "./FloatingDots";
import { Portrait } from "./Portrait";

const email = contactInfo.find(({ label }) => label === "Email");

// The social profiles plus a direct email link, reusing the email from the contact data.
const heroLinks: readonly SocialLink[] = email
  ? [...socialLinks, { icon: FaEnvelope, href: email.href, label: "Email" }]
  : socialLinks;

export const Hero = (): ReactElement => {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div
        className="pointer-events-none absolute -top-40 right-0 size-[42rem] rounded-full bg-primary/15 blur-[120px]"
        aria-hidden="true"
      />
      <FloatingDots />

      <div className="container relative mx-auto grid items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-accent animate-fade-in">
            {profile.headline}
          </span>

          <h1 className="mt-6 max-w-2xl text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-6xl xl:text-7xl animate-fade-in animation-delay-100">
            Crafting digital experiences{" "}
            <span className="text-accent">with precision.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-in animation-delay-200">
            {profile.bio}
          </p>

          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap animate-fade-in animation-delay-300">
            <Button to={PROJECTS_HREF} size="lg">
              <FolderGit2 className="size-5" aria-hidden="true" />
              View Projects
            </Button>
            <Button to={CONTACT_HREF} size="lg" variant="outline">
              <MessageSquare className="size-5" aria-hidden="true" />
              Contact Me
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 animate-fade-in animation-delay-400">
            <SocialLinks links={heroLinks} linkClassName="duration-300" />
          </div>
        </div>

        <Portrait />
      </div>
    </section>
  );
};
