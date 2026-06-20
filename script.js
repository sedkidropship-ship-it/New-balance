/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  MEUBLE GALAXY PLUS — Main JavaScript
 *  script.js
 *
 *  Modules:
 *   1. Navbar — Scroll-aware glassmorphic effect
 *   2. Mobile Menu — Toggle & close
 *   3. Hero Slider — Auto-play cinematic slider with controls
 *   4. Hero Particles — Floating gold particle effect
 *   5. Scroll Reveal — IntersectionObserver-based reveal animations
 *   6. Scroll Progress Bar — Visual reading progress
 *   7. Parallax Effect — Background parallax on scroll
 *   8. Counter Animation — Stats number count-up
 *   9. Product Gallery — Thumbnail switcher
 *  10. Color Swatch Selector
 *  11. Magnetic Button Effect — Mouse tracking micro-interaction
 *  12. Smooth Scroll — Anchor link smooth navigation
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use strict';

/* ═══════════════════════════════════════════
   UTILITY HELPERS
═══════════════════════════════════════════ */

/**
 * Returns a debounced version of the given function.
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 */
const debounce = (fn, delay = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Returns a throttled version of the given function.
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Min time between calls in ms
 */
const throttle = (fn, limit = 16) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

/**
 * Selects a single DOM element (alias for querySelector).
 */
const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Selects all matching DOM elements (alias for querySelectorAll).
 */
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ═══════════════════════════════════════════
   1. NAVBAR — Scroll-Aware Glass Effect
═══════════════════════════════════════════ */

const NavbarModule = (() => {
  const navbar = $('#navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60; // px before glassmorphism kicks in

  const updateNavbar = throttle(() => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    navbar.classList.toggle('scrolled', scrolled);
  }, 50);

  window.addEventListener('scroll', updateNavbar, { passive: true });

  // Run once on load in case page is already scrolled
  updateNavbar();
})();

/* ═══════════════════════════════════════════
   2. MOBILE MENU — Toggle with Accessibility
═══════════════════════════════════════════ */

const MobileMenuModule = (() => {
  const hamburger = $('#hamburger');
  const mobileMenu = $('#mobile-menu');
  const closeLinks = $$('[data-close-menu]');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeMenu = () => {
    isOpen = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const toggleMenu = () => (isOpen ? closeMenu() : openMenu());

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  closeLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeMenu();
  });

  // Close on resize if screen becomes wide
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 1024) closeMenu();
  }, 200));
})();

/* ═══════════════════════════════════════════
   3. HERO SLIDER — Auto-play Cinematic Slider
═══════════════════════════════════════════ */

const HeroSliderModule = (() => {
  const slides = $$('.hero-slide');
  const dots   = $$('.dot');
  const prevBtn = $('#sliderPrev');
  const nextBtn = $('#sliderNext');
  if (!slides.length) return;

  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTO_PLAY_INTERVAL = 6000; // 6 seconds per slide

  /**
   * Activates the slide at the given index.
   * @param {number} index
   */
  const goToSlide = (index) => {
    // Deactivate current slide
    slides[currentIndex].classList.remove('active');
    dots[currentIndex]?.classList.remove('active');
    dots[currentIndex]?.setAttribute('aria-selected', 'false');

    // Update index (with wrap-around)
    currentIndex = (index + slides.length) % slides.length;

    // Activate new slide
    slides[currentIndex].classList.add('active');
    dots[currentIndex]?.classList.add('active');
    dots[currentIndex]?.setAttribute('aria-selected', 'true');
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  /** Restarts the auto-play timer. Call after manual interaction. */
  const resetAutoPlay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
  };

  // Bind controls
  nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
  prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
  });

  // Touch / Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const heroSlider = $('#heroSlider');
  heroSlider?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSlider?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) { // minimum swipe distance
      diff > 0 ? nextSlide() : prevSlide();
      resetAutoPlay();
    }
  }, { passive: true });

  // Keyboard navigation
  heroSlider?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
    if (e.key === 'ArrowLeft')  { prevSlide(); resetAutoPlay(); }
  });

  // Pause auto-play when user hovers over hero
  heroSlider?.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
  heroSlider?.addEventListener('mouseleave', resetAutoPlay);

  // Start auto-play
  resetAutoPlay();

  // Activate first slide immediately
  slides[0]?.classList.add('active');
})();

/* ═══════════════════════════════════════════
   4. HERO PARTICLES — Floating Gold Particles
═══════════════════════════════════════════ */

const ParticleModule = (() => {
  const container = $('#heroParticles');
  if (!container) return;

  // Skip heavy particle generation on mobile (performance)
  if (window.innerWidth < 768) return;

  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const PARTICLE_COUNT = 25;

  /**
   * Creates a single animated floating particle.
   * @returns {HTMLElement}
   */
  const createParticle = () => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
      pointer-events: none;
    `;
    return el;
  };

  // Add keyframe animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% {
        transform: translateY(0px) translateX(0px) scale(1);
        opacity: 0.3;
      }
      25% {
        transform: translateY(-${Math.random() * 30 + 15}px) translateX(${Math.random() * 20 - 10}px) scale(1.2);
        opacity: 0.8;
      }
      75% {
        transform: translateY(${Math.random() * 20 + 10}px) translateX(-${Math.random() * 20 - 10}px) scale(0.8);
        opacity: 0.2;
      }
    }
  `;
  document.head.appendChild(style);

  // Create and append particles
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    fragment.appendChild(createParticle());
  }
  container.appendChild(fragment);
})();

