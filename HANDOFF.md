# Granite & Lime website: GL-UX-V2 revision 4 complete (consolidated)

27 Oct 2026. Local branch `draft/gl-ux-v2`.
Founder approval (Mr Karatas, 27 Oct): implement revision 4 copy, service hierarchy and mobile layout in the local draft.
**Not authorised:** form-test submission, push to the public repository, merge, deployment or publication.
That approval does not confirm photo ownership, publication permissions, operational readiness or privacy procedures.

## 0. Latest change: founder-selected photos (27 Oct, 10:36)
- The single second room photo is replaced by the founder's pair "Room with fireplace": Room_Preparation_Extract.png ("During preparation") then Room_After_Extract.png ("After painting"). Side by side on desktop, stacked preparation-first on phones. Ordinary photos, not a slider; proportions preserved (shown at 1.73 and 1.81 ratio, same as the files).
- Added fd247d8d-c557-4312-a949-a95b5006fc20.JPG as its own group, "Staircase and landing" (portrait, proportions preserved).
- Not added: cfad4d52(1).JPG (same scene as the hallway photo already used); dabffb2e(1).JPG (equipment visible).
- Held out of the gallery: "Decluttered teal bedroom with grey headboard.png" (edited presentation image).
- Re-tested: no overflow at 320/390/768/1440 px, 200% zoom or 200% text; no console errors; 0 contrast failures; all images load; page about 405 KB.
- Selection does not change attribution or publication permission: still outstanding for every photo (PHOTOS.md).

## 1. Change summary (current state of the draft)

| Area | Current draft |
|---|---|
| Heading and opening | H1 "Painting & Decorating in Dublin". Opening: "Interior painting for homes in Clontarf and across Dublin. Commercial painting, decorating and tiling enquiries also welcome." Then "Speak directly with Omer." |
| Page title / metadata | "Painting & Decorating in Clontarf and Dublin \| Granite & Lime"; meta and Open Graph descriptions consistent, not identical |
| Contact | Call (primary) and "Send photos on WhatsApp" (secondary), same pair at top, contact section and phone bar. WhatsApp help: opens a separate app; only sent when the visitor presses Send |
| Mobile layout | Contact details stacked above a full-width form; FAQ heading above full-width questions; phone number kept on one line at 320/390 px |
| Gallery | Neutral-room photo is the single hero. "Examples of interior painting": teal wall preparation/result pair; hallway preparation/result pair; founder-selected room-with-fireplace pair; staircase and landing view. Factual labels only ("During preparation", "After painting"). No visible claim that the work is Granite & Lime's; approval status kept internally (HTML comment + PHOTOS.md) |
| Services | Interior painting first (incl. doors, skirting, woodwork). Secondary: commercial painting; tiling; exterior painting "subject to scope, access and weather conditions" |
| Areas | CCO text: "Based in Dublin, with an initial focus on Clontarf interior painting. Enquiries elsewhere in Dublin are welcome; project suitability and visit availability are confirmed individually." Neighbourhood list removed |
| Process steps | CCO wording: Share the basics / Discuss the scope / Receive a written quotation |
| FAQ | CCO's six answers, unchanged questions |
| Form helper | CCO: "After a successful submission, this page will show a confirmation. If you see an error, please call or email us." |
| Form confirmation | CCO wording, identical in script.js and enquiry-sent.html: "Thank you. Your enquiry has been submitted. We'll review the details and contact you… A site visit or start date is not confirmed by submitting this form." Site-visit promise removed. Reply commitment flagged internally (code comments) until Omer accepts inbox responsibility |
| Privacy | "How long we keep it" replaced with CCO interim wording. Removed pending verification: 6-month / 6-year periods, monthly deletion claim, 12-month IP retention. Marked in the file as draft, not a completed retention policy |
| Social / search | Instagram, Facebook, public LinkedIn in footer (verified 27 Oct); robots.txt and sitemap.xml added; structured data contains verified details only |

### Status of supplied wording
CCO text applied verbatim (process, FAQ, form helper, confirmation, interim privacy). It is draft wording: COO confirmation of
preparation, protection and assessment arrangements, and privacy-fact verification, are still outstanding.

