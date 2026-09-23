/* ==========================================================================
   KAIRO — interactions
   No dependencies. Edit the CONFIG block below before going live.
   ========================================================================== */

const CONFIG = {
  // Where project briefs and the footer "Get in touch" link go.
  CONTACT_EMAIL: "hello@yourdomain.com",

  // Optional: paste a form endpoint (e.g. Formspree "https://formspree.io/f/xxxxxx")
  // to receive briefs without the visitor's email app opening.
  // Leave empty to fall back to a pre-filled email.
  FORM_ENDPOINT: "",
};

(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- Small bits ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-email]").forEach((el) => {
    el.textContent = CONFIG.CONTACT_EMAIL;
    el.href = `mailto:${CONFIG.CONTACT_EMAIL}`;
  });

  /* ---------- Loader ---------- */
  const finishLoad = () => document.body.classList.add("is-loaded");
  if (reduceMotion) finishLoad();
  else {
    const minTime = new Promise((r) => setTimeout(r, 1300));
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([minTime, fonts]).then(finishLoad);
    setTimeout(finishLoad, 3000); // safety net
  }

  /* ---------- Header: hide on scroll down, show on scroll up ---------- */
  const header = $(".header");
  let lastY = window.scrollY;

  /* ---------- Mobile menu ---------- */
  const toggle = $(".menu-toggle");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
    } else {
      menu.classList.remove("is-open");
      setTimeout(() => { if (!menu.classList.contains("is-open")) menu.hidden = true; }, 700);
    }
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a, button", menu).forEach((el) => el.addEventListener("click", () => setMenu(false)));

  /* ---------- Active nav link ---------- */
  const navLinks = $$(".nav__link");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${e.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  /* ---------- Reveal on enter ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          revealObserver.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px" }
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Statement: split into words ---------- */
  const statement = $("[data-words]");
  let words = [];
  if (statement) {
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(" "));
            else {
              const s = document.createElement("span");
              s.className = "w";
              s.textContent = part;
              frag.appendChild(s);
            }
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(statement);
    words = $$(".w", statement);
  }

  /* ---------- Services accordion ---------- */
  $$(".svc__row").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".svc__item");
      const open = !item.classList.contains("is-open");
      $$(".svc__item.is-open").forEach((i) => {
        i.classList.remove("is-open");
        $(".svc__row", i).setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Hero video: breathe on screen, close eyes on scroll ----------
     0–3 s of the video (eyes open, breathing) plays back and forth while the
     hero is on screen. Scrolling scrubs through the rest (eyes closing), and
     scrolling back up reverses it. The video is encoded with a keyframe on
     every frame so scrubbing stays smooth. */
  const heroEl = $(".hero");
  const video = $(".hero__video");
  if (heroEl && video) {
    const LOOP_END = 3;          // seconds of "eyes open, breathing"
    const FPS = 24;
    let duration = 0;
    let shown = 0;               // the time currently on screen (smoothed)
    let idleT = 0;               // position inside the breathing loop
    let dir = 1;                 // loop direction (1 forward, -1 back)
    let idle = true;
    let last = performance.now();

    const heroProgress = () => {
      const r = heroEl.getBoundingClientRect();
      const travel = heroEl.offsetHeight - window.innerHeight;
      return travel > 0 ? clamp(-r.top / travel, 0, 1) : 0;
    };

    const seek = (t) => {
      const frame = Math.round(t * FPS) / FPS;
      if (video.seeking || Math.abs(video.currentTime - frame) < 0.5 / FPS) return;
      video.currentTime = frame;
    };

    const heroTick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const p = heroProgress();
      heroEl.style.setProperty("--hp", p.toFixed(4));
      heroEl.classList.toggle("is-away", p > 0.35);

      if (duration) {
        if (p <= 0.002) {
          if (!idle && shown <= LOOP_END + 0.03) { idle = true; idleT = Math.min(shown, LOOP_END); dir = -1; }
          if (idle) {
            if (!reduceMotion) {
              idleT += dir * dt;
              if (idleT >= LOOP_END) { idleT = LOOP_END; dir = -1; }
              if (idleT <= 0) { idleT = 0; dir = 1; }
            }
            shown = idleT;
          } else {
            shown = lerp(shown, LOOP_END, 1 - Math.exp(-dt * 8)); // glide back to eyes open
          }
        } else {
          idle = false;
          const target = LOOP_END + p * (duration - LOOP_END - 0.05);
          shown = lerp(shown, target, 1 - Math.exp(-dt * 10));
        }
        seek(shown);
      }
      requestAnimationFrame(heroTick);
    };

    const ready = () => {
      if (duration) return;
      duration = video.duration || 10;
      video.classList.add("is-ready");
      requestAnimationFrame((t) => { last = t; heroTick(t); });
    };
    // Pick the sharpest file the screen needs: 2560px for large or high-density
    // desktop screens, 1920px for everything else (including phones)
    const wantHD = window.innerWidth >= 1000 && window.innerWidth * (window.devicePixelRatio || 1) > 2000;
    video.src = (wantHD && video.dataset.srcHd) || video.dataset.src;
    video.pause();
    if (video.readyState >= 1) ready();
    else video.addEventListener("loadedmetadata", ready, { once: true });

    // iOS Safari only decodes frames for seeking after the video has played once
    const prime = () => {
      const pr = video.play();
      if (pr && pr.then) pr.then(() => video.pause()).catch(() => {});
    };
    prime();
    ["touchstart", "pointerdown", "scroll"].forEach((ev) =>
      window.addEventListener(ev, prime, { once: true, passive: true })
    );
  }

  /* ---------- Scroll-driven animation loop ---------- */
  const parallaxEls = $$("[data-speed]").map((el) => ({ el, speed: parseFloat(el.dataset.speed) || 0, x: el.dataset.axis === "x" }));
  const marquee = $(".marquee__track");
  const uae = $(".uae");
  const uaeRows = $$(".uae__row");
  const processLine = $(".process__line");

  let marqueeX = 0;
  let velocity = 0;
  let prevScroll = window.scrollY;

  // 0 when the element's top hits the bottom of the viewport, 1 when its bottom leaves the top
  const progress = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    return clamp((vh - r.top) / (vh + r.height), 0, 1);
  };

  const tick = () => {
    const y = window.scrollY;
    const vh = window.innerHeight;

    // header
    header.classList.toggle("is-scrolled", y > 40);
    if (!document.body.classList.contains("is-locked")) {
      if (y > lastY + 4 && y > vh * 0.6) header.classList.add("is-hidden");
      else if (y < lastY - 4) header.classList.remove("is-hidden");
    }
    lastY = y;

    // scroll velocity (smoothed)
    velocity = lerp(velocity, y - prevScroll, 0.1);
    prevScroll = y;

    if (!reduceMotion) {
      // parallax — measured against the (untransformed) parent
      for (const { el, speed, x } of parallaxEls) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        let d = (r.top + r.height / 2 - vh / 2) * speed;
        if (x) { const max = Math.min(48, window.innerWidth * 0.03); d = clamp(d, -max, max); }
        d = d.toFixed(1);
        el.style.transform = x ? `translate3d(${d}px, 0, 0)` : `translate3d(0, ${d}px, 0)`;
      }

      // marquee — constant drift, pushed by scroll speed
      if (marquee) {
        marqueeX -= 0.6 + Math.abs(velocity) * 0.35;
        const half = marquee.scrollWidth / 2;
        if (-marqueeX >= half) marqueeX += half;
        marquee.style.transform = `translate3d(${marqueeX.toFixed(1)}px, 0, 0)`;
      }

      // UAE rows slide in opposite directions
      if (uae) {
        const p = progress(uae) - 0.5;
        uaeRows.forEach((row) => {
          const dir = parseFloat(row.dataset.shift);
          row.style.transform = `translate3d(${(p * dir * 40).toFixed(2)}vw, 0, 0)`;
        });
      }
    }

    // statement words light up as you read
    if (words.length) {
      const r = statement.getBoundingClientRect();
      const p = reduceMotion ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
    }

    // process line fills
    if (processLine) {
      const r = processLine.getBoundingClientRect();
      const p = clamp((vh * 0.9 - r.top) / (vh * 0.55), 0, 1);
      processLine.style.setProperty("--p", reduceMotion ? 1 : p.toFixed(3));
    }

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* ---------- Custom cursor ---------- */
  if (finePointer && !reduceMotion) {
    const cursor = $(".cursor");
    const label = $(".cursor__label");
    document.body.classList.add("has-cursor");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
    document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));

    document.addEventListener("mouseover", (e) => {
      const withLabel = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button, label");
      if (withLabel) {
        label.textContent = withLabel.dataset.cursor;
        cursor.classList.add("is-label");
        cursor.classList.remove("is-link");
      } else {
        cursor.classList.remove("is-label");
        cursor.classList.toggle("is-link", !!link);
      }
    });

    const move = () => {
      cx = lerp(cx, mx, 0.2);
      cy = lerp(cy, my, 0.2);
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(move);
    };
    move();
  }

  /* ---------- Start a project: multi-step brief ---------- */
  const brief = $(".brief");
  const form = $(".brief__form");
  const steps = $$(".step[data-step]", form).filter((s) => s.dataset.step !== "done");
  const doneStep = $('[data-step="done"]', form);
  const btnPrev = $("[data-prev]", form);
  const btnNext = $("[data-next]", form);
  const btnSubmit = $("[data-submit]", form);
  const errorEl = $(".brief__error", form);
  const bar = $(".brief__progress i");
  const nowEl = $("[data-step-now]");
  $("[data-step-total]").textContent = steps.length;
  let current = 0;
  let lastFocus = null;

  const showStep = (i) => {
    current = i;
    steps.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    doneStep.classList.remove("is-active");
    btnPrev.hidden = i === 0;
    btnNext.hidden = i === steps.length - 1;
    btnSubmit.hidden = i !== steps.length - 1;
    bar.style.width = `${((i + 1) / steps.length) * 100}%`;
    nowEl.textContent = i + 1;
    errorEl.textContent = "";
    const first = $("input, textarea", steps[i]);
    if (first && finePointer) setTimeout(() => first.focus({ preventScroll: true }), 50);
  };

  const validate = (step) => {
    let ok = true;
    $$(".field", step).forEach((f) => f.classList.remove("is-invalid"));
    $$("[required]", step).forEach((input) => {
      if (!input.value.trim() || !input.checkValidity()) {
        ok = false;
        input.closest(".field")?.classList.add("is-invalid");
      }
    });
    if (step.dataset.step === "1" && !$$('input[name="need"]:checked', step).length) {
      errorEl.textContent = "Pick at least one — “Not sure yet” is fine too.";
      return false;
    }
    if (!ok) errorEl.textContent = "Please fill in the highlighted fields.";
    return ok;
  };

  const openBrief = (need) => {
    lastFocus = document.activeElement;
    form.reset();
    if (need) {
      const box = $(`input[name="need"][value="${need}"]`, form);
      if (box) box.checked = true;
    }
    showStep(0);
    btnNext.parentElement.hidden = false;
    brief.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => brief.classList.add("is-open"));
    setTimeout(() => $(".brief__close").focus({ preventScroll: true }), 100);
  };

  const closeBrief = () => {
    brief.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(() => { brief.hidden = true; }, 700);
    lastFocus?.focus?.({ preventScroll: true });
  };

  $$("[data-open-form]").forEach((b) => b.addEventListener("click", () => openBrief(b.dataset.need)));
  $(".brief__close").addEventListener("click", closeBrief);
  brief.addEventListener("click", (e) => { if (e.target === brief) closeBrief(); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!brief.hidden) closeBrief();
    else if (toggle.getAttribute("aria-expanded") === "true") setMenu(false);
  });

  // keep keyboard focus inside the dialog
  brief.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusables = $$("button:not([hidden]), input, textarea, a[href]", brief).filter((el) => el.offsetParent !== null);
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  btnNext.addEventListener("click", () => { if (validate(steps[current])) showStep(current + 1); });
  btnPrev.addEventListener("click", () => showStep(Math.max(0, current - 1)));
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT" && current < steps.length - 1) {
      e.preventDefault();
      btnNext.click();
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate(steps[current])) return;

    const data = new FormData(form);
    const payload = {
      Needs: data.getAll("need").join(", "),
      Business: data.get("business"),
      Industry: data.get("industry"),
      Website: data.get("website"),
      Goals: data.get("goals"),
      Budget: data.get("budget") || "—",
      Timeline: data.get("timeline") || "—",
      Details: data.get("description"),
      Name: data.get("name"),
      Email: data.get("email"),
      Phone: data.get("phone"),
    };

    btnSubmit.disabled = true;
    btnSubmit.firstChild.textContent = "Sending… ";

    try {
      if (CONFIG.FORM_ENDPOINT) {
        const res = await fetch(CONFIG.FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...payload, _replyto: payload.Email, _subject: `New brief — ${payload.Business}` }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        const body = Object.entries(payload).map(([k, v]) => `${k}: ${v || "—"}`).join("\n");
        const subject = `New project brief — ${payload.Business}`;
        window.location.href = `mailto:${CONFIG.CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      steps.forEach((s) => s.classList.remove("is-active"));
      doneStep.classList.add("is-active");
      btnNext.parentElement.hidden = true;
      bar.style.width = "100%";
    } catch {
      errorEl.textContent = `Something went wrong. Please email us at ${CONFIG.CONTACT_EMAIL}.`;
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.firstChild.textContent = "Send brief ↗";
    }
  });
})();
