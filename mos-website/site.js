// The website's program — pricing data, the section reveals, the nav and
// the forms.
//
// A separate file rather than an inline block at the end of index.html, so
// the page still works under a strict `script-src 'self'` policy. Inline
// script is blocked by such a policy, and a blocked page still returns 200
// and still paints — so the only symptom would be a brochure whose buttons
// quietly do nothing. Keep it a file.
(function(){
"use strict";

/* =====================================================================
   STANDALONE — no connection to the MOS platform
   =====================================================================
   This file used to carry an APP_URL constant and a wireAppLinks() pass
   that filled in Client sign in, Staff sign in, the Arcade and an "Open
   your client page" card. All of it is gone, on purpose. This folder is
   the public brochure: it knows no address, no path and no shared code
   belonging to the app, and a visitor cannot reach the app from it.

   If a portal link is ever wanted back, add it as ONE absolute
   https:// URL written in full — never a relative path like '/?client',
   which only works when the site and the app sit on the same domain, and
   putting them on the same domain is the thing this separation exists to
   undo. Same domain means a shared browser origin: shared localStorage,
   shared cookies and a service worker from one able to intercept the
   other. Keep the brochure on its own domain.

   Nothing below talks to anything outside this folder. There is no
   fetch(), no API call, no third-party script and no analytics.
===================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =====================================================================
   CONTENT + PRICING DATA
   Everything a non-developer would want to change lives here, at the top,
   rather than being buried in markup further down. The sections that use
   it render themselves from these objects.
===================================================================== */

/* Sample data for the hero console demo. Not real telemetry — the panel is
   labelled "Demo" for exactly that reason. */
const CONSOLE_DEMO = {
  sites: [
    { host:'northgate-dental.com',    up:'99.98%', state:'ok',   plan:'Growth',  deploy:'4 days ago',  tickets:0, since:'Mar 2024',
      note:'Booking form submissions up 34% since launch.', dips:[] },
    { host:'harbourside-lets.co.uk',  up:'99.91%', state:'ok',   plan:'Managed', deploy:'yesterday',   tickets:1, since:'Nov 2023',
      note:'Brief provider blip on 12 Jul — 7 minutes, resolved.', dips:[9] },
    { host:'meadow-vets.com',         up:'—',      state:'warn', plan:'Growth',  deploy:'in progress', tickets:2, since:'Jun 2025',
      note:'New appointments module on staging, awaiting sign-off.', dips:[] },
    { host:'brightline-studio.com',   up:'99.99%', state:'ok',   plan:'Launch',  deploy:'3 weeks ago', tickets:0, since:'Feb 2025',
      note:'No incidents since go-live.', dips:[] }
  ],
  incidents: [
    { when:'12 Jul', what:'harbourside-lets.co.uk unreachable', meta:'Provider network fault · resolved in 7 min · no data loss', pill:'Closed', cls:'pill-muted' },
    { when:'02 Jul', what:'Certificate renewed automatically',  meta:'northgate-dental.com · 90-day cycle · no action needed',    pill:'Auto',   cls:'pill-ok' },
    { when:'28 Jun', what:'Slow response on contact form',      meta:'meadow-vets.com · mail relay throttling · relay swapped',   pill:'Closed', cls:'pill-muted' },
    { when:'21 Jun', what:'Dependency patch window',            meta:'All sites · 14 packages · staging verified first',          pill:'Done',   cls:'pill-ok' }
  ],
  invoices: [
    { when:'01 Aug', what:'Hosting & care — August',   meta:'4 sites · Growth ×2, Managed ×1, Launch ×1', pill:'Paid',    cls:'pill-ok' },
    { when:'01 Aug', what:'Content changes — July',    meta:'2.5 hrs over allowance · $162.50',            pill:'Due 15th',cls:'pill-warn' },
    { when:'01 Jul', what:'Hosting & care — July',     meta:'4 sites',                                     pill:'Paid',    cls:'pill-ok' },
    { when:'14 Jun', what:'Build — appointments module', meta:'Stage 2 of 3 · meadow-vets.com',            pill:'Paid',    cls:'pill-ok' }
  ]
};

/* Sample case studies. These are illustrative write-ups, badged "Sample" in
   the gallery so the page never reads as a claim about real clients —
   replace them as real projects ship, and drop the badge in workCardHtml. */
const WORK = [
  {
    id:'northgate', cat:'website', kind:'Website + booking', name:'Northgate Dental',
    glyph:'ND', hue:200,
    blurb:'A practice losing bookings to a phone line nobody answered at lunchtime.',
    problem:'Appointments could only be made by phone, and the phone was staffed by the same two people running reception. Roughly a third of calls went unanswered at peak times, and the old site was unreadable on a phone.',
    did:[
      'Rebuilt the site mobile-first, with treatment pages written around what patients search for',
      'Added a booking flow that writes straight into the existing practice diary',
      'Set up automated reminders to cut no-shows',
      'Migrated 40+ pages of legacy content, with redirects from every old URL'
    ],
    stats:[ {k:'Build time', v:'4 weeks'}, {k:'Bookings online', v:'61%'}, {k:'Plan', v:'Growth'} ],
    tech:['HTML/CSS','Vanilla JS','Node','SQLite','Nginx']
  },
  {
    id:'harbourside', cat:'platform', kind:'Platform · logins', name:'Harbourside Lets',
    glyph:'HL', hue:150,
    blurb:'Holiday-let management run out of three spreadsheets and a shared inbox.',
    problem:'Owners had no way to see their own bookings without emailing the office, and the office rekeyed every booking into a spreadsheet by hand. Double-bookings happened about once a month.',
    did:[
      'Built an owner portal with per-property access and a live calendar',
      'Replaced the spreadsheets with a single database and an audit trail',
      'Added role-based staff accounts so nobody shares a login any more',
      'Wired up automated statements, generated monthly instead of assembled by hand'
    ],
    stats:[ {k:'Build time', v:'9 weeks'}, {k:'Admin hours saved', v:'~12/wk'}, {k:'Plan', v:'Managed'} ],
    tech:['Node','Express','SQLite','Chart rendering','Role-based auth']
  },
  {
    id:'meadow', cat:'website', kind:'Website · rebuild', name:'Meadow Veterinary',
    glyph:'MV', hue:95,
    blurb:'An inherited site nobody could edit, on a platform nobody supported.',
    problem:'The original builder had gone quiet, the CMS licence had lapsed, and a simple opening-hours change needed a developer. Page speed scores were in the twenties on mobile.',
    did:[
      'Audited the existing build and advised rebuilding rather than adopting it',
      'Rebuilt with content the practice manager can edit directly',
      'Cut page weight by about 80% by dropping four unused frameworks',
      'Kept the URL structure identical so nothing lost its search position'
    ],
    stats:[ {k:'Build time', v:'3 weeks'}, {k:'Mobile speed', v:'24 → 96'}, {k:'Plan', v:'Growth'} ],
    tech:['Static build','Markdown content','Image pipeline','Nginx']
  },
  {
    id:'brightline', cat:'website', kind:'Website · brochure', name:'Brightline Studio',
    glyph:'BS', hue:35,
    blurb:'A portfolio that had to load fast on a building site, on bad signal.',
    problem:'A construction design studio whose clients browse from site offices and phones with one bar. The previous site was a heavy image gallery that frequently just never finished loading.',
    did:[
      'Designed around progressive image loading, with usable content before any photo arrives',
      'Built a case-study format the studio can fill in themselves',
      'Kept the whole first view under 60KB',
      'Added structured data so projects surface properly in search'
    ],
    stats:[ {k:'Build time', v:'2 weeks'}, {k:'First view', v:'58KB'}, {k:'Plan', v:'Launch'} ],
    tech:['Static build','Responsive images','Structured data']
  },
  {
    id:'ops', cat:'platform', kind:'Platform · internal tools', name:'Internal Ops Console',
    glyph:'OC', hue:265,
    blurb:'The system we run the business on — our own dogfood.',
    problem:'Running client sites out of a notes file and a calendar stopped scaling somewhere around the tenth site. Nothing had a status, and invoices were remembered rather than tracked.',
    did:[
      'Built a single console covering sites, tickets, incidents, invoices and appointments',
      'Added role-based access so support staff see tickets but not the accounts',
      'Gave every client a portal view of their own sites and nothing else',
      'Wired live chat onto tickets so a thread can become a conversation'
    ],
    stats:[ {k:'In use since', v:'2024'}, {k:'Modules', v:'14'}, {k:'Users', v:'Staff + clients'} ],
    tech:['Node','Express','SQLite','Role-based access','Service worker']
  },
  {
    id:'fieldworks', cat:'it', kind:'IT support · 22 staff', name:'Fieldworks Surveying',
    glyph:'FW', hue:15,
    blurb:'Twenty-two people, no IT person, and a different supplier for every problem.',
    problem:'Laptops were bought ad hoc, nobody knew which machines were still under warranty, and a failed drive in the survey team cost four days of work because the backup had quietly stopped running in March. Three separate suppliers each blamed one of the others.',
    did:[
      'Inventoried every machine, its age, its warranty and what was actually on it',
      'Put staff on their own ticket accounts instead of texting whoever answered',
      'Replaced the silent backup with a monitored one that alerts when it misses',
      'Standardised new-starter setup so a laptop is ready on day one, not day four'
    ],
    stats:[ {k:'Staff supported', v:'22'}, {k:'Suppliers', v:'3 → 1'}, {k:'Plan', v:'Enterprise'} ],
    tech:['Asset register','Ticketing','Monitored backups','Remote support']
  },
  {
    id:'arcade', cat:'app', kind:'Games · browser', name:'Browser Game Arcade',
    glyph:'AR', hue:320,
    blurb:'A dozen small browser games, built to prove interaction work.',
    problem:'Prospective clients kept asking whether we could do anything more interactive than a website. Describing it never landed as well as letting people play something.',
    did:[
      'Built a public arcade that needs no account and works on a phone',
      'Each game is self-contained — no framework, no build step, no tracking',
      'Added save state, achievements and difficulty progression',
      'Runs offline once loaded'
    ],
    stats:[ {k:'Games', v:'12'}, {k:'Dependencies', v:'0'}, {k:'Account needed', v:'No'} ],
    tech:['Canvas','Vanilla JS','Local storage','Service worker']
    // This used to carry a `live` link into the app's /arcade page. Removed
    // with the rest of the app links — the write-up stays, the door doesn't.
    // The `live` support still exists in openWork() below if a genuinely
    // public demo on its own address ever wants one; it takes a full
    // https:// URL, not a path.
  }
];

const WORK_FILTERS = [
  { id:'all',      label:'Everything' },
  { id:'website',  label:'Websites' },
  { id:'platform', label:'Platforms' },
  { id:'it',       label:'IT & repairs' },
  { id:'app',      label:'Games & apps' }
];

/* Detail behind each process step, shown in the panel under the timeline. */
const PROCESS = [
  {
    lede:'A call, then a short written brief. The goal is that nobody starts building until both sides can describe the finished thing in the same words.',
    you:['An hour for a call','Examples of sites you like and why','Who signs things off'],
    get:['Written brief and scope','Fixed quote, itemised','Rough schedule with dates'],
    dur:'3–5 days'
  },
  {
    lede:'Design and build happen on a staging link you can open any time. You see it going up, rather than getting one big reveal at the end.',
    you:['Feedback within a few days of each round','Content and images, or a decision to use placeholders','Answers on anything ambiguous'],
    get:['Staging link from week one','Two full rounds of design feedback','Every change tracked in writing'],
    dur:'2–10 weeks'
  },
  {
    lede:'Launch is a checklist, not a leap. Everything that can be verified before the switchover is verified before the switchover.',
    you:['Domain access, or permission to request it','A go-live date that suits you','Final content sign-off'],
    get:['DNS, SSL and redirects configured','Analytics and backups live before go-live','Rollback plan, tested'],
    dur:'1–3 days'
  },
  {
    lede:'After launch it becomes an ongoing plan: monitored, patched, backed up, and someone to ask when you want something changed.',
    you:['Tell us when something looks wrong','Requests by email or chat'],
    get:['A named person to talk to','Monitoring, patching and backups','Included change hours each month'],
    dur:'Ongoing'
  }
];

/* ---------- Small shared helpers ---------- */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, c => (
  { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
));
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>';

/* =====================================================================
   ENGLISH / FRENCH
   =====================================================================
   The page is written in English and translated at runtime. There is no
   second copy of the markup, no duplicated section, no /fr/ directory:
   one page, and a lookup table in i18n.js keyed by the English text
   itself. Three consequences worth knowing before touching any of it.

   1. The English in the markup is the source. A visitor with JavaScript
      off, or one who arrives before this file has parsed, gets the whole
      page in English rather than a blank one — and a crawler indexing it
      sees real text either way.

   2. A missing translation is a missing sentence, not a missing page.
      Anything the table doesn't know stays in English and the rest of
      the page still switches. That is why keys are English strings
      rather than codes like `hero.title`: a typo shows up as one English
      line among the French, which someone will notice, instead of as the
      word "hero.title" printed on the page, which nobody can read.

   3. Because keys are the English text, EDITING THE ENGLISH BREAKS THE
      MATCH. Change a sentence in index.html and its French entry stops
      applying. Open the page with ?i18n=check for a console report of
      every untranslated string and every dead key.

   Switching back to English is the part that needs care: the table only
   runs one way. So every text node keeps the English it started with on
   a `__en` property, and every pass translates from that rather than
   from whatever is on screen — which makes switching idempotent, and
   makes English a restore rather than a reverse lookup.
===================================================================== */
const LANG_KEY = 'mos_main_lang';
const DICT = window.MOS_I18N || {};
const LANG_BTN = window.MOS_LANG_BTN ||
  { en:{ label:'FR', title:'Français', aria:'Read this page in French' },
    fr:{ label:'EN', title:'English',  aria:'Lire cette page en anglais' } };
let LANG = 'en';

/* Attributes that hold prose. Everything else is left alone. */
const TR_ATTRS = ['placeholder','aria-label','title'];

const collapse = (s)=>String(s).replace(/\s+/g, ' ').trim();

/* Accent-blind, case-blind comparison, used by the two search boxes. A
   French page whose search only matches "sécurité" when you type the
   acute accent is a search box that looks broken to anyone typing fast. */
function fold(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/* For strings that live in code rather than in the markup. Placeholders
   are {named} so the French can put them in a different order. */
function t(en, vars){
  let s = (LANG === 'fr' && DICT[en] !== undefined) ? DICT[en] : en;
  if(vars) for(const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

/* One text node. Whitespace around the text is preserved rather than
   looked up — "<b>Note:</b> the rest" needs to keep the space after the
   bold tag, and no dictionary should have to carry it. */
function trNode(node){
  if(node.__en === undefined) node.__en = node.nodeValue;
  const src = node.__en;
  if(LANG !== 'fr'){
    if(node.nodeValue !== src) node.nodeValue = src;
    return;
  }
  const key = collapse(src);
  if(!key) return;
  const hit = DICT[key];
  if(hit === undefined) return;
  node.nodeValue = src.match(/^\s*/)[0] + hit + src.match(/\s*$/)[0];
}

function trAttrs(el){
  if(el.__enAttr === undefined){
    const cache = {};
    // data-i18n names a key to use instead of the element's own text.
    // One element on the page needs it; see the note in the markup.
    if(el.hasAttribute('data-i18n')) cache.text = el.getAttribute('data-i18n');
    TR_ATTRS.forEach(a=>{ if(el.hasAttribute(a)) cache[a] = el.getAttribute(a); });
    el.__enAttr = cache;
  }
  for(const a in el.__enAttr){
    if(a === 'text') continue;
    const src = el.__enAttr[a];
    const hit = LANG === 'fr' ? DICT[collapse(src)] : undefined;
    el.setAttribute(a, hit === undefined ? src : hit);
  }
  // An overridden element is translated as a whole, so its own text nodes
  // must not also be looked up by their English.
  if(el.__enAttr.text !== undefined){
    const hit = LANG === 'fr' ? DICT[el.__enAttr.text] : undefined;
    if(el.firstChild && el.firstChild.nodeType === 3){
      const n = el.firstChild;
      if(n.__en === undefined) n.__en = n.nodeValue;
      n.nodeValue = hit === undefined ? n.__en : hit;
    }
    return false;   // caller skips the subtree
  }
  return true;
}

/* Translate a subtree into the current language. Called on the whole page
   when the language changes, and on freshly rendered markup wherever this
   file writes innerHTML — new nodes have never been through a pass, so
   they arrive in English and need one. */
function tr(root){
  if(!root) return;
  const skip = new Set(['SCRIPT','STYLE','NOSCRIPT']);
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if(n.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
      // SVG carries no prose and its <title>/<path> are not ours to touch.
      if(skip.has(n.tagName) || n.hasAttribute('data-no-i18n') || (window.SVGElement && n instanceof SVGElement)){
        return NodeFilter.FILTER_REJECT;
      }
      return trAttrs(n) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  if(root.nodeType === 1 && !trAttrs(root)) return;
  let n;
  while((n = walk.nextNode())) if(n.nodeType === 3) trNode(n);
}

/* Writing a string that can change after load — a button that toggles
   between two labels, a price suffix — has to go through one of these
   rather than a plain assignment, or the next pass would translate from
   the label the element happened to start life with. */
function sayNode(node, en){ node.__en = en; node.nodeValue = en; trNode(node); }
function say(el, en){ el.textContent = en; sayNode(el.firstChild, en); }

/* =====================================================================
   /i18n
===================================================================== */

let toastTimer = null;
function toast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('show'), 2600);
}

/* Roving-tabindex keyboard handling, shared by the console tabs and the
   process timeline — arrow keys move, Home/End jump to the ends. */
function wireTablist(tabs, onSelect){
  tabs.forEach((tab, i)=>{
    tab.addEventListener('click', ()=>onSelect(i));
    tab.addEventListener('keydown', (e)=>{
      const last = tabs.length - 1;
      let next = null;
      if(e.key === 'ArrowRight' || e.key === 'ArrowDown') next = i === last ? 0 : i + 1;
      else if(e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i === 0 ? last : i - 1;
      else if(e.key === 'Home') next = 0;
      else if(e.key === 'End') next = last;
      if(next === null) return;
      e.preventDefault();
      onSelect(next);
      tabs[next].focus();
    });
  });
}

/* ---------- Theme toggle ----------
   Persisted under its own key, scoped to this site. */
const THEME_KEY = 'mos_main_theme';
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const SUN = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>';
const MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>';

function paintTheme(){
  const dark = root.getAttribute('data-dark') === 'true';
  themeIcon.innerHTML = dark ? SUN : MOON;
  themeBtn.setAttribute('aria-label', t(dark ? 'Switch to light theme' : 'Switch to dark theme'));
}
try{
  const saved = localStorage.getItem(THEME_KEY);
  if(saved) root.setAttribute('data-dark', saved);
  else if(window.matchMedia('(prefers-color-scheme: light)').matches) root.setAttribute('data-dark','false');
}catch(e){ /* private mode — just keep the default dark */ }
paintTheme();
themeBtn.addEventListener('click', ()=>{
  const next = root.getAttribute('data-dark') === 'true' ? 'false' : 'true';
  root.setAttribute('data-dark', next);
  try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
  paintTheme();
});

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', (e)=>{
  if(e.target.tagName === 'A'){
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded','false');
  }
});

/* ---------- Nav shadow + scroll progress ----------
   One rAF-throttled scroll listener for both, so we never do layout work
   more than once a frame. */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
let ticking = false;
function onScroll(){
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(()=>{
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    // Back-to-top rides the same handler rather than adding a second
    // scroll listener.
    const tt = document.getElementById('toTop');
    if(tt) tt.classList.toggle('show', y > 700);
    // Chapter ticks and the collapsed-width breadcrumb ride it too. Reads
    // cached offsets only — see measureChapters in the NAV v3 block.
    paintChapters(y);
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ---------- Scroll reveal ----------
   IntersectionObserver + a CSS class, rather than a scroll handler that
   measures every element — cheap, and it degrades to "everything visible"
   if IO is missing or the user asked for reduced motion. */
const revealables = document.querySelectorAll('.rv');
if(reduceMotion || !('IntersectionObserver' in window)){
  revealables.forEach(el=>el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      // Stagger siblings inside the same group so rows read as a wave,
      // capped so a long list never ends up with a sluggish final item.
      const group = el.parentElement;
      const peers = group ? [...group.children].filter(c=>c.classList.contains('rv')) : [el];
      const idx = peers.indexOf(el);
      el.style.transitionDelay = Math.min(idx < 0 ? 0 : idx, 6) * 70 + 'ms';
      el.classList.add('in');
      io.unobserve(el);
    });
  }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
  revealables.forEach(el=>io.observe(el));
}

/* ---------- Count-up stats in the hero console ---------- */
function countUp(el){
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.dec || '0', 10);
  const suffix = el.dataset.suffix || '';
  if(reduceMotion){ el.textContent = target.toFixed(dec) + suffix; return; }
  const dur = 1100, t0 = performance.now();
  function frame(now){
    const p = Math.min((now - t0) / dur, 1);
    // easeOutCubic — fast start, gentle settle
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(dec) + suffix;
    if(p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
const counters = document.querySelectorAll('[data-count]');
if('IntersectionObserver' in window){
  const cio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } });
  }, { threshold:0.5 });
  counters.forEach(el=>cio.observe(el));
} else {
  counters.forEach(countUp);
}

/* ---------- Console sparkline ----------
   Purely decorative texture for the hero panel. Values are generated, not
   measured — the panel is aria-hidden precisely so this is never mistaken
   for real telemetry. */
const spark = document.getElementById('spark');
if(spark){
  const BARS = 28;
  for(let i=0;i<BARS;i++){
    const bar = document.createElement('i');
    bar.style.height = (55 + Math.random()*45) + '%';
    spark.appendChild(bar);
  }
  if(!reduceMotion){
    let sparkTimer = null;
    const tick = ()=>{
      const bars = spark.children;
      const i = Math.floor(Math.random()*bars.length);
      bars[i].style.height = (55 + Math.random()*45) + '%';
    };
    // Only animate while the panel is on screen, so a backgrounded tab
    // isn't burning frames on decoration.
    if('IntersectionObserver' in window){
      new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting && !sparkTimer) sparkTimer = setInterval(tick, 900);
          else if(!e.isIntersecting && sparkTimer){ clearInterval(sparkTimer); sparkTimer = null; }
        });
      }, { threshold:0.1 }).observe(spark);
    } else {
      sparkTimer = setInterval(tick, 900);
    }
  }
}

