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

  /* ---------- Enquiry form ----------
     Two modes, chosen by the form's data-endpoint attribute:
     - empty (preview / not yet approved): prepares an email in the visitor's email app (mailto);
     - set to the approved form service URL: sends the enquiry directly and confirms only after the
       service acknowledges it. Nothing is ever kept in browser storage or put in the page address. */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneDigits = value => value.replace(/[\s().\-]/g, '');
  const PHONE_OK = value => /^\+?\d{7,15}$/.test(phoneDigits(value));

  function buildMessage(values) {
    const lines = [
      `Hello ${BUSINESS.name},`,
      '',
      'I would like to send a painting enquiry.',
      '',
      `Name: ${values.name}`,
      `Area: ${values.area}`
    ];
    if (values.phone) lines.push(`Phone: ${values.phone}`);
    if (values.email) lines.push(`Email: ${values.email}`);
    lines.push(`Project: ${values.details}`, '', 'Please contact me to discuss next steps.');
    return lines.join('\n');
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
    const endpoint = () => (form.dataset.endpoint || '').trim();
    const summary = $('#form-errors');
    const status = $('#form-status');
    const submit = $('.form-submit', form);
    const modeNote = $('#form-mode-note');
    const choiceError = $('#contact-choice-error');
    let sending = false;

    // Without JavaScript the browser enforces the HTML required fields (including phone).
    // With JavaScript this script validates instead, and "phone or email" replaces "phone required".
    form.noValidate = true;
    $$('[data-no-js-required]', form).forEach(input => input.removeAttribute('required'));
    if (endpoint() && modeNote) {
      modeNote.textContent = 'Your enquiry is sent securely to Granite & Lime. You will see a confirmation once it has been received.';
    }

    // Campaign identifiers (for example utm_source=google) are copied from the page address into hidden
    // fields so the enquiry records where it came from. Only these named parameters are read.
    const params = new URLSearchParams(window.location.search);
    $$('[data-utm]', form).forEach(input => {
      const value = params.get(input.dataset.utm);
      if (value) input.value = value.slice(0, 120);
    });

    const fields = [
      { id: 'f-name', key: 'name', required: 'Please add your name.' },
      { id: 'f-area', key: 'area', required: 'Please add the area or neighbourhood.' },
      { id: 'f-details', key: 'details', required: 'Please add a few words about what needs painting.' },
      { id: 'f-phone', key: 'phone', invalid: 'Please check the phone number (digits only, for example 083 123 4567).', test: PHONE_OK },
      { id: 'f-email', key: 'email', invalid: 'Please check the email address, for example name@example.ie.', test: value => EMAIL_RE.test(value) }
    ];

    const setError = (input, error, message) => {
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
      const problems = [];
      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        values[field.key] = value;
        let message = '';
        if (!value && field.required) message = field.required;
        else if (value && field.test && !field.test(value)) message = field.invalid;
        setError(input, document.getElementById(`${field.id}-error`), message);
        if (message) problems.push(input);
      });

      const phone = document.getElementById('f-phone');
      const email = document.getElementById('f-email');
      const noContact = !values.phone && !values.email;
      choiceError.textContent = noContact ? 'Please give a phone number or an email address so we can reply.' : '';
      choiceError.hidden = !noContact;
      if (noContact) {
        [phone, email].forEach(input => { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', choiceError.id); });
        problems.push(phone);
      }

      status.hidden = true;
      if (problems.length) {
        const count = problems.length;
        summary.textContent = count === 1 ? 'One thing needs your attention before sending.' : `${count} things need your attention before sending.`;
        summary.hidden = false;
        // Order of the fields on the page, so focus lands on the first problem.
        const first = fields.map(f => document.getElementById(f.id)).find(input => problems.includes(input));
        (first || problems[0]).focus();
        return null;
      }
      summary.hidden = true;
      return values;
    };

    const announce = (text, tone) => {
      status.textContent = text;
      status.dataset.tone = tone || '';
      status.hidden = false;
    };

    // Copy-and-paste fallback for when the email app does not open or the form service cannot be reached.
    const fallback = $('#form-fallback');
    const fallbackBox = $('#form-fallback-message');
    const copyStatus = $('#form-copy-status');
    const copyButton = $('[data-copy-message]', form);
    const showFallback = message => {
      if (!fallback || !fallbackBox) return;
      fallbackBox.value = message;
      copyStatus.textContent = '';
      fallback.hidden = false;
      // Show the message and the Copy Message button together when the screen is tall enough; on short
      // screens (or at high zoom) show the message first. Neither may sit under the header or the mobile bar.
      const header = $('.site-header');
      const bar = $('.mobile-bar');
      const top = header ? header.getBoundingClientRect().height : 0;
      const bottom = bar && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().height : 0;
      const room = window.innerHeight - top - bottom - 32;
      const span = copyButton ? copyButton.getBoundingClientRect().bottom - status.getBoundingClientRect().top : Infinity;
      if (span <= room) copyButton.scrollIntoView({ block: 'nearest' });
      else status.scrollIntoView({ block: 'start' });
    };
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
      const input = document.getElementById(field.id);
      input.addEventListener('input', () => {
        setError(input, document.getElementById(`${field.id}-error`), '');
        if (field.key === 'phone' || field.key === 'email') {
          choiceError.hidden = true;
          ['f-phone', 'f-email'].forEach(id => {
            const other = document.getElementById(id);
            if (other.getAttribute('aria-describedby') === choiceError.id) { other.removeAttribute('aria-invalid'); other.removeAttribute('aria-describedby'); }
          });
        }
      });
    });

    const setSending = on => {
      sending = on;
      submit.disabled = on;
      submit.setAttribute('aria-busy', String(on));
      submit.textContent = on ? 'Sending…' : submit.dataset.label;
      form.setAttribute('aria-busy', String(on));
    };

    const sendDirect = async values => {
      const payload = {
        name: values.name,
        area: values.area,
        project: values.details,
        phone: values.phone,
        email: values.email,
        enquiry_channel: 'Website form',
        page: window.location.pathname,
        _gotcha: document.getElementById('f-website').value,
        '_email.subject': `New painting enquiry: ${values.area}`
      };
      $$('[data-utm]', form).forEach(input => { if (input.value) payload[input.name] = input.value; });

      const controller = 'AbortController' in window ? new AbortController() : null;
      const timer = controller ? setTimeout(() => controller.abort(), 20000) : null;
      try {
        const response = await fetch(endpoint(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: controller ? controller.signal : undefined
        });
        return response.ok;
      } catch (error) {
        return false;
      } finally {
        if (timer) clearTimeout(timer);
      }
    };

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (sending) return;                                   // ignore double clicks / repeated Enter
      const values = collect();
      if (!values) return;
      const message = buildMessage(values);

      if (!endpoint()) {
        const subject = `Painting enquiry: ${values.area}`;
        follow(`mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, false);
        announce('Your email app should now be open with your message ready. Review it and press Send there.');
        showFallback(`Subject: ${subject}\n\n${message}`);
        return;
      }

      setSending(true);
      if (fallback) fallback.hidden = true;
      const ok = await sendDirect(values);
      if (ok) {
        // Confirmed by the form service: replace the form with the confirmation so it cannot be sent twice.
        const done = document.createElement('div');
        done.className = 'form-done';
        done.setAttribute('role', 'status');
        done.tabIndex = -1;
        done.innerHTML = '<h3>Thank you, your enquiry has been received.</h3><p></p><p>If it is urgent, call <a data-tel></a>.</p>';
        done.querySelector('p').textContent = `We will reply by ${values.phone ? 'phone' : 'email'} to discuss your property. A site visit is arranged where the work is suitable and availability allows.`;
        const tel = done.querySelector('[data-tel]');
        tel.href = `tel:${BUSINESS.phoneHref}`;
        tel.textContent = BUSINESS.phoneDisplay;
        form.replaceChildren(done);
        done.focus();
        sending = false;
        return;
      }
      setSending(false);
      announce(`Sorry, your enquiry could not be sent just now. Your details are still in the form, so you can try again, call ${BUSINESS.phoneDisplay}, or copy the message below and email it.`, 'error');
      showFallback(message);
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
