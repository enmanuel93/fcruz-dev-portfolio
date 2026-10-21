# Nueva estructura del proyecto

Plan para convertir este portafolio (hoy basado en una plantilla con datos de ejemplo) en un proyecto profesional, listo para GitHub y para colocar mi información real.

> **Orden recomendado:** 1) arreglar bugs → 2) reorganizar carpetas y separar el contenido → 3) herramientas de calidad (Prettier, tests, CI) → 4) SEO, rendimiento y deploy → 5) extras opcionales.

---

## 1. Diagnóstico actual

**Lo que ya está bien**

- Stack moderno: React 19 + TypeScript + Vite + Tailwind CSS v4.
- Alias `@/` configurado en Vite y TypeScript.
- Tipos con `interface` y arreglos `readonly` en casi todas las secciones.
- Variables de entorno tipadas (`src/vite-env.d.ts`) y `.env` fuera de git.
- Commits con formato *Conventional Commits* (`feat:`, `refactor:`).

**Problemas principales**

| Problema | Dónde | Impacto |
|---|---|---|
| Los datos (proyectos, experiencia, testimonios, skills, redes) están mezclados con el JSX | Todas las `sections/*.tsx` | Para poner mi información hay que editar 7 componentes |
| Datos repetidos: links de navegación y redes sociales definidos 2–3 veces | `Navbar.tsx`, `Footer.tsx`, `Hero.tsx` | Cambiar un link obliga a editar varios archivos |
| Nombre/textos de la plantilla ("Pedro Machado", "PM.") | `Hero`, `Footer`, `Navbar`, `Testimonials`, `About` | Información que no es mía |
| README es el de la plantilla de Vite | `README.md` | Es lo primero que ve un reclutador en GitHub |
| Sin formateador, sin tests, sin CI | — | Calidad no verificable |
| Animaciones al cargar la página, no al hacer scroll | `index.css` (`animate-fade-in`) | Las secciones de abajo ya terminaron su animación cuando llegas a ellas |

---

## 2. Bugs y detalles a corregir (rápidos)

> **¿Por qué empezar por aquí?** Son cambios pequeños y de bajo riesgo, pero hoy el proyecto **no compila** (`npm run build` falla). Un proyecto que no compila no se puede desplegar ni pasar un CI, y cualquier reclutador que clone el repo lo vería fallar. Además, si reorganizo carpetas antes de arreglarlos, los bugs se mueven de lugar y es más difícil saber si un error es nuevo o ya existía.

**TypeScript / lint** (`npm run build` falla por esto):
- [x] `import React` sin usar en `Experience.tsx`, `Projects.tsx`, `Testimonials.tsx`, `Footer.tsx` → cambiar a `import type { ReactElement } from "react"`.

**Clases de Tailwind mal escritas** (no se aplican):
- [x] `Hero.tsx`: `overflow-hiden` → `overflow-hidden`.
- [x] `Hero.tsx`: `font-semibild` → `font-semibold`.
- [x] `Hero.tsx`: `animate-delay-200` → `animation-delay-200`.
- [x] `Testimonials.tsx`: el encabezado tiene `text-center max-w-3xl` pero le falta `mx-auto`.

**Textos**:
- [x] `Hero.tsx`: "Software Enginee" → "Software Engineer".
- [ ] `Hero.tsx`: el `alt` de la foto dice "Francisco Cruz Mejía" pero el texto dice "Pedro Machado" (unificar).
- [x] `index.html`: `<title>manudev-portfolio</title>` y `lang="en"` → título real y descripción.
- [x] `index.html`: apunta a `/favicon.svg`, que no existe (en `public/` solo hay `vite.svg`).

> **¿Por qué importan las clases y los textos?** Tailwind no avisa cuando una clase está mal escrita: simplemente no la aplica. Por eso `overflow-hiden` deja que el marquee de skills se desborde sin que nadie lo note. Y los errores de ortografía o un nombre que no coincide son lo primero que nota quien revisa un portafolio; transmiten descuido aunque el código sea bueno.

