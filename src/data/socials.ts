import { FaGithub, FaLinkedin } from "react-icons/fa";
import type { SocialLink } from "@/types/content";

export const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/enmanuel93?tab=repositories",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/francisco-enmanuel-cruz-mejia-7b2705158/",
    label: "LinkedIn",
  },
] as const satisfies readonly SocialLink[];