/* ═══════════════════════════════════════════
   5. SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════ */

const ScrollRevealModule = (() => {
  // All elements with [data-animate] or specific reveal classes
  const revealTargets = $$('[data-animate], .collection-card, .testimonial-card, .about-content, .product-detail');

  if (!revealTargets.length) return;

  /**
   * IntersectionObserver callback — adds 'revealed' class when element enters viewport.
   */
  const onIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after reveal (performance — only animate once)
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Trigger 80px before element enters viewport
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);

  revealTargets.forEach(el => observer.observe(el));

  // Trigger counter animation when about section is revealed
  const aboutContent = $('.about-content');
  if (aboutContent) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          CounterModule.animate();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(aboutContent);
  }
})();

/* ═══════════════════════════════════════════
   6. SCROLL PROGRESS BAR
═══════════════════════════════════════════ */

const ScrollProgressModule = (() => {
  const bar = $('#scrollProgress');
  if (!bar) return;

  const updateProgress = throttle(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
    bar.setAttribute('aria-valuenow', Math.round(progress));
  }, 16);

  window.addEventListener('scroll', updateProgress, { passive: true });
})();

/* ═══════════════════════════════════════════
   7. PARALLAX EFFECT — Background Scroll
═══════════════════════════════════════════ */

const ParallaxModule = (() => {
  // Skip on mobile (performance) and reduced-motion
  if (window.innerWidth < 768) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxEl = $('[data-parallax]');
  if (!parallaxEl) return;

  const updateParallax = throttle(() => {
    const section = parallaxEl.closest('.about-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Only update when section is visible
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    // Parallax ratio: moves at 40% of scroll speed
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const offset = (progress - 0.5) * 80; // max ±40px offset
    parallaxEl.style.transform = `translateY(${offset}px)`;
  }, 16);

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax(); // Initial call
})();

/* ═══════════════════════════════════════════
   8. COUNTER ANIMATION — Number Count-Up
═══════════════════════════════════════════ */

const CounterModule = (() => {
  const counters = [
    { el: $('#stat-clients'), target: 500, suffix: '+', duration: 2000 },
    { el: $('#stat-years'),   target: 10,  suffix: '',  duration: 1500 },
    { el: $('#stat-models'),  target: 50,  suffix: '+', duration: 1800 },
  ];

  let animated = false;

  /**
   * Animates a single counter from 0 to target.
   * @param {HTMLElement} el - Target element
   * @param {number} target - Target number
   * @param {string} suffix - Suffix to append (e.g. '+')
   * @param {number} duration - Animation duration in ms
   */
  const animateCounter = (el, target, suffix, duration) => {
    if (!el) return;

    const startTime = performance.now();
    const startValue = 0;

    // Easing function: ease-out cubic
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(startValue + (target - startValue) * easedProgress);

      el.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${target}${suffix}`; // Ensure exact final value
      }
    };

    requestAnimationFrame(update);
  };

  /**
   * Starts all counter animations. Only runs once.
   */
  const animate = () => {
    if (animated) return;
    animated = true;

    counters.forEach(({ el, target, suffix, duration }) => {
      animateCounter(el, target, suffix, duration);
    });
  };

  // Public API
  return { animate };
})();

/* ═══════════════════════════════════════════
   9. PRODUCT GALLERY — Thumbnail Switcher
═══════════════════════════════════════════ */

const ProductGalleryModule = (() => {
  const mainImage = $('#mainProductImage');
  const thumbs = $$('.thumb');
  if (!mainImage || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.dataset.img;
      if (!newSrc) return;

      // Fade out main image
      mainImage.style.opacity = '0';
      mainImage.style.transform = 'scale(1.02)';

      setTimeout(() => {
        mainImage.src = newSrc;
        // Fade in when loaded
        mainImage.onload = () => {
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1)';
        };
        // Fallback in case onload doesn't fire (cached image)
        if (mainImage.complete) {
          mainImage.style.opacity = '1';
          mainImage.style.transform = 'scale(1)';
        }
      }, 200);

      // Manage active state on thumbnails
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Add transition to main image for fade effect
  mainImage.style.transition = 'opacity 0.3s ease, transform 0.4s ease';
})();

/* ═══════════════════════════════════════════
   10. COLOR SWATCH SELECTOR
═══════════════════════════════════════════ */

const SwatchModule = (() => {
  const swatches = $$('.swatch');
  if (!swatches.length) return;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Optional: Update UI to show selected color name
      const title = swatch.getAttribute('title');
      if (title) {
        const label = $('.variants-label');
        if (label) label.textContent = `Couleur sélectionnée : ${title}`;
      }
    });
  });
})();

/* ═══════════════════════════════════════════
   11. MAGNETIC BUTTON EFFECT — Mouse Tracking
   Micro-interaction on .btn-magnetic elements
═══════════════════════════════════════════ */

const MagneticButtonModule = (() => {
  // Only on desktop — touch devices don't have hover
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const magneticBtns = $$('.btn-magnetic');

  magneticBtns.forEach(btn => {
    const STRENGTH = 0.35; // How strongly the button is attracted (0-1)

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - btnCenterX) * STRENGTH;
      const distanceY = (e.clientY - btnCenterY) * STRENGTH;

      btn.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Spring back to original position
      btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      btn.style.transform = 'translate(0, 0)';

      // Re-enable fast transition after spring
      setTimeout(() => {
        btn.style.transition = '';
      }, 500);
    });

    btn.addEventListener('mouseenter', () => {
      // Remove spring transition on enter
      btn.style.transition = 'transform 0.1s ease';
    });
  });
})();

/* ═══════════════════════════════════════════
   12. SMOOTH SCROLL — Anchor Navigation
═══════════════════════════════════════════ */

const SmoothScrollModule = (() => {
  const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;

  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Skip empty hashes
      if (!href || href === '#') return;

      // Skip SPA e-commerce routes
      const spaRoutes = ['#shop', '#product/', '#product', '#cart', '#checkout', '#confirm'];
      if (spaRoutes.some(route => href.startsWith(route))) return;

      try {
        const target = $(href);
        if (!target) return;

        e.preventDefault();

        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      } catch (err) {
        // If href contains special chars like slashes, ignore and let default navigation work
      }
    });
  });
})();

/* ═══════════════════════════════════════════
   13. ACTIVE NAV LINK — Highlight on Scroll
═══════════════════════════════════════════ */

const ActiveNavModule = (() => {
  const sections = $$('section[id], footer[id]');
  const navLinks = $$('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const updateActiveLink = throttle(() => {
    const scrollMid = window.scrollY + window.innerHeight / 3;

    let currentSection = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollMid) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${currentSection}`);
    });
  }, 100);

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Initial call
})();

