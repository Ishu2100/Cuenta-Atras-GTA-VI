/* GTA VI · Cuenta atrás — Experiencia Vice City */

/* ===== CONFIGURACIÓN CENTRALIZADA (edita solo aquí) ===== */
const CONFIG = {
  launch: '2026-11-19T00:00:00',  // fecha y hora de lanzamiento (hora local del visitante)
  start:  '2023-12-01T00:00:00',  // inicio de la barra de progreso
  locale: 'es-ES',
  slides: [1, 8, 4, 2, 6, 10, 3, 5].map(n => `assets/images/opt/${n}.webp`), // fondos rotativos
  slideMs: 14000,
  particles: { off: 0, low: 26, high: 64 },
  gallery: [
    [1, 'Vice City al atardecer'], [2, 'Jason junto a una moto'], [3, 'Lucía'],
    [4, 'Los cayos de Leonida desde el aire'], [5, 'Día de piscina en Leonida'],
    [6, 'Noche en Jack of Hearts'], [7, 'Jason en un coche'], [8, 'Calles de Vice City'],
    [9, 'Los pantanos de Leonida'], [10, 'Una lancha en los pantanos']
  ]
};

(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement, body = document.body;

/* Parámetros de prueba: ?demo=launch (ya lanzado) · ?demo=soon (cuenta atrás de 8 s) */
const demo = new URLSearchParams(location.search).get('demo');
const T = demo === 'launch' ? Date.now() - 1000 : demo === 'soon' ? Date.now() + 8000 : new Date(CONFIG.launch).getTime();
const START = new Date(CONFIG.start).getTime();

/* ===== AJUSTES PERSISTENTES ===== */
const KEY = 'gta6-vicecity-settings', mq = matchMedia('(prefers-reduced-motion: reduce)');
const S = { theme: 'sunset', mode: 'dark', fx: 'high', motion: mq.matches ? 'reduced' : 'full', volume: 0.35 };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const reduced = () => S.motion === 'reduced';
const bgAudio = $('#bgAudio'), tickAudio = $('#tickAudio'), vol = $('#volumeSlider');
let playing = false;

function apply() {
  Object.assign(root.dataset, { theme: S.theme, mode: S.mode, fx: S.fx, motion: S.motion });
  $$('[data-k]').forEach(b => b.setAttribute('aria-pressed', String(S[b.dataset.k] === b.dataset.v)));
  vol.value = S.volume; bgAudio.volume = S.volume; tickAudio.volume = Math.min(1, S.volume + .2);
  $('meta[name=theme-color]').content = getComputedStyle(root).getPropertyValue('--bg').trim() || '#12061f';
  colors(); seed(); loop();
}
$$('[data-k]').forEach(b => b.addEventListener('click', () => { S[b.dataset.k] = b.dataset.v; save(); apply(); }));
vol.addEventListener('input', () => { S.volume = +vol.value; save(); apply(); });
const panel = $('#panel'), setBtn = $('#setBtn');
const togglePanel = open => { panel.classList.toggle('open', open); setBtn.setAttribute('aria-expanded', String(open)); };
setBtn.addEventListener('click', e => { e.stopPropagation(); togglePanel(!panel.classList.contains('open')); });
document.addEventListener('click', e => { if (!panel.contains(e.target)) togglePanel(false); });

/* ===== CUENTA ATRÁS Y PROGRESO ===== */
const el = id => document.getElementById(id), D = el('days'), H = el('hours'), M = el('minutes'), Sx = el('seconds');
const prog = $('.prog'), pText = el('progressText');
const fmtDate = new Intl.DateTimeFormat(CONFIG.locale, { day: 'numeric', month: 'long', year: 'numeric' });
const fmtTime = new Intl.DateTimeFormat(CONFIG.locale, { hour: '2-digit', minute: '2-digit' });
const dateTxt = fmtDate.format(T);
el('targetDateTag').textContent = `[ FECHA OBJETIVO: ${dateTxt.toUpperCase()} · ${fmtTime.format(T)} H ]`;
el('infoDate').textContent = `${dateTxt} (${fmtTime.format(T)} h, hora local)`;
const pl = (n, a, b) => `${n} ${n === 1 ? a : b}`;
let first = true, done = false, ready = false;
let last_p = 0;
setTimeout(() => { ready = true; prog.style.setProperty('--p', last_p); }, 3600);

function put(node, v) {
  if (node.textContent === v) return;
  node.textContent = v;
  if (!first && !reduced() && node.animate)
    node.animate([{ transform: 'translateY(-24%) scale(1.08)', opacity: .15 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.9,.3,1.2)' });
}

function tick() {
  const now = Date.now(), left = Math.max(0, T - now);
  const pct = left === 0 ? 100 : Math.min(100, Math.max(0, (now - START) / (T - START) * 100));
  const d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4), s = Math.floor(left % 6e4 / 1e3);
  const sec = String(s).padStart(2, '0');
  if (!first && Sx.textContent !== sec && playing && s % 2 === 0) { tickAudio.currentTime = 0; tickAudio.play().catch(() => {}); }
  put(D, String(d).padStart(3, '0')); put(H, String(h).padStart(2, '0')); put(M, String(m).padStart(2, '0')); put(Sx, sec);
  last_p = pct / 100;                                   // la barra se llena con animación tras la entrada
  if (ready) prog.style.setProperty('--p', last_p);
  pText.textContent = pct.toFixed(2) + '%';
  el('progLeft').textContent = left ? `Faltan ${pl(d, 'día', 'días')}, ${h} h y ${m} min` : '¡Es hoy!';
  el('progNote').textContent = `Progreso desde el anuncio (${fmtDate.format(START)}) hasta el lanzamiento.`;
  $('.track').setAttribute('aria-valuenow', pct.toFixed(2));
  if (left === 0 && !done) launch();
  first = false;
  if (!done) setTimeout(tick, 1000 - Date.now() % 1000 + 5);
}

function launch() {
  done = true; body.classList.add('launched');
  document.title = 'WELCOME TO LEONIDA | Grand Theft Auto VI';
  const run = () => {
    if (reduced()) return;
    const f = document.createElement('div'); f.className = 'flash'; body.append(f); setTimeout(() => f.remove(), 1700);
    burst(); setTimeout(burst, 700); setTimeout(burst, 1500);
  };
  setTimeout(run, first ? 2600 : 300);
}

/* ===== FONDOS ROTATIVOS (solo carga la imagen que toca) ===== */
const bg = el('bg'), L = [0, 1].map(() => { const d = document.createElement('div'); d.className = 'bg-slide'; bg.append(d); return d; });
let si = -1, sf = 0;
function nextSlide() {
  si = (si + 1) % CONFIG.slides.length;
  const src = CONFIG.slides[si], im = new Image();
  im.onload = () => {
    const a = L[sf], b = L[sf ^ 1];
    a.style.backgroundImage = `url(${src})`; a.classList.remove('on', 'kb'); void a.offsetWidth; a.classList.add('on', 'kb'); b.classList.remove('on'); sf ^= 1;
  };
  im.src = src;
}
nextSlide(); setInterval(() => { if (!document.hidden) nextSlide(); }, CONFIG.slideMs);

/* ===== SKYLINE PROCEDURAL ===== */
(() => {
  let x = 0, d = '', w = '', r = 7; const rnd = () => (r = r * 16807 % 2147483647) / 2147483647;
  while (x < 1600) {
    const bw = 26 + rnd() * 56 | 0, bh = 40 + rnd() * (rnd() > .8 ? 150 : 90) | 0;
    d += `M${x} 200V${200 - bh}h${bw}V200Z`;
    for (let y = 200 - bh + 10; y < 190; y += 14) for (let k = x + 6; k < x + bw - 6; k += 11) if (rnd() > .74) w += `M${k} ${y}h4v5h-4Z`;
    x += bw + (rnd() * 6 | 0);
  }
  el('sky').innerHTML = `<path d="${d}" fill="var(--sky)"/><path d="${w}" fill="var(--c3)" opacity=".7"/>`;
})();

/* ===== PARTÍCULAS (canvas, pausa si la pestaña está oculta) ===== */
const cv = el('fx'), cx = cv.getContext('2d');
let W = 0, Hh = 0, A = [], B = [], col = ['#fff'], raf = 0, last = 0;
function size() { const d = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; Hh = innerHeight; cv.width = W * d; cv.height = Hh * d; cx.setTransform(d, 0, 0, d, 0, 0); }
function colors() { const c = getComputedStyle(root); col = ['--c1', '--c3', '--c4'].map(v => c.getPropertyValue(v).trim()); }
const mk = () => ({ x: Math.random() * W, y: Math.random() * Hh, r: .8 + Math.random() * 2, vy: -(.12 + Math.random() * .4), vx: (Math.random() - .5) * .25, p: Math.random() * 6.28, c: col[Math.random() * 3 | 0] });
function seed() {
  const n = reduced() ? 0 : Math.round(CONFIG.particles[S.fx] * (W < 700 ? .5 : 1));
  while (A.length < n) A.push(mk()); A.length = n; if (!n) cx.clearRect(0, 0, W, Hh);
}
function burst() {
  if (reduced() || S.fx === 'off') return;
  const n = S.fx === 'low' ? 60 : 130;
  for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = 2 + Math.random() * 6; B.push({ x: W / 2, y: Hh * .42, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, r: 1.5 + Math.random() * 2.5, life: 1, c: col[Math.random() * 3 | 0] }); }
  loop();
}
function frame(t) {
  raf = 0;
  if (document.hidden || (!A.length && !B.length)) { cx.clearRect(0, 0, W, Hh); return; }
  const dt = Math.min(2, (t - last) / 16.7 || 1); last = t;
  cx.clearRect(0, 0, W, Hh);
  for (const p of A) {
    p.x += p.vx * dt + Math.sin(t / 2000 + p.p) * .15; p.y += p.vy * dt;
    if (p.y < -10) { p.y = Hh + 10; p.x = Math.random() * W; } if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
    cx.globalAlpha = .25 + .45 * Math.abs(Math.sin(t / 900 + p.p)); cx.fillStyle = p.c;
    cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill();
    if (S.fx === 'high') { cx.globalAlpha *= .22; cx.beginPath(); cx.arc(p.x, p.y, p.r * 4, 0, 6.28); cx.fill(); }
  }
  B = B.filter(p => p.life > 0);
  for (const p of B) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += .12 * dt; p.vx *= .99; p.life -= .011 * dt; cx.globalAlpha = Math.max(0, p.life); cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill(); }
  raf = requestAnimationFrame(frame);
}
function loop() { if (!raf) raf = requestAnimationFrame(frame); }
document.addEventListener('visibilitychange', () => { if (!document.hidden) loop(); });
addEventListener('resize', () => { size(); seed(); }, { passive: true });

