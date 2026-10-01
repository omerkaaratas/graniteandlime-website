# Granite & Lime website

Static site for graniteandlime.ie. Plain HTML, CSS and JavaScript: no build step, no npm, no framework.

## Files

```
index.html            the page
styles.css            all styling (design tokens at the top)
script.js             all behaviour (business details at the top)
CNAME                 tells GitHub Pages to serve graniteandlime.ie
assets/
  logo.svg            GL monogram (also the favicon)
  hero-study.svg      hero illustration (not project photography)
  motif-*.svg         small service drawings
  og-image.png        preview image for WhatsApp, Facebook, LinkedIn links
  noscript.css        only loaded when JavaScript is switched off
  fonts/              Lora (headings) and Inter (text), self-hosted
```

## Changing the phone number or email

Open `script.js` and edit the `BUSINESS` block at the top. Every Call, WhatsApp and email link on the page follows it.
The same details also appear as plain text in `index.html` (for visitors without JavaScript and for search engines),
so search `index.html` for `353834277556`, `083 427 7556` and `omer@graniteandlime.ie` and update those too.

## Adding real photographs

Nothing on the site pretends to be finished work. Three places are ready for real images:

1. **Hero**: replace `assets/hero-study.svg` in the `<figure class="hero-figure">` with a portrait photo (about 1600 × 2000).
2. **Omer's portrait**: replace the `<div class="portrait">` block in the About section. The exact `<img>` line is in the HTML comment above it.
3. **Selected work**: the section exists but is `hidden`. Instructions are in the HTML comment above `<section id="work">`.
   It includes a before/after slider that works with mouse, touch and arrow keys.

Compress photos before uploading (aim for under 300 KB each) and always write a real `alt` description.

## How the enquiry form works

There is no server. Pressing **Continue in WhatsApp** opens WhatsApp with a ready-written message to the business number;
**Send by email instead** does the same in the visitor's email app. Nothing is stored on the website.
Without JavaScript the form still opens WhatsApp with the project description.

## Publishing (GitHub Pages)

Upload every file and folder here to the root of the repository, keeping the folder structure.
GitHub Pages rebuilds the live site about a minute after each commit.

## Fonts

Lora and Inter are both licensed under the SIL Open Font License 1.1 and are served from `assets/fonts/`,
so the site makes no requests to Google or any other third party.