**Semántica y accesibilidad**:
- [x] `App.tsx`: `<Footer />` está dentro de `<main>` → moverlo fuera. Quitar el fragmento `<>` sobrante.
- [x] `Testimonials.tsx`: los botones (anterior, siguiente, puntos) no tienen `type="button"` ni `aria-label`.
- [x] `Projects.tsx`: los links del overlay (demo / GitHub) no tienen `aria-label` y solo aparecen con *hover* (inaccesibles en móvil y con teclado).
- [x] `Contact.tsx`: el input de email no tiene `type="email"`.
- [x] `AnimatedBorderButton.tsx`: no recibe `onClick`/`href`, así que "Download CV" y "View All Projects" no hacen nada.
- [x] Respetar `prefers-reduced-motion` (marquee, puntos flotantes, `animate-bounce`).

> **¿Por qué la accesibilidad?**
> - **Semántica (`<main>`, `<footer>`):** los lectores de pantalla y Google usan estas etiquetas para entender la página. Un footer dentro de `<main>` le dice al navegador que los links legales y redes son "contenido principal".
> - **`aria-label` en botones de solo ícono:** un botón con solo `<ChevronLeft />` se anuncia como "botón" sin más; el usuario de lector de pantalla no sabe qué hace.
> - **`type="button"`:** sin él, un botón dentro de un formulario es `submit` por defecto; es un hábito que evita bugs difíciles de rastrear.
> - **Links que solo aparecen con hover:** en móvil y con teclado no existe el hover, así que los links a la demo y al repo de cada proyecto son invisibles para esos usuarios.
> - **`prefers-reduced-motion`:** algunas personas sienten mareo con animaciones constantes y lo desactivan en su sistema operativo; respetarlo es un estándar (WCAG 2.3.3).
> - Además, Lighthouse mide accesibilidad, y un puntaje alto es un argumento concreto en una entrevista.

**Buenas prácticas de React**:
- [x] Usar `key={item.id}` o `key={item.title}` en vez de `key={idx}` (`Projects`, `Experience`, `About`).
- [x] Constantes duplicadas `INCREMENT` / `MILISECONS_AMOUNT` (además mal escrito) en `About`, `Projects`, `Experience` → una sola utilidad `getAnimationDelay(index, step)`.
- [x] Assets sin usar: `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`.

> **¿Por qué estos cambios de React?**
> - **`key` estable en vez de índice:** React usa la `key` para saber qué elemento es cuál entre renders. Con el índice, si reordeno o filtro proyectos (por ejemplo, "solo destacados"), React reutiliza el elemento equivocado y las animaciones o el estado interno se mezclan. Un `id` evita eso.
> - **Una sola utilidad para el delay de animación:** hoy la misma fórmula está copiada en 3 archivos con valores distintos. Si quiero cambiar el ritmo de las animaciones, tendría que acordarme de los 3 lugares (principio DRY).
> - **Borrar assets sin usar:** hacen el repo más confuso ("¿esto se usa?") y algunos son restos de la plantilla.

---

## 3. Arquitectura propuesta

Para un portafolio **no hace falta** backend, Redux ni micro-frontends. La arquitectura correcta es una **SPA estática con el contenido separado de la presentación**: los componentes solo pintan, y toda mi información vive en archivos de datos tipados.

### Estructura de carpetas