/* ---------- Hero console: tabs + expandable site rows ----------
   Rendered from CONSOLE_DEMO rather than written into the markup, so the
   three panels and the sample data stay in one place. */
function sparkBars(dips){
  let out = '';
  for(let i=0;i<24;i++){
    const dip = dips.includes(i);
    out += `<i class="${dip ? 'dip' : ''}" style="height:${dip ? 22 : 60 + Math.round(Math.random()*40)}%"></i>`;
  }
  return out;
}

function renderConsole(){
  const sites = document.getElementById('panelSites');
  sites.innerHTML = CONSOLE_DEMO.sites.map((s, i)=>`
    <button class="console-row" type="button" aria-expanded="false" aria-controls="siteDetail${i}" data-site="${i}">
      <span class="nm">${esc(s.host)}</span>
      <span class="mt">${esc(s.state === 'warn' ? 'deploying' : s.up)}</span>
      <span class="pill ${s.state === 'warn' ? 'pill-warn' : 'pill-ok'}">${s.state === 'warn' ? 'Staging' : 'Up'}</span>
      <span class="chev" aria-hidden="true"></span>
    </button>
    <div class="console-detail" id="siteDetail${i}" hidden>
      <div class="cd-bars" aria-hidden="true">${sparkBars(s.dips)}</div>
      <div class="cd-grid">
        <div><span>Plan</span><b>${esc(s.plan)}</b></div>
        <div><span>Last deploy</span><b>${esc(s.deploy)}</b></div>
        <div><span>Open tickets</span><b>${s.tickets}</b></div>
        <div><span>Client since</span><b>${esc(s.since)}</b></div>
      </div>
      <p class="cd-note">${esc(s.note)}</p>
    </div>
  `).join('');

  const logRow = (r) => `
    <div class="log-row">
      <span class="when">${esc(r.when)}</span>
      <span class="what">${esc(r.what)}<em>${esc(r.meta)}</em></span>
      <span class="pill ${r.cls}">${esc(r.pill)}</span>
    </div>`;
  document.getElementById('panelIncidents').innerHTML = CONSOLE_DEMO.incidents.map(logRow).join('');
  document.getElementById('panelInvoices').innerHTML  = CONSOLE_DEMO.invoices.map(logRow).join('');

  // Rows expand one at a time — the panel is short, and leaving several open
  // pushes the sparkline off the bottom of the card.
  sites.addEventListener('click', (e)=>{
    const btn = e.target.closest('.console-row');
    if(!btn) return;
    const detail = document.getElementById(btn.getAttribute('aria-controls'));
    const open = btn.getAttribute('aria-expanded') === 'true';
    $$('.console-row', sites).forEach(b=>{
      b.setAttribute('aria-expanded','false');
      document.getElementById(b.getAttribute('aria-controls')).hidden = true;
    });
    if(!open){ btn.setAttribute('aria-expanded','true'); detail.hidden = false; }
  });
}
renderConsole();