/* ===== PARALLAX SUTIL (ratón; no en táctil ni con movimiento reducido) ===== */
let pq = 0, px = 0, py = 0;
addEventListener('pointermove', e => {
  if (reduced() || e.pointerType === 'touch') return;
  px = e.clientX / innerWidth - .5; py = e.clientY / innerHeight - .5;
  if (!pq) pq = requestAnimationFrame(() => { root.style.setProperty('--mx', px.toFixed(3)); root.style.setProperty('--my', py.toFixed(3)); pq = 0; });
}, { passive: true });

/* ===== AUDIO ===== */
const sBtn = el('soundToggle'), sIc = $('.sound-icon', sBtn), sLb = $('.sound-label', sBtn);
sBtn.addEventListener('click', () => {
  if (playing) { bgAudio.pause(); playing = false; sIc.textContent = '🔇'; sLb.textContent = 'Audio apagado'; }
  else bgAudio.play().then(() => { playing = true; sIc.textContent = '🔊'; sLb.textContent = 'Audio encendido'; }).catch(() => {});
});

/* ===== MENÚ, CABECERA Y SCROLLSPY ===== */
const mt = el('menuToggle'), nav = el('siteNav'), hdr = el('hdr'), links = $$('.nav-link');
mt.addEventListener('click', () => { nav.classList.toggle('active'); mt.classList.toggle('open'); });
links.forEach(a => a.addEventListener('click', () => { nav.classList.remove('active'); mt.classList.remove('open'); }));
addEventListener('scroll', () => hdr.classList.toggle('solid', scrollY > 50), { passive: true });
const spy = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id))), { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => spy.observe(s));