```
src/
├── app/
│   ├── App.tsx                # Composición de secciones
│   └── main.tsx               # Punto de entrada
│
├── components/
│   ├── ui/                    # Piezas reutilizables sin contenido propio
│   │   ├── Button.tsx
│   │   ├── AnimatedBorderButton.tsx
│   │   ├── SectionHeader.tsx  # El "badge + título + subtítulo" que hoy se repite en 5 secciones
│   │   ├── Tag.tsx            # Las pastillas de tecnologías
│   │   └── SocialLinks.tsx    # Usado en Hero y Footer
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── sections/                  # Una carpeta por sección cuando crece
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── FloatingDots.tsx
│   │   └── SkillsMarquee.tsx
│   ├── about/About.tsx
│   ├── projects/
│   │   ├── Projects.tsx
│   │   └── ProjectCard.tsx
│   ├── experience/
│   │   ├── Experience.tsx
│   │   └── TimelineItem.tsx
│   ├── testimonials/Testimonials.tsx
│   └── contact/
│       ├── Contact.tsx
│       ├── ContactForm.tsx
│       └── useContactForm.ts  # Lógica de EmailJS fuera del JSX
│
├── data/                      # ⭐ AQUÍ VA TODA MI INFORMACIÓN
│   ├── profile.ts             # Nombre, rol, bio, foto, CV, años de experiencia
│   ├── navigation.ts          # Links de navegación (Navbar + Footer)
│   ├── socials.ts             # GitHub, LinkedIn, etc. (Hero + Footer)
│   ├── skills.ts
│   ├── projects.ts
│   ├── experience.ts
│   └── testimonials.ts
│
├── types/
│   └── content.ts             # Project, Experience, Testimonial, SocialLink...
│
├── hooks/
│   └── useInView.ts           # Animar secciones al entrar en pantalla
│
├── lib/
│   ├── cn.ts                  # Unir clases de Tailwind (clsx + tailwind-merge)
│   └── animation.ts           # getAnimationDelay()
│
├── config/
│   └── env.ts                 # Lectura y validación de variables de entorno
│
├── styles/
│   └── index.css
└── vite-env.d.ts
```

### Ejemplo: datos separados del componente

```ts
// src/types/content.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
}
```

```ts
// src/data/projects.ts
import type { Project } from "@/types/content";

export const projects = [
  {
    id: "mi-proyecto",
    title: "Mi proyecto real",
    description: "...",
    image: "/projects/mi-proyecto.webp",
    tags: ["React", "TypeScript"],
    repoUrl: "https://github.com/<usuario>/mi-proyecto",
    featured: true,
  },
] as const satisfies readonly Project[];
```

```tsx
// src/sections/projects/Projects.tsx
import { projects } from "@/data/projects";
// ...solo se encarga de pintar
```

**Ventaja:** para actualizar el portafolio solo edito `src/data/`, nunca el JSX. `satisfies` hace que TypeScript me avise si olvido un campo.

### Reglas de la arquitectura

1. `components/ui` no importa nada de `data/` ni de `sections/`.
2. `sections/` importa de `components/`, `data/`, `hooks/` y `lib/`.
3. Solo `config/env.ts` lee `import.meta.env`.
4. Cada pieza de información existe **una sola vez** (un solo arreglo de redes sociales, uno de navegación).
5. Las props opcionales se marcan como opcionales (`demoUrl?`) y la UI oculta el botón si no existen, en vez de usar `"#"`.

### ¿Por qué esta arquitectura?

**¿Por qué una SPA estática y no algo más complejo?**
Un portafolio es contenido que cambia pocas veces al año, no tiene usuarios que inicien sesión ni datos que vengan de una base de datos. Agregar un backend, una base de datos o un framework con servidor (Next.js) significa más cosas que mantener, pagar y que se pueden romper, sin ningún beneficio para el visitante. Vite genera archivos estáticos que se sirven gratis y muy rápido desde cualquier CDN. *La mejor arquitectura es la más simple que resuelve el problema.*

