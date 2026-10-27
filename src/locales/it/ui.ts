import type { UiText } from "../types";

export const ui = {
  brandLogoLabel: (brand) => `${brand}, torna all'inizio`,
  nav: {
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    downloadCv: "Scarica CV",
  },
  footer: {
    navLabel: "Piè di pagina",
    rightsReserved: "Tutti i diritti riservati.",
  },
  hero: {
    titleStart: "Creo esperienze digitali",
    titleAccent: "con precisione.",
    viewProjects: "Vedi i progetti",
    contactMe: "Contattami",
    emailLabel: "Email",
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
    titleStart: "Costruiamo",
    titleAccent: "qualcosa di grande.",
    intro:
      "Hai un progetto in mente? Mi piacerebbe saperne di più. Scrivimi un messaggio e parliamo di come possiamo lavorare insieme.",
    availableTitle: "Attualmente disponibile",
    availableText:
      "Sono aperto a nuove opportunità e progetti stimolanti. Che tu cerchi un ingegnere a tempo pieno o un consulente freelance, parliamone!",
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
  },
} satisfies UiText;
