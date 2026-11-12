const CDN = "https://irp.cdn-website.com/8cef085e/dms3rep/multi/opt/";

const jpgImages = new Set(["yvosh-graphic-g2-2", "yvosh-graphic-g2-3", "yvosh-graphic-g2-4", "yvosh-graphic-g2-5"]);

export const img = (name: string, w: number) => `${CDN}${name}-${w}w.${jpgImages.has(name) ? "jpg" : "png"}`;

export type FeaturedProject = {
  slug: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  imageHeight: number;
  url: string;
};

export type AcademicProject = {
  slug: string;
  tag: string;
  title: string;
  text: string;
  details: string[][];
  image: string;
  color: string;
  screenshots: string[];
  cover?: string;
  gallery?: string[];
  gallerySections?: { title: string; start: number }[];
  site?: { image: string; height: number; url: string };
};

const featuredTags = ["Duda", "UI / UX Design", "Responsive"];

export const featured: FeaturedProject[] = [
  {
    slug: "land-and-fence",
    title: "Land and Fence",
    text: "A clean, responsive Duda website that presents the services clearly and makes it easy to get in touch.",
    tags: featuredTags,
    image: "yvosh-site-georgia-land-and-fence",
    imageHeight: 7341,
    url: "https://www.georgialandandfence.com/",
  },
  {
    slug: "pro-pacific-concreting",
    title: "Pro Pacific Concreting",
    text: "A sturdy, easy-to-browse Duda website built around the business goals and brand.",
    tags: featuredTags,
    image: "yvosh-site-pro-pacific-concreting",
    imageHeight: 7029,
    url: "https://www.propacificconcreting.com.au/",
  },
  {
    slug: "thebo",
    title: "Thebo",
    text: "A modern Duda website with a custom layout and a polished, user-friendly feel.",
    tags: featuredTags,
    image: "yvosh-site-thebo",
    imageHeight: 8055,
    url: "https://www.thebotx.org/",
  },
  {
    slug: "water-shield-systems",
    title: "Water Shield Systems",
    text: "A clear, professional Duda website that explains the services and builds trust.",
    tags: featuredTags,
    image: "yvosh-site-watershield",
    imageHeight: 5026,
    url: "https://watershieldsystems.com/",
  },
  {
    slug: "janel-fidalgo-travel",
    title: "Janel Fidalgo Travel",
    text: "A bright, inviting Duda website designed to inspire visitors and bring in inquiries.",
    tags: featuredTags,
    image: "yvosh-site-janel-travel",
    imageHeight: 8843,
    url: "https://www.janelfidalgotravelagency.com/",
  },
];

const c18 = "bg-[var(--color-18)]";
const c19 = "bg-[var(--color-19)]";
const c20 = "bg-[var(--color-20)]";
const c21 = "bg-[var(--color-21)]";
const c22 = "bg-[var(--color-22)]";

