/* ═══════════════════════════════════════════
   UBAIDILLAH PORTFOLIO — script.js
   Frontend Developer & UI Designer
═══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   CUSTOM CURSOR
────────────────────────────────────────── */
const $c  = document.getElementById('cur');
const $cl = document.getElementById('curl');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  $c.style.left = mx + 'px';
  $c.style.top  = my + 'px';
});

// Smooth ring follow
(function raf() {
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  $cl.style.left = rx + 'px';
  $cl.style.top  = ry + 'px';
  requestAnimationFrame(raf);
})();

// Cursor expand on interactive elements
const hoverSel = 'a, button, .pf-b, .ts-arr, .tdot, .thm, .sk, .sv, .pj, .ct-a, label, #btt, #wa';
document.querySelectorAll(hoverSel).forEach(el => {
  el.addEventListener('mouseenter', () => {
    $c.style.cssText  = `width:18px;height:18px;left:${mx}px;top:${my}px`;
    $cl.style.cssText = `width:58px;height:58px;border-color:rgba(167,139,250,.95);left:${rx}px;top:${ry}px`;
  });
  el.addEventListener('mouseleave', () => {
    $c.style.cssText  = `left:${mx}px;top:${my}px`;
    $cl.style.cssText = `left:${rx}px;top:${ry}px`;
  });
});


/* ──────────────────────────────────────────
   LOADER
────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('ldr').classList.add('out'), 2200);
});


/* ──────────────────────────────────────────
   PARTICLES
────────────────────────────────────────── */
(function initParticles() {
  const wrap   = document.getElementById('ptc');
  const colors = [
    'rgba(124,110,245,.35)',
    'rgba( 34,211,238,.28)',
    'rgba(244,114,182,.22)',
    'rgba( 74,222,128,.18)',
    'rgba(251,191, 36,.15)',
  ];

  for (let i = 0; i < 38; i++) {
    const d = document.createElement('div');
    d.className = 'pt';
    const s = Math.random() * 5 + 2;
    Object.assign(d.style, {
      width:             s + 'px',
      height:            s + 'px',
      left:              Math.random() * 100 + '%',
      background:        colors[i % colors.length],
      animationDuration: (Math.random() * 18 + 10) + 's',
      animationDelay:    (Math.random() * 15)       + 's',
    });
    wrap.appendChild(d);
  }
})();


/* ──────────────────────────────────────────
   NAVBAR — scroll shrink
────────────────────────────────────────── */
const $nav = document.getElementById('nav');
const $btt = document.getElementById('btt');

window.addEventListener('scroll', () => {
  $nav.classList.toggle('sc',  scrollY > 50);
  $btt.classList.toggle('sh', scrollY > 500);
}, { passive: true });

// Back to top
document.getElementById('btt').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ──────────────────────────────────────────
   DARK / LIGHT THEME TOGGLE
────────────────────────────────────────── */
document.getElementById('thm').addEventListener('click', () => {
  const html    = document.documentElement;
  const current = html.getAttribute('data-theme');
  html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});


/* ──────────────────────────────────────────
   HAMBURGER / MOBILE NAV
────────────────────────────────────────── */
const $ham = document.getElementById('ham');
const $mob = document.getElementById('mob');

$ham.addEventListener('click', () => {
  $ham.classList.toggle('op');
  $mob.classList.toggle('op');
});

$mob.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    $ham.classList.remove('op');
    $mob.classList.remove('op');
  });
});


/* ──────────────────────────────────────────
   TYPING ANIMATION
────────────────────────────────────────── */
const phrases = [
  'Frontend Developer',
  'UI Designer',
  'Creative Web Builder',
  'Mahasiswa SI',
  'React Enthusiast',
];
let pi = 0, ci = 0, deleting = false;
const $typed = document.getElementById('ht');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    $typed.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 2100);
      return;
    }
    setTimeout(type, 78);
  } else {
    $typed.textContent = phrase.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(type, 420);
      return;
    }
    setTimeout(type, 44);
  }
}
setTimeout(type, 2500);


/* ──────────────────────────────────────────
   COUNTER ANIMATION (hero stats)
────────────────────────────────────────── */
function animCount(el, target, suffix = '') {
  const duration = 1600, interval = 16;
  const steps = duration / interval;
  const inc   = target / steps;
  let current = 0;
  const iv = setInterval(() => {
    current = Math.min(current + inc, target);
    el.textContent = Math.floor(current) + suffix;
    if (current >= target) clearInterval(iv);
  }, interval);
}

let counted = false;


