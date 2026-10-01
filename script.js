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
    $$('[data-whatsapp="chat"]').forEach(link => {
      link.href = whatsappUrl(`Hello ${BUSINESS.name}, I have a question about a project.`);
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

  /* ---------- Five-step process ---------- */
  function initStepper() {
    const stepper = $('[data-stepper]');
    if (!stepper) return;
    const steps = $$('.step', stepper);
    const buttons = steps.map(step => $('.step-button', step));

    const activate = (index, focus) => {
      steps.forEach((step, i) => {
        const active = i === index;
        step.classList.toggle('is-active', active);
        buttons[i].setAttribute('aria-expanded', String(active));
      });
      if (focus) buttons[index].focus();
    };

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(index, false));
      button.addEventListener('keydown', event => {
        const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
        if (!move) return;
        event.preventDefault();
        activate((index + move + steps.length) % steps.length, true);
      });
    });

    stepper.classList.add('is-enhanced');
    activate(0, false);
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

  /* ---------- Sample quotation dialog ---------- */
  function initDialogs() {
    $$('[data-open-dialog]').forEach(opener => {
      const dialog = document.getElementById(opener.dataset.openDialog);
      if (!dialog || typeof dialog.showModal !== 'function') {
        opener.hidden = true;
        return;
      }
      opener.addEventListener('click', () => dialog.showModal());
      $$('[data-close-dialog]', dialog).forEach(closer => closer.addEventListener('click', () => dialog.close()));
      // A click on the backdrop lands on the <dialog> element itself.
      dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('close', () => opener.focus());
    });
  }

  /* ---------- Enquiry form: builds a WhatsApp (or email) message ---------- */
  function buildMessage(values) {
    const lines = [
      `Hello ${BUSINESS.name},`,
      '',
      "I'd like to discuss a project.",
      '',
      `Name: ${values.name}`,
      `Area: ${values.area}`,
      `Phone: ${values.phone}`
    ];
    if (values.email) lines.push(`Email: ${values.email}`);
    if (values.type) lines.push(`Type of work: ${values.type}`);
    lines.push(`Project details: ${values.details}`, '', 'Please contact me to arrange a site visit.');
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
    const summary = $('#form-errors');
    const status = $('#form-status');

    const fields = [
      { id: 'f-name', key: 'name', message: 'Please add your name.' },
      { id: 'f-area', key: 'area', message: 'Please add the area the project is in.' },
      { id: 'f-phone', key: 'phone', message: 'Please add a phone number so we can call you back.' },
      { id: 'f-email', key: 'email', optional: true, message: 'That email address does not look complete.',
        test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
      { id: 'f-details', key: 'details', message: 'Please add a few lines about the project.' }
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
        const missing = !value && !field.optional;
        const malformed = value && field.test && !field.test(value);
        setError(field, missing || malformed ? field.message : '');
        if (missing || malformed) {
          problems += 1;
          firstInvalid = firstInvalid || input;
        }
      });

      const type = $('input[name="type"]:checked', form);
      values.type = type ? type.value : '';

      status.hidden = true;
      if (problems) {
        summary.textContent = problems === 1
          ? 'One thing needs your attention before sending.'
          : `${problems} things need your attention before sending.`;
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

    fields.forEach(field => {
      document.getElementById(field.id).addEventListener('input', () => setError(field, ''));
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const values = collect();
      if (!values) return;
      follow(whatsappUrl(buildMessage(values)), true);
      announce(`WhatsApp should now be open with your message ready. Press send there, and add photos if you have them. If nothing opened, call ${BUSINESS.phoneDisplay}.`);
    });

    const emailButton = $('[data-send-email]', form);
    if (emailButton) {
      emailButton.addEventListener('click', () => {
        const values = collect();
        if (!values) return;
        const subject = `Site visit request: ${values.type || 'project'} in ${values.area}`;
        follow(`mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(values))}`, false);
        announce(`Your email app should now be open with your message ready. If nothing opened, write to ${BUSINESS.email} or call ${BUSINESS.phoneDisplay}.`);
      });
    }

    // "Ask about painting" links in the services section preselect the type of work.
    $$('[data-enquire]').forEach(link => {
      link.addEventListener('click', () => {
        const match = $$('input[name="type"]', form).find(input => input.value === link.dataset.enquire);
        if (match) match.checked = true;
      });
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

  /* ---------- Quiet reveal on scroll ----------
     Only elements that start below the first screen are faded in, so nothing visible on load ever disappears. */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const pending = $$('[data-reveal]').filter(el => el.getBoundingClientRect().top > window.innerHeight);
    if (!pending.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    pending.forEach(el => {
      el.classList.add('reveal-pending');
      observer.observe(el);
    });
    // Add the transition one frame later so the initial hide is not animated.
    requestAnimationFrame(() => pending.forEach(el => el.classList.add('reveal-ready')));
  }

  initContactLinks();
  initNav();
  initStepper();
  initFaq();
  initDialogs();
  initForm();
  initCompare();
  initReveal();
})();