const consoleTabs = ['tabSites','tabIncidents','tabInvoices'].map(id=>document.getElementById(id));
const consolePanels = ['panelSites','panelIncidents','panelInvoices'].map(id=>document.getElementById(id));
wireTablist(consoleTabs, (i)=>{
  consoleTabs.forEach((tab, n)=>{
    tab.setAttribute('aria-selected', String(n === i));
    tab.tabIndex = n === i ? 0 : -1;
  });
  consolePanels.forEach((p, n)=>{ p.hidden = n !== i; });
});

/* ---------- Service cards: "Details" toggle ----------
   Delegated, so the cards need no per-card wiring. */
document.addEventListener('click', (e)=>{
  const btn = e.target.closest('.card-more');
  if(!btn) return;
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!open));
  panel.hidden = open;
  sayNode(btn.firstChild, open ? 'Details' : 'Less');
});

/* ---------- Work gallery + case-study modal ---------- */
const workGrid = document.getElementById('workGrid');
const workFilters = document.getElementById('workFilters');

function workCardHtml(p){
  // The "Sample" badge is deliberate — see the WORK comment above. Remove it
  // here once these are real projects.
  return `
    <button class="work-card" type="button" data-work="${p.id}" data-cat="${p.cat}">
      <span class="work-thumb" style="background:linear-gradient(140deg,
        hsl(${p.hue} 45% 22% / .9), hsl(${(p.hue + 40) % 360} 40% 12% / .95));
        color:hsl(${p.hue} 70% 78%);">
        <span class="glyph">${esc(p.glyph)}</span>
        <span class="sample">Sample</span>
      </span>
      <span class="work-body">
        <span class="work-kind">${esc(p.kind)}</span>
        <span class="wt">${esc(p.name)}</span>
        <span class="wp">${esc(p.blurb)}</span>
        <span class="work-meta">${p.stats.slice(0,2).map(s=>
          // Label and value in their own elements rather than one string:
          // the translation table keys on whole text nodes, and
          // "Build time 4 weeks" as a single node would need an entry per
          // combination instead of one for each half. .chip is an
          // inline-flex with gap:5px, so the two read as one chip either
          // way.
          `<span class="chip"><span>${esc(s.k)}</span><span>${esc(s.v)}</span></span>`).join('')}</span>
        <span class="work-open">Read the write-up <span class="arw" aria-hidden="true">→</span></span>
      </span>
    </button>`;
}
workGrid.innerHTML = WORK.map(workCardHtml).join('') +
  '<p class="empty-state" id="workEmpty" hidden>Nothing in that category yet.</p>';

workFilters.innerHTML = WORK_FILTERS.map((f, i)=>{
  const n = f.id === 'all' ? WORK.length : WORK.filter(w=>w.cat === f.id).length;
  return `<button class="filter" type="button" data-filter="${f.id}" aria-pressed="${i === 0}">${esc(f.label)}<span class="n">${n}</span></button>`;
}).join('');

workFilters.addEventListener('click', (e)=>{
  const btn = e.target.closest('.filter');
  if(!btn) return;
  const cat = btn.dataset.filter;
  $$('.filter', workFilters).forEach(b=>b.setAttribute('aria-pressed', String(b === btn)));
  let shown = 0;
  $$('.work-card', workGrid).forEach(card=>{
    const match = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('hide', !match);
    if(match) shown++;
  });
  document.getElementById('workEmpty').hidden = shown > 0;
});

/* ---------- Process step lighting ----------
   Lights each step as it scrolls into view, so the timeline reads left to
   right rather than all at once. */
const steps = document.querySelectorAll('.step');
if(steps.length && 'IntersectionObserver' in window && !reduceMotion){
  const sio = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('lit'); sio.unobserve(e.target); } });
  }, { threshold:0.45 });
  steps.forEach(s=>sio.observe(s));
} else {
  steps.forEach(s=>s.classList.add('lit'));
}

/* ---------- Case-study modal ----------
   One dialog reused for every project. Focus goes to the close button on
   open and back to the card that opened it on close, and Tab is kept inside
   the panel while it's up.

   `p.live` is optional and no entry ships with one. If you ever add it, it
   must be a full https:// URL to something genuinely public — not a path,
   and never a link into the MOS platform. */
const wm = document.getElementById('workModal');
const wmBody = document.getElementById('workModalBody');
const wmClose = document.getElementById('workModalClose');
let wmLastFocus = null;