/* ──────────────────────────────────────────
   SCROLL REVEAL + SKILL BARS
────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Reveal element
    entry.target.classList.add('vis');

    // Animate skill bars inside revealed elements
    entry.target.querySelectorAll('.sk-fill').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });

    // Trigger counters when stats section is visible
    if (!counted) {
      const c1 = document.getElementById('c1');
      if (c1 && c1.getBoundingClientRect().top < window.innerHeight) {
        counted = true;
        animCount(document.getElementById('c1'), 20, '+');
        animCount(document.getElementById('c2'), 15, '+');
        animCount(document.getElementById('c3'),  2, '+');
      }
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));


/* ──────────────────────────────────────────
   PORTFOLIO FILTER
────────────────────────────────────────── */
document.querySelectorAll('.pf-b').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.pf-b').forEach(b => b.classList.remove('ac'));
    this.classList.add('ac');

    const filter = this.dataset.f;

    document.querySelectorAll('.pj').forEach(card => {
      const match = filter === 'all' || card.dataset.c === filter;
      card.style.transition = 'opacity .3s, transform .3s';
      if (match) {
        card.style.display = '';
        setTimeout(() => {
          card.style.opacity   = '1';
          card.style.transform = '';
        }, 10);
      } else {
        card.style.opacity   = '0';
        card.style.transform = 'scale(.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});


/* ──────────────────────────────────────────
   TESTIMONIALS SLIDER
────────────────────────────────────────── */
(function initSlider() {
  const track    = document.getElementById('tst');
  const dotsWrap = document.getElementById('tdots');
  const cards    = [...track.querySelectorAll('.ts-card')];
  let cur = 0;

  const visibleCount = () =>
    window.innerWidth < 600 ? 1 : window.innerWidth < 1024 ? 2 : 3;

  const maxPage = () => Math.max(0, cards.length - visibleCount());

  // Build dots
  function buildDots() {
    dotsWrap.innerHTML = '';
    const n = maxPage() + 1;
    for (let i = 0; i < n; i++) {
      const d = document.createElement('div');
      d.className = 'tdot' + (i === 0 ? ' ac' : '');
      d.addEventListener('click', () => go(i));
      dotsWrap.appendChild(d);
    }
  }
  buildDots();
  window.addEventListener('resize', () => { buildDots(); go(0); });

  function go(i) {
    cur = Math.max(0, Math.min(i, maxPage()));
    const cardW = cards[0].offsetWidth + 24; // gap = 24px (1.5rem)
    track.style.transform = `translateX(-${cur * cardW}px)`;
    [...dotsWrap.querySelectorAll('.tdot')]
      .forEach((d, idx) => d.classList.toggle('ac', idx === cur));
  }

  document.getElementById('tprev').addEventListener('click', () => go((cur - 1 + maxPage() + 1) % (maxPage() + 1)));
  document.getElementById('tnext').addEventListener('click', () => go((cur + 1)                  % (maxPage() + 1)));

  // Autoplay
  let auto = setInterval(() => go((cur + 1) % (maxPage() + 1)), 4500);
  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => {
    auto = setInterval(() => go((cur + 1) % (maxPage() + 1)), 4500);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      go(dx < 0
        ? (cur + 1) % (maxPage() + 1)
        : (cur - 1 + maxPage() + 1) % (maxPage() + 1)
      );
    }
  });
})();


/* ──────────────────────────────────────────
   PHOTO
   Foto diatur langsung di index.html via
   src="foto.jpg" — tidak perlu upload.
   Ganti "foto.jpg" dengan nama file fotomu.
────────────────────────────────────────── */


/* ──────────────────────────────────────────
   SMOOTH SCROLL for anchor links
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ──────────────────────────────────────────
   TOAST NOTIFICATION
────────────────────────────────────────── */
function toast(msg, duration = 4000) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('sh');
  setTimeout(() => el.classList.remove('sh'), duration);
}


/* ──────────────────────────────────────────
   CONTACT FORM SUBMIT
────────────────────────────────────────── */
document.getElementById('ctForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = document.getElementById('sb');

  // Loading state
  btn.innerHTML = '<span>Mengirim...</span><span>⏳</span>';
  btn.style.opacity = '.75';

  setTimeout(() => {
    // Success state
    btn.innerHTML = '<span>Terkirim!</span><span>✅</span>';
    btn.style.opacity  = '1';
    btn.style.background = 'linear-gradient(135deg,#4ade80,#22d3ee)';
    toast('✅ Pesan terkirim! Saya akan segera membalas.');
    this.reset();

    // Reset button
    setTimeout(() => {
      btn.innerHTML        = '<span>Kirim Pesan</span><span>✦</span>';
      btn.style.background = '';
    }, 4500);
  }, 1800);
});


/* ──────────────────────────────────────────
   CV DOWNLOAD BUTTON
   Pastikan file 'cv_ubaidillah.pdf' ada
   di folder yang sama dengan index.html
────────────────────────────────────────── */
document.getElementById('cvb').addEventListener('click', e => {
  e.preventDefault();

  // Buat link download sementara lalu klik otomatis
  const a = document.createElement('a');
  a.href     = 'cv_ubaidillah.pdf';                    // file CV di folder project
  a.download = 'CV_Ubaidillah_Frontend_Developer.pdf'; // nama file saat disimpan
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  toast('⬇️ Mendownload CV Ubaidillah...');
});
