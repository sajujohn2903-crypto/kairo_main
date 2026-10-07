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
     
        {
      id: "rynx",
      category: "branding",
      title: "RYNX",
      type: "Brand identity",
      client: "RYNX",
      year: "2026",
      services: ["Branding", "Logo", "Packaging"],
      cover: "images/work/rynx/01.jpg",
      sections: [
        { heading: "Overview",      body: "RYNX is a modern streetwear identity built around confidence, simplicity, and urban culture. The brand takes a minimal approach to fashion, combining versatile everyday essentials with a bold visual presence. The objective was to create an identity that feels contemporary and adaptable—strong enough to stand on its own while remaining understated enough to live naturally across clothing, packaging, digital platforms, and the street." },
        { heading: "Brand Identity", body: "At the centre of RYNX is a condensed typographic wordmark designed to feel direct, structured, and instantly recognisable. Its tall proportions give the identity a strong visual presence without relying on unnecessary graphic elements. A predominantly black-and-white system reinforces the minimal direction, allowing typography, photography, and the clothing itself to become the focus. Occasional red accents introduce energy and give the brand another layer of expression when needed." },
        { heading: "Visual Language",  body: "RYNX uses contrast as its primary visual language—black against white, oversized typography against restrained layouts, and minimal garments against urban environments. The monochromatic system carries naturally across garment labels, hang tags, tote bags, packaging, business cards, and digital applications. Rather than relying on decoration, the identity creates impact through scale, spacing, composition, and repetition." },
        { heading: "Brand Application",    body: "The identity was designed to remain recognisable whether it appears as a large graphic across the back of a T-shirt or as a small label stitched into a garment. From apparel and packaging to shopping bags and digital applications, each touchpoint follows the same visual principles—creating a cohesive brand system that can grow alongside future collections. The result is a streetwear identity that feels minimal, confident, versatile, and unmistakably RYNX." },
      ],
      gallery: [
        { src: "images/work/rynx/cover.jpg", alt: "RYNX campaign image with five models in streetwear",        size: "full" },
        { src: "images/work/rynx/02.jpg", alt: "RYNX brand story: about the brand and brand mission",       size: "half" },
        { src: "images/work/rynx/03.jpg", alt: "RYNX Modern Streetwear logo on black",                      size: "half" },
        { src: "images/work/rynx/04.jpg", alt: "RYNX woven neck label inside a black sweatshirt",           size: "full" },
        { src: "images/work/rynx/05.jpg", alt: "RYNX tote bags in black and in white with red lettering",   size: "full" },
        { src: "images/work/rynx/06.jpg", alt: "RYNX swing tags and a white T-shirt with the logo",         size: "half" },
        { src: "images/work/rynx/07.jpg", alt: "RYNX black shipping boxes",                                 size: "half" },
        { src: "images/work/rynx/08.jpg", alt: "RYNX app icon on a phone home screen",                      size: "full" },
      ],
    },
        {
      id: "kairo-website",
      category: "web",
      title: "Kairo Website",
      type: "Website",
      client: "Kairo Design Bureau",
      year: "2026",
      services: ["Web design", "Motion", "Development"],
      cover: "images/work/kairo-site/cover.jpg",
      sections: [
        { heading: "Overview", body: "Kairo Design Bureau needed a home of its own: a site that shows how the studio thinks before a visitor has read a word. We designed and built it ourselves between 23 September and 7 October 2026. It is one scrolling homepage, three discipline pages and a case-study template, hosted on GitHub Pages." },
        { heading: "The brief", body: "The brief was short: minimal, premium, easy to navigate, with motion that follows the scroll, in five brand colours. Two constraints shaped everything else. The site had to run as plain files on GitHub Pages with no build step, so the studio could update it from a browser. And nothing could be invented: no stock photos, no placeholder clients, no made-up numbers." },
        { heading: "How we worked", body: "We skipped static mock-ups and designed in the browser. Every round followed the same loop: publish a working preview, open it on a desktop and a phone, change only what was flagged, upload. The copy was edited directly on the live preview. The design system stayed small on purpose: charcoal with one gold accent per screen, Inter Tight for headlines and Inter for text, square edges, hairline rules, and one easing curve for every movement." },
        { heading: "The hero", body: "The first idea for the hero was a real-time 3D bowerbird that watches the cursor. For launch we chose something lighter that makes the same point: a film of the character that breathes while you are on the first screen and closes its eyes as you scroll away. On desktop the scroll scrubs a video. The iPhone would not repaint a video while it was being scrubbed, so phones draw the same film from 121 still frames instead, packed into two files." },
        { heading: "Where it landed", body: "Testing on real devices caught two problems: the page sometimes opened part-way down, and the hero froze on iPhone. Both were fixed. The work pages came next: each discipline has its own page, and every case study uses one template fed by a single data file, so adding a project means adding a block of text and a folder of images. The site is live, and the studio's first client projects are already in it." },
      ],
      gallery: [
        { src: "images/work/kairo-site/01.jpg", alt: "The brief: what the site had to do, the five-colour palette and the ground rules", size: "half" },
        { src: "images/work/kairo-site/02.jpg", alt: "Process flow chart in nine steps, from the brief to real projects going in", size: "half" },
        { src: "images/work/kairo-site/03.jpg", alt: "Site map showing the homepage, three discipline pages, the case-study template and the project form", size: "half" },
        { src: "images/work/kairo-site/04.jpg", alt: "The nine sections of the homepage with a colour rhythm strip", size: "half" },
        { src: "images/work/kairo-site/05.jpg", alt: "Design system: colour, logo and stamp, typography, components and motion", size: "full" },
        { src: "images/work/kairo-site/06.jpg", alt: "The hero interaction: three scroll states, the film timeline and how it plays on desktop and phone", size: "full" },
        { src: "images/work/kairo-site/07.jpg", alt: "Work pages and case-study template", size: "half" },
        { src: "images/work/kairo-site/08.jpg", alt: "The five-step Start a project form on desktop and phone", size: "half" },
        { src: "images/work/kairo-site/09.jpg", alt: "Five phone screens from the site", size: "full" },
        { src: "images/work/kairo-site/10.jpg", alt: "Closing call to action: Got something worth building?", size: "half" },
        { src: "images/work/kairo-site/11.jpg", alt: "Footer with the Kairo wordmark", size: "half" },
      ],
    },
    {
  slug: 'food-delivery-app',
  title: 'Food Delivery App',
  category: 'WEB DESIGNS',
  discipline: 'Mobile App · UI/UX Design',
  platform: 'iOS',
  year: '', // add the year
  cover: '/work/food-delivery-app/food-delivery-app_00-cover.jpg',
  summary:
    'A food ordering app that takes a meal from menu to doorstep in five screens.',
  sections: [
    {
      title: 'Overview',
      body: 'A food ordering app that takes a meal from menu to doorstep in five screens. Warm neutrals and a single dark accent keep the food photography as the loudest thing on screen.',
    },
    {
      title: 'The Challenge',
      body: 'Ordering apps tend to bury the decision under banners, offers and nested menus. The aim was a flow where a hungry user can pick a meal, see exactly what it costs and know when it arrives, without any detours.',
    },
    {
      title: 'The Approach',
      body: 'Two menu screens feed one bag, and from there the path is linear: review, pay, confirm. Each menu card shows a photo, name, calories, a one-line description and the price, so a meal can be added straight from the list. A floating tab bar keeps Quick Bites, Healthy Diet and Desserts one tap apart.',
    },
    {
      title: 'Checkout',
      body: 'The checkout leads with the delivery address, a mapped route and a 15-minute estimate. Meal, tax, delivery and promo discount are itemised above the total, and the pay button repeats the final amount.',
    },
    {
      title: 'Order Confirmation',
      body: 'The confirmation screen shows who is delivering (name, vehicle plate, message and call shortcuts), when, and where to. It ends on a single action: Track Your Order.',
    },
    {
      title: 'Visual Design',
      body: 'Five colours: cream background, sand cards, tan image tiles, cocoa for buttons and the tab bar, black for headings and icons. Headings are in Outfit and close with a full stop; body text is in Inter. Buttons and the tab bar are pill-shaped, and the plates overlap their cards.',
    },
  ],
  gallery: [
    {
      src: '/work/food-delivery-app/food-delivery-app_01-user-flow.jpg',
      alt: 'All five app screens in order, from menu to order placed',
      caption: 'User flow: one order, five screens.',
    },
    {
      src: '/work/food-delivery-app/food-delivery-app_02-menu-browsing.jpg',
      alt: 'Quick Bites and Healthy Diet menu screens with numbered callouts',
      caption: 'Menu browsing: calories, description and price on every card.',
    },
    {
      src: '/work/food-delivery-app/food-delivery-app_03-bag-and-checkout.jpg',
      alt: 'Meals Added and Payment & Delivery screens with numbered callouts',
      caption: 'Bag and checkout: route, itemised total and the amount on the pay button.',
    },
    {
      src: '/work/food-delivery-app/food-delivery-app_04-order-confirmation.jpg',
      alt: 'Order Placed screen with the courier card and delivery card enlarged',
      caption: 'Order confirmation: who is delivering, when, and where to.',
    },
    {
      src: '/work/food-delivery-app/food-delivery-app_05-design-system.jpg',
      alt: 'Colour palette, type samples and UI components from the app',
      caption: 'Design system: five colours, two typefaces.',
    },
  ],
},
    project("launch-landing-page", "web", "Launch Landing Page", "Landing page", ["Copy", "UI design", "Build"]),

    project("logo-animation", "motion", "Logo Animation", "Motion identity", ["Motion design", "Sound", "Export kit"]),
    project("social-campaign", "motion", "Social Campaign", "Social motion", ["Concept", "Motion design", "Edits"]),
    project("product-explainer", "motion", "Product Explainer", "Explainer", ["Script", "Storyboard", "Animation"]),
  ];

  return { categories, projects };
})();