function openWork(id){
  const p = WORK.find(w=>w.id === id);
  if(!p) return;
  wmLastFocus = document.activeElement;
  // Both go through the dictionary, which is how the two descriptive
  // project names translate while the client names — not in the table —
  // come through untouched.
  say(document.getElementById('workModalKind'), p.kind);
  say(document.getElementById('workModalTitle'), p.name);
  wmBody.innerHTML = `
    <div class="ms-stats">
      ${p.stats.map(s=>`<div class="ms-stat"><span>${esc(s.k)}</span><b>${esc(s.v)}</b></div>`).join('')}
    </div>
    <div class="ms-block"><h4>The problem</h4><p>${esc(p.problem)}</p></div>
    <div class="ms-block"><h4>What we did</h4>
      <ul>${p.did.map(d=>`<li>${TICK}${esc(d)}</li>`).join('')}</ul>
    </div>
    <div class="ms-block"><h4>Built with</h4>
      <div class="work-meta">${p.tech.map(x=>`<span class="chip chip-accent">${esc(x)}</span>`).join('')}</div>
    </div>
    <div class="modal-cta">
      ${p.live ? `<a class="btn btn-primary" href="${esc(p.live.href)}" target="_blank" rel="noopener noreferrer">${esc(p.live.label)}</a>` : ''}
      <a class="btn${p.live ? '' : ' btn-primary'}" href="#contact" data-close-modal>Start something similar</a>
    </div>`;
  tr(wmBody);
  wm.hidden = false;
  document.body.style.overflow = 'hidden';
  wmClose.focus();
}
function closeWork(){
  wm.hidden = true;
  document.body.style.overflow = '';
  if(wmLastFocus) wmLastFocus.focus();
}
workGrid.addEventListener('click', (e)=>{
  const card = e.target.closest('.work-card');
  if(card) openWork(card.dataset.work);
});
wmClose.addEventListener('click', closeWork);
document.getElementById('workModalBack').addEventListener('click', closeWork);
wm.addEventListener('click', (e)=>{ if(e.target.closest('[data-close-modal]')) closeWork(); });
document.addEventListener('keydown', (e)=>{
  if(wm.hidden) return;
  if(e.key === 'Escape'){ closeWork(); return; }
  if(e.key !== 'Tab') return;
  const focusables = $$('a[href], button:not([disabled])', wm).filter(el=>el.offsetParent !== null);
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});

/* ---------- Process explorer ----------
   The timeline doubles as a tablist: clicking a stage swaps the panel below
   it instead of expanding inline, so the page length never changes. */
const stepTabs = $$('.step-btn');
const stepPanel = document.getElementById('stepPanel');
function showStep(i){
  const d = PROCESS[i];
  stepTabs.forEach((tab, n)=>{
    tab.setAttribute('aria-selected', String(n === i));
    tab.tabIndex = n === i ? 0 : -1;
  });
  stepPanel.setAttribute('aria-labelledby', 'stepTab' + i);
  stepPanel.innerHTML = `
    <div>
      <h4>In this stage</h4>
      <p>${esc(d.lede)}</p>
      <span class="step-dur">Typically <b>${esc(d.dur)}</b></span>
    </div>
    <div>
      <h4>What we need from you</h4>
      <ul>${d.you.map(x=>`<li>${TICK}${esc(x)}</li>`).join('')}</ul>
    </div>
    <div>
      <h4>What you get</h4>
      <ul>${d.get.map(x=>`<li>${TICK}${esc(x)}</li>`).join('')}</ul>
    </div>`;
  tr(stepPanel);
  if(!reduceMotion){
    // v2 flips the panel in on the X axis instead of sliding it — see
    // .flip-swap in the 3D block.
    stepPanel.classList.remove('flip-swap');
    void stepPanel.offsetWidth;   // restart the animation
    stepPanel.classList.add('flip-swap');
  }
}
wireTablist(stepTabs, showStep);
showStep(0);

/* ---------- Pricing monthly / annual toggle ---------- */
const bm = document.getElementById('billMonthly');
const ba = document.getElementById('billAnnual');
/* Canadian French writes the sign after the number with a space between:
   "29 $", not "$29". Every figure the toggle writes goes through here, and
   the fixed ones in the markup have their own dictionary entries. */
function money(n){ return LANG === 'fr' ? n + ' $' : '$' + n; }
let billingAnnual = false;
function setBilling(annual){
  billingAnnual = annual;
  bm.classList.toggle('on', !annual);
  ba.classList.toggle('on', annual);
  bm.setAttribute('aria-pressed', String(!annual));
  ba.setAttribute('aria-pressed', String(annual));
  document.querySelectorAll('.tier .num').forEach(el=>{
    el.textContent = money(annual ? el.dataset.a : el.dataset.m);
  });
  document.querySelectorAll('.tier .per').forEach(el=>{
    say(el, annual ? '/month, billed yearly' : '/month');
  });
}
bm.addEventListener('click', ()=>setBilling(false));
ba.addEventListener('click', ()=>setBilling(true));
// Run once so the figures on screen come from money() rather than from the
// literals in the markup — otherwise the prices keep an English "$29" until
// somebody happens to touch the toggle. The markup keeps its literals for
// the no-JavaScript case, where English is the right answer anyway.
setBilling(false);

/* ---------- FAQ search + expand all ---------- */
const faqSearch = document.getElementById('faqSearch');
const faqItems = $$('details.qa');
const faqCount = document.getElementById('faqCount');
const faqToggleAll = document.getElementById('faqToggleAll');

// The pristine English, captured before any translation pass has run.
// Two jobs: repeated searches highlight from a clean copy rather than
// compounding <mark> tags into each other, and every pass through the
// filter rebuilds from English and re-translates — which is what stops a
// search performed in French from leaving French text cached as though it
// were the original.
const faqOriginal = faqItems.map(d=>({
  q: $('summary', d).textContent,
  a: $('.qa-body', d).innerHTML
}));

function filterFaq(){
  const raw = faqSearch.value.trim();
  const term = fold(raw);
  let shown = 0;
  faqItems.forEach((d, i)=>{
    const sum = $('summary', d), body = $('.qa-body', d);
    // Back to English, then forward into whichever language is showing:
    // one path, whatever the last search did and whichever way the
    // language was switched since.
    sum.textContent = faqOriginal[i].q;
    body.innerHTML = faqOriginal[i].a;
    tr(d);

    const shown_q = sum.textContent;
    const hit = !term || fold(shown_q + ' ' + body.textContent).includes(term);
    d.classList.toggle('hide', !hit);
    if(hit) shown++;

    if(!term){
      d.open = false;
    } else if(hit){
      // Marked on the raw query, not the folded one: an accent-blind match
      // still finds the question, it just doesn't highlight inside a word
      // the visitor spelled without its accents.
      const rx = new RegExp('(' + raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      sum.innerHTML = esc(shown_q).replace(rx, '<mark>$1</mark>');
      d.open = true;
    }
  });
  faqCount.textContent = !term
    ? ''
    : shown === 0 ? t('No questions match “{q}” — ask it in the form below.', { q: raw })
    : t('{n} of {total} questions match.', { n: shown, total: faqItems.length });
}
faqSearch.addEventListener('input', filterFaq);
faqSearch.addEventListener('search', filterFaq);

faqToggleAll.addEventListener('click', ()=>{
  const expand = faqToggleAll.getAttribute('aria-expanded') !== 'true';
  faqItems.forEach(d=>{ if(!d.classList.contains('hide')) d.open = expand; });
  faqToggleAll.setAttribute('aria-expanded', String(expand));
  say(faqToggleAll, expand ? 'Collapse all' : 'Expand all');
});

// "/" focuses the FAQ search, the way search-first sites do — but only when
// you aren't already typing somewhere.
document.addEventListener('keydown', (e)=>{
  if(e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
  const el = e.target;
  if(el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
  e.preventDefault();
  faqSearch.focus();
  faqSearch.select();
});

/* ---------- Back to top ---------- */
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', ()=>{
  window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' });
  document.querySelector('.nav .brand-lockup').focus();
});

/* ---------- Nav scroll-spy ---------- */
// Hash links only, and defensively so, because everything wired up after
// this point dies with it if it throws. Every link in the row is an
// in-page anchor now, but the `|| ''` guard stays: the day somebody adds
// a link with no href, or one pointing at a real path,
// querySelector('/somewhere') is a SyntaxError and null.startsWith is a
// TypeError — either one would take out the whole file below this line.
const spyLinks = [...document.querySelectorAll('.nav-links a')]
  .filter(a=>(a.getAttribute('href') || '').startsWith('#'));
const spyTargets = spyLinks
  .map(a=>({ a, el: document.querySelector(a.getAttribute('href')) }))
  .filter(x=>x.el);
if(spyTargets.length && 'IntersectionObserver' in window){
  const spy = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      spyLinks.forEach(l=>l.classList.remove('current'));
      const hit = spyTargets.find(x=>x.el === e.target);
      // The lit pill parks on whatever this decides is current, so the
      // highlight and the colour can never point at two different links.
      if(hit){ hit.a.classList.add('current'); parkGlow(hit.a); }
    });
  }, { rootMargin:'-45% 0px -50% 0px' });
  spyTargets.forEach(x=>spy.observe(x.el));
}

/* ---------- Heat layer (MOS's cursor-follow glow) ---------- */
const heat = document.getElementById('heatLayer');
if(heat && !reduceMotion && window.matchMedia('(hover:hover)').matches){
  let heatRaf = false;
  window.addEventListener('pointermove', (e)=>{
    if(heatRaf) return;
    heatRaf = true;
    requestAnimationFrame(()=>{
      heat.style.setProperty('--heat-x', e.clientX + 'px');
      heat.style.setProperty('--heat-y', e.clientY + 'px');
      heat.classList.add('active');
      heatRaf = false;
    });
  }, { passive:true });
  document.addEventListener('pointerleave', ()=>heat.classList.remove('active'));
}

/* =====================================================================
   3D — the only script the depth system needs
   Everything else is CSS. This sets two custom properties from pointer
   position and lets the stylesheet decide what that means, so retuning the
   look never means touching JavaScript.

   Gated on a real pointer as well as reduced-motion: a tilt driven by a
   fingertip on a touchscreen fires once on tap and then sticks, which
   looks broken rather than three-dimensional.
===================================================================== */
const canTilt = !reduceMotion &&
  window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ---------- Hero stage ---------- */
