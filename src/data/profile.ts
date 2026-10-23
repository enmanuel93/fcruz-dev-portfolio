import type { AboutContent, Profile } from "@/types/content";

export const profile = {
  name: "Francisco Cruz Mejía",
  brand: { name: "FCruz", accent: "-Dev" },
  headline: ".NET Developer • Full Stack Developer",
  bio: "Hi, I'm Francisco Cruz Mejía — a Full Stack Developer specializing in the .NET ecosystem and React. I build RESTful APIs, microservices and cloud-ready web applications on Microsoft Azure.",
  photo: {
    src: "/profile-photo.jpg",
    alt: "Francisco Cruz Mejía",
  },
  yearsOfExperience: "+7",
  // Files live in public/documents/; replacing a PDF needs no code change.
  cvUrl: "/documents/cv/en/Francisco_Cruz_Mejia_NET_Developer_CV_EU.pdf",
  allProjectsUrl: "https://github.com/enmanuel93?tab=repositories",
} as const satisfies Profile;

export const about = {
  paragraphs: [
    "I'm a Full Stack Developer with over 7 years of experience, specializing in the .NET ecosystem and modern frontend technologies like React. Most of my career has been spent modernizing critical applications for the government and private sectors.",
    "I design RESTful APIs and microservices with ASP.NET Core, work with SQL Server, Redis and RabbitMQ, and ship through CI/CD pipelines on Microsoft Azure. On the frontend, I build responsive interfaces with React, TypeScript and Tailwind CSS.",
    "I'm a results-oriented professional, used to dynamic environments and Agile (Scrum) teams, and I rely on design patterns, SOLID principles and Clean Architecture to keep systems maintainable.",
  ],
  mission:
    "My mission is to build reliable, maintainable software that solves real problems — like a platform that lets more than 10,000 citizens handle property procedures online.",
} as const satisfies AboutContent;
