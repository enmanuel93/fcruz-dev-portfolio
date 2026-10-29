import type { UiText } from "../types";

export const ui = {
  brandLogoLabel: (brand) => `${brand}, torna all'inizio`,
  nav: {
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    downloadCv: "Scarica CV",
    language: "Lingua",
  },
  footer: {
    navLabel: "Piè di pagina",
    rightsReserved: "Tutti i diritti riservati.",
  },
  hero: {
    titleStart: "Costruisco i backend su cui le persone",
    titleAccent: "contano ogni giorno.",
    viewProjects: "Vedi i progetti",
    contactMe: "Contattami",
  },
  portrait: {
    yearsOfExperience: "Anni di esperienza",
    availableForWork: "Disponibile per lavorare",
    workTypes: "Freelance / Tempo pieno",
  },
  about: {
    title: "Chi sono",
    description: "Chi sono e come lavoro.",
  },
  projects: {
    title: "Progetti in evidenza",
    description:
      "Sistemi in produzione che ho progettato e realizzato, dalle piattaforme governative all'e-commerce.",
    viewAll: "Vedi tutti i progetti",
    liveDemo: "Demo live",
    code: "Codice",
    linkComingSoon: "Link disponibile a breve",
    liveDemoLabel: (projectTitle) => `Vedi la demo live di ${projectTitle}`,
    codeLabel: (projectTitle) => `Vedi il codice sorgente di ${projectTitle} su GitHub`,
  },
  experience: {
    title: "Esperienza lavorativa",
    description: "Dove ho sviluppato software, dal più recente.",
    viewMoreOnLinkedIn: "Scopri di più su LinkedIn",
  },
  skills: {
    title: "Competenze e tecnologie",
    description: "Lo stack che uso ogni giorno, dal database al browser.",
  },
  testimonials: {
    title: "Testimonianze",
    description: "Cosa dicono le persone con cui ho lavorato.",
    previous: "Testimonianza precedente",
    next: "Testimonianza successiva",
    showTestimonial: (position, total) => `Mostra testimonianza ${position} di ${total}`,
  },
  contact: {
    titleStart: "Scrivimi e",
    titleAccent: "ne parliamo.",
    intro:
      "Raccontami il progetto o la posizione e ti rispondo entro un giorno o due.",
    availableTitle: "Disponibile a lavorare",
    availableText: "A tempo pieno o freelance, da remoto o in sede.",
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Il tuo nome...",
      emailLabel: "Email",
      emailPlaceholder: "tua@email.com",
      messageLabel: "Messaggio",
      messagePlaceholder: "Il tuo messaggio...",
      send: "Invia messaggio",
      sending: "Invio in corso...",
    },
    validation: {
      nameTooShort: (min) => `Il nome deve contenere almeno ${min} caratteri.`,
      nameTooLong: (max) => `Il nome deve contenere al massimo ${max} caratteri.`,
      emailRequired: "Inserisci la tua email.",
      emailInvalid: "Inserisci un indirizzo email valido.",
      messageTooShort: (min) => `Il messaggio deve contenere almeno ${min} caratteri.`,
      messageTooLong: (max) => `Il messaggio deve contenere al massimo ${max} caratteri.`,
    },
    status: {
      success: "Messaggio inviato con successo! Ti risponderò presto.",
      failed: "Invio del messaggio non riuscito. Riprova più tardi.",
    },
  },
  meta: {
    title: "FCruz-Dev | Francisco Cruz Mejía, Sviluppatore .NET Full Stack",
    description:
      "Portfolio di Francisco Cruz Mejía, Sviluppatore .NET e Full Stack. Progetti, esperienza e contatti.",
  },
} satisfies UiText;