const hero3d = document.getElementById('hero3d');
const heroStage = document.getElementById('heroStage');
if(hero3d && heroStage && canTilt){
  let stageRaf = false, sx = 0, sy = 0;

  hero3d.addEventListener('pointermove', (e)=>{
    const r = hero3d.getBoundingClientRect();
    sx = (e.clientX - r.left) / r.width  - 0.5;   // −0.5 … 0.5
    sy = (e.clientY - r.top)  / r.height - 0.5;
    if(stageRaf) return;
    stageRaf = true;
    requestAnimationFrame(()=>{
      // .live both hands the transform over from the idle drift keyframes
      // and shortens the transition so the panel tracks the cursor.
      heroStage.classList.add('live');
      heroStage.classList.remove('settle');
      heroStage.style.setProperty('--sty', (sx *  17).toFixed(2) + 'deg');
      heroStage.style.setProperty('--stx', (sy * -11).toFixed(2) + 'deg');
      stageRaf = false;
    });
  }, { passive:true });

  // Leaving returns it to the resting angle rather than dropping back to the
  // keyframe drift — restarting that animation mid-tilt snaps visibly.
  hero3d.addEventListener('pointerleave', ()=>{
    heroStage.classList.add('settle');
    heroStage.style.setProperty('--sty', '-8deg');
    heroStage.style.setProperty('--stx', '3deg');
  });
}

/* ---------- Card tilt ----------
   One delegated listener per grid rather than one per card, and a single
   rAF in flight at a time. getBoundingClientRect is read inside the frame
   callback, so a pointermove never forces layout mid-event. */
function clearTilt(el){
  el.classList.remove('tilted');
  el.style.removeProperty('--rx');
  el.style.removeProperty('--ry');
}

function wireTilt(container, selector, maxDeg){
  if(!container || !canTilt) return;
  let raf = false, el = null, mx = 0, my = 0;

  container.addEventListener('pointermove', (e)=>{
    const hit = e.target.closest(selector);
    if(!hit) return;
    if(el && el !== hit) clearTilt(el);
    el = hit; mx = e.clientX; my = e.clientY;
    if(raf) return;
    raf = true;
    requestAnimationFrame(()=>{
      if(el){
        const r = el.getBoundingClientRect();
        const dx = (mx - r.left) / r.width  - 0.5;
        const dy = (my - r.top)  / r.height - 0.5;
        el.classList.add('tilted');
        el.style.setProperty('--ry', ( dx * maxDeg).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-dy * maxDeg).toFixed(2) + 'deg');
      }
      raf = false;
    });
  }, { passive:true });

  // pointerleave on the container catches the cursor exiting the grid;
  // pointerout with a relatedTarget check catches moving between two cards.
  container.addEventListener('pointerout', (e)=>{
    const hit = e.target.closest(selector);
    if(hit && !hit.contains(e.relatedTarget)) clearTilt(hit);
  });
  container.addEventListener('pointerleave', ()=>{
    if(el){ clearTilt(el); el = null; }
  });
}

// The multiplier is the tilt across the card's *full* width, and the pointer
// offset it multiplies runs −0.5…0.5 — so a corner reaches half these numbers.
wireTilt(document.getElementById('serviceCards'), '.card', 13);
wireTilt(document.querySelector('.tiers'),        '.tier', 11);
wireTilt(workGrid,                                '.work-card', 11);

/* Blur can leave a card tilted with no pointer to un-tilt it — e.g. tabbing
   away mid-hover, or a modal opening under the cursor. */
window.addEventListener('blur', ()=>{
  $$('.tilted').forEach(clearTilt);
  if(heroStage) heroStage.classList.add('settle');
});

/* ---------- Mail hand-off, shared by the contact and ticket forms ----------
   Neither form pretends to POST anywhere: there's no endpoint behind this
   page, so rather than fake a success state both hand off to the visitor's
   mail client with the fields pre-filled. The validation, the "ready to
   send" panel with its copy fallback and the mailto itself live here once
   instead of once per form — which is also the single place to swap in a
   real fetch() when an endpoint exists.

   >>> SET THESE TWO ADDRESSES BEFORE THE SITE GOES LIVE. <<<
   They ship as example.com placeholders, which means today every enquiry
   and every ticket goes nowhere. This is the one line in the folder that
   must change. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAIL_TO = { enquiry:'hello@example.com', support:'support@example.com' };

function markField(el, ok){
  el.closest('.field').classList.toggle('bad', !ok);
  return ok;
}
// Checks are [{ el, ok(trimmedValue) }]. They only fire once a field has been
// left, and an empty field isn't an error until submit — nobody wants "that
// isn't an email" while they're still typing it.
function wireChecks(checks){
  checks.forEach(({ el, ok })=>{
    el.addEventListener('blur', ()=>{ if(el.value.trim()) markField(el, ok(el.value.trim())); });
    el.addEventListener('input', ()=>{ if(ok(el.value.trim())) markField(el, true); });
  });
}
// Flags every bad field at once — you fix them in one pass rather than
// discovering the next one each time you resubmit — and returns the first.
function firstInvalid(checks){
  let bad = null;
  checks.forEach(({ el, ok })=>{ if(!markField(el, ok(el.value.trim())) && !bad) bad = el; });
  return bad;
}
function wireCount(el, out, max){
  const paint = ()=>{ out.textContent = el.value.length + ' / ' + max; };
  el.addEventListener('input', paint);
  paint();
}
function handoffToMail({ to, okEl, detailEl, subject, body, copied }){
  okEl.hidden = false;
  say(detailEl, 'Your email client should have opened — if it didn’t, use the copy button below.');
  // The copy button is built once and reused, so the text to copy has to
  // travel on the element rather than in the handler's closure — otherwise a
  // second submit would still copy whatever the first one said.
  let btn = $('button', okEl);
  if(!btn){
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.style.cssText = 'margin-top:10px; min-height:38px; padding:8px 14px; font-size:13px;';
    btn.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(btn.dataset.text); toast(t(btn.dataset.copied)); }
      catch(err){ toast(t('Copy failed — select the text manually')); }
    });
    okEl.appendChild(btn);
  }
  say(btn, 'Copy the message instead');
  btn.dataset.text = subject + '\n\n' + body;
  // Held in English and translated at the moment it's shown, so a language
  // switch between submitting and copying doesn't leave the toast behind.
  btn.dataset.copied = copied;

  okEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block:'center' });
  window.location.href = 'mailto:' + to
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);
}

/* ---------- Contact form ---------- */
const form = document.getElementById('contactForm');
const formOk = document.getElementById('formOk');
const cName = document.getElementById('cName');
const cEmail = document.getElementById('cEmail');
const cMsg = document.getElementById('cMsg');

wireCount(cMsg, document.getElementById('cCount'), 1200);

const contactChecks = [
  { el: cName,  ok: v=>v.length > 1 },
  { el: cEmail, ok: v=>EMAIL_RE.test(v) }
];
wireChecks(contactChecks);

form.addEventListener('submit', (e)=>{
  e.preventDefault();

  // Honeypot: a filled hidden field means a bot. Fail silently rather than
  // explain what gave it away.
  if(document.getElementById('cHp').value) return;

  const bad = firstInvalid(contactChecks);
  if(bad){ bad.focus(); toast(t('Check the highlighted fields')); return; }

  // Written in the language the visitor filled the form in — they are the
  // one who has to recognise it in their sent folder.
  const type = document.getElementById('cType').value;
  const budget = document.getElementById('cBudget').value;
  const subject = t('Enquiry — {type}', { type });
  const body = `${t('Name')}: ${cName.value.trim()}\n${t('Email')}: ${cEmail.value.trim()}\n`
    + `${t('Need')}: ${type}\n${t('Budget')}: ${budget}\n\n${cMsg.value.trim()}`;

  handoffToMail({
    to: MAIL_TO.enquiry, okEl: formOk, detailEl: document.getElementById('formOkDetail'),
    subject, body, copied:'Enquiry copied'
  });
});

/* ---------- Support ticket form ----------
   The four priorities match the low/medium/high/critical wording the team
   already uses, so what someone picks here maps straight onto the record
   opened on our side. One array drives both the radio options and the
   response-target table, so the wording and the promise can't drift apart.
   The targets themselves are placeholder copy — see the section comment in
   the markup before publishing them. */
const TICKET_PRIORITIES = [
  { id:'low',      label:'Low',      hint:'Can wait',        target:'2 business days'  },
  { id:'medium',   label:'Medium',   hint:'Slowing us down', target:'1 business day'   },
  { id:'high',     label:'High',     hint:'Badly broken',    target:'4 business hours' },
  { id:'critical', label:'Critical', hint:'Down or unusable',target:'1 hour'           }
];

const tkPriority = document.getElementById('tkPriority');
const tkTarget = document.getElementById('tkTarget');
const slaList = document.getElementById('slaList');

tkPriority.innerHTML = TICKET_PRIORITIES.map(p=>`
  <label class="opt"><input type="radio" name="tkPriority" value="${p.id}" ${p.id === 'medium' ? 'checked' : ''}>
    <span><b>${esc(p.label)}</b><i>${esc(p.hint)}</i></span></label>`).join('');
slaList.innerHTML = TICKET_PRIORITIES.map(p=>`
  <div class="sla-row" data-p="${p.id}">
    <span class="who"><span class="dotp ${p.id}" aria-hidden="true"></span><b>${esc(p.label)}</b><i>${esc(p.hint)}</i></span>
    <span class="val">${esc(p.target)}</span>
  </div>`).join('');

// Picking a priority lights up its row in the sidebar table, so the promise
// you're being made is visible from the control that makes it.
function paintPriority(){
  const id = $('input[name="tkPriority"]:checked').value;
  const p = TICKET_PRIORITIES.find(x=>x.id === id);
  tkTarget.innerHTML = `<span class="dotp ${p.id}" aria-hidden="true"></span>`
    + `Target first reply: <b>${esc(p.target)}</b>`;
  tr(tkTarget);
  $$('.sla-row', slaList).forEach(r=>r.classList.toggle('on', r.dataset.p === id));
}
tkPriority.addEventListener('change', paintPriority);
paintPriority();