**¿Por qué separar el contenido (`data/`) de los componentes?**
Es el principio de **separación de responsabilidades**: los componentes saben *cómo* mostrar algo, los datos dicen *qué* mostrar.
- **Mantenimiento:** hoy, para agregar un proyecto tengo que abrir `Projects.tsx` y editar entre JSX y clases de Tailwind, con riesgo de romper el diseño. Con `data/projects.ts` solo agrego un objeto.
- **Una sola fuente de verdad:** mis redes sociales están definidas en `Hero.tsx` y en `Footer.tsx`. Si cambio mi LinkedIn en uno y olvido el otro, el sitio queda inconsistente. Con `data/socials.ts` es imposible.
- **Preparado para crecer:** si mañana quiero i18n (español/inglés) o leer los proyectos desde un CMS o desde la API de GitHub, solo cambio de dónde vienen los datos; los componentes no se tocan.
- **Es como se trabaja en equipos reales:** mostrar esta separación en un portafolio dice más de mi criterio que el diseño en sí.

**¿Por qué tipos en `types/content.ts` y `satisfies`?**
Los tipos son el "contrato" entre los datos y los componentes. Con `satisfies readonly Project[]`, TypeScript valida que cada proyecto tenga todos los campos obligatorios (si olvido `description`, no compila), pero conserva los valores literales exactos. Es mejor que una anotación `: Project[]`, que pierde esa información, y mucho mejor que descubrir el error en el navegador.

**¿Por qué `components/ui` separado de `components/layout` y de `sections/`?**
Son tres niveles de reutilización distintos:
- `ui/`: piezas genéricas (un botón, una etiqueta) que podría usar en cualquier proyecto.
- `layout/`: estructura que aparece en toda la página (navbar, footer).
- `sections/`: piezas únicas de este portafolio.

Esta separación hace evidente dónde buscar algo y evita dependencias circulares. La regla de que `ui/` no importe `data/` garantiza que los componentes base sigan siendo reutilizables.

**¿Por qué una carpeta por sección (`sections/projects/ProjectCard.tsx`)?**
`Contact.tsx` ya tiene 300 líneas mezclando formulario, lógica de EmailJS, tarjetas de información y estilos. Los archivos grandes son difíciles de leer y de probar. Dividir en piezas pequeñas (`ContactForm`, `useContactForm`) permite testear la lógica sin renderizar toda la sección, y cada archivo tiene una sola razón para cambiar.

**¿Por qué un hook `useContactForm` y un `config/env.ts`?**
Separar la lógica (enviar email, manejar errores, estados de carga) de la vista permite cambiar el proveedor de email (de EmailJS a Resend o Formspree) sin tocar el JSX. Y centralizar `import.meta.env` en un solo archivo hace que una variable faltante se detecte en un único lugar con un mensaje claro, en vez de fallar silenciosamente en medio de un componente.

---

## 4. Tecnologías recomendadas

### Imprescindibles (calidad básica de un proyecto profesional)

| Herramienta | Para qué |
|---|---|
| **Prettier** + `prettier-plugin-tailwindcss` | Formato uniforme y clases de Tailwind ordenadas automáticamente |
| **ESLint con reglas tipadas** (`tseslint.configs.strictTypeChecked`) + `eslint-plugin-jsx-a11y` | Detectar errores de tipos y de accesibilidad |
| **clsx + tailwind-merge** (función `cn()`) | Reemplaza el `[...].filter(Boolean).join(" ")` de `Button.tsx` y los template strings con ternarios |
| **Husky + lint-staged** | Ejecutar lint y formato antes de cada commit |
| **commitlint** | Formalizar los Conventional Commits que ya uso |
| **GitHub Actions** | CI que corre `lint`, `typecheck`, `test` y `build` en cada push/PR |

### Muy recomendadas

| Herramienta | Para qué |
|---|---|
| **Vitest + React Testing Library** | Tests unitarios (ej. `Button`, carrusel de testimonios, formulario de contacto) |
| **React Hook Form + Zod** | Validación real del formulario de contacto (email válido, longitud mínima, mensajes de error por campo) |
| **Motion** (`motion/react`) o un hook propio con `IntersectionObserver` | Animaciones al hacer scroll, respetando `prefers-reduced-motion` |
| **Imágenes en WebP/AVIF** + `loading="lazy"` + `width`/`height` | `public/projects` pesa ~3 MB; se puede reducir más del 80 % |
| **Fuentes self-hosted** (`@fontsource/inter`, `@fontsource/playfair-display`) | Quitar la dependencia de Google Fonts y mejorar la carga |
| **Deploy en Vercel o Netlify** | URL pública con preview automático por cada PR |