## 2. Tests

### Actually performed (headless Chromium on the local draft)
| Check | Result |
|---|---|
| Widths 320 / 390 / 768 / 1440 px | No horizontal overflow; no console errors |
| Contact and FAQ at 320 / 390 px | Single column; form 278 / 348 px wide; questions full width; phone number on one line |
| 200% page zoom (160 / 195 CSS px wide) | No horizontal overflow |
| 200% text size (root text doubled) at 320 / 390 px | No horizontal overflow; no words broken mid-word in headings, buttons or contact details |
| Keyboard order and focus | Skip link first; logical order; 3 px visible focus |
| Contrast (own WCAG script; axe-core not installable here) | 0 failures (115 text elements phone, 120 desktop); lowest 5.73:1 against 4.5:1 required |
| Accessibility tree (what screen readers read) | One H1; logical headings; descriptive alt text; labelled controls; decorative arrows silent |
| Images | 0 broken; page about 405 KB (live site 419 KB) |
| Form validation (empty) | Error summary, focus to first field, label visible below header |
| Confirmation text (simulated acceptance) | Shows the CCO wording exactly; enquiry-sent.html identical |
| enquiry-sent.html, privacy.html | No overflow at 320 / 1440 px; no errors |

### Simulations (useful, but not proof)
- Keyboard-open state: viewport shortened to 360 px with a field focused (not a real on-screen keyboard).
- 200% text: root font size doubled (not iOS Dynamic Type or Android font scaling).
- Form "service unreachable" and "service accepts" responses were simulated; **no enquiry was sent**.

### Still pending (need a person, a real device or authorisation)
- Physical iPhone and Android: tap Call (dialler shows 083 427 7556), tap WhatsApp (chat opens with pre-filled text), real keyboard, enlarged system text.
- Listening test with VoiceOver / TalkBack.
- Form delivery test (authorisation needed; see section 4).
- Lighthouse / PageSpeed measurement on the published site.

## 3. One list of outstanding decisions and facts

1. **COO confirmation:** preparation, protection and site-assessment arrangements described in the process steps and FAQ.
2. **Photos (all selected photographs, including the hero; groups: teal wall, hallway, room with fireplace, staircase and landing, hero):** who performed the work; Granite & Lime / Omer's role; photographer and property permission; confirmation of pairings; whether the room extracts are untouched photos. Neighbouring houses are visible through the hero window.
3. **Inbox responsibility:** Omer to accept responsibility for monitoring omer@graniteandlime.ie before the reply commitment ("We'll review the details and contact you…") is published.
4. **Form delivery:** authorise one labelled TEST submission (section 4).
5. **Privacy facts:** confirm actual retention periods and deletion practice; Formspark processor details, data locations and IP retention; Microsoft 365 as email host. The "How long we keep it" text is CCO interim wording, not a completed retention policy.
6. **Services:** confirm commercial painting, tiling and exterior painting are offered as described.
7. **Publication:** explicit authorisation to push, merge and deploy.

## 4. Form delivery test plan (do not run until authorised)
1. Submit once: name "TEST – website form check – [date/time]", area "TEST", details "Delivery test. Please ignore. Exclude from enquiry totals.", your own email.
2. Check the Formspark dashboard shows the record.
3. Check omer@graniteandlime.ie receives the notification (including junk). Note the time.
4. Record both results; delete the test; exclude it from enquiry counts.
If step 2 passes and step 3 fails: the service accepts enquiries but notifications are not reaching the inbox.

## 5. Files
Changed: index.html, styles.css, script.js, README.md, privacy.html, enquiry-sent.html, enquiry-error.html.
New: robots.txt, sitemap.xml, PHOTOS.md, HANDOFF.md, assets/projects/ (8 photos as WebP + JPEG: 5 from GL-Drive-Photo-Selection, 3 founder-selected).
Unused but still in the repo: assets/photos/ (old stock), hero-study.svg, motif-*.svg, promise-*.avif, entrance.avif.
Background: competitor review, live audit and social verification are in git history (`e321f36:HANDOFF.md`).
