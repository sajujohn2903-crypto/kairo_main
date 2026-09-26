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
      intro: "Identity systems, packaging and brand refreshes — built to be recognised at a glance.",
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
    project("identity-system", "branding", "Identity System", "Brand identity", ["Strategy", "Logo", "Identity system", "Guidelines"]),
    project("packaging-series", "branding", "Packaging Series", "Packaging", ["Packaging design", "Illustration", "Print"]),
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