### Opcionales (si quiero destacar más)

| Herramienta | Para qué |
|---|---|
| **i18n español / inglés** (`react-i18next` o un diccionario propio en `data/`) | Muy valorado si aplico a empresas fuera del país |
| **Playwright** | Un test E2E: la página carga, la navegación lleva a cada sección, el formulario valida |
| **Lighthouse CI** | Medir rendimiento, accesibilidad y SEO en cada PR |
| **Modo claro/oscuro** | Ya uso tokens de color en `index.css`, es fácil agregar un tema claro |
| **Astro** (migración) | Solo si quiero un blog o SEO muy fuerte; genera HTML estático con casi cero JS. **No es necesario** para el portafolio actual |

**No recomiendo:** Redux/Zustand (no hay estado global), Next.js (no hay rutas ni servidor que justifiquen el cambio), mantener dos librerías de íconos sin motivo (`lucide-react` + `react-icons`; se puede dejar `react-icons` solo para logos de marcas).

### ¿Por qué estas tecnologías?

El criterio para elegir cada herramienta fue: **¿resuelve un problema real de este proyecto o demuestra una práctica que se usa en la industria?** Si no cumple ninguna de las dos, no entra.

**Prettier**
Hoy el código mezcla comillas simples y dobles (`main.tsx` vs. el resto), y hay `className` partidos en varias líneas de forma irregular. Discutir formato es tiempo perdido: Prettier lo decide automáticamente y todo el código se ve igual. El plugin de Tailwind ordena las clases siempre en el mismo orden, lo que hace los diffs de git más fáciles de leer.

**ESLint con reglas tipadas + jsx-a11y**
La configuración actual (`recommended`) no usa la información de tipos, así que no detecta cosas como promesas sin `await` o condiciones siempre verdaderas. `strictTypeChecked` sí. `jsx-a11y` habría detectado automáticamente los botones sin `aria-label` y las imágenes con `alt` poco descriptivo que encontré a mano en la sección 2.

**clsx + tailwind-merge (`cn()`)**
Resuelve dos problemas: (1) hoy las clases condicionales se arman con template strings y ternarios largos, difíciles de leer; (2) si `Button` tiene `px-6` y le paso `className="px-4"`, ambas clases quedan en el HTML y gana la que aparezca después en el CSS, no la que yo quiero. `tailwind-merge` resuelve el conflicto y deja solo `px-4`. Es el patrón estándar de librerías como shadcn/ui.

**Husky + lint-staged + commitlint**
Las herramientas de calidad solo sirven si se ejecutan. Husky las corre automáticamente antes de cada commit, y lint-staged lo hace solo sobre los archivos modificados para que sea rápido. Commitlint asegura que el historial siga Conventional Commits (que ya uso, pero con inconsistencias como `refact(footer)` en vez de `refactor(footer)`). Un historial limpio permite generar changelogs automáticos y se ve profesional en GitHub.

**GitHub Actions (CI)**
Husky se puede saltar (`--no-verify`); el CI no. Cada push o PR ejecuta lint, typecheck, tests y build en un servidor limpio, y GitHub muestra un ✅ o ❌. Garantiza que `main` siempre compile, y el badge verde en el README demuestra que sé trabajar con integración continua, algo que se pide en casi cualquier oferta de trabajo.

**Vitest + React Testing Library**
Vitest usa la misma configuración que Vite (cero configuración extra) y es mucho más rápido que Jest. Testing Library prueba los componentes como los usa una persona ("hago clic en *Siguiente* y aparece otro testimonio"), no sus detalles internos, así que los tests no se rompen al refactorizar. No hace falta testear todo: con el carrusel, el formulario y `Button` ya demuestro la práctica.

