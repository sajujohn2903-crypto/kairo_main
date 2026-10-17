/* ==========================================================================
   KAIRO — work data
   Everything on the three work pages and the case studies comes from here.

   TO ADD OR CHANGE A PROJECT
   1. Put its images in  images/work/<project-id>/  (jpg, png, webp or svg).
   2. Edit the project below: title, client, year, text and the image list.
   3. To add a new project, copy one { ... } block, give it a new id and set
      its category to "branding" or "web".

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
      intro: "Logos, identity systems, packaging and rebrands for businesses that want to be recognised at a glance.",
    },
    {
      id: "web",
      page: "web-design.html",
      index: "02",
      title: "Web Designs",
      tag: "Designing",
      intro: "Websites and apps, designed around the people who use them.",
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
        { heading: "Overview",      body: "Opheras is a real estate brand focused on modern homes and good architecture. They needed an identity that would come across as polished and trustworthy, and still look right in ten years' time. We kept every element simple and spent our time on the details." },
        { heading: "Brand Identity", body: "The identity is deliberately minimal. The logomark pairs flowing curves with strict geometry, a nod to the balance between precise architecture and a home that is comfortable to live in. Set beside a modern wordmark, it gives Opheras a presence that is easy to recognise." },
        { heading: "Typography",  body: "The palette has three colours: Architectural Teal (#448597), Concrete White (#F9F9F9) and Charcoal Grey (#4A4A4A). Together they feel steady, clear and quietly premium. For type we chose Clash Display, a contemporary face with a clean structure. Its regular and medium weights give a consistent hierarchy that suits the brand's architectural feel." },
        { heading: "Brand Applications",    body: "We designed the identity to work as well in print as it does on screen. Stationery, business cards, staff ID, outdoor advertising, signage and digital platforms all follow the same rules. The system is flexible enough to grow with the business, while staying simple and recognisable wherever it appears." },
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
        { heading: "Overview",      body: "LUNO Café is a premium café concept built around warmth and the calm of the evening. Most coffee shops go bright and casual; we wanted LUNO to feel slower and more considered, a place people visit for the atmosphere as much as the coffee. The look draws on the shapes of the moon, warm light and rich natural materials." },
        { heading: "Logo and Concept", body: "The idea started with the letter O. Its round shape let us play with the phases of the moon, from full moon to crescent to eclipse, and these became a small set of celestial marks for the brand. An elegant serif wordmark sets the premium tone, and the moon shapes give LUNO a motif that works well beyond the logo, on patterns, packaging and in the café itself." },
        { heading: "Visual Language",  body: "Deep black, espresso brown, muted neutrals and warm bronze are there to recall a softly lit café at night. A serif typeface gives the brand its character, while a clean sans-serif handles menus and practical information. In the space, dark wood, stone, textured surfaces and brushed metal carry the identity into things you can actually touch." },
        { heading: "Brand Experience",    body: "We treated LUNO as one experience, from the first look at the logo to sitting down inside. Cups, packaging, menus, signage, merchandise and the interior all speak the same language. Low lighting, warm materials, quiet graphics and small celestial details make it somewhere to slow down, talk and stay a while." },
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
        { heading: "Overview",      body: "RYNX is a streetwear brand rooted in city culture. The clothes are simple, versatile everyday pieces, so the identity had to be strong enough to stand on its own but restrained enough to sit naturally on a garment, a box or a phone screen." },
        { heading: "Brand Identity", body: "Everything starts with a condensed wordmark. Its tall letters make it direct and easy to spot, with no need for extra graphics. The system is mostly black and white, which leaves room for the type, the photography and the clothes themselves. A touch of red comes in now and then when the brand needs more energy." },
        { heading: "Visual Language",  body: "Contrast does most of the work: black against white, oversized type against plain layouts, simple garments against busy streets. Because the system is monochrome, it moves easily onto labels, swing tags, tote bags, packaging, business cards and screens. The impact comes from scale, spacing and repetition rather than decoration." },
        { heading: "Brand Application",    body: "The identity had to hold up as a large print across the back of a T-shirt and as a small label stitched inside a collar. Clothing, packaging, shopping bags and digital all follow the same rules, so the system can take on future collections without being redesigned. The finished identity is minimal and confident, and clearly RYNX." },
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
        { heading: "Overview", body: "We wanted a website that shows how the studio thinks before a visitor has read a word. We designed and built it ourselves between 23 September and 7 October 2026: one scrolling homepage, three pages of work and a case-study template, all hosted on GitHub Pages." },
        { heading: "The brief", body: "The brief was short: minimal, premium, easy to navigate, with motion that follows the scroll, in five brand colours. Two constraints shaped everything else. The site had to run as plain files on GitHub Pages with no build step, so the studio could update it from a browser. And nothing could be invented: no stock photos, no placeholder clients, no made-up numbers." },
        { heading: "How we worked", body: "We skipped static mock-ups and designed in the browser. Every round followed the same loop: publish a working preview, open it on a desktop and a phone, change only what was flagged, upload. The copy was edited directly on the live preview. The design system stayed small on purpose: charcoal with one gold accent per screen, Inter Tight for headlines and Inter for text, square edges, hairline rules, and one easing curve for every movement." },
        { heading: "The hero", body: "The first idea for the hero was a real-time 3D bowerbird that watches the cursor. For launch we chose something lighter that makes the same point: a film of the character that breathes while you are on the first screen and closes its eyes as you scroll away. On desktop the scroll scrubs a video. The iPhone would not repaint a video while it was being scrubbed, so phones draw the same film from 121 still frames instead, packed into two files." },
        { heading: "Where it landed", body: "Testing on real phones and laptops turned up two problems. The page sometimes opened part-way down, and the hero froze on iPhone. Both were fixed. The work pages came next. Each discipline has its own page, and every case study uses the same template, so adding a project means adding some text and a folder of images. The site is live, and our first client projects are already on it." },
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
      id: "food-delivery-app",
      category: "web",
      title: "Food Delivery App",
      type: "Mobile app",
      client: "Concept project",
      year: "2026",
      services: ["UX design", "UI design", "Mobile app"],
      cover: "images/work/food-delivery-app/cover.jpg",
      sections: [
        { heading: "Overview", body: "A concept for a food ordering app that gets you from the menu to a delivered meal in five screens. The colours are warm and muted, with one dark accent, so the food photos are what stand out." },
        { heading: "The challenge", body: "Many ordering apps hide the actual choice behind banners, offers and menus inside menus. We wanted a hungry person to be able to pick a meal, see exactly what it costs and know when it will arrive, with nothing in the way." },
        { heading: "The approach", body: "There are two menu screens and one bag. After that the route is straight: review, pay, confirm. Each menu card has a photo, the name, calories, a short description and the price, so you can add a meal without opening it. A floating tab bar switches between Quick Bites, Healthy Diet and Desserts in one tap." },
        { heading: "Checkout", body: "Checkout opens with the delivery address, the route on a map and an estimated time of 15 minutes. The meal, tax, delivery fee and any promo discount are listed above the total, and the pay button shows the final amount again, so there are no surprises." },
        { heading: "Order confirmation", body: "Once the order is placed, the screen shows who is delivering it, with their name, vehicle plate and buttons to message or call them, along with the time and the address. There is one button at the bottom: Track Your Order." },
        { heading: "Visual design", body: "The palette has five colours: cream for the background, sand for the cards, tan behind the food photos, cocoa for buttons and the tab bar, and black for headings and icons. Headings are set in Outfit and end with a full stop, and body text is in Inter. Buttons and the tab bar are pill-shaped, and the plates break out over the edges of their cards." },
      ],
      gallery: [
        { src: "images/work/food-delivery-app/01.jpg", alt: "All five app screens in order, from menu to order placed",                  size: "full" },
        { src: "images/work/food-delivery-app/02.jpg", alt: "Quick Bites and Healthy Diet menu screens with numbered callouts",          size: "full" },
        { src: "images/work/food-delivery-app/03.jpg", alt: "Meals Added and Payment and Delivery screens with numbered callouts",       size: "full" },
        { src: "images/work/food-delivery-app/04.jpg", alt: "Order Placed screen with the courier card and delivery card enlarged",      size: "half" },
        { src: "images/work/food-delivery-app/05.jpg", alt: "Colour palette, type samples and components from the app",                  size: "half" },
      ],
    },
        {
      id: "cinenebula",
      category: "web",
      title: "CineNebula",
      type: "Streaming concept",
      client: "Concept project",
      year: "2026",
      services: ["UI design", "Prototyping", "Responsive design"],
      cover: "images/work/cinenebula/cover.jpg",
      sections: [
        { heading: "Overview", body: "CineNebula is a concept for a film and series streaming service. We designed its featured-title screen for desktop and mobile as a self-initiated project, mainly to sharpen our prototyping skills." },
        { heading: "Design", body: "A single title fills the first screen, with its artwork, likes, year, genre and age rating. The season and episode dropdowns, Play Now and My Wishlist sit next to it, and a row of other titles runs along the bottom." },
        { heading: "Visual language", body: "The background is almost black, with a deep green glow rising from the bottom of the screen. A brighter green is saved for the likes rating. All text is white and set in Outfit, and the buttons and dropdowns share the same dark green." },
        { heading: "Mobile", body: "On a phone, the same content is stacked differently. The artwork comes first, a menu button and search bar take the place of the navigation links, and the season and episode selectors sit side by side on one row." },
      ],
      gallery: [
        { src: "images/work/cinenebula/01.jpg", alt: "CineNebula desktop screen with four numbered callouts",                   size: "full" },
        { src: "images/work/cinenebula/02.jpg", alt: "CineNebula mobile screen with three numbered callouts",                   size: "half" },
        { src: "images/work/cinenebula/03.jpg", alt: "CineNebula colour palette, type and components",                          size: "half" },
        { src: "images/work/cinenebula/04.jpg", alt: "CineNebula shown on a tablet and phone, a phone, and a laptop on a desk", size: "full" },
        { src: "images/work/cinenebula/05.jpg", alt: "CineNebula on a laptop, with the line Built for practice",                size: "full" },
      ],
    },

  ];

  return { categories, projects };
})();