const ticketForm = document.getElementById('ticketForm');
const tkOk = document.getElementById('tkOk');
const tkSubject = document.getElementById('tkSubject');
const tkName = document.getElementById('tkName');
const tkEmail = document.getElementById('tkEmail');
const tkDetails = document.getElementById('tkDetails');

wireCount(tkDetails, document.getElementById('tkCount'), 2000);

const ticketChecks = [
  { el: tkSubject, ok: v=>v.length > 3 },
  { el: tkName,    ok: v=>v.length > 1 },
  { el: tkEmail,   ok: v=>EMAIL_RE.test(v) }
];
wireChecks(ticketChecks);

ticketForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  if(document.getElementById('tkHp').value) return;

  const bad = firstInvalid(ticketChecks);
  if(bad){ bad.focus(); toast(t('Check the highlighted fields')); return; }

  const p = TICKET_PRIORITIES.find(x=>x.id === $('input[name="tkPriority"]:checked').value);
  const system = document.getElementById('tkSystem').value.trim();

  // Laid out in the order the fields appear on a ticket, so whoever opens it
  // isn't hunting through prose for the priority.
  const title = tkSubject.value.trim();
  const subject = `[${t(p.label)}] ${title}`;
  const body = [
    `${t('Title')}: ${title}`,
    `${t('Priority')}: ${t(p.label)}`,
    `${t('Category')}: ${document.getElementById('tkCategory').value}`,
    `${t('Site / system')}: ${system || '—'}`,
    `${t('Raised by')}: ${tkName.value.trim()} <${tkEmail.value.trim()}>`,
    t('Source: Main Page'),
    '',
    tkDetails.value.trim() || t('(no further detail given)')
  ].join('\n');

  handoffToMail({
    to: MAIL_TO.support, okEl: tkOk, detailEl: document.getElementById('tkOkDetail'),
    subject, body, copied:'Ticket copied'
  });
});

/* =====================================================================
   NAV v3 — spotlight, chapter rail, command palette
   Four behaviours, one shared fact: SECTIONS, the list of id'd sections
   in document order, built from the page rather than written out. Add a
   section to the markup and it appears in the ticks, the breadcrumb, the
   Alt+arrow stepping and the palette without a second edit anywhere.
===================================================================== */

/* Labels come from the nav where a section has a link — "Services" beats
   "Five services, one place" on a 90px tooltip. The two that
   have no link (or, for the hero, no name at all) are spelled out. */
const NAV_LABEL = {};
const EXTRA_LABEL = { top:'Top', included:'Included' };

const SECTIONS = $$('header.hero[id], section[id]').map(el=>({ el, id: el.id }));

/* Every field here is read off the page rather than written out, so all
   three go stale the moment the language changes. Re-reading them is one
   function, called on load and again after each switch — see applyLang at
   the bottom of the file. */
function readSectionLabels(){
  spyLinks.forEach(a=>{ NAV_LABEL[a.getAttribute('href').slice(1)] = a.textContent.trim(); });
  SECTIONS.forEach(s=>{
    s.name = NAV_LABEL[s.id] || (EXTRA_LABEL[s.id] ? t(EXTRA_LABEL[s.id]) : '') || s.id;
    s.heading = (($('.section-head h2', s.el) || $('h2', s.el) || {}).textContent || '').trim();
    s.eyebrow = (($('.eyebrow', s.el) || {}).textContent || '').trim();
  });
}
readSectionLabels();

/* ---------- Arrival flash ----------
   Shared by the ticks, the palette and Alt+arrow stepping. Removing the
   class and forcing a reflow before re-adding it restarts the animation;
   without that, jumping twice to the same place only flashes once. */
function flash(el, cls){
  if(!el || reduceMotion) return;
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
  setTimeout(()=>el.classList.remove(cls), 1300);
}
function jumpToSection(sec){
  if(!sec) return;
  sec.el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block:'start' });
  flash(sec.el, 'jumped');
}
// Sub-targets (a card, a plan, one question) get centred rather than
// parked at the top — a card pinned under the nav with its section
// heading off-screen gives you no idea what you're looking at.
function jumpToEl(el){
  if(!el) return;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block:'center' });
  flash(el, 'jumped-el');
}

/* ---------- Chapter ticks ---------- */
const chapRail = document.getElementById('chapRail');
const navHere = document.getElementById('navHere');
/* var, not let, and deliberately so: onScroll is wired up and fired several
   hundred lines above this block, and it calls paintChapters. A let would
   still be in its temporal dead zone at that point and throw, taking the
   scroll handler with it; a var is merely undefined, which the guard
   below handles. */
var chapTicks = null;
let chapTops = [];
let chapActive = -1;

/* Labels come from SECTIONS, so this is rebuilt rather than translated —
   the ticks carry the nav's wording, and the nav has already changed by
   the time this runs. */
function renderChapters(){
  chapRail.innerHTML = SECTIONS.map(s=>
    `<span class="chap" data-id="${esc(s.id)}"><span class="chap-lab">${esc(s.name)}</span></span>`
  ).join('');
  chapTicks = $$('.chap', chapRail);
}
renderChapters();

// Positions are a fraction of the same scrollable range the progress fill
// uses, so a tick sits exactly where the fill reaches when that section
// arrives. Measured on demand, never during a scroll.
function measureChapters(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  chapTops = SECTIONS.map(s=>s.el.getBoundingClientRect().top + window.scrollY);
  chapTicks.forEach((tick, i)=>{
    const pct = max > 0 ? Math.min(Math.max(chapTops[i] / max, 0), 1) * 100 : 0;
    tick.style.setProperty('--x', pct.toFixed(2) + '%');
    tick.classList.toggle('at-start', pct < 7);
    tick.classList.toggle('at-end',   pct > 93);
  });
}

function paintChapters(y){
  if(!chapTicks) return;
  // A section counts as "the one you're reading" once its top passes the
  // upper third of the viewport, not the very top of it.
  const line = y + window.innerHeight * 0.28;
  let idx = 0;
  for(let i = 0; i < chapTops.length; i++) if(chapTops[i] <= line) idx = i;
  if(idx === chapActive) return;
  chapActive = idx;
  chapTicks.forEach((tick, i)=>tick.classList.toggle('on', i === idx));
  paintHere(SECTIONS[idx]);
}

function paintHere(sec){
  const label = sec && sec.id !== 'top' ? sec.name : '';
  if(navHere.textContent === label) return;
  navHere.textContent = label;
  navHere.setAttribute('data-on', label ? '1' : '0');
  if(!label) return;
  navHere.classList.remove('swap');
  void navHere.offsetWidth;
  navHere.classList.add('swap');
}

chapRail.addEventListener('click', (e)=>{
  const tick = e.target.closest('.chap');
  if(!tick) return;
  jumpToSection(SECTIONS.find(s=>s.id === tick.dataset.id));
});

/* ---------- The lit pill ----------
   Two inputs, one highlight: the pointer (or keyboard focus) while you're
   in the row, and the scroll-spy's current section the moment you leave.
   currentLink is set from the spy above via parkGlow. */
const navGlow = document.getElementById('navGlow');
const wideNav = window.matchMedia('(min-width:1021px)');
let currentLink = null;
let hoverLink = null;

function moveGlow(el){
  if(!navGlow) return;
  // Below 1021px the row is inside the dropdown, where a pill positioned
  // for a horizontal strip would land on nothing.
  if(!el || !wideNav.matches){ navLinks.classList.remove('lit'); return; }
  navGlow.style.setProperty('--gx', el.offsetLeft + 'px');
  navGlow.style.setProperty('--gw', el.offsetWidth + 'px');
  navLinks.classList.add('lit');
}
function parkGlow(link){
  currentLink = link;
  if(!hoverLink) moveGlow(link);
}

navLinks.addEventListener('pointerover', (e)=>{
  const a = e.target.closest('a');
  if(!a) return;
  hoverLink = a;
  moveGlow(a);
});
navLinks.addEventListener('pointerleave', ()=>{ hoverLink = null; moveGlow(currentLink); });
navLinks.addEventListener('focusin', (e)=>{
  const a = e.target.closest('a');
  if(a){ hoverLink = a; moveGlow(a); }
});
navLinks.addEventListener('focusout', ()=>{
  // Deferred by a tick: tabbing from one link to the next fires focusout
  // before the next focusin, and reacting straight away sends the pill
  // back to the current section and then forward again on every Tab.
  setTimeout(()=>{
    if(navLinks.contains(document.activeElement)) return;
    hoverLink = null;
    moveGlow(currentLink);
  }, 0);
});
wideNav.addEventListener('change', ()=>moveGlow(hoverLink || currentLink));

/* Both the ticks and the pill are measured in pixels, so both are wrong
   the moment the window changes size. One rAF-throttled handler re-reads
   them together. */
let measuring = false;
function remeasure(){
  if(measuring) return;
  measuring = true;
  requestAnimationFrame(()=>{
    measureChapters();
    moveGlow(hoverLink || currentLink);
    measuring = false;
  });
}
window.addEventListener('resize', remeasure, { passive:true });
window.addEventListener('load', remeasure);
// Resize isn't the only thing that moves a section. Opening an FAQ
// <details> pushes everything below it down, and nothing fires a resize —
// so the cached offsets went stale, leaving the wrong chapter tick active,
// the wrong breadcrumb, ticks sitting off the progress fill, and Alt+arrow
// jumping to the wrong place. A ResizeObserver on the document catches
// every layout change with one listener, whatever caused it.
if(window.ResizeObserver){
  new ResizeObserver(remeasure).observe(document.documentElement);
} else {
  document.addEventListener('toggle', (e)=>{ if(e.target.tagName === 'DETAILS') remeasure(); }, true);
}
measureChapters();