/* ═══════════════════════════════════════════
   14. HERO SLIDE — Trigger reveal on load
═══════════════════════════════════════════ */

const HeroRevealModule = (() => {
  // The first hero slide's reveal-up elements start animating after 300ms
  // (CSS handles this via the .active class + transition-delay)
  // No extra JS needed; animations are CSS-driven.

  // However, ensure first slide is properly set as active on DOMContentLoaded
  const firstSlide = $('.hero-slide');
  if (firstSlide) {
    // Add active class after a brief tick to ensure CSS transitions play
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        firstSlide.classList.add('active');
      });
    });
  }
})();

/* ═══════════════════════════════════════════
   15. FOOTER SCROLL REVEAL
═══════════════════════════════════════════ */

const FooterRevealModule = (() => {
  const footerTop = $('.footer-top');
  if (!footerTop) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.05 });

  // Add initial hidden state
  footerTop.style.opacity = '0';
  footerTop.style.transform = 'translateY(30px)';
  footerTop.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

  // Add revealed class handler
  const originalReveal = IntersectionObserver.prototype.observe;
  footerTop.classList.add = new Proxy(footerTop.classList.add, {
    apply(target, thisArg, args) {
      if (args[0] === 'revealed') {
        footerTop.style.opacity = '1';
        footerTop.style.transform = 'translateY(0)';
      }
      return Reflect.apply(target, thisArg, args);
    }
  });

  observer.observe(footerTop);
})();

/* ═══════════════════════════════════════════
   16. PERFORMANCE — Lazy Load Fallback
   For browsers without native lazy loading support
═══════════════════════════════════════════ */

const LazyLoadModule = (() => {
  // Native lazy loading is supported in all modern browsers
  // This is a safety fallback for very old browsers
  if ('loading' in HTMLImageElement.prototype) return; // Native support — skip

  const lazyImages = $$('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.removeAttribute('loading');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
})();

/* ═══════════════════════════════════════════
   INITIALIZATION LOG
═══════════════════════════════════════════ */

// On DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Apply no-js class removal (handled via CSS if needed)
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js-loaded');

  // Log init in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log(
      '%c✦ Meuble Galaxy Plus %c— Luxury Furniture Website v1.0 %cLoaded ✓',
      'color: #D4AF37; font-weight: bold; font-size: 14px;',
      'color: #888; font-size: 12px;',
      'color: #4CAF50; font-size: 12px;'
    );
  }
});

/* ─────────────────────────────────────────
   EXTRA: Page Visibility API
   Pause slider when tab is not active
───────────────────────────────────────── */

document.addEventListener('visibilitychange', () => {
  // The HeroSliderModule handles pause via mouseenter/leave
  // Additional: pause particles when tab is hidden (handled by browser automatically)
});
