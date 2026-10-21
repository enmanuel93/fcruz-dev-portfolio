import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Joins conditional class names and lets later Tailwind classes win over
// earlier ones, so cn("px-6", "px-4") gives "px-4" instead of both.
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