/* ---------- Mobile menu polish ---------- */
$$('a', navLinks).forEach((a, i)=>a.style.setProperty('--i', i));
function closeMenu(){
  if(!navLinks.classList.contains('open')) return;
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded','false');
}
document.addEventListener('click', (e)=>{
  if(!navLinks.classList.contains('open')) return;
  if(e.target.closest('#navLinks') || e.target.closest('#navToggle')) return;
  closeMenu();
});

/* ---------- Magnetic CTA ----------
   The button leans toward the cursor as it crosses the bar. Gated on
   canTilt with the rest of the pointer work: on a touchscreen this fires
   once on tap and then leaves the button sitting off-centre. */
const navCta = document.querySelector('.nav-cta');
if(navCta && canTilt){
  let magRaf = false, mgx = 0, mgy = 0;
  nav.addEventListener('pointermove', (e)=>{
    mgx = e.clientX; mgy = e.clientY;
    if(magRaf) return;
    magRaf = true;
    requestAnimationFrame(()=>{
      const r = navCta.getBoundingClientRect();
      const dx = mgx - (r.left + r.width / 2);
      const dy = mgy - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      // Falls off to nothing at 130px, so the button ignores a cursor
      // that is merely somewhere in the bar rather than heading for it.
      const pull = dist > 130 ? 0 : (1 - dist / 130) * 5;
      navCta.style.setProperty('--mx', (dx / dist * pull).toFixed(2) + 'px');
      navCta.style.setProperty('--my', (dy / dist * pull).toFixed(2) + 'px');
      magRaf = false;
    });
  }, { passive:true });
  nav.addEventListener('pointerleave', ()=>{
    navCta.style.setProperty('--mx','0px');
    navCta.style.setProperty('--my','0px');
  });
}

/* =====================================================================
   COMMAND PALETTE
   Indexed off the rendered page, not a hand-written list — sections,
   service cards, plans, case studies and every FAQ question, plus the
   handful of actions that aren't a place on the page. Rename a section
   or add a question and the palette follows on the next load.

   Every action below stays on this page. The "Open your client page" and
   "Play the Arcade" actions are gone with the rest of the app links.
===================================================================== */
const palette   = document.getElementById('palette');
const palInput  = document.getElementById('palInput');
const palList   = document.getElementById('palList');
const paletteBtn = document.getElementById('paletteBtn');

const PAL_ICONS = {
  section:'<path d="M4 6h16M4 12h11M4 18h7"/>',
  service:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z"/>',
  plan:'<path d="M4 8h16v12H4zM4 8l8-5 8 5M10 20v-6h4v6"/>',
  work:'<path d="M4 7h16v12H4zM9 7V4.5h6V7"/>',
  faq:'<path d="M9.3 9.2a2.8 2.8 0 1 1 3.4 2.8c-.5.2-.7.7-.7 1.2v.5"/><path d="M12 17.3v.2"/>',
  action:'<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7Z"/>'
};

const PAL = [];
// `group` stays English because the empty-state filter below tests it;
// `groupLabel` is what gets printed. Titles and subtitles are already in
// the current language — they were read off the translated page.
function palAdd(group, kind, title, sub, run, keys){
  PAL.push({
    group, groupLabel: t(group), kind, title, sub: sub || '', run,
    fold: fold(title),
    hay: fold(title + ' ' + (sub || '') + ' ' + (keys || ''))
  });
}
const sectionById = (id)=>SECTIONS.find(s=>s.id === id);

// One line of a result row, cut back to a word boundary. A hard slice
// leaves subtitles ending "…Access is limited t", which reads as a bug.
function snip(text, n){
  const s = (text || '').replace(/\s+/g, ' ').trim();
  if(s.length <= n) return s;
  const cut = s.slice(0, n);
  const space = cut.lastIndexOf(' ');
  return (space > n * 0.6 ? cut.slice(0, space) : cut).replace(/[,;:.]$/, '') + '…';
}

/* Indexed off the rendered page, which means off whichever language is
   rendered — so the whole index is thrown away and rebuilt on a switch
   rather than translated entry by entry. */
function buildPalette(){
PAL.length = 0;
SECTIONS.forEach(s=>{
  if(s.id === 'top') return;
  palAdd('Sections', 'section', s.name, s.heading || s.eyebrow, ()=>jumpToSection(s), s.eyebrow);
});
/* Note the split between the two text arguments throughout: the subtitle
   is trimmed to what fits one line of a result row, while the last
   argument is the whole element's text and is only ever searched. Search
   the trimmed version instead and "backups" — a word that appears in
   every plan's feature list and half the FAQ answers — finds nothing. */
$$('#serviceCards .card').forEach(card=>{
  const h = $('h3', card);
  if(!h) return;
  const p = $('p', card);
  palAdd('Services', 'service', h.textContent.trim(),
    p ? snip(p.textContent, 88) : '', ()=>jumpToEl(card), card.textContent);
});
// `tier`, not `t` — `t` is the translation helper, and shadowing it here
// would silently leave this one block untranslatable.
$$('.tier').forEach(tier=>{
  const name = tier.dataset.plan || ($('h3', tier) || {}).textContent || '';
  palAdd('Plans', 'plan', t('{name} plan', { name }), snip(($('.blurb', tier) || {}).textContent, 88),
    ()=>jumpToEl(tier), tier.textContent + ' hosting price pricing monthly plan hébergement tarif forfait');
});
WORK.forEach(w=>{
  // The write-up is indexed in both languages rather than just the one on
  // screen. It costs nothing, and it means a French visitor who remembers
  // "Nginx" and an English one who remembers "arpentage" both land on the
  // right card. Everything else in the palette is read off the rendered
  // page and so only carries the current language; only here is the other
  // one still to hand.
  const deep = [w.blurb, w.problem].concat(w.did, w.tech);
  palAdd('Case studies', 'work', t(w.name), t(w.kind), ()=>openWork(w.id),
    deep.concat(deep.map(s=>t(s))).join(' '));
});
$$('details.qa').forEach(d=>{
  const sum = $('summary', d);
  if(!sum) return;
  const body = $('.qa-body', d);
  palAdd('Questions', 'faq', sum.textContent.trim(),
    body ? snip(body.textContent, 88) : '',
    ()=>{ d.open = true; jumpToEl(d); },
    (body ? body.textContent : '') + ' faq question');
});
palAdd('Actions','action',t('Start a project'),t('Straight to the enquiry form'),
  ()=>jumpToSection(sectionById('contact')), 'contact quote enquiry email hire devis demande soumission');
palAdd('Actions','action',t('Raise a support ticket'),t('Something is broken'),
  ()=>jumpToSection(sectionById('support')), 'help fault down bug aide panne bris billet');
palAdd('Actions','action',t('Switch theme'),t('Light and dark'),
  ()=>themeBtn.click(), 'dark light mode appearance sombre clair thème');
// Reachable from the keyboard as well as from the button in the bar —
// the two-letter button is easy to miss, and someone who opens a search
// box and types "français" has told you exactly what they want.
palAdd('Actions','action',t('Switch language'),t('English and French'),
  ()=>langBtn.click(), 'language english french langue anglais francais français en fr');
palAdd('Actions','action',t('Back to the top'),'',
  ()=>window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' }), 'home hero start haut accueil');
}
buildPalette();

let palResults = [];
let palIndex = -1;
let palLastFocus = null;

/* Deliberately not fuzzy. A title that starts with what you typed beats
   one that contains it, which beats a match hiding in the blurb — three
   rules you can predict, rather than a scorer that surprises you. */
function palScore(item, q){
  const title = item.fold;
  const i = title.indexOf(q);
  if(i === 0) return 3;
  if(i > 0) return title[i - 1] === ' ' ? 2.5 : 2;
  return item.hay.includes(q) ? 1 : 0;
}
// Highlight the match, then escape — not the other way round. Escaping
// first turns an apostrophe into "&#39;", and a search for "39" (or "amp",
// or "quot") would then plant a <mark> inside the entity, breaking it into
// visible literal text. So the marking happens on the raw string, with
// each piece escaped as it goes.
function palMark(text, q){
  const raw = String(text ?? '');
  if(!q) return esc(raw);
  const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig');
  let out = '', last = 0, m;
  while((m = rx.exec(raw))){
    out += esc(raw.slice(last, m.index)) + '<mark>' + esc(m[0]) + '</mark>';
    last = m.index + m[0].length;
    if(m[0] === '') rx.lastIndex++; // an empty match would spin forever
  }
  return out + esc(raw.slice(last));
}
function palRowHtml(item, i, q){
  return `<button class="pal-item" type="button" role="option" id="palOpt${i}" data-i="${i}" aria-selected="false">
    <span class="pi-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PAL_ICONS[item.kind]}</svg></span>
    <span class="pi-txt"><span class="pi-t">${palMark(item.title, q)}</span>${
      item.sub ? `<span class="pi-s">${esc(item.sub)}</span>` : ''}</span>
    <span class="pi-go" aria-hidden="true">&#8629;</span>
  </button>`;
}

function palRender(){
  const raw = palInput.value.trim();
  // Folded, so typing "securite" still reaches "Sécurité" — the same
  // courtesy the FAQ search extends. Highlighting still uses `raw`.
  const q = fold(raw);
  let html = '';

  if(!q){
    // Empty state is a menu, not a dump of all sixty rows: the places you
    // would navigate to and the things you would do.
    palResults = PAL.filter(x=>x.group === 'Sections' || x.group === 'Actions');
    let group = null, i = 0;
    palResults.forEach(item=>{
      if(item.group !== group){ group = item.group; html += `<div class="pal-group">${esc(item.groupLabel)}</div>`; }
      html += palRowHtml(item, i++, raw);
    });
  } else {
    palResults = PAL.map(x=>({ x, s:palScore(x, q) })).filter(r=>r.s > 0)
      .sort((a, b)=>b.s - a.s).map(r=>r.x).slice(0, 24);
    if(palResults.length){
      const n = palResults.length;
      html = `<div class="pal-group">${esc(t(n === 1 ? '{n} match' : '{n} matches', { n }))}</div>`
        + palResults.map((item, i)=>palRowHtml(item, i, raw)).join('');
    }
  }

  if(!palResults.length){
    html = `<p class="pal-empty">${esc(t('Nothing on this page matches “{q}”.', { q: raw }))}<br>`
      + `${esc(t('The enquiry form takes the questions the page doesn\'t answer.'))}</p>`;
    palIndex = -1;
  }
  palList.innerHTML = html;
}

function palSelect(i){
  if(!palResults.length) return;
  const n = (i + palResults.length) % palResults.length;
  if(n === palIndex) return;
  palIndex = n;
  $$('.pal-item', palList).forEach((el, k)=>{
    const on = k === palIndex;
    el.setAttribute('aria-selected', String(on));
    if(on){
      palInput.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block:'nearest' });
    }
  });
}
function palRun(i){
  const item = palResults[i];
  if(!item) return;
  // Closed first so the thing being jumped to isn't behind the overlay,
  // and so anything that opens its own dialog (a case study) inherits a
  // clean focus state rather than fighting this one for it.
  closePalette();
  item.run();
}