**React Hook Form + Zod**
El formulario actual solo usa `required` de HTML: acepta cualquier texto como email y muestra mensajes del navegador que no combinan con el diseño. Zod define las reglas una sola vez (email válido, mensaje de al menos 10 caracteres) y genera el tipo TypeScript automáticamente. React Hook Form maneja los estados sin re-renderizar en cada tecla. Resultado: menos código que el `useState` actual y mejor experiencia.

**Animaciones al hacer scroll (Motion o `IntersectionObserver`)**
Hoy todas las secciones animan su entrada al cargar la página; cuando bajo hasta *Experience*, la animación ya terminó hace rato y no se ve. Animar al entrar en pantalla es lo que el diseño originalmente pretende. Un hook propio con `IntersectionObserver` no agrega dependencias; Motion conviene si quiero animaciones más elaboradas.

**Imágenes WebP/AVIF, `loading="lazy"`, `width`/`height`**
Las 4 imágenes de proyectos pesan ~3 MB, más que todo el código de la app. En móvil con datos eso es lento y caro para el visitante. WebP reduce el peso entre 60 y 90 % con la misma calidad visual. `loading="lazy"` evita descargar imágenes que el usuario no ha visto, y `width`/`height` evitan que la página "salte" al cargar (métrica CLS de Core Web Vitals).

**Fuentes self-hosted**
Cargar fuentes desde Google Fonts agrega una conexión extra a otro dominio antes de poder mostrar el texto, y envía la IP del visitante a Google. Con `@fontsource` las fuentes vienen dentro del build, cargan más rápido y no hay dependencia externa.

**Vercel o Netlify**
Un portafolio sin URL pública no sirve. Ambos tienen plan gratuito, despliegan automáticamente con cada push a `main` y crean una URL de preview por cada PR para revisar cambios antes de publicarlos. Las variables de entorno de EmailJS se configuran en su panel.

**i18n (opcional)**
Si busco trabajo remoto o en empresas internacionales, tener el portafolio en inglés amplía mucho las oportunidades, y tenerlo también en español conserva el mercado local. Gracias a la separación en `data/`, agregarlo es relativamente simple.

**Playwright y Lighthouse CI (opcionales)**
Los tests unitarios prueban piezas aisladas; Playwright prueba la página completa en un navegador real. Lighthouse CI evita que un cambio futuro (una imagen pesada, una fuente nueva) empeore el rendimiento sin que me dé cuenta. Son opcionales porque el beneficio es menor en un sitio pequeño, pero suman como demostración.

**¿Por qué NO las otras?**
- **Redux/Zustand:** sirven para compartir estado entre muchas partes de la app. Aquí el único estado es el menú móvil, el carrusel y el formulario, cada uno local a su componente. Agregarlos sería complejidad sin propósito, y un revisor con experiencia lo notaría.
- **Next.js:** su valor está en el renderizado en servidor, las rutas y las API. Una sola página estática no necesita nada de eso.
- **Dos librerías de íconos:** cada una agrega peso al bundle y estilos distintos. Lucide cubre los íconos de interfaz; `react-icons` solo hace falta para logos de marcas (GitHub, LinkedIn), que Lucide ya no incluye.

---

## 5. SEO y presentación en GitHub

### `index.html`
- [x] `<title>` con mi nombre y rol, `<meta name="description">`.
- [ ] Open Graph y Twitter Card (`og:title`, `og:description`, `og:image`) para que el link se vea bien al compartirlo en LinkedIn.
- [x] Favicon propio.
- [x] `lang` acorde al idioma del contenido.

### `README.md` (reemplazar el de la plantilla)
1. Captura o GIF del portafolio + link al sitio en vivo.
2. Tecnologías usadas (badges).
3. Cómo correrlo: `npm install`, copiar `.env.example` a `.env`, `npm run dev`.
4. Estructura de carpetas (resumen de la sección 3).
5. Scripts disponibles.
6. Licencia (MIT) y créditos a la plantilla/diseño original si aplica.

