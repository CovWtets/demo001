// Navigation
const nav = document.getElementById('nav');
const navPruefen = () => nav.classList.toggle('scrolled', scrollY > 30);
addEventListener('scroll', navPruefen, { passive: true }); navPruefen();

const burger = document.getElementById('burger'), menu = document.getElementById('menu');
const menuSetzen = offen => {
  menu.classList.toggle('open', offen);
  nav.classList.toggle('menu-open', offen);
  burger.setAttribute('aria-expanded', offen);
  const [a, b] = burger.children;
  a.style.transform = offen ? 'translateY(3px) rotate(45deg)' : '';
  b.style.transform = offen ? 'translateY(-3px) rotate(-45deg)' : '';
  document.body.style.overflow = offen ? 'hidden' : '';
};
burger.addEventListener('click', () => menuSetzen(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menuSetzen(false)));

// Dropdown per Klick (Touch)
document.querySelectorAll('.dd-btn').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation(); b.parentElement.classList.toggle('open');
}));
document.addEventListener('click', () => document.querySelectorAll('.dd.open').forEach(d => d.classList.remove('open')));

// Galerie-Filter
const filter = document.getElementById('filters');
if (filter) filter.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  filter.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
  document.querySelectorAll('#gallery figure').forEach(f => f.classList.toggle('hide', b.dataset.f !== 'all' && f.dataset.c !== b.dataset.f));
});

// Zeitleiste: Schritt wird beim Scrollen aktiv
const tio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }), { rootMargin: '0px 0px -45% 0px' });
document.querySelectorAll('.timeline li').forEach(li => tio.observe(li));

// Einblenden beim Scrollen
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Ablauf-Karten: Pfeile scrollen um eine Karte
const p3 = document.getElementById('p3');
document.querySelectorAll('.p3-btn').forEach(b => b.addEventListener('click', () => {
  const w = p3.querySelector('li').offsetWidth + 16;
  p3.scrollBy({ left: w * Number(b.dataset.dir), behavior: 'smooth' });
}));