function openPalette(){
  if(!palette.hidden) return;
  palLastFocus = document.activeElement;
  closeMenu();
  palette.hidden = false;
  document.body.style.overflow = 'hidden';
  palInput.value = '';
  palIndex = -1;
  palRender();
  palSelect(0);
  palInput.focus();
}
function closePalette(){
  if(palette.hidden) return;
  palette.hidden = true;
  document.body.style.overflow = '';
  if(palLastFocus && palLastFocus.focus) palLastFocus.focus();
}

paletteBtn.addEventListener('click', openPalette);
document.getElementById('paletteBack').addEventListener('click', closePalette);
palInput.addEventListener('input', ()=>{ palIndex = -1; palRender(); palSelect(0); });
palInput.addEventListener('keydown', (e)=>{
  if(e.key === 'ArrowDown'){ e.preventDefault(); palSelect(palIndex + 1); }
  else if(e.key === 'ArrowUp'){ e.preventDefault(); palSelect(palIndex - 1); }
  else if(e.key === 'Enter'){ e.preventDefault(); palRun(palIndex); }
});
palList.addEventListener('click', (e)=>{
  const row = e.target.closest('.pal-item');
  if(row) palRun(parseInt(row.dataset.i, 10));
});
palList.addEventListener('pointermove', (e)=>{
  const row = e.target.closest('.pal-item');
  if(row) palSelect(parseInt(row.dataset.i, 10));
});

// ⌘ on a Mac, Ctrl everywhere else — printed on the button so nobody has
// to guess which one this page chose.
const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
const palKey = isMac ? '⌘ K' : 'Ctrl K';
document.getElementById('paletteHint').textContent = palKey;
// The button has no caption, so the tooltip carries both the name and the
// shortcut — including at the widths where the printed hint is hidden.
// Composed here rather than translated in place: the shortcut differs by
// platform, so there is no one English string for the table to key on.
// applyLang calls this again after a switch.
function paintPaletteTitle(){
  paletteBtn.title = t('Search this page ({key})', { key: palKey });
}
paintPaletteTitle();

document.addEventListener('keydown', (e)=>{
  const key = e.key || '';
  if((e.ctrlKey || e.metaKey) && key.toLowerCase() === 'k'){
    e.preventDefault();
    if(palette.hidden) openPalette(); else closePalette();
    return;
  }
  if(key === 'Escape'){ closeMenu(); }
  if(palette.hidden){
    // Alt+arrows step through the page a section at a time. Alt keeps it
    // clear of the browser's own arrow scrolling and of anyone typing in
    // a form.
    if(e.altKey && !e.ctrlKey && !e.metaKey && (key === 'ArrowDown' || key === 'ArrowUp')){
      e.preventDefault();
      const from = chapActive < 0 ? 0 : chapActive;
      const to = Math.min(Math.max(from + (key === 'ArrowDown' ? 1 : -1), 0), SECTIONS.length - 1);
      jumpToSection(SECTIONS[to]);
    }
    return;
  }
  if(key === 'Escape'){ e.preventDefault(); closePalette(); return; }
  if(key !== 'Tab') return;
  const focusables = $$('input, button', palette).filter(el=>el.offsetParent !== null);
  if(!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
});

document.getElementById('year').textContent = new Date().getFullYear();

/* =====================================================================
   THE LANGUAGE SWITCH
   =====================================================================
   Everything above has run and rendered, in English, which is what makes
   this the right place for the switch to live: one pass over a finished
   page rather than a language check threaded through thirty render
   functions. The order inside applyLang is the whole trick, and it is
   the order the page was built in — text first, then the things indexed
   off that text.
===================================================================== */
const langBtn = document.getElementById('langBtn');
const metaDesc = document.querySelector('meta[name="description"]');
// Captured before the first pass, so they are the English to translate
// from however many times the language is flipped afterwards.
const DOC_TITLE_EN = document.title;
const DOC_DESC_EN  = metaDesc ? metaDesc.getAttribute('content') : '';

function applyLang(lang, remember){
  LANG = lang === 'fr' ? 'fr' : 'en';

  // The one line screen readers and search engines actually read for
  // this. A French page still labelled lang="en" gets pronounced by an
  // English voice, which is worse than no translation at all.
  root.setAttribute('lang', LANG);
  document.title = t(DOC_TITLE_EN);
  if(metaDesc) metaDesc.setAttribute('content', t(DOC_DESC_EN));

  tr(document.body);

  // Composed in code rather than sitting in the markup, so the pass above
  // can't reach them.
  paintPaletteTitle();
  paintPriority();
  paintTheme();                  // its aria-label names the theme it switches to
  setBilling(billingAnnual);     // prices are formatted, not translated

  // The FAQ rebuilds from its own English copies. The box is cleared
  // first: a term typed in one language filtering the other leaves you
  // looking at an empty list and no obvious reason why.
  const wasExpanded = faqToggleAll.getAttribute('aria-expanded') === 'true';
  faqSearch.value = '';
  filterFaq();
  if(wasExpanded) faqItems.forEach(d=>{ d.open = true; });

  // Everything indexed off the page's own words, in dependency order:
  // the labels, then the ticks drawn from them, then their positions,
  // then the palette that reads all of it.
  readSectionLabels();
  renderChapters();
  measureChapters();
  chapActive = -1;               // forces the breadcrumb to repaint
  paintChapters(window.scrollY);
  buildPalette();

  const face = LANG_BTN[LANG];
  langBtn.textContent = face.label;
  langBtn.title = face.title;
  langBtn.setAttribute('aria-label', face.aria);

  if(remember){ try{ localStorage.setItem(LANG_KEY, LANG); }catch(e){} }
  remeasure();
}

langBtn.addEventListener('click', ()=>applyLang(LANG === 'fr' ? 'en' : 'fr', true));

/* Three sources, most deliberate first.

   ?lang=fr in the address is someone being explicit — a link handed out
   in French, a QR code on French signage — and it wins over everything,
   including a stored choice, because the person sending the link knows
   something the stored choice doesn't.

   Then a stored choice, from a previous press of the button.

   Then the browser's own preference. Only the first two are remembered:
   somebody who has never expressed a preference keeps following their
   browser rather than being pinned to whichever language they happened
   to land in once. */
const urlLang = (location.search.match(/[?&]lang=(fr|en)\b/i) || [])[1];
let startLang = urlLang ? urlLang.toLowerCase() : null;
if(!startLang){
  try{ startLang = localStorage.getItem(LANG_KEY); }catch(e){}
}
if(startLang !== 'fr' && startLang !== 'en'){
  const prefs = navigator.languages || [navigator.language || ''];
  startLang = [].some.call(prefs, l=>/^fr\b/i.test(l || '')) ? 'fr' : 'en';
  applyLang(startLang, false);
} else {
  applyLang(startLang, true);
}

/* ---------- Copy check ----------
   Open the page with ?i18n=check, or call mosI18nCheck() from the
   console, and it reports what the dictionary is missing and what in it
   no longer matches anything. Worth running after any copy edit, because
   keys are English sentences and editing a sentence silently unhooks its
   translation. */
function i18nCheck(){
  const was = LANG;
  applyLang('en', false);              // read the source, not a translation

  const missing = [], used = new Set();
  // Numbers, prices, ticks and dashes carry no language and are not worth
  // reporting as gaps.
  const wordless = /^[\s\d.,:;/%$€£—–\-+×·↑↓↵©✓✗#&()]*$/;
  const note = (s)=>{
    const k = collapse(s);
    if(!k) return;
    // A translated string counts as used whatever it is made of — the
    // budget ranges are nothing but digits and still need rewriting for
    // a French reader. The filter only decides what counts as a GAP.
    if(DICT[k] !== undefined){ used.add(k); return; }
    if(wordless.test(k)) return;
    if(missing.indexOf(k) < 0) missing.push(k);
  };

  const skip = new Set(['SCRIPT','STYLE','NOSCRIPT']);
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if(n.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
      if(skip.has(n.tagName) || n.hasAttribute('data-no-i18n') || (window.SVGElement && n instanceof SVGElement)){
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let n;
  while((n = walk.nextNode())){
    if(n.nodeType === 3){ note(n.nodeValue); continue; }
    if(n.hasAttribute('data-i18n')){ note(n.getAttribute('data-i18n')); }
    TR_ATTRS.forEach(a=>{ if(n.hasAttribute(a)) note(n.getAttribute(a)); });
  }

  const unmatched = Object.keys(DICT).filter(k=>!used.has(k));
  console.group('%ci18n check', 'font-weight:700');
  console.log(missing.length + ' string(s) on the page with no French:');
  if(missing.length) console.log(missing.join('\n'));
  console.log('\n' + unmatched.length + ' key(s) matching nothing on the page.');
  console.log('Most of those are normal — everything under "FROM site.js" in\n'
    + 'i18n.js is text the page only writes while you use it. What to look\n'
    + 'for is a key you know belongs to a sentence in index.html: that one\n'
    + 'has drifted from the English and is no longer being applied.');
  if(unmatched.length) console.log(unmatched.join('\n'));
  console.groupEnd();

  applyLang(was, false);
}
window.mosI18nCheck = i18nCheck;
if(/(?:^|[?&])i18n=check(?:&|$)/.test(location.search)) i18nCheck();

})();
