document.documentElement.classList.remove('no-js');

(function () {
  var nav = document.getElementById('nav');
  var toggle = nav.querySelector('.nav__toggle');

  // Solid nav background after scrolling past the top
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });
  nav.querySelectorAll('.nav__links a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // Reveal elements as they enter the viewport
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // Language switch. English text lives in the HTML; Danish is defined here.
  var da = {
    'meta.title': '99MGMT | Artist management',
    'meta.description': '99MGMT er et artist management-selskab, der står for management, distribution og promovering. En del af 99.',
    'nav.about': 'Om os',
    'nav.services': 'Ydelser',
    'nav.roster': 'Roster',
    'nav.contact': 'Kontakt',
    'hero.title': 'Management for kunstnere, skabere & talenter.',
    'hero.meta': 'København',
    'hero.scroll': 'Scroll',
    'about.p1': '99MGMT er management-selskabet under 99. Vi arbejder med et lille roster af kunstnere, så hver enkelt får den opmærksomhed, de har brug for.',
    'about.p2': 'Vi tager os af forretningen: management, distribution, promovering og samarbejder. Video- og musikproduktion står vores søsterselskab 99ENT for.',
    's1.t': 'Artist management',
    's1.d': 'Daglig management, karriereplanlægning og langsigtet strategi.',
    's2.t': 'Distribution',
    's2.d': 'Udgivelser leveret til streamingtjenester og butikker, inklusive registrering og metadata.',
    's3.t': 'Promovering',
    's3.d': 'Udgivelseskampagner, playlist-pitching, presse og sociale medier.',
    's4.t': 'Samarbejder & bookinger',
    's4.d': 'Brandsamarbejder, koncerter og optrædener.',
    'role.artist': 'Kunstner',
    'family.label': 'En del af 99',
    'family.here': 'Denne side',
    'family.mgmt': 'Artist management',
    'family.mgmt1': 'Management og karrierestrategi',
    'family.mgmt3': 'Promovering',
    'family.mgmt4': 'Samarbejder og bookinger',
    'family.sister': 'Søsterselskab',
    'family.ent': 'Video- og musikproduktion',
    'family.ent1': 'Musikvideoer',
    'family.ent2': 'Promovideoer',
    'family.ent3': 'Musikproduktion',
    'family.ent4': 'Mix og mastering',
    'family.soon': 'Kommer snart',
    'family.wrld': 'Venter på sit første projekt.',
    'contact.email': 'E-mail',
    'footer.part': ', en del af 99',
    'footer.top': 'Til toppen'
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var descMeta = document.querySelector('meta[name="description"]');
  var en = { 'meta.title': document.title, 'meta.description': descMeta.content };
  nodes.forEach(function (el) { en[el.dataset.i18n] = el.textContent; });
  var langButtons = document.querySelectorAll('.lang button');

  function setLang(lang) {
    var dict = lang === 'da' ? da : en;
    nodes.forEach(function (el) {
      var t = dict[el.dataset.i18n];
      if (t != null) el.textContent = t;
    });
    document.title = dict['meta.title'];
    descMeta.content = dict['meta.description'];
    document.documentElement.lang = lang;
    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  langButtons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved === 'da') setLang('da');
})();
