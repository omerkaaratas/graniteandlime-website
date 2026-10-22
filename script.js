/* Granite & Lime: site behaviour.
   Everything here is an enhancement. The page reads and works without it. */
(() => {
  'use strict';

  /* ---------- Business details: change them here, once ---------- */
  const BUSINESS = {
    name: 'Granite & Lime',
    whatsappNumber: '353834277556',      // international format, digits only
    phoneHref: '+353834277556',
    phoneDisplay: '083 427 7556',
    email: 'omer@graniteandlime.ie'
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const whatsappUrl = text => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;

  /* ---------- Contact links follow the constant above ---------- */
  function initContactLinks() {
    $$('[data-tel]').forEach(link => { link.href = `tel:${BUSINESS.phoneHref}`; });
    $$('[data-mail]').forEach(link => { link.href = `mailto:${BUSINESS.email}`; });
    $$('[data-whatsapp="photos"]').forEach(link => {
      link.href = whatsappUrl(`Hello ${BUSINESS.name}, I'd like to send photos of a project.`);
    });
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    const button = $('.menu-button');
    const nav = $('#primary-nav');
    if (!button || !nav) return;

    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });
  }

  /* ---------- FAQ: native <details>, opened and closed smoothly ---------- */
  function initFaq() {
    $$('.faq details').forEach(details => {
      const summary = $('summary', details);
      const body = $('.faq-body', details);
      if (!summary || !body || reduceMotion || !body.animate) return;
      let animation = null;

      summary.addEventListener('click', event => {
        event.preventDefault();
        if (animation) animation.cancel();
        const opening = !details.open;
        if (opening) details.open = true;
        const height = `${body.scrollHeight}px`;
        animation = body.animate(
          { height: opening ? ['0px', height] : [height, '0px'], opacity: opening ? [0, 1] : [1, 0] },
          { duration: 260, easing: 'ease' }
        );
        animation.onfinish = () => {
          if (!opening) details.open = false;
          animation = null;
        };
      });
    });
  }

  /* ---------- Enquiry form: prepares an email in the visitor's own email app ----------
     Nothing is sent or stored by this website. Without JavaScript the form still opens the email app
     with the subject and project description (the <form> uses a mailto: action). */
  function buildMessage(values) {
    return [
      `Hello ${BUSINESS.name},`,
      '',
      'I would like to request a site visit.',
      '',
      `Name: ${values.name}`,
      `Area: ${values.area}`,
      `Project: ${values.details}`,
      '',
      'Please contact me to discuss next steps.'
    ].join('\n');
  }

  // Following a real link inside the click handler is the most reliable way past popup blockers.
  function follow(url, newTab) {
    const link = document.createElement('a');
    link.href = url;
    if (newTab) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function initForm() {
    const form = $('#enquiry-form');
    if (!form) return;
    const summary = $('#form-errors');
    const status = $('#form-status');

    const fields = [
      { id: 'f-name', key: 'name', message: 'Please add your name.' },
      { id: 'f-area', key: 'area', message: 'Please add the area or neighbourhood.' },
      { id: 'f-details', key: 'details', message: 'Please add a few words about what needs painting.' }
    ];

    const setError = (field, message) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(`${field.id}-error`);
      if (message) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', error.id);
        error.textContent = message;
        error.hidden = false;
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        error.hidden = true;
      }
    };

    // Returns the values when everything is in order, otherwise shows the problems and returns null.
    const collect = () => {
      const values = {};
      let firstInvalid = null;
      let problems = 0;

      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        values[field.key] = value;
        setError(field, value ? '' : field.message);
        if (!value) {
          problems += 1;
          firstInvalid = firstInvalid || input;
        }
      });

      status.hidden = true;
      if (problems) {
        summary.textContent = problems === 1
          ? 'One field needs filling in before your email app opens.'
          : `${problems} fields need filling in before your email app opens.`;
        summary.hidden = false;
        firstInvalid.focus();
        return null;
      }
      summary.hidden = true;
      return values;
    };

    const announce = text => {
      status.textContent = text;
      status.hidden = false;
    };

    // Copy-and-paste fallback for devices where an email app does not open.
    // Separate from the status above, so screen readers only hear the short announcement.
    const fallback = $('#form-fallback');
    const fallbackBox = $('#form-fallback-message');
    const copyStatus = $('#form-copy-status');
    const showFallback = message => {
      if (!fallback || !fallbackBox) return;
      fallbackBox.value = message;
      copyStatus.textContent = '';
      fallback.hidden = false;
      // Show the confirmation and the Copy Message button together when the screen is tall enough;
      // on short screens (or at high zoom) show the confirmation first. Neither may sit under the
      // sticky header or the mobile action bar.
      const header = $('.site-header');
      const bar = $('.mobile-bar');
      const top = header ? header.getBoundingClientRect().height : 0;
      const bottom = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().height : 0;
      const room = window.innerHeight - top - bottom - 32;
      const span = copyButton ? copyButton.getBoundingClientRect().bottom - status.getBoundingClientRect().top : Infinity;
      if (span <= room) {
        copyButton.scrollIntoView({ block: 'nearest' });
      } else {
        status.scrollIntoView({ block: 'start' });
      }
    };
    const copyButton = $('[data-copy-message]', form);
    if (copyButton && fallbackBox) {
      copyButton.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(fallbackBox.value);
          copyStatus.textContent = `Message copied. Paste it into an email to ${BUSINESS.email}.`;
        } catch (error) {
          // Clipboard blocked: focus and select the text so the visitor can copy it by hand.
          fallbackBox.focus();
          fallbackBox.select();
          copyStatus.textContent = 'Text selected: copy with Ctrl+C / Cmd+C, or press and hold.';
        }
      });
    }

    fields.forEach(field => {
      document.getElementById(field.id).addEventListener('input', () => setError(field, ''));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = collect();
      if (!values) return;
      const subject = `Painting site visit enquiry: ${values.area}`;
      const message = buildMessage(values);
      follow(`mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, false);
      announce('Your email app should now be open with your message ready. Review it and press Send there.');
      showFallback(`Subject: ${subject}\n\n${message}`);
    });
  }

  /* ---------- Before / after slider (used once real project photos are added) ---------- */
  function initCompare() {
    $$('[data-compare]').forEach(figure => {
      const frame = $('.compare-frame', figure);
      const range = $('.compare-range', figure);
      if (!frame || !range) return;
      const update = () => frame.style.setProperty('--pos', `${range.value}%`);
      range.addEventListener('input', update);
      update();
    });
  }

  initContactLinks();
  initNav();
  initFaq();
  initForm();
  initCompare();
})();
