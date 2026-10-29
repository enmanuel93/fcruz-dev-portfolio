import type { Testimonial } from "@/types/content";

// Empty for now, which keeps the section hidden. Add { quote, author, role,
// avatar } entries (avatar from public/) and it shows up.
export const testimonials = [] as const satisfies readonly Testimonial[];
