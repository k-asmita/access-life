/**
 * Access Life - Borivali Center | Main Script
 * Comprehensive Internationalization (i18n) & Navigation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Language System
  initLanguageSystem();

  // 2. Mobile Menu Toggle
  initMobileMenu();

  // 3. Smooth scrolling for hash links
  initSmoothScroll();

  // 4. Initialize FAQ Accordions
  initFaqAccordion();

  // 5. Interactive Form Handlers
  initForms();
});

/**
 * Initializes FAQ Accordion Toggles
 */
function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');
      
      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('is-open');
      });
      
      // Toggle current
      item.classList.toggle('is-open', !isOpen);
    });
  });
}

/**
 * Handles Form submissions with accessible success feedback
 */
function initForms() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const alertBox = form.querySelector('.form-success-alert');
      const submitBtn = form.querySelector('.form-submit-btn');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '...';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          if (alertBox) {
            alertBox.style.display = 'block';
            form.reset();
            alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 600);
      }
    });
  });
}

/**
 * Initializes the full i18n translation system
 */
function initLanguageSystem() {
  const savedLang = localStorage.getItem('accesslife_lang') || 'en';
  applyLanguage(savedLang);

  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selectedLang = e.currentTarget.getAttribute('data-lang');
      if (!selectedLang) return;
      applyLanguage(selectedLang);
      localStorage.setItem('accesslife_lang', selectedLang);
    });
  });
}

/**
 * Applies the selected language (en, hi, mr) to the DOM
 */
function applyLanguage(lang) {
  const validLang = ['en', 'hi', 'mr'].includes(lang) ? lang : 'en';
  
  // 1. Set HTML lang attribute
  document.documentElement.setAttribute('lang', validLang);
  document.body.setAttribute('data-current-lang', validLang);

  // 2. Update active toggle buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === validLang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // 3. Translate all elements with data-i18n
  if (typeof translations !== 'undefined' && translations[validLang]) {
    const dict = translations[validLang];
    const fallbackDict = translations['en'] || {};

    // Standard inner text / HTML
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      } else if (fallbackDict[key]) {
        el.textContent = fallbackDict[key];
      }
    });

    // Inputs & Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      } else if (fallbackDict[key]) {
        el.setAttribute('placeholder', fallbackDict[key]);
      }
    });

    // Aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key]) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // Titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });
  }
}

/**
 * Handles mobile hamburger navigation toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('is-open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mainNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Handles smooth scrolling for in-page anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}
