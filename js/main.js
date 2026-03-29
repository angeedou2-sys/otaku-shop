/* ============================================================
   AD&M OTAKU'S — Main JavaScript
   ============================================================ */

"use strict";

/* ── Page Loader ─────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 500);
    }
  }, 1800);
});

/* ── Particles Canvas ────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(201,168,76,', 'rgba(214,63,170,', 'rgba(63,201,214,'];
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Navbar Scroll ───────────────────────────────────────── */
(function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link-custom[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) link.classList.add('active');
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ── Reveal on Scroll ────────────────────────────────────── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => obs.observe(el));
})();

/* ── Back to Top ─────────────────────────────────────────── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Dark Mode Toggle ────────────────────────────────────── */
(function initDarkMode() {
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return;

  const stored = localStorage.getItem('adm_theme');
  if (stored === 'light') applyLight();

  btn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('adm_theme', 'dark');
      btn.innerHTML = '🌙';
    } else {
      applyLight();
    }
  });

  function applyLight() {
    document.body.classList.add('light-mode');
    localStorage.setItem('adm_theme', 'light');
    btn.innerHTML = '☀️';
  }
})();

/* ── Shop Filter ─────────────────────────────────────────── */
(function initShopFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card-wrap');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      cards.forEach(card => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (match) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.display = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
})();

/* ── Contact Form Validation ─────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const rules = {
    contactName:    { required: true, minLen: 2, label: 'Nom' },
    contactEmail:   { required: true, email: true, label: 'E-mail' },
    contactPhone:   { required: false, label: 'Téléphone' },
    contactSubject: { required: true, label: 'Sujet' },
    contactMessage: { required: true, minLen: 10, label: 'Message' },
  };

  function validateField(id) {
    const field = document.getElementById(id);
    const rule  = rules[id];
    if (!field || !rule) return true;
    const val = field.value.trim();
    const errEl = document.getElementById(id + 'Error');
    let err = '';

    if (rule.required && !val) {
      err = `Le champ ${rule.label} est obligatoire.`;
    } else if (val && rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err = 'Adresse e-mail invalide.';
    } else if (val && rule.minLen && val.length < rule.minLen) {
      err = `Minimum ${rule.minLen} caractères requis.`;
    }

    field.classList.toggle('error', !!err);
    if (errEl) {
      errEl.textContent = err;
      errEl.classList.toggle('show', !!err);
    }
    return !err;
  }

  Object.keys(rules).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = Object.keys(rules).map(validateField).every(Boolean);
    if (!valid) return;

    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      form.style.display = 'none';
      const successMsg = document.getElementById('formSuccess');
      if (successMsg) successMsg.style.display = 'block';
      showToast('Message envoyé !', 'Nous vous répondrons très bientôt 💌');
    }, 1500);
  });
})();

/* ── Toast System ────────────────────────────────────────── */
function showToast(title, message, duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.innerHTML = `<div class="toast-title">${title}</div><div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ── Cart / LocalStorage Mini-Cart ──────────────────────── */
const Cart = (function() {
  const KEY = 'adm_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function save(cart) { localStorage.setItem(KEY, JSON.stringify(cart)); }

  function addItem(id, name, price) {
    const cart = load();
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    save(cart);
    updateBadge();
    showToast('Ajouté au panier 🛒', name);
  }

  function getCount() { return load().reduce((s, i) => s + i.qty, 0); }

  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    const count = getCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function renderModal() {
    const body = document.getElementById('cartModalBody');
    if (!body) return;
    const cart = load();
    if (!cart.length) {
      body.innerHTML = '<p class="text-center text-dim py-4">Votre panier est vide</p>';
      return;
    }
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    body.innerHTML = cart.map(item => `
      <div class="d-flex justify-content-between align-items-center mb-3 pb-3"
           style="border-bottom:1px solid var(--border-gold)">
        <div>
          <div style="font-family:var(--font-title);font-size:.85rem;color:var(--text-primary)">${item.name}</div>
          <div style="font-size:.75rem;color:var(--text-dim)">Qté: ${item.qty}</div>
        </div>
        <div style="color:var(--gold);font-family:var(--font-title)">
          ${(item.price * item.qty).toLocaleString()} FCFA
        </div>
      </div>
    `).join('') + `
      <div class="d-flex justify-content-between mt-3" 
           style="font-family:var(--font-title);color:var(--gold);font-size:1rem;font-weight:700">
        <span>Total</span><span>${total.toLocaleString()} FCFA</span>
      </div>
    `;
  }

  return { addItem, getCount, updateBadge, renderModal };
})();

// Bind add-to-cart buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add-cart]');
  if (!btn) return;
  const { productId, productName, productPrice } = btn.dataset;
  Cart.addItem(productId, productName, Number(productPrice));
});

// Render cart modal on open
document.addEventListener('show.bs.modal', (e) => {
  if (e.target.id === 'cartModal') Cart.renderModal();
});

/* ── Newsletter ──────────────────────────────────────────── */
(function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type=email]').value.trim();
    if (!email) return;
    const stored = JSON.parse(localStorage.getItem('adm_newsletter') || '[]');
    if (!stored.includes(email)) stored.push(email);
    localStorage.setItem('adm_newsletter', JSON.stringify(stored));
    showToast('Inscription réussie ! ✨', 'Bienvenue dans la famille Otaku 🇯🇵');
    form.reset();
  });
})();

/* ── Init cart badge on load ─────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());

/* ── Smooth external nav links ───────────────────────────── */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const target = document.querySelector(a.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Close mobile navbar if open
  const toggler = document.querySelector('.navbar-collapse.show');
  if (toggler) {
    const bsCollapse = bootstrap.Collapse.getInstance(toggler);
    if (bsCollapse) bsCollapse.hide();
  }
});
