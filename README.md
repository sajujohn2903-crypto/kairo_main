# KAIRO — Creative Studio

The website for KAIRO, a creative studio in the UAE. It's plain HTML, CSS and JavaScript, so there's nothing to install or build, and it runs on GitHub Pages as it is.

## What's in here

```
kairo-site/
├── index.html      The homepage (all sections)
├── branding.html   "Get Branded!" projects
├── web-design.html "Web Designs" projects
├── motion-graphics.html  "Movin' Elements" projects
├── project.html    One case-study page that shows any project (project.html?p=<id>)
├── 404.html        "Page not found" page — GitHub Pages uses it automatically
├── css/style.css   All styles, colours and layout
├── css/work.css    Extra styles for the work pages and case studies
├── js/main.js      Parallax, animations, page transitions, menu, cursor and the project form
├── js/projects.js  The projects: titles, text and image lists (edit this one)
├── js/work.js      Builds the work pages and case studies from projects.js
├── images/work/    One folder of images per project
├── media/          Hero video in two sizes (2560px and 1920px) and its still frame
├── favicon.svg     Browser tab icon
├── .nojekyll       Tells GitHub Pages to serve the files as they are
└── README.md       This file
```

## Adding your projects

The three work pages and every case study are built from `js/projects.js`, so you never have to touch the page HTML.

1. Put the project's images in `images/work/<project-id>/`. JPG, PNG, WebP and SVG all work. Keep photos around 2000px wide and under about 500 KB each so pages load quickly.
2. In `js/projects.js`, find the project and change its `title`, `client`, `year`, `services`, `cover` and the four text sections (`Overview`, `The challenge`, `Our approach`, `The result`).
3. List its images in `gallery`. `"full"` spans the page width and `"half"` sits two across. A video works too: `{ type: "video", src: "images/work/<id>/clip.mp4" }`.
4. To add a new project, copy one project block, give it a new `id` and set `category` to `"branding"`, `"web"` or `"motion"`. It appears on the right page automatically.

The images in `images/work/` now are placeholders marked "PLACEHOLDER". Replace them with your real work before going live.

## Before you go live

Open `js/main.js` and edit the `CONFIG` block at the top:

```js
const CONFIG = {
  CONTACT_EMAIL: "hello@yourdomain.com", // ← your real email
  FORM_ENDPOINT: "",                     // ← optional, see below
};
```

**The "Start a project" form.** GitHub Pages can't run a server, so the form works one of two ways:

- **With no endpoint (the default):** when someone sends a brief, their email app opens with every answer already filled in, addressed to `CONTACT_EMAIL`.
- **With an endpoint (recommended):** make a free form at [formspree.io](https://formspree.io), copy its URL (something like `https://formspree.io/f/abcdwxyz`) into `FORM_ENDPOINT`, and briefs arrive in your inbox without the visitor's email app opening.

Also worth updating:
- The social links (Instagram, LinkedIn, Behance) in the footer of `index.html` — search for `href="#" target="_blank"`.
- The project links in the **Selected work** section once the case study pages exist.

## Put it on GitHub Pages

1. Create a new repository on GitHub, for example `kairo-site`. It must be **public** on a free account.
2. Upload the files: on the repository page choose **Add file → Upload files**, drag in everything from this folder (including `css` and `js`), and click **Commit changes**.
   > `.nojekyll` starts with a dot, so it can be hidden in your file browser. On Windows, turn on **View → Show → Hidden items** in File Explorer so you can see and drag it. The site still works without it; it just stops GitHub from processing the files.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose the **main** branch and the **/ (root)** folder, then click **Save**.
5. After a minute or two the site will be live at `https://<your-username>.github.io/kairo-site/`. The link appears at the top of the Pages settings.

**Uploading with Git instead:**

```bash
cd kairo-site
git init
git add .
git commit -m "KAIRO website"
git branch -M main
git remote add origin https://github.com/<your-username>/kairo-site.git
git push -u origin main
```

Then do steps 3–5 above.

### Using your own domain (optional)

1. In **Settings → Pages → Custom domain**, enter your domain (e.g. `kairo.studio`) and save. GitHub adds a `CNAME` file to the repository for you.
2. At your domain registrar, add these DNS records:
   - For the root domain: four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - For `www`: a `CNAME` record pointing to `<your-username>.github.io`
3. When the certificate is ready, tick **Enforce HTTPS**. DNS changes can take up to a day to take effect.

## Editing

- **Colours:** at the top of `css/style.css`:
  | Token | Colour | Use |
  |---|---|---|
  | `--charcoal` | `#1D201E` Charcoal Black | Primary / background |
  | `--gold` | `#FCCD00` Regent Gold | Hero accent |
  | `--orange` | `#E59B03` Crown Orange | Secondary accent |
  | `--white` | `#E7EDE3` Warm White | Neutral / text |
  | `--olive` | `#34491E` Deep Olive | Supporting |
- **Parallax:** any element with `data-speed="0.2"` moves at a different speed from the page as you scroll. Positive values drift down, negative values drift up, and `0` turns it off. Keep values between about `-0.4` and `0.4`.
- **Hero video:** while the hero is on screen, the first 3 seconds of the video in `media/` (eyes open, breathing) play back and forth. Scrolling down plays the rest (eyes closing), and scrolling back up reverses it. Large or high-resolution desktop screens get `kairo-hero-2560.mp4`; everything else, phones included, gets `kairo-hero-1920.mp4`. To swap the video, re-encode the new one at both sizes with a keyframe on every frame, so scrubbing stays smooth:
  ```bash
  ffmpeg -i new.mp4 -an -vf scale=2560:-2 -c:v libx264 -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart media/kairo-hero-2560.mp4
  ffmpeg -i new.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart media/kairo-hero-1920.mp4
  ```
  The loop length is `LOOP_END` in `js/main.js`. Scrubbing needs a server that supports byte-range requests. GitHub Pages does. Python's built-in server doesn't, so the video won't scrub there.
- **Cursor labels:** add `data-cursor="View"` to any element to show that word in the cursor on desktop.
- **Accessibility:** all motion is turned off for visitors whose device is set to reduce motion, and the site can be used with a keyboard alone.

## Preview on your computer

To match GitHub Pages exactly, including the hero video scrubbing, run a local server from this folder (needs Node.js):

```bash
npx serve .
```

Then open the address it prints (usually http://localhost:3000). If you open `index.html` directly instead, the hero video may not play or scrub properly.