### Repositorio
- [ ] Restaurar `.env.example` (se eliminó en el commit `977a5b1`) para documentar las variables sin exponer valores.
- [ ] Decidir si `.claude/` y `.agents/` (skills de IA, duplicadas) deben estar en el repo público. Si no, agregarlas a `.gitignore`.
- [ ] `package.json`: cambiar `"version": "0.0.0"`, agregar `"description"`, `"author"`, `"engines"`.
- [ ] Agregar scripts:
  ```json
  "typecheck": "tsc -b --noEmit",
  "format": "prettier --write .",
  "test": "vitest"
  ```

> **¿Por qué cuidar SEO y el repositorio?**
> - **Meta tags y Open Graph:** cuando comparto el link en LinkedIn o WhatsApp, sin `og:image` aparece un recuadro vacío; con él aparece una tarjeta con mi foto y mi rol. Es la primera impresión antes de que alguien abra el sitio.
> - **README:** muchos reclutadores ven el repositorio y no el sitio. Un README con captura, link en vivo, tecnologías e instrucciones demuestra que sé documentar, una habilidad que se valora tanto como programar.
> - **`.env.example`:** cualquiera que clone el repo (o yo en otra computadora) sabe qué variables necesita sin ver mis valores reales.
> - **`.claude/` y `.agents/`:** son archivos de configuración de herramientas de IA, no parte del portafolio. Agregan ruido al repo; si los dejo públicos, que sea una decisión consciente.
> - **Scripts en `package.json`:** son los mismos comandos que ejecuta el CI; tenerlos con nombre permite correr exactamente la misma verificación localmente.

---

## 6. Hoja de ruta sugerida

| Fase | Tareas | Rama sugerida |
|---|---|---|
| **1. Limpieza** | Sección 2 completa | `fix/cleanup-template-bugs` |
| **2. Arquitectura** | Crear `data/`, `types/`, `lib/`; extraer `SectionHeader`, `SocialLinks`, `ProjectCard`; unificar datos repetidos | `refactor/content-architecture` |
| **3. Mi información** | Llenar `src/data/*` con mis datos, foto, CV y proyectos reales | `feat/personal-content` |
| **4. Calidad** | Prettier, ESLint tipado, Husky, commitlint, Vitest, GitHub Actions | `chore/tooling` |
| **5. Formulario** | React Hook Form + Zod en contacto | `feat/contact-validation` |
| **6. Rendimiento y SEO** | Imágenes WebP, fuentes locales, meta tags, animaciones al scroll | `perf/images-seo` |
| **7. Publicación** | README nuevo, deploy, dominio | `docs/readme` |
| **8. Extras** | i18n, Playwright, Lighthouse CI, tema claro | `feat/i18n`, etc. |

**¿Por qué este orden?**
- **Limpieza primero:** no se puede reorganizar con seguridad un proyecto que no compila.
- **Arquitectura antes de mi información:** si pongo mis datos ahora, tendría que moverlos otra vez a `data/` después. Al revés, los escribo una sola vez en su lugar definitivo.
- **Calidad antes de las features nuevas:** con Prettier, ESLint y CI activos, todo lo que agregue después (formulario, imágenes, i18n) ya nace verificado.
- **Una rama y un PR por fase:** cada cambio es pequeño, fácil de revisar y de revertir si algo sale mal. Además, el historial de PRs en GitHub muestra un flujo de trabajo profesional.
- **Extras al final:** son los que menos valor aportan por esfuerzo; si no llego a hacerlos, el portafolio igual está completo.

**Criterio de "terminado":** `npm run lint`, `npm run typecheck`, `npm test` y `npm run build` pasan sin errores, y Lighthouse da ≥ 90 en Performance, Accessibility, Best Practices y SEO.
