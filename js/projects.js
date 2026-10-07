/* ==========================================================================
   KAIRO — work data
   Everything on the three work pages and the case studies comes from here.

   TO ADD OR CHANGE A PROJECT
   1. Put its images in  images/work/<project-id>/  (jpg, png, webp or svg).
   2. Edit the project below: title, client, year, text and the image list.
   3. To add a new project, copy one { ... } block, give it a new id and set
      its category to "branding", "web" or "motion".

   Gallery sizes: "full" spans the page width, "half" sits two across.
   Gallery items can also be videos: { type: "video", src: "images/work/x/clip.mp4" }
   ========================================================================== */

window.KAIRO_WORK = (() => {
  const categories = [
    {
      id: "branding",
      page: "branding.html",
      index: "01",
      title: "Get Branded!",
      tag: "Branding",
      intro: "Identity systems, packaging and brand refreshes, built to be recognised at a glance.",
    },
    {
      id: "web",
      page: "web-design.html",
      index: "02",
      title: "Web Designs",
      tag: "Designing",
      intro: "Websites and digital experiences designed around real people, and built to perform.",
    },
    {
      id: "motion",
      page: "motion-graphics.html",
      index: "03",
      title: "Movin' Elements",
      tag: "Motion Graphics",
      intro: "Logo animation, social motion and explainers that give a brand its rhythm.",
    },
  ];

  // Placeholder case-study text: replace with the real story for each project.
  const study = (what) => [
    {
      heading: "Overview",
      body: `Placeholder — a short overview of this ${what}: who the client is, what they asked KAIRO for, and what was delivered.`,
    },
    {
      heading: "The challenge",
      body: "Placeholder — the problem to solve. What stood in the way, who the audience was, and what success needed to look like.",
    },
    {
      heading: "Our approach",
      body: "Placeholder — how the team got there: the research, the idea that unlocked it, and the key design decisions along the way.",
    },
    {
      heading: "The result",
      body: "Placeholder — what launched and how it was received. Only include results the client is happy for you to share.",
    },
  ];

  // Six gallery images per project, laid out full / half / half / full / half / half
  const gallery = (id) =>
    ["full", "half", "half", "full", "half", "half"].map((size, i) => ({
      src: `images/work/${id}/${String(i + 1).padStart(2, "0")}.svg`,
      alt: `Project image ${i + 1}`,
      size,
    }));

  const project = (id, category, title, type, services) => ({
    id,
    category,
    title,
    type,
    client: "Client name",
    year: "Year",
    services,
    cover: `images/work/${id}/cover.svg`,
    sections: study(type.toLowerCase() + " project"),
    gallery: gallery(id),
  });

  const projects = [
    {
      id: "opheras",
      category: "branding",
      title: "Opheras",
      type: "Brand identity",
      client: "Opheras",
      year: "2026",
      services: ["Branding", "Logo", "Guidelines"],
      cover: "images/work/brand-refresh/cover.jpg",
      sections: [
        { heading: "Overview",      body: "Opheras is a contemporary real estate brand built around the principles of modern living, architectural excellence, and purposeful design. The objective was to create a refined visual identity that communicates sophistication, trust, and timeless elegance. Every element was carefully designed to reflect the brand’s commitment to quality, simplicity, and attention to detail." },
        { heading: "Brand Identity", body: "The visual identity of Opheras embraces minimalism through clean geometry, balanced proportions, and a distinctive logomark. The symbol combines fluid forms with structural precision, reflecting the harmony between architectural design and comfortable living. Paired with a modern wordmark, the identity establishes a recognisable and sophisticated brand presence." },
        { heading: "Typography",  body: "The brand’s visual system is built around three carefully selected colours: Architectural Teal (#448597), Concrete White (#F9F9F9), and Charcoal Grey (#4A4A4A). Together, they communicate stability, clarity, and understated luxury. Clash Display was chosen for its contemporary character and clean structure. Its combination of regular and medium weights creates a consistent typographic hierarchy, reinforcing the brand’s modern architectural aesthetic." },
        { heading: "Brand Applications",    body: "The Opheras identity was designed to extend seamlessly across physical and digital environments. From stationery, business cards, and employee identification to outdoor advertising, signage, and digital platforms, each application maintains a consistent visual language. The result is a cohesive and adaptable identity system that positions Opheras as a contemporary, premium real estate brand while maintaining simplicity, recognition, and visual impact." },
      ],
      gallery: [
        { src: "images/work/brand-refresh/01.jpg", alt: "Logo on signage", size: "full" },
        { src: "images/work/brand-refresh/02.jpg", alt: "Business cards",  size: "half" },
        { src: "images/work/brand-refresh/03.jpg", alt: "Colour palette",  size: "half" },
        { src: "images/work/brand-refresh/04.jpg", alt: "Logo usage",  size: "half" },
        { src: "images/work/brand-refresh/05.jpg", alt: "brand identity",  size: "half" },
        { src: "images/work/brand-refresh/opheras_2.jpg", alt: "more",  size: "full" },
        { src: "images/work/brand-refresh/opheras_3.jpg", alt: "usage",  size: "half" },
        { src: "images/work/brand-refresh/opheras_4.jpg", alt: "packaging",  size: "half" },
        { src: "images/work/brand-refresh/opheras_7.jpg", alt: "Final",  size: "full" },
      ],
    },
        {
      id: "luno-cafe",
      category: "branding",
      title: "Luno Cafe",
      type: "Brand identity",
      client: "Luno Cafe",
      year: "2026",
      services: ["Branding", "Logo", "Packaging"],
      cover: "images/work/luno-cafe/cover.jpg",
      sections: [
        { heading: "Overview",      body: "LUNO Café is a premium café concept built around warmth, intimacy, and the quiet atmosphere of the night. The identity was designed to move away from the typical bright, casual coffee-shop aesthetic and create something more refined and experience-led. Inspired by lunar forms, warm light, and rich natural materials, the brand brings together coffee, conversation, and atmosphere within a distinctive visual world." },
        { heading: "Logo and Concept", body: "The LUNO identity draws its inspiration from the changing forms of the moon. The circular form of the letter “O” became the foundation for exploring the full moon, crescent, and eclipse, eventually creating a subtle celestial language around the brand. An elegant serif wordmark gives LUNO its premium character, while the lunar-inspired elements provide a recognisable motif that can extend beyond the logo into patterns, packaging, interiors, and other brand touchpoints." },
        { heading: "Visual Language",  body: "The visual system combines deep blacks, espresso browns, muted neutrals, and warm bronze tones to recreate the atmosphere of a softly lit café at night. Serif typography brings elegance and personality to the identity, balanced by a clean sans-serif for functional communication. Material choices such as dark wood, stone, textured surfaces, and brushed metallic finishes further extend the identity into the physical environment, creating a brand that feels tactile, warm, and sophisticated." },
        { heading: "Brand Experience",    body: "LUNO was designed as an experience that extends from the first visual impression to the physical café itself. The identity carries consistently across cups, packaging, menus, signage, merchandise, and interior spaces. Low lighting, warm materials, restrained graphics, and celestial details work together to create an environment made for slowing down—positioning LUNO as a place for coffee, conversation, and connection." },
      ],
      gallery: [
        { src: "images/work/luno-cafe/01.jpg", alt: "Luno Cafe menu cover with a gold crescent, and the logo construction grid", size: "full" },
        { src: "images/work/luno-cafe/02.jpg", alt: "Luno Cafe colour palette and typography",                                size: "half" },
        { src: "images/work/luno-cafe/03.jpg", alt: "Luno Cafe branded coffee cup and chocolate cake",                        size: "half" },
        { src: "images/work/luno-cafe/04.jpg", alt: "Luno Cafe logo concept, with materials and textures",                    size: "full" },
        { src: "images/work/luno-cafe/05.jpg", alt: "Luno Cafe interior with illuminated wall sign",                          size: "half" },
        { src: "images/work/luno-cafe/06.jpg", alt: "Luno Cafe coffee bar interior in warm light",                            size: "half" },
        { src: "images/work/luno-cafe/07.jpg", alt: "Luno Cafe packaging: takeaway cup, bag, box and coaster",                size: "full" },
      ],
    },
     
    project("brand-refresh", "branding", "Brand Refresh", "Rebrand", ["Brand audit", "Identity refresh", "Rollout"]),

    project("studio-website", "web", "Studio Website", "Website", ["UX", "UI design", "Development"]),
    project("online-store", "web", "Online Store", "E-commerce", ["UX", "UI design", "Shop setup"]),
    project("launch-landing-page", "web", "Launch Landing Page", "Landing page", ["Copy", "UI design", "Build"]),

    project("logo-animation", "motion", "Logo Animation", "Motion identity", ["Motion design", "Sound", "Export kit"]),
    project("social-campaign", "motion", "Social Campaign", "Social motion", ["Concept", "Motion design", "Edits"]),
    project("product-explainer", "motion", "Product Explainer", "Explainer", ["Script", "Storyboard", "Animation"]),
  ];

  return { categories, projects };
})();
