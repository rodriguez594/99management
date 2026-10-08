document.documentElement.classList.remove('no-js');

// Set to true when the artist campaign goes live.
var CAMPAIGN_ON = false;

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
    'family.wrld': 'Tøjmærke',
    'family.wrld1': 'Egne designs, produceret på bestilling',
    'contact.email': 'E-mail',
    'campaign.tag': 'Vi signer nu',
    'campaign.text': 'Vi leder efter nye kunstnere.',
    'campaign.cta': 'Ansøg',
    'signing.title': 'Bliv en del af 99MGMT',
    'signing.p1': 'Vi signer vores første kunstnere. I en introduktionsperiode dækker vi omkostningerne ved at få din musik ud. Til gengæld tager vi en andel af din indtjening. Vilkårene aftales med hver enkelt kunstner.',
    'signing.l1': 'Distribution af dine udgivelser',
    'signing.l2': 'Promovering og udgivelsesplanlægning',
    'signing.l3': 'Daglig management',
    'signing.cta': 'Ansøg nu',
    'apply.title': 'Ansøg hos 99MGMT',
    'apply.intro': 'Vi dækker omkostningerne i en introduktionsperiode. Til gengæld tager vi en andel af din indtjening. Vilkårene aftales med hver enkelt kunstner.',
    'apply.name': 'Dit navn',
    'apply.artist': 'Kunstnernavn',
    'apply.email': 'E-mail',
    'apply.socials': 'Instagram / TikTok',
    'apply.music': 'Link til din musik',
    'apply.about': 'Om dig',
    'apply.submit': 'Send ansøgning',
    'apply.note': 'Dette åbner din mailapp med ansøgningen udfyldt. Du kan også skrive til os på Instagram:',
    'footer.part': ', en del af 99',
    'footer.top': 'Til toppen'
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var descMeta = document.querySelector('meta[name="description"]');
  var en = { 'meta.title': document.title, 'meta.description': descMeta.content };
  nodes.forEach(function (el) { en[el.dataset.i18n] = el.textContent; });
  var flag = document.querySelector('.flag');
  var current = 'en';

  function setLang(lang) {
    var dict = lang === 'da' ? da : en;
    nodes.forEach(function (el) {
      var t = dict[el.dataset.i18n];
      if (t != null) el.textContent = t;
    });
    document.title = dict['meta.title'];
    descMeta.content = dict['meta.description'];
    document.documentElement.lang = lang;
    flag.dataset.lang = lang;
    flag.setAttribute('aria-label', lang === 'da' ? 'Switch to English' : 'Skift til dansk');
    current = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  flag.addEventListener('click', function () {
    setLang(current === 'da' ? 'en' : 'da');
  });

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  if (saved === 'da') setLang('da');

  // Artist campaign
  if (CAMPAIGN_ON || /[?&]campaign\b/.test(location.search)) {
    document.querySelectorAll('[data-campaign]').forEach(function (el) { el.hidden = false; });
    document.querySelector('.hero__scroll').setAttribute('href', '#signing');
  }

  // Application form: composes an email to 99MGMT
  var dialog = document.getElementById('apply');
  var form = document.getElementById('apply-form');
  document.querySelectorAll('[data-apply]').forEach(function (b) {
    b.addEventListener('click', function () { dialog.showModal(); });
  });
  dialog.querySelector('.apply__close').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var body = [
      'Name: ' + f.name.value,
      'Artist name: ' + f.artist.value,
      'Email: ' + f.email.value,
      'Instagram / TikTok: ' + f.socials.value,
      'Music: ' + f.music.value,
      '',
      f.about.value
    ].join('\n');
    location.href = 'mailto:99mgmt1@gmail.com'
      + '?subject=' + encodeURIComponent('Artist application: ' + f.artist.value)
      + '&body=' + encodeURIComponent(body);
  });
})();
