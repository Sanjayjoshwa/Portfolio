/* =======================================
   SANJAY S — XZERO-STYLE PORTFOLIO JS
   Features: cursor, clock, menu, 
   parallax watermark, scroll-reveal
======================================= */

'use strict';

// ─── CUSTOM CURSOR ───
const cur = document.createElement('div');
cur.className = 'cur';
const curRing = document.createElement('div');
curRing.className = 'cur-ring';
document.body.appendChild(cur);
document.body.appendChild(curRing);

let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curRing.style.left = rx + 'px';
  curRing.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .skill-box, .contact-link, .exp-card').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// ─── LIVE CLOCK ───
function updateClock() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dEl = document.getElementById('clockDate');
  const tEl = document.getElementById('clockTime');
  if (dEl) dEl.textContent = dateStr;
  if (tEl) tEl.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);

// ─── HAMBURGER / OVERLAY MENU ───
const ham = document.getElementById('ham');
const overlay = document.getElementById('overlayMenu');
const closeBtn = document.getElementById('overlayClose');

function openMenu() {
  overlay.classList.add('open');
  ham.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  overlay.classList.remove('open');
  ham.classList.remove('active');
  document.body.style.overflow = '';
}

ham.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);

document.querySelectorAll('.overlay-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ─── NAVBAR BLEND (mix-blend-mode handles visual, we just update on scroll) ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.mixBlendMode = 'normal';
    navbar.style.background = 'rgba(10,10,10,0.92)';
    navbar.style.backdropFilter = 'blur(12px)';
  } else {
    navbar.style.mixBlendMode = 'difference';
    navbar.style.background = 'transparent';
    navbar.style.backdropFilter = 'none';
  }
}, { passive: true });

// ─── HERO WATERMARK PARALLAX ───
const heroWm = document.querySelector('.hero-wm');
window.addEventListener('scroll', () => {
  if (!heroWm) return;
  const y = window.scrollY;
  heroWm.style.transform = `translateX(${y * 0.25}px)`;
}, { passive: true });

// ─── SECTION WATERMARK PARALLAX ───
const wmBgs = document.querySelectorAll('.wm-bg');
window.addEventListener('scroll', () => {
  wmBgs.forEach(wm => {
    const rect = wm.parentElement.getBoundingClientRect();
    const ratio = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
    const shift = (ratio - 0.5) * 120;
    wm.style.transform = `translate(-50%, calc(-50% + ${shift}px))`;
  });
}, { passive: true });

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal-x');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      ro.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => ro.observe(el));

// ─── ADD REVEAL CLASS TO SECTIONS ───
document.addEventListener('DOMContentLoaded', () => {
  const toReveal = [
    ...document.querySelectorAll('.about-inner'),
    ...document.querySelectorAll('.stats-bar'),
    ...document.querySelectorAll('.section-header-row'),
    ...document.querySelectorAll('.skills-grid'),
    ...document.querySelectorAll('.marquee-wrap'),
    ...document.querySelectorAll('.exp-inner'),
    ...document.querySelectorAll('.proj-card'),
    ...document.querySelectorAll('.proj-desc-row'),
    ...document.querySelectorAll('.cta-card'),
    ...document.querySelectorAll('.footer-col'),
  ];

  toReveal.forEach((el, i) => {
    el.classList.add('reveal-x');
    const delay = i % 4;
    if (delay > 0) el.classList.add(`delay-${delay}`);
    // Trigger observer
    ro.observe(el);
  });
});

// ─── SKILL BOX HOVER TILT ───
document.querySelectorAll('.skill-box').forEach(box => {
  box.addEventListener('mousemove', e => {
    const rect = box.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    box.style.transform = `perspective(400px) rotateX(${yPct}deg) rotateY(${xPct}deg)`;
  });
  box.addEventListener('mouseleave', () => {
    box.style.transform = '';
  });
});

// ─── OVERLAY LINK STAGGER ANIMATION ───
document.querySelectorAll('.overlay-link').forEach((link, i) => {
  link.style.opacity = '0';
  link.style.transform = 'translateY(30px)';
  link.style.transition = `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`;
});

function animateOverlayIn() {
  document.querySelectorAll('.overlay-link').forEach(link => {
    link.style.opacity = '1';
    link.style.transform = 'translateY(0)';
  });
}
function animateOverlayOut() {
  document.querySelectorAll('.overlay-link').forEach(link => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(30px)';
  });
}

ham.addEventListener('click', () => {
  setTimeout(animateOverlayIn, 100);
});
closeBtn.addEventListener('click', animateOverlayOut);