/* ===== GALERÍA + LIGHTBOX ===== */
const mosaic = el('mosaic');
CONFIG.gallery.forEach(([n, t], i) => {
  const b = document.createElement('button'); b.className = 'g rv'; b.setAttribute('aria-label', 'Ampliar: ' + t);
  b.innerHTML = `<img src="assets/images/opt/${n}-sm.webp" alt="${t}" loading="lazy" width="720" height="405"><span>${t}</span>`;
  b.addEventListener('click', () => openLb(i)); mosaic.append(b);
});
const lb = el('lightboxModal'), lbi = el('lightboxImg'); let li = 0;
function showLb(i) { li = (i + CONFIG.gallery.length) % CONFIG.gallery.length; const [n, t] = CONFIG.gallery[li]; lbi.classList.remove('zoomed'); lbi.src = `assets/images/opt/${n}.webp`; lbi.alt = t; el('lbCount').textContent = `${li + 1} / ${CONFIG.gallery.length} · ${t}`; }
const openLb = i => { lb.classList.add('active'); showLb(i); };
const closeLb = () => { lb.classList.remove('active'); lbi.classList.remove('zoomed'); };
lbi.addEventListener('click', e => { e.stopPropagation(); lbi.classList.toggle('zoomed'); });
el('lightboxClose').addEventListener('click', closeLb);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
el('lbPrev').addEventListener('click', e => { e.stopPropagation(); showLb(li - 1); });
el('lbNext').addEventListener('click', e => { e.stopPropagation(); showLb(li + 1); });
addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLb(); togglePanel(false); }
  if (lb.classList.contains('active')) { if (e.key === 'ArrowLeft') showLb(li - 1); if (e.key === 'ArrowRight') showLb(li + 1); }
});

/* ===== REVELADO AL HACER SCROLL ===== */
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { threshold: .12 });
$$('.rv').forEach(n => rv.observe(n));

/* ===== ARRANQUE ===== */
size(); apply(); tick();
})();
