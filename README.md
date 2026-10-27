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
  projects/           project photographs (see PHOTOS.md)
  photos/             old illustrative stock images (no longer used on the page)
  og-image.png        preview image for WhatsApp, Facebook, LinkedIn links
  noscript.css        only loaded when JavaScript is switched off
  fonts/              Lora (headings) and Inter (text), self-hosted
```

## Changing the phone number or email

Open `script.js` and edit the `BUSINESS` block at the top. Every Call, WhatsApp and email link on the page follows it.
The same details also appear as plain text in `index.html` (for visitors without JavaScript and for search engines),
so search `index.html` for `353834277556`, `083 427 7556` and `omer@graniteandlime.ie` and update those too.

## Project photographs

Project photos live in `assets/projects/` (480, 960 and 1440 px, WebP with JPEG fallback). The register of every photo, its source file
and its approval status is in `PHOTOS.md`. Nothing goes on the site as Granite & Lime work until the founder has
confirmed who did the work and the homeowner's permission. Never add invented locations, dates or customer comments.

To add a photo: export it at 480 and 960 px wide (WebP + JPEG), copy an existing `<figure class="work-photo">`
in the "Our work" section, and write an `alt` text describing what is actually in the photo.

## How the enquiry form works

The form sends to Formspark (form `3BXhXMnj9`). The page shows "sent" only after Formspark accepts the enquiry (acceptance is not proof the email reached the inbox);
if it cannot be reached the visitor keeps their text and gets a copy-and-paste fallback plus the phone number.
The Formspark form is still named "Website enquiries – TEST": confirm with one approved test that enquiries
reach omer@graniteandlime.ie, then rename it. WhatsApp and Call buttons open the visitor's own apps; nothing is
sent from the website.

## Search files

`robots.txt` and `sitemap.xml` are in the root. Add any new page to `sitemap.xml`.

## Publishing (GitHub Pages)

Upload every file and folder here to the root of the repository, keeping the folder structure.
GitHub Pages rebuilds the live site about a minute after each commit.

## Fonts

Lora and Inter are both licensed under the SIL Open Font License 1.1 and are served from `assets/fonts/`,
so the site makes no requests to Google or any other third party.
