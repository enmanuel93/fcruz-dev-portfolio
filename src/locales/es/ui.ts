import type { UiText } from "../types";

export const ui = {
  brandLogoLabel: (brand) => `${brand}, volver al inicio`,
  nav: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    downloadCv: "Descargar CV",
  },
  footer: {
    navLabel: "Pie de página",
    rightsReserved: "Todos los derechos reservados.",
  },
  hero: {
    titleStart: "Creando experiencias digitales",
    titleAccent: "con precisión.",
    viewProjects: "Ver proyectos",
    contactMe: "Contáctame",
    emailLabel: "Correo electrónico",
  },
  portrait: {
    yearsOfExperience: "Años de experiencia",
    availableForWork: "Disponible para trabajar",
    workTypes: "Freelance / Tiempo completo",
  },
  about: {
    title: "Sobre mí",
    description: "Quién soy y cómo trabajo.",
  },
  projects: {
    title: "Proyectos destacados",
    description:
      "Sistemas en producción que he diseñado y construido, desde plataformas gubernamentales hasta e-commerce.",
    viewAll: "Ver todos los proyectos",
    liveDemo: "Demo en vivo",
    code: "Código",
    linkComingSoon: "Enlace disponible pronto",
    liveDemoLabel: (projectTitle) => `Ver la demo en vivo de ${projectTitle}`,
    codeLabel: (projectTitle) => `Ver el código fuente de ${projectTitle} en GitHub`,
  },
  experience: {
    title: "Experiencia laboral",
    description: "Dónde he desarrollado software, de lo más reciente a lo más antiguo.",
    viewMoreOnLinkedIn: "Ver más en LinkedIn",
  },
  skills: {
    title: "Habilidades y tecnologías",
    description: "El stack que uso a diario, de la base de datos al navegador.",
  },
  testimonials: {
    title: "Testimonios",
    description: "Lo que dicen las personas con las que he trabajado.",
    previous: "Testimonio anterior",
    next: "Testimonio siguiente",
    showTestimonial: (position, total) => `Mostrar testimonio ${position} de ${total}`,
  },
  contact: {
    titleStart: "Construyamos",
    titleAccent: "algo increíble.",
    intro:
      "¿Tienes un proyecto en mente? Me encantaría conocerlo. Envíame un mensaje y hablemos de cómo podemos trabajar juntos.",
    availableTitle: "Disponible actualmente",
    availableText:
      "Estoy abierto a nuevas oportunidades y proyectos interesantes. Tanto si buscas un ingeniero a tiempo completo como un consultor freelance, ¡hablemos!",
    form: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre...",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Tu mensaje...",
      send: "Enviar mensaje",
      sending: "Enviando...",
    },
  },
} satisfies UiText;
