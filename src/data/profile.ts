import type { Profile } from "@/types/content";

// The parts of the profile that read the same in every language; each locale
// in src/locales adds its headline and bio (the CV is in data/cv.ts).
export const profileBase = {
  name: "Francisco Cruz Mejía",
  brand: { name: "FCruz", accent: "-Dev" },
  photo: {
    src: "/profile-photo.jpg",
    alt: "Francisco Cruz Mejía",
  },
  yearsOfExperience: "+7",
  allProjectsUrl: "https://github.com/enmanuel93?tab=repositories",
} as const satisfies Omit<Profile, "headline" | "bio" | "cvUrl">;
