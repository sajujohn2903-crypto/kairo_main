/* ==========================================================================
   KAIRO — work pages
   Builds the three discipline pages and the case-study page from
   js/projects.js. Runs before main.js so its reveal and parallax effects
   pick up everything rendered here.
   ========================================================================== */
(() => {
  const DATA = window.KAIRO_WORK;
  const root = document.getElementById("work-root");
  if (!DATA || !root) return;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  // Split a title into masked words for the rise-in animation
  const words = (text) =>
    esc(text).split(/\s+/).map((w, i) =>
      `<span class="wk-w"><span style="transition-delay:${(0.1 + i * 0.07).toFixed(2)}s">${w}</span></span>`
    ).join(" ");

  const media = (item, cls = "", attrs = "") =>
    item.type === "video"
      ? `<video class="${cls}" src="${esc(item.src)}" muted loop playsinline autoplay preload="metadata" ${attrs}></video>`
      : `<img class="${cls}" src="${esc(item.src)}" alt="${esc(item.alt || "")}" loading="lazy" decoding="async" ${attrs} />`;

  const catById = (id) => DATA.categories.find((c) => c.id === id);
  const projectsIn = (id) => DATA.projects.filter((p) => p.category === id);

  /* ======================= Discipline page ======================= */
  const renderCategory = (catId) => {
    const cat = catById(catId);
    if (!cat) return;
    const list = projectsIn(cat.id);
    const ci = DATA.categories.indexOf(cat);
    const next = DATA.categories[(ci + 1) % DATA.categories.length];

    root.innerHTML = `
      <section class="wk-hero">
        <div class="wk-hero__top">
          <a href="index.html#work" class="wk-back meta" data-cursor="Back"><span aria-hidden="true">←</span> All work</a>
          <span class="meta">${pad(ci + 1)} / ${pad(DATA.categories.length)}</span>
        </div>
        <p class="label"><span>${esc(cat.index)}</span> ${esc(cat.tag)}</p>
        <h1 class="wk-title">${words(cat.title)}</h1>
        <div class="wk-hero__foot">
          <p class="wk-intro reveal">${esc(cat.intro)}</p>
          <p class="meta reveal">${pad(list.length)} projects</p>
        </div>
      </section>

      <section class="wk-projects">
        <div class="wk-toolbar">
          <p class="meta">Selected projects</p>
          <div class="wk-view" role="group" aria-label="Layout">
            <button type="button" class="meta" data-view="list" aria-pressed="true">List</button>
            <button type="button" class="meta" data-view="grid" aria-pressed="false">Grid</button>
          </div>
        </div>
        <ol class="wk-list" data-view="list">
          ${list.map((p, i) => `
            <li class="wk-item reveal">
              <a class="wk-row" href="project.html?p=${encodeURIComponent(p.id)}" data-cursor="View" data-i="${i}">
                <span class="wk-row__num">${pad(i + 1)}</span>
                <span class="wk-row__media"><span class="wk-row__img">${media({ src: p.cover, alt: "" })}</span></span>
                <span class="wk-row__title">${esc(p.title)}</span>
                <span class="wk-row__type">${esc(p.type)}</span>
                <span class="wk-row__arrow" aria-hidden="true">↗</span>
              </a>
            </li>`).join("")}
        </ol>
      </section>

      <div class="wk-float" aria-hidden="true">
        <div class="wk-float__inner">
          ${list.map((p, i) => `<img src="${esc(p.cover)}" alt="" data-i="${i}" />`).join("")}
        </div>
      </div>

      <a class="wk-next" href="${esc(next.page)}" data-cursor="Next">
        <span class="meta">Next discipline — ${esc(next.index)}</span>
        <span class="wk-next__title">${esc(next.title)}</span>
        <span class="wk-next__arrow" aria-hidden="true">→</span>
      </a>`;

    document.title = `${cat.title} — ${cat.tag} — KAIRO`;
    setupViewToggle();
    if (finePointer && !reduceMotion) setupFloat();
  };

  const setupViewToggle = () => {
    const listEl = $(".wk-list");
    const btns = $$(".wk-view button");
    let saved = null;
    try { saved = sessionStorage.getItem("kairo-view"); } catch (e) {}
    const set = (v) => {
      listEl.dataset.view = v;
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === v)));
      document.body.classList.toggle("wk-grid-view", v === "grid");
      try { sessionStorage.setItem("kairo-view", v); } catch (e) {}
    };
    btns.forEach((b) => b.addEventListener("click", () => {
      listEl.classList.add("is-switching");
      setTimeout(() => { set(b.dataset.view); listEl.classList.remove("is-switching"); }, 280);
    }));
    if (saved === "grid" || saved === "list") set(saved);
  };

  // A preview image that follows the cursor over the project list
  const setupFloat = () => {
    const float = $(".wk-float");
    const imgs = $$(".wk-float img");
    const listEl = $(".wk-list");
    let x = innerWidth / 2, y = innerHeight / 2, fx = x, fy = y, vx = 0, on = false;

    window.addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    $$(".wk-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        if (listEl.dataset.view !== "list") return;
        imgs.forEach((im) => im.classList.toggle("is-on", im.dataset.i === row.dataset.i));
        float.classList.add("is-visible");
        on = true;
      });
    });
    listEl.addEventListener("mouseleave", () => { float.classList.remove("is-visible"); on = false; });

    const loop = () => {
      const nx = lerp(fx, x, 0.14), ny = lerp(fy, y, 0.14);
      vx = lerp(vx, nx - fx, 0.2);
      fx = nx; fy = ny;
      if (on || float.classList.contains("is-visible")) {
        float.style.transform = `translate3d(${fx.toFixed(1)}px, ${fy.toFixed(1)}px, 0) rotate(${Math.max(-8, Math.min(8, vx * 0.35)).toFixed(2)}deg)`;
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  /* ======================= Case study page ======================= */
  const renderProject = () => {
    const id = new URLSearchParams(location.search).get("p");
    const p = DATA.projects.find((x) => x.id === id);
    if (!p) {
      root.innerHTML = `
        <section class="wk-hero wk-hero--empty">
          <p class="label"><span>404</span> Project</p>
          <h1 class="wk-title">${words("Project not found.")}</h1>
          <div class="wk-hero__foot"><a class="btn btn--gold" href="index.html#work">See all work <span aria-hidden="true">↗</span></a></div>
        </section>`;
      document.title = "Project not found — KAIRO";
      return;
    }
    const cat = catById(p.category);
    const siblings = projectsIn(p.category);
    const idx = siblings.indexOf(p);
    const next = siblings[(idx + 1) % siblings.length];
    const gallery = p.gallery || [];

    root.innerHTML = `
      <div class="pj-progress" aria-hidden="true"><i></i></div>
      <section class="wk-hero pj-hero">
        <div class="wk-hero__top">
          <a href="${esc(cat.page)}" class="wk-back meta" data-cursor="Back"><span aria-hidden="true">←</span> ${esc(cat.title)}</a>
          <span class="meta">${esc(cat.tag)} · ${pad(idx + 1)} / ${pad(siblings.length)}</span>
        </div>
        <p class="label"><span>${pad(idx + 1)}</span> ${esc(p.type)}</p>
        <h1 class="wk-title pj-title">${words(p.title)}</h1>
        <dl class="pj-meta">
          <div class="reveal"><dt class="meta">Client</dt><dd>${esc(p.client)}</dd></div>
          <div class="reveal"><dt class="meta">Year</dt><dd>${esc(p.year)}</dd></div>
          <div class="reveal"><dt class="meta">Discipline</dt><dd>${esc(cat.tag)}</dd></div>
          <div class="reveal"><dt class="meta">Services</dt><dd>${(p.services || []).map(esc).join("<br />")}</dd></div>
        </dl>
      </section>

      <figure class="pj-cover">
        <div class="pj-cover__inner" data-speed="-0.12">${media({ src: p.cover, alt: p.title + " cover" }, "", 'loading="eager"')}</div>
      </figure>

      <section class="pj-study">
        ${(p.sections || []).map((s, i) => `
          <div class="pj-block">
            <p class="pj-block__label reveal"><span>${pad(i + 1)}</span>${esc(s.heading)}</p>
            <p class="pj-block__body reveal">${esc(s.body)}</p>
          </div>`).join("")}
      </section>

      <section class="pj-gallery">
        <div class="wk-toolbar">
          <p class="meta">Gallery</p>
          <p class="meta">${pad(gallery.length)} ${gallery.length === 1 ? "image" : "images"} — tap to expand</p>
        </div>
        <div class="pj-grid">
          ${gallery.map((g, i) => `
            <button type="button" class="pj-shot pj-shot--${g.size === "half" ? "half" : "full"} reveal" data-i="${i}" data-cursor="Expand" aria-label="Open image ${i + 1} of ${gallery.length}">
              <span class="pj-shot__inner">${media(g)}</span>
            </button>`).join("")}
        </div>
      </section>

      <a class="wk-next pj-next" href="project.html?p=${encodeURIComponent(next.id)}" data-cursor="Next">
        <span class="pj-next__bg" aria-hidden="true"><img src="${esc(next.cover)}" alt="" loading="lazy" /></span>
        <span class="meta">Next project — ${pad(siblings.indexOf(next) + 1)}</span>
        <span class="wk-next__title">${esc(next.title)}</span>
        <span class="wk-next__arrow" aria-hidden="true">→</span>
      </a>

      <div class="lb" role="dialog" aria-modal="true" aria-label="Image viewer" hidden>
        <div class="lb__top">
          <p class="meta lb__count"></p>
          <p class="meta lb__caption"></p>
          <button type="button" class="lb__close" aria-label="Close">✕</button>
        </div>
        <div class="lb__stage"></div>
        <button type="button" class="lb__nav lb__nav--prev" aria-label="Previous image">←</button>
        <button type="button" class="lb__nav lb__nav--next" aria-label="Next image">→</button>
      </div>`;

    document.title = `${p.title} — ${cat.title} — KAIRO`;
    setupProgress();
    setupLightbox(gallery, p.title);
  };

  const setupProgress = () => {
    const bar = $(".pj-progress i");
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  };

  const setupLightbox = (items, title) => {
    const lb = $(".lb");
    const stage = $(".lb__stage", lb);
    const count = $(".lb__count", lb);
    const caption = $(".lb__caption", lb);
    let cur = 0, lastFocus = null, dir = 1;

    const show = (i) => {
      cur = (i + items.length) % items.length;
      const item = items[cur];
      const el = document.createElement(item.type === "video" ? "video" : "img");
      el.className = "lb__media";
      el.style.setProperty("--dir", dir);
      if (item.type === "video") { el.controls = true; el.autoplay = true; el.playsInline = true; el.loop = true; }
      else el.alt = item.alt || "";
      el.src = item.src;
      const old = $(".lb__media", stage);
      if (old) {
        old.classList.add("is-out");
        setTimeout(() => old.remove(), 450);
      }
      stage.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("is-in")));
      count.textContent = `${pad(cur + 1)} / ${pad(items.length)}`;
      caption.textContent = title;
      // preload neighbours
      [cur + 1, cur - 1].forEach((n) => {
        const it = items[(n + items.length) % items.length];
        if (it && it.type !== "video") { const im = new Image(); im.src = it.src; }
      });
    };

    const open = (i) => {
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.classList.add("is-locked");
      requestAnimationFrame(() => lb.classList.add("is-open"));
      dir = 1;
      show(i);
      setTimeout(() => $(".lb__close", lb).focus({ preventScroll: true }), 60);
    };
    const close = () => {
      lb.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(() => { lb.hidden = true; stage.innerHTML = ""; }, 500);
      lastFocus?.focus?.({ preventScroll: true });
    };
    const go = (d) => { dir = d; show(cur + d); };

    $$(".pj-shot").forEach((b) => b.addEventListener("click", () => open(+b.dataset.i)));
    $(".lb__close", lb).addEventListener("click", close);
    $(".lb__nav--prev", lb).addEventListener("click", () => go(-1));
    $(".lb__nav--next", lb).addEventListener("click", () => go(1));
    stage.addEventListener("click", (e) => { if (e.target === stage) close(); });

    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") { e.stopPropagation(); close(); }
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Tab") {
        const f = $$("button", lb);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }, true);

    // swipe on touch screens
    let sx = null;
    stage.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    });
  };

  /* ======================= Route ======================= */
  const page = document.body.dataset.page;
  if (page === "category") renderCategory(document.body.dataset.category);
  if (page === "project") renderProject();
})();