export const academic: AcademicProject[] = [
  {
    slug: "commissioned-portfolio-website",
    cover: "yvosh-cover-1",
    tag: "Web",
    title: "Commissioned Portfolio Website",
    text: "",
    details: [
      ["Built With", "HTML, Tailwind CSS, JavaScript"],
      ["Deployed On", "GitHub Pages"],
    ],
    image: "yvosh-work-studio",
    color: c21,
    screenshots: ["yvosh-work-studio", "yvosh-acad-webdev", "yvosh-work-shop"],
    site: {
      image: "yvosh-commissioned-portfolio-full",
      height: 9683,
      url: "https://mykeedeguzman.github.io/Internship/Mykee/index.html",
    },
  },
  {
    slug: "game-development-1",
    cover: "yvosh-cover-2",
    tag: "Game",
    title: "Game Development 1",
    text: 'Designed and developed "Guardian of the Museums," creating its game mechanics, rules, gameplay flow, and all assets, including the board, cards, and point system.',
    details: [["Tools Used", "Canva, Adobe Photoshop, AI Tools"]],
    image: "yvosh-gd1-investigation-board",
    color: c22,
    screenshots: ["yvosh-acad-visual", "yvosh-graphic-poster", "yvosh-graphic-cover"],
    gallery: [
      "yvosh-gd1-investigation-board",
      "yvosh-gd1-board",
      "yvosh-gd1-points",
      "yvosh-gd1-note-sheet",
      "yvosh-gd1-c1-accomplice",
      "yvosh-gd1-c1-visitor",
      "yvosh-gd1-c2-accomplice-vote",
      "yvosh-gd1-c2-visitor-vote",
      "yvosh-gd1-chance-card",
      "yvosh-gd1-marga",
      "yvosh-gd1-mary",
      "yvosh-gd1-william",
      "yvosh-gd1-store",
      "yvosh-gd1-card-16",
      "yvosh-gd1-art-studio",
      "yvosh-gd1-sculpture",
      "yvosh-gd1-knife",
      "yvosh-gd1-pistol",
      "yvosh-app-1-start",
      "yvosh-app-2-about-us",
      "yvosh-app-3-rules",
      "yvosh-app-3-1-rule",
      "yvosh-app-3-2-rule",
      "yvosh-app-3-3-rule",
      "yvosh-app-3-4-rule",
      "yvosh-app-4-deck-of-cards",
      "yvosh-app-4-1-artifact",
      "yvosh-app-4-3-garbage",
    ],
    gallerySections: [
      { title: "Cards / Physical assets", start: 0 },
      { title: "Companion app screenshots", start: 18 },
    ],
  },
  {
    slug: "game-development-2",
    cover: "yvosh-cover-3",
    tag: "Game",
    title: "Game Development 2",
    text: "Designed our TTRPG game and its visual assets, including the layout, menus, character cards, monster cards, weapon cards, and other game elements, ensuring an appealing and user-friendly design.",
    details: [["Tools Used", "Canva, Adobe Photoshop, AI Tools"]],
    image: "yvosh-graphic-poster",
    color: c20,
    screenshots: ["yvosh-graphic-poster", "yvosh-graphic-illustration", "yvosh-graphic-brand"],
    gallery: [
      "yvosh-gd2-1-menu",
      "yvosh-gd2-1-start",
      "yvosh-gd2-2-lore",
      "yvosh-gd2-3-choose-character",
      "yvosh-gd2-4-character1",
      "yvosh-gd2-4-1-character-stats",
      "yvosh-gd2-4-2-story-levels",
      "yvosh-gd2-5-picking-cards",
      "yvosh-gd2-5-1-choosing-weapon",
      "yvosh-gd2-5-2-attacking",
      "yvosh-gd2-6-2-choices2",
      "yvosh-gd2-6-3-choices3",
      "yvosh-gd2-6-5-choices4",
      "yvosh-gd2-7-pause",
      "yvosh-gd2-7-1-view-stats",
      "yvosh-gd2-7-2-confirm-exit",
      "yvosh-gd2-7-3-confirm-restart",
      "yvosh-gd2-ablaze",
      "yvosh-gd2-tornado",
      "yvosh-gd2-inferno-orb",
      "yvosh-gd2-fanta",
      "yvosh-gd2-arkhosians-sorcerer",
      "yvosh-gd2-daemons-cleric",
      "yvosh-gd2-dragonfire-staff",
      "yvosh-gd2-spirit-staff",
      "yvosh-gd2-magic-robe-armor",
      "yvosh-gd2-element-wall-armor",
      "yvosh-gd2-card-back",
      "yvosh-gd2-card-02",
      "yvosh-gd2-card-03",
      "yvosh-gd2-card-04",
      "yvosh-gd2-card-05",
      "yvosh-gd2-card-06",
      "yvosh-gd2-card-07",
      "yvosh-gd2-card-08",
      "yvosh-gd2-card-09",
      "yvosh-gd2-card-10",
      "yvosh-gd2-monster-01",
      "yvosh-gd2-monster-02",
      "yvosh-gd2-monster-03",
      "yvosh-gd2-monster-09",
      "yvosh-gd2-monster-11",
      "yvosh-gd2-monster-13",
      "yvosh-gd2-monster-14",
      "yvosh-gd2-monster-15",
      "yvosh-gd2-monster-17",
      "yvosh-gd2-monster-33",
    ],
    gallerySections: [
      { title: "Game Screenshots", start: 0 },
      { title: "Some of the Attacks", start: 17 },
      { title: "Advantage and Disadvantage Cards", start: 27 },
      { title: "Some of the Monster Cards", start: 37 },
    ],
  },
  {
    slug: "capstone-1-and-2",
    cover: "yvosh-cover-4",
    tag: "Capstone",
    title: "Capstone 1 & 2",
    text: "",
    details: [
      ["Front-End", "Figma, HTML, JS, CSS"],
      ["Back-End", "PHP"],
      ["Database", "MySQL"],
    ],
    image: "yvosh-acad-webdev",
    color: c18,
    screenshots: ["yvosh-acad-webdev", "yvosh-acad-hci", "yvosh-acad-interaction"],
    gallery: ["yvosh-capstone-login-1", "yvosh-capstone-login-2", "yvosh-capstone-login-3", "yvosh-capstone-login-4", "yvosh-capstone-login-5", "yvosh-capstone-dash-1", "yvosh-capstone-dash-2", "yvosh-capstone-dash-3", "yvosh-capstone-dash-4", "yvosh-capstone-dash-5", "yvosh-capstone-template-1", "yvosh-capstone-template-2", "yvosh-capstone-file-1", "yvosh-capstone-file-2", "yvosh-capstone-file-3", "yvosh-capstone-file-4", "yvosh-capstone-file-5", "yvosh-capstone-file-6", "yvosh-capstone-file-7", "yvosh-capstone-file-8", "yvosh-capstone-file-9", "yvosh-capstone-logs-1", "yvosh-capstone-logs-2", "yvosh-capstone-logs-3", "yvosh-capstone-logs-4", "yvosh-capstone-report-1", "yvosh-capstone-report-2", "yvosh-capstone-report-3", "yvosh-capstone-notes-1", "yvosh-capstone-notes-2", "yvosh-capstone-notes-3", "yvosh-capstone-notes-4"],
    gallerySections: [
      { title: "Login page", start: 0 },
      { title: "Dashboard", start: 5 },
      { title: "Template", start: 10 },
      { title: "File page", start: 12 },
      { title: "Logs page", start: 21 },
      { title: "Report page", start: 25 },
      { title: "Notes page", start: 28 },
    ],
  },
  {
    slug: "ojt",
    cover: "yvosh-cover-5",
    tag: "Training",
    title: "OJT",
    text: "",
    details: [["Built With", "HTML, CSS, JavaScript"]],
    image: "yvosh-acad-hci",
    color: c19,
    screenshots: ["yvosh-acad-hci", "yvosh-acad-webdev", "yvosh-work-shop"],
    gallery: ["yvosh-ojt-login", "yvosh-ojt-1", "yvosh-ojt-2", "yvosh-ojt-3", "yvosh-ojt-4", "yvosh-ojt-5", "yvosh-ojt-6"],
  },
  {
    slug: "pharmacy",
    cover: "yvosh-cover-6",
    tag: "Web",
    title: "Pharmacy",
    text: "",
    details: [["Built With", "HTML, Tailwind CSS, React, JavaScript"]],
    image: "yvosh-acad-pharmacy",
    color: c19,
    screenshots: ["yvosh-acad-pharmacy", "yvosh-acad-webdev", "yvosh-work-shop"],
    gallery: ["yvosh-pharmacy-desktop-1", "yvosh-pharmacy-desktop-2", "yvosh-pharmacy-desktop-3", "yvosh-pharmacy-desktop-4", "yvosh-pharmacy-desktop-5", "yvosh-pharmacy-desktop-6", "yvosh-pharmacy-mobile-1", "yvosh-pharmacy-mobile-2", "yvosh-pharmacy-mobile-3", "yvosh-pharmacy-mobile-4", "yvosh-pharmacy-mobile-5", "yvosh-pharmacy-mobile-6", "yvosh-pharmacy-mobile-7", "yvosh-pharmacy-mobile-8"],
    gallerySections: [
      { title: "Desktop site", start: 0 },
      { title: "Mobile view", start: 6 },
    ],
  },
  {
    slug: "school-system",
    cover: "yvosh-cover-8",
    tag: "Design",
    title: "School System",
    text: "",
    details: [["Designed With", "Figma"]],
    image: "yvosh-acad-interaction",
    color: c18,
    screenshots: ["yvosh-acad-interaction", "yvosh-acad-hci", "yvosh-work-app"],
    gallery: ["yvosh-school-admin-1", "yvosh-school-admin-2", "yvosh-school-admin-3", "yvosh-school-admin-4", "yvosh-school-admin-5", "yvosh-school-admin-6", "yvosh-school-admin-7", "yvosh-school-applicant-1", "yvosh-school-applicant-2", "yvosh-school-applicant-3", "yvosh-school-applicant-4", "yvosh-school-applicant-5", "yvosh-school-applicant-6", "yvosh-school-applicant-7", "yvosh-school-applicant-8", "yvosh-school-applicant-9"],
    gallerySections: [
      { title: "Admin view", start: 0 },
      { title: "Applicant side", start: 7 },
    ],
  },
  {
    slug: "coffee-shop",
    cover: "yvosh-cover-7",
    tag: "Web",
    title: "Coffee Shop",
    text: "",
    details: [["Built With", "HTML, CSS, JavaScript"]],
    image: "yvosh-acad-coffee",
    color: c22,
    screenshots: ["yvosh-acad-coffee", "yvosh-work-restaurant", "yvosh-work-studio"],
    gallery: ["yvosh-coffee-product-management-product", "yvosh-coffee-product-management-categories", "yvosh-coffee-new-product-basic", "yvosh-coffee-new-product-variant", "yvosh-coffee-new-category-add", "yvosh-coffee-edit-basic", "yvosh-coffee-edit-variants", "yvosh-coffee-edit-categories", "yvosh-coffee-view-variants-product", "yvosh-coffee-view-variants-categories"],
  },
];

export const templates = Array.from({ length: 12 }, (_, i) => `yvosh-template-${String(i + 1).padStart(2, "0")}`);

export function galleryFor(main: string, offset: number) {
  const rotated = templates.map((_, i) => templates[(i + offset * 3) % templates.length]);
  return [main, ...rotated];
}
