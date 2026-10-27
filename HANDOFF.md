# Granite & Lime website: draft GL-UX-V2, revision 2

27 Oct 2026. Local branch `draft/gl-ux-v2`. Applies Growth instruction "GL-UX-V2 consolidated revision".
**Not pushed, merged, deployed or published. Publication needs Mr Karatas's explicit authorisation.**

## Change summary (revision 2)

| Area | Change |
|---|---|
| Positioning | H1 "Painting & Decorating in Dublin"; supporting text as supplied. Title, description, Open Graph and structured data now Dublin-wide. Clontarf moved to the area section: "Based in Dublin, welcoming enquiries from Clontarf and across the city." Clontarf also appears in the meta description and form placeholder; no local project history claimed |
| Services | Interior painting leads with "Interior painting is our main focus. Tell us which rooms or surfaces need attention." Secondary: doors & woodwork, commercial painting, decorating & tiling, plus the supplied line on commercial/decorating/tiling enquiries. Exterior painting card removed to keep the focus (founder may restore) |
| Photos | Drive-preview exports replaced with the supplied GL-Drive-Photo-Selection exports (WebP + JPEG, 480/960/1440). Neutral room is the single hero; teal pair and hallway comparison are separate groups; second room view used in the gallery so the hero is not repeated. No collages |
| Labels | "Bedroom" → "Room". Earlier hallway and teal photos labelled "During preparation"; later ones "After painting". Draft note says ownership, pairings and labels await founder confirmation |
| Contact | Unchanged destinations (tel:+353834277556, wa.me/353834277556, omer@graniteandlime.ie, Formspark 3BXhXMnj9). WhatsApp help now: "Your message is only sent when you press Send in WhatsApp." |
| Form wording | Success message now "Thank you, your enquiry has been sent" (not "received"); no site-visit promise. Source comment records Formspark as configured, inbox delivery unverified |
| Operational wording | "One person to talk to, from first call to finished room" replaced with "Speak directly with Omer." Area wording softened to "currently focus on"; availability "confirmed for each enquiry" |
| Accessibility fixes | Process step numbers were invisible (olive on olive): fixed. Decorative arrows no longer read aloud by screen readers |

## Verification performed (headless Chromium on the local draft)

| Check | Result |
|---|---|
| Layout at 320 / 390 / 768 / 1440 px and 200% zoom | No horizontal overflow; no console errors |
| Contrast (own WCAG 2.x script; axe-core could not be installed here) | 116 text elements on phone, 121 on desktop: 0 failures after the step-number fix. Lowest: 5.73:1 (small olive section labels, need 4.5:1). Form error messages 8.3:1, error summary 11:1. Photo captions sit on a solid dark panel |
| Screen-reader check (Chromium accessibility tree, which VoiceOver/TalkBack read from) | One H1, logical H2/H3; every photo has descriptive alt text; buttons and links have clear names ("Send photos on WhatsApp (opens WhatsApp)", "Instagram (opens in a new tab)"); form fields labelled and grouped |
| Keyboard | Skip link first; visible 3 px focus on every stop tested |
| Images | 0 broken; 7 project images; whole page about 349 KB (live site 419 KB) |
| Form, empty | Error summary, focus to first field, one message per field |
| Form, service unreachable (simulated) | Honest error, details kept, copy-and-paste fallback, phone number |
| Form, service accepts (simulated; nothing sent) | "Your enquiry has been sent" shown only after acceptance |

**Not verified, and not proven by the above:**
- Real screen-reader listening test (VoiceOver on iPhone/Mac, TalkBack on Android).
- Physical phone: tapping Call opens the dialler with 083 427 7556; tapping WhatsApp opens the chat with the pre-filled text; the mobile bar behaves while scrolling and typing.
- Real form delivery (see test plan). A simulated success does not prove delivery.

## Form delivery test plan (needs founder authorisation before running)

1. On the draft (or the live site, whichever you authorise), submit once with: name "TEST – website form check – [date/time]", area "TEST", details "Delivery test. Please ignore. Exclude from enquiry totals.", your own email.
2. Check the Formspark dashboard shows the record with the TEST name.
3. Check omer@graniteandlime.ie receives the notification (including spam/junk). Note the time.
4. Record both results; delete the test entry; exclude it from enquiry counts.
If step 2 passes but step 3 fails, the service accepts enquiries but notifications are not reaching the inbox.

## Founder decisions still open

1. **Photos:** for each group (feature wall, hallway, room), confirm who did the work, Omer/G&L's role, photographer and property permission, and the pairings (PHOTOS.md). Neighbouring houses are visible through the hero window.
2. **Form test:** authorise the one TEST submission above.
3. **Wording to confirm:** the three process steps and six FAQ answers (proposed, not established practice); the area list and availability; "Speak directly with Omer"; the form confirmation "Omer will reply by phone/email".
4. **Privacy notice:** it promises monthly deletion of enquiries older than 6 months. Confirm this is actually done, or the wording should change. Also enquiry-sent.html still says "A site visit is arranged where the work is suitable and availability allows". Confirm or soften.
5. **Services:** confirm commercial painting and tiling as offered; confirm dropping the exterior painting card.
6. **Publish:** explicit go-ahead to push, merge and deploy.

## Competitor research, audit and contact checks
Unchanged from revision 1 (see git history `e321f36:HANDOFF.md`): five Dublin painting sites compared; live audit findings;
Instagram, Facebook and public LinkedIn (linkedin.com/company/graniteandlime) verified on 27 Oct 2026.
