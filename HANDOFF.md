# Granite & Lime website: draft GL-UX-V2 handoff

Prepared 27 Oct 2026 by the UI/UX designer & website builder role. Local branch `draft/gl-ux-v2`.
**Not published. Publication needs Mr Karatas's explicit authorisation.**

## 1. Audit of the current site (27 Oct 2026)

| Finding | Source |
|---|---|
| Clean static site (HTML/CSS/JS, GitHub Pages), honest "not our work" labels on stock photos, good keyboard and form handling | LIVE + SOURCE |
| No genuine project photos: hero and detail image are Pexels stock | LIVE + SOURCE |
| Historical "broken before/after links" and "project placeholders": not visible live; placeholder markup exists but is `hidden` | LIVE + SOURCE |
| Form posts to Formspark `3BXhXMnj9`; a source comment names it "Website enquiries – TEST", connected on a "preview branch only". Delivery to the inbox is **unverified** | SOURCE (not tested live; no real submission sent) |
| Three equal hero buttons (Call / WhatsApp / Send Enquiry) plus an SMS link: four competing actions | LIVE |
| No Instagram, Facebook or LinkedIn links; tiling not mentioned; header says "Renovation & Refurbishment" | LIVE |
| robots.txt and sitemap.xml return 404 | LIVE (measured) |
| Page weight about 419 KB, load event 0.74 s (founder's connection, built-in browser) | LIVE (measured) |
| README describes an older WhatsApp-only form: out of date | SOURCE |

### Three most important customer problems
1. **No proof of real work.** A homeowner sees only stock photos labelled "not Granite & Lime work".
2. **Too many equal choices at the top.** Call, WhatsApp, enquiry form and SMS compete; nothing explains what WhatsApp needs or that the message must be sent there.
3. **The written enquiry route may not reach Omer.** The form is wired to a service labelled TEST and has never been confirmed end to end.

## 2. Competitor comparison (inspected 27 Oct 2026, from page content; claims are theirs, not verified)

| Site | Area clarity | Phone near top | WhatsApp | Real photos | Prep / scope explained | Trust evidence | Notable issue |
|---|---|---|---|---|---|---|---|
| [lemonpainting.ie](https://www.lemonpainting.ie/exterior-painting-clontarf/) (Clontarf page) | Mixed (N Dublin, also Bray/Greystones) | Yes | No | Likely, by filename | Partly | Ratings and "15+ years" without sources | Templated area blurbs |
| [dublindecopainting.ie](https://dublindecopainting.ie/areas/clontarf/) (Clontarf page) | Strong, local names | Yes | Yes, bottom only | Mostly, but not Clontarf jobs | Good for seafront homes | Dated, named reviews + Google link | Cookie banner; reused template |
| [abhailedecorators.com](https://www.abhailedecorators.com/) | Vague | No (bottom, not tappable) | No | Yes, named areas | No | "46 years" claim, no evidence | Dated build, keyword-stuffed title |
| [thepaintingcompany.ie](https://thepaintingcompany.ie/) | "Dublin" only | No | No | Unclear; mismatched alt text | Good, products named | Two short testimonials | Number buried |
| [aquapainting.ie](https://aquapainting.ie/house-painters-raheny/) (Raheny page) | Weak (lists distant towns) | Yes, not a link | No | Stock | No | Claims only | Copied text, staging links |

**Lessons applied:** a tappable number at the top beats everything else; WhatsApp is rare and is a real differentiator if explained;
real local-looking project photos are the strongest trust signal; templated neighbourhood pages read as fake, so the draft keeps one honest page;
explaining preparation simply builds confidence without unverifiable claims.

## 3. What changed and why

- **One primary action, one secondary:** "Call us 083 427 7556" (primary) and "Send photos on WhatsApp" (secondary), the same pair at the top, in the contact section and in the mobile bar. SMS link and third hero button removed; the form is kept as a quieter "Or send a written enquiry".
- **WhatsApp explained:** the brief's wording under each button, plus "Nothing is sent until you press send in WhatsApp." The WhatsApp chat opens with a short fill-in message (Area / Rooms or surfaces).
- **Real project photography** (draft, pending approval): teal feature wall replaces the stock hero; new "Our work" section with three groups (feature wall preparation → finished; hallway before → after; bedroom). See PHOTOS.md.
- **Clontarf + interior painting focus** in title, H1, meta description and hero. Services: interior painting leads; doors/woodwork, exterior, decorating & tiling sit quieter.
- **Readability:** body text 17 px (was 16), service and step text 16 px (was 15), form labels 15 px (was 13), form notes 14–15 px; only the small uppercase section labels and the logo strapline are 12–13 px. Touch targets 48 px+; numbered process steps.
- **Plain-English process and six FAQs** (preparation, colours, furniture, written quotation): proposed wording for founder/CCO/COO confirmation.
- **Follow us** in the footer: Instagram, Facebook, LinkedIn (public URL), recognisable icons with text, no embeds or tracking. Same URLs added to structured data `sameAs`.
- **Search basics:** robots.txt, sitemap.xml, canonical kept, one H1, logical H2/H3 order. No URL changes, so no redirects needed.
- Header strapline "Renovation & Refurbishment" → "Painting & Decorating · Dublin" (to match the offer; founder to confirm).

## 4. Contact and social destinations checked (27 Oct 2026)

| Destination | Result |
|---|---|
| tel:+353834277556 / 083 427 7556 | Matches brief, live site and Facebook page. Link format verified; **no call placed** |
| https://wa.me/353834277556 | Matches brief; link format verified; **no message sent** |
| omer@graniteandlime.ie | Matches brief, live site, privacy notice, Facebook |
| https://www.instagram.com/graniteandlime/ | Verified: "Granite & Lime", links to graniteandlime.ie. Bio still says "Bathrooms • Interiors • Finishes" / "Renovation & Refurbishment" |
| https://www.facebook.com/graniteandlime/ | Verified: "Granite & Lime · Residential Painting & Decorating in Dublin", same phone and email |
| https://www.linkedin.com/company/graniteandlime/ | Verified as the public URL of company 146653601 ("Granite & Lime", Dublin). The admin dashboard URL is **not** used |

## 5. Tests performed (headless Chromium on the draft, plus live-site measurements)

| Check | Result |
|---|---|
| 320 / 390 / 768 / 1440 px | No horizontal overflow; screenshots in proofs |
| 200% zoom (720 px CSS width) | No horizontal overflow |
| Keyboard | Skip link first; logical order; 3 px visible focus outline on every stop tested |
| Touch targets | All controls ≥ 44 px, except the inline privacy link inside a sentence (allowed for inline text links) |
| Headings | One H1, H2/H3 in order |
| Console errors | None at any width |
| In-page links | All anchors resolve |
| Mobile bar | Two buttons; hides while the top buttons or the contact section are on screen, and while typing |
| Form: empty submit | Error summary "4 things need your attention", focus moves to first field, each field explained |
| Form: service unreachable (simulated) | Honest error, details kept, copy-and-paste fallback and phone number shown |
| Form: success (simulated response, nothing sent) | Confirmation only after the service accepts |

**Not yet tested:** real form delivery to the inbox; real call/WhatsApp on a phone; screen reader pass (VoiceOver/TalkBack);
Lighthouse/PageSpeed on the published site; contrast measured by tool (colours are unchanged from the existing palette apart from text sizes).

## 6. Measurement plan (no tracking installed)

Separate counts, owned as noted: phone clicks and WhatsApp clicks (Growth: needs approved, cookie-free click counting or call tracking);
successful form submissions (Formspark dashboard, already carries utm/gclid fields); actual enquiries received, qualified discussions,
surveys, quotations and accepted work (CCO, logged by hand from phone/WhatsApp/email). A click is not an enquiry.

## 7. Founder decisions and facts needed before publication

1. **Photos:** for each photo in PHOTOS.md: was it Granite & Lime / your work, and in what role; does the homeowner agree to publication; is the before/after order right. Send the original files (or connect the Drive folder) for full-quality exports.
2. **Form:** approve one test submission to confirm enquiries reach omer@graniteandlime.ie; then rename the Formspark form.
3. **Wording:** confirm the three process steps and six FAQ answers (no free survey, timing or price promises are made).
4. **Services:** confirm tiling and exterior painting should be listed; confirm the "Painting & Decorating" strapline.
5. **Areas:** confirm the area list (CCO grouping; COO capacity confirmation still pending).
6. **Instagram bio** mentions bathrooms and renovation: consider aligning with painting (you change this; not done here).
7. **Publish:** your explicit go-ahead to merge `draft/gl-ux-v2` and push to GitHub Pages.

## 8. Files

Changed: index.html, styles.css, script.js, README.md, privacy.html, enquiry-sent.html, enquiry-error.html.
New: robots.txt, sitemap.xml, PHOTOS.md, HANDOFF.md, assets/projects/ (12 draft image exports).
Unchanged and still in the repo but no longer used on the page: assets/photos/ (stock), hero-study.svg, motif-*.svg, promise-*.avif, entrance.avif.
