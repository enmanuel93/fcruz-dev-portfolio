import { profileBase } from "@/data/profile";
import type { AboutContent, Profile } from "@/types/content";

export const profile = {
  ...profileBase,
  headline: "Sviluppatore .NET • Sviluppatore Full Stack",
  bio: "Ciao, sono Francisco Cruz Mejía, Sviluppatore Full Stack specializzato nell'ecosistema .NET e in React. Realizzo API RESTful, microservizi e applicazioni web pronte per il cloud su Microsoft Azure.",
  cvUrl: "/documents/cv/it/Francisco_Cruz_Mejia_NET_Developer_CV_IT.pdf",
} as const satisfies Profile;

export const about = {
  paragraphs: [
    "Sono uno Sviluppatore Full Stack con oltre 7 anni di esperienza, specializzato nell'ecosistema .NET e in tecnologie frontend moderne come React. Gran parte della mia carriera è stata dedicata alla modernizzazione di applicazioni critiche in ambito governativo e privato.",
    "Progetto API RESTful e microservizi con ASP.NET Core, lavoro con SQL Server, Redis e RabbitMQ, e rilascio tramite pipeline CI/CD su Microsoft Azure. Sul frontend, creo interfacce responsive con React, TypeScript e Tailwind CSS.",
    "Sono un professionista orientato ai risultati, abituato ad ambienti dinamici e a team Agile (Scrum), e mi affido a design pattern, principi SOLID e Clean Architecture per mantenere i sistemi manutenibili.",
  ],
  mission:
    "La mia missione è creare software affidabile e manutenibile che risolva problemi reali, come una piattaforma che permette a oltre 10.000 cittadini di gestire online le pratiche immobiliari.",
} as const satisfies AboutContent;
