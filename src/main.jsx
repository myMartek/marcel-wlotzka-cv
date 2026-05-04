import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, GraduationCap, Code2, Languages, MapPin, Calendar, Award,
  ChevronRight, Download, Mail, Globe2, Search, Sparkles, UserRound,
  Menu, X, Guitar, Plane, Dumbbell, Building2, Sun, Moon, Palette, Check,
  ArrowRight, Quote, Terminal as TerminalIcon,
} from 'lucide-react';
import './styles.css';

// ============================== DATA ==============================
const data = {
  de: {
    nav: { profile: 'Profil', experience: 'Werdegang', education: 'Studium', skills: 'Kenntnisse', contact: 'Kontakt', themeLight: 'Helle Variante', themeDark: 'Dunkle Variante', design: 'Design wählen' },
    brand: { sub: 'IT-Strategie · Architektur', footer: 'IT-Strategie · Architektur · Innovation' },
    unlock: { msg: 'Design-Palette entsperrt — klick rechts oben auf das Palette-Symbol', short: 'Entsperrt!' },
    hero: {
      name: 'Marcel Wlotzka', degree: 'M.Sc. Informatik',
      role: 'Sachgebietsleiter IT Strategie und Architektur',
      location: 'Lautertal, Deutschland',
      born: 'Geboren am 9. August 1989 in Goch',
      maritalStatus: 'Verheiratet, 2 Kinder',
      email: 'marcel@wlotzka.org',
      tagline: 'IT-Strategie, Architektur und Innovation mit Praxisnähe: von Smart-City-Plattformen über KI und Automatisierung bis zu skalierbaren digitalen Lösungen.',
      highlights: ['Disziplinarische und fachliche Führung', 'IT-Strategie & Architektur', 'SmartCity-Plattform ausgezeichnet mit VKU Innovationspreis 2023', 'Softwareentwicklung, App-Entwicklung & Cloud-nahe Architekturen']
    },
    stats: [{ label: 'Jahre IT-Erfahrung', value: '18+' }, { label: 'Mainova Stationen', value: '4' }, { label: 'Abschluss', value: 'M.Sc.' }, { label: 'Technologiefelder', value: 'KI · VR · SmartCity' }],
    sections: { profileEyebrow: 'Kurzprofil', profileTitle: 'Profil', profileText: 'Ich verbinde technologische Tiefe mit strategischer Perspektive. Mein Schwerpunkt liegt darauf, neue Technologien für den Unternehmenskontext nutzbar zu machen, Architekturentscheidungen tragfähig zu gestalten und Teams bei der Umsetzung digitaler Lösungen zu befähigen.', experienceEyebrow: 'Werdegang', experienceTitle: 'Beruflicher Werdegang', educationEyebrow: 'Ausbildung', educationTitle: 'Schule & Studium', skillsEyebrow: 'Technologien', skillsTitle: 'Kenntnisse & Technologien', languagesTitle: 'Sprachen', hobbiesTitle: 'Hobbies', searchPlaceholder: 'Stationen, Technologien oder Themen suchen …', contactEyebrow: 'Kontakt', contactTitle: 'Kontakt & Downloads', contactText: 'Gerne per E-Mail oder LinkedIn kontaktieren. Den Lebenslauf gibt es passend zur ausgewählten Sprache als PDF.' },
    filters: { all: 'Alle', leadership: 'Führung', architecture: 'Architektur', development: 'Entwicklung', innovation: 'Innovation' },
    pdf: { de: 'Lebenslauf herunterladen', en: 'Download CV' },
    quote: 'Ausgezeichnet mit dem VKU Innovationspreis 2023 für die SmartCity Plattform der Mainova.',
    experience: [
      { period: '01/2026 – Heute', company: 'Mainova AG', role: 'Sachgebietsleiter IT Strategie und Architektur', tags: ['leadership','architecture'], bullets: ['Disziplinarische und fachliche Führung', 'KI-Beauftragter'] },
      { period: '10/2024 – 12/2025', company: 'Mainova AG', role: 'IT Architekt', tags: ['architecture'], bullets: ['Mainova IT'] },
      { period: '09/2020 – 10/2024', company: 'Mainova AG', role: 'SmartCity Solution Architekt', tags: ['architecture','innovation','development'], bullets: ['Entwicklung der SmartCity Plattform der Mainova', 'Ausgezeichnet mit dem VKU Innovationspreis 2023'], badge: 'VKU Innovationspreis 2023' },
      { period: '09/2018 – 09/2020', company: 'Mainova AG', role: 'IT Innovation Manager', tags: ['innovation'], bullets: ['Evaluation neuer Technologien in der Energiewirtschaft', 'Schulung von Mitarbeitenden zu neuen Technologiefeldern', 'Projekte in KI, VR, SmartCity, Blockchain sowie Prozessoptimierung und Automatisierung'] },
      { period: '09/2016 – 09/2018', company: 'CMF Advertising GmbH', role: 'Leiter der Softwareentwicklung', tags: ['leadership','development'], bullets: ['Eigenverantwortliche Entwicklung von Web- und App-Projekten auf Kundenwunsch', 'Koordination des Teams mit anderen Abteilungen'] },
      { period: '08/2014 – 08/2016', company: '2VizCon GmbH, Neu-Isenburg', role: 'App Developer', tags: ['development'], bullets: ['Entwicklung von Apps für iOS, Android, Windows und Windows Phone', 'Weiterentwicklung eines App-Containers zur Darstellung webbasierter Inhalte', 'Entwicklung automatischer Build-Prozesse für Apps', 'Beratung der Geschäftsführung und Kunden in App-Fragen'] },
      { period: '08/2009 – 08/2014', company: 'KWP GmbH & Co. KG, Neu-Isenburg', role: 'Werkstudent Web Developer', tags: ['development'], bullets: ['Werkstudent, zwei Tage pro Woche als Web Developer', 'Eigenständige Weiterbildung zum App Developer', 'Verantwortung für viele IT-relevante Anliegen'] },
      { period: '09/2008 – 06/2009', company: 'XYQOM GmbH, Waldbröl bei Köln', role: 'Schulische Aushilfe Template & Webentwicklung', tags: ['development'], bullets: ['Template-Umsetzung in TypoLight / Contao für Kundenwebseiten', 'Erstellung kleinerer TypoLight-Erweiterungen', 'HTML5-Bestellsystem mit Konfigurator für KRONE-Sattelauflieger'] },
      { period: '07/2007 – 09/2009', company: 'Da Source Distribution, Köln', role: 'Schulische Aushilfe Online-Shop', tags: ['development'], bullets: ['Pflege eines ASP.NET-basierten Online-Shops für DJ-Equipment und Schallplatten', 'API-Anbindung zur Synchronisation von Produktinformationen und Mengenangaben mit eBay und internationalen Online-Shops'] }
    ],
    education: [
      { period: '04/2013 – 08/2018', institution: 'Technische Universität Darmstadt', title: 'Master of Science Informatik mit Anwendungsfach IT-Management', grade: 'Durchschnitt: 1,87', details: ['Schwerpunkte: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering', 'Master Thesis: Kontextsensitives Nachschlagen von lexikalisch-semantischen und syntaktischen Angaben in Schreibassistenzsystemen, verfasst in Englisch'] },
      { period: '10/2009 – 04/2013', institution: 'Technische Universität Darmstadt', title: 'Bachelor of Science Informatik', grade: 'Durchschnitt: 2,5', details: ['Bachelor Thesis: Delay-tolerante Datenübertragung in mobilen Sensornetzen, verfasst in Deutsch'] },
      { period: '1996 – 2009', institution: 'Willibrord Gymnasium Emmerich, NRW', title: 'Abitur', grade: 'Durchschnitt: 2,3', details: ['Abiturfächer: Mathe LK, Geschichte LK, Englisch, Informatik'] }
    ],
    skills: [{ group: 'Programmiersprachen', icon: Code2, items: ['Objective-C','Swift','C / C++','C#','Java','JavaScript','TypeScript','PHP','ASP.NET'] }, { group: 'Systeme & Frameworks', icon: Building2, items: ['Linux-Serveradministration','Windows-Serveradministration','Polymer','ReactJS','Vue.js','Symfony','Laravel','Node.js','Chromium Embedded Framework'] }],
    spokenLanguages: ['Deutsch', 'Englisch in Wort und Schrift'], hobbies: [{ label: 'Badminton', icon: Dumbbell }, { label: 'Drohne fliegen', icon: Plane }, { label: 'Gitarre spielen', icon: Guitar }]
  },
};

data.en = {
  ...data.de,
  nav: { profile: 'Profile', experience: 'Experience', education: 'Education', skills: 'Skills', contact: 'Contact', themeLight: 'Light mode', themeDark: 'Dark mode', design: 'Choose design' },
  brand: { sub: 'IT Strategy · Architecture', footer: 'IT Strategy · Architecture · Innovation' },
  unlock: { msg: 'Design palette unlocked — tap the palette icon top right', short: 'Unlocked!' },
  hero: { ...data.de.hero, degree: 'M.Sc. Computer Science', role: 'Head of IT Strategy and Architecture Team', location: 'Lautertal, Germany', born: 'Born on August 9, 1989 in Goch, Germany', maritalStatus: 'Married, 2 children', tagline: 'IT strategy, architecture and innovation with hands-on depth: from smart-city platforms to AI, automation and scalable digital solutions.', highlights: ['Disciplinary and functional leadership', 'IT strategy & architecture', 'SmartCity platform awarded with the VKU Innovation Award 2023', 'Software development, app development and cloud-adjacent architectures'] },
  stats: [{ label: 'Years of IT experience', value: '18+' }, { label: 'Mainova roles', value: '4' }, { label: 'Degree', value: 'M.Sc.' }, { label: 'Technology fields', value: 'AI · VR · SmartCity' }],
  sections: { profileEyebrow: 'Profile', profileTitle: 'Profile', profileText: 'I combine technical depth with a strategic perspective. My focus is on making emerging technologies usable in an enterprise context, shaping sustainable architecture decisions and enabling teams to implement digital solutions.', experienceEyebrow: 'Career', experienceTitle: 'Professional Experience', educationEyebrow: 'Education', educationTitle: 'Education', skillsEyebrow: 'Technologies', skillsTitle: 'Skills & Technologies', languagesTitle: 'Languages', hobbiesTitle: 'Hobbies', searchPlaceholder: 'Search roles, technologies or topics …', contactEyebrow: 'Contact', contactTitle: 'Contact & Downloads', contactText: 'Feel free to get in touch by email or LinkedIn. The CV is available as a PDF matching the selected language.' },
  filters: { all: 'All', leadership: 'Leadership', architecture: 'Architecture', development: 'Development', innovation: 'Innovation' },
  pdf: { de: 'Lebenslauf herunterladen', en: 'Download CV' },
  quote: 'Awarded with the VKU Innovation Award 2023 for Mainova\'s SmartCity platform.',
  experience: data.de.experience.map(x => ({ ...x })).map((x, i) => Object.assign(x, [
    { period:'01/2026 – Present', role:'Head of IT Strategy and Architecture Team', bullets:['Disciplinary and functional leadership', 'AI Officer'] },
    { period:'10/2024 – 12/2025', role:'IT Architect', bullets:['Mainova IT'] },
    { period:'09/2020 – 10/2024', role:'SmartCity Solution Architect', bullets:["Development of Mainova's SmartCity platform", 'Awarded with the VKU Innovation Award 2023'], badge:'VKU Innovation Award 2023' },
    { period:'09/2018 – 09/2020', role:'IT Innovation Manager', bullets:['Evaluation of emerging technologies in the energy sector', 'Training employees in new technology areas', 'Projects in AI, VR, SmartCity, blockchain and internal process optimization / automation'] },
    { period:'09/2016 – 09/2018', role:'Head of Software Development', bullets:['Independent development of customer-specific web and app projects', 'Coordination of the team with other departments'] },
    { period:'08/2014 – 08/2016', role:'App Developer', bullets:['Development of apps for iOS, Android, Windows and Windows Phone', 'Further development of an app container for displaying web-based content', 'Development of automated build processes for apps', 'Advising management and customers on app-related questions'] },
    { period:'08/2009 – 08/2014', role:'Working Student Web Developer', bullets:['Working student, two days per week as web developer', 'Self-directed development into app development', 'Responsible for many IT-related topics'] },
    { period:'09/2008 – 06/2009', role:'Student Assistant Template & Web Development', company:'XYQOM GmbH, Waldbröl near Cologne', bullets:['Template implementation in TypoLight / Contao for customer websites', 'Creation of smaller TypoLight extensions', 'HTML5 ordering system with configurator for KRONE semi-trailers'] },
    { period:'07/2007 – 09/2009', role:'Student Assistant Online Shop', company:'Da Source Distribution, Cologne', bullets:['Maintenance of an ASP.NET-based online shop for DJ equipment and vinyl records', 'API integration for synchronizing product information and quantities with eBay and international online shops'] }
  ][i])),
  education: [
    { period:'04/2013 – 08/2018', institution:'Technical University of Darmstadt', title:'Master of Science Computer Science with minor in IT Management', grade:'Grade average: 1.87', details:['Focus areas: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering', 'Master thesis: Context-sensitive lookup of lexical-semantic and syntactic information in writing assistance systems, written in English'] },
    { period:'10/2009 – 04/2013', institution:'Technical University of Darmstadt', title:'Bachelor of Science Computer Science', grade:'Grade average: 2.5', details:['Bachelor thesis: Delay-tolerant data transmission in mobile sensor networks, written in German'] },
    { period:'1996 – 2009', institution:'Willibrord Gymnasium Emmerich, NRW', title:'Abitur / German university entrance qualification', grade:'Grade average: 2.3', details:['Exam subjects: Mathematics advanced course, History advanced course, English, Computer Science'] }
  ],
  skills: [{ group: 'Programming Languages', icon: Code2, items: data.de.skills[0].items }, { group: 'Systems & Frameworks', icon: Building2, items: ['Linux server administration','Windows server administration','Polymer','ReactJS','Vue.js','Symfony','Laravel','Node.js','Chromium Embedded Framework'] }],
  spokenLanguages: ['German', 'English spoken and written'], hobbies: [{ label: 'Badminton', icon: Dumbbell }, { label: 'Flying drones', icon: Plane }, { label: 'Playing guitar', icon: Guitar }]
};

const LINKEDIN = 'linkedin.com/in/marcel-wlotzka-5b61a0a4';
const LINKEDIN_URL = 'https://www.linkedin.com/in/marcel-wlotzka-5b61a0a4';

const cls = (...v) => v.filter(Boolean).join(' ');
const publicAsset = (file) => `${import.meta.env.BASE_URL}${file}`;
const pdfFor = (lang) => publicAsset(lang === 'de' ? 'Marcel_Wlotzka_Lebenslauf_DE.pdf' : 'Marcel_Wlotzka_CV_EN.pdf');
const allSkills = (t) => [...t.skills[0].items, ...t.skills[1].items];

const getInitialLang = () => {
  if (typeof navigator === 'undefined') return 'de';
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return (langs[0] || '').toLowerCase().startsWith('de') ? 'de' : 'en';
};
const getInitialTheme = () => (typeof localStorage === 'undefined' ? 'dark' : (localStorage.getItem('theme') === 'light' ? 'light' : 'dark'));

const DESIGNS = [
  { id: 'glow',      label: 'Glow',      hint: 'Modernes Dark Hero',     swatch: ['#020617','#22d3ee','#a5f3fc'] },
  { id: 'dossier',   label: 'Dossier',   hint: 'Sidebar Resume',         swatch: ['#D5E8F2','#002C77','#009AD8'] },
  { id: 'editorial', label: 'Editorial', hint: 'Magazine · Serif',       swatch: ['#FBF7F0','#1A1A1A','#C24A1F'] },
  { id: 'brutalist', label: 'Brutalist', hint: 'Bento · Hard Edges',     swatch: ['#F2EFE8','#0A0A0A','#FF3D00'] },
  { id: 'terminal',  label: 'Terminal',  hint: 'CLI · Mono · Hacker',    swatch: ['#0A1410','#00FF88','#FFB800'] },
  { id: 'doc',       label: 'Doc',       hint: 'Wiki · ToC · Callouts',  swatch: ['#FFFFFF','#37352F','#0A85D1'] },
  { id: 'synthwave', label: 'Synthwave', hint: 'Neon · 80s Retro',       swatch: ['#1A0033','#FF00DD','#00F0FF'] },
  { id: 'newspaper', label: 'Newspaper', hint: 'Vintage Print',          swatch: ['#F2E9D2','#1A1612','#8B1A1A'] },
  { id: 'gameui',    label: 'Game UI',   hint: 'RPG Character Sheet',    swatch: ['#0F1729','#39FF14','#FFD700'] },
  { id: 'vision',    label: 'Vision',    hint: 'Glass · Aurora',         swatch: ['#EEE9FB','#9D8FFB','#FFB59A'] },
  { id: 'scrapbook', label: 'Scrapbook', hint: 'Photo Album · Handwritten', swatch: ['#F2EAD8','#2A2722','#D85A3F'] },
  { id: 'trading',   label: 'Trading',   hint: 'Markets · Tickers',      swatch: ['#0A1A14','#00D27A','#FF3D6E'] },
  { id: 'boarding',  label: 'Boarding',  hint: 'Airline Tickets',        swatch: ['#FFFFFF','#0F2A4F','#FF8800'] },
  { id: 'comic',     label: 'Comic',     hint: 'Halftone · BAM!',        swatch: ['#FFF5C2','#0A0A0A','#E63946'] },
  { id: 'y2k',       label: 'Y2K',       hint: '2000s Web · Aqua',       swatch: ['#B8DAFF','#003C8F','#FF6FA3'] },
  { id: 'kanban',    label: 'Kanban',    hint: 'Board · Cards',          swatch: ['#0079BF','#FFFFFF','#61BD4F'] },
  { id: 'studio',    label: 'Studio',    hint: 'Music Player · Tracks',  swatch: ['#121212','#1DB954','#FFFFFF'] },
  { id: 'receipt',   label: 'Receipt',   hint: 'Thermal Print',          swatch: ['#FAFAF6','#1A1A1A','#1A1A1A'] },
  { id: 'blueprint', label: 'Blueprint', hint: 'Architectural Plan',     swatch: ['#0A4080','#FFFFFF','#FFE066'] },
  { id: 'pixel',     label: 'Pixel',     hint: '8-bit · Arcade',         swatch: ['#1F1F4A','#39FF14','#FF3838'] },
];

const LEGACY_DESIGN_IDS = { mainova: 'dossier', notion: 'doc', spotify: 'studio', polaroid: 'scrapbook' };
const getInitialDesign = () => {
  if (typeof localStorage === 'undefined') return 'glow';
  const stored = localStorage.getItem('design');
  const normalized = LEGACY_DESIGN_IDS[stored] || stored;
  return DESIGNS.some(d => d.id === normalized) ? normalized : 'glow';
};

const KONAMI = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
const getInitialUnlocked = () => {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem('designs-unlocked') === '1';
};

// =========================== SHARED UI ===========================
function DesignSwitcher({ design, setDesign, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', handler); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <div className="design-switcher" ref={ref}>
      <button className="design-toggle" onClick={() => setOpen(!open)} aria-label={label} title={label} aria-expanded={open}>
        <Palette size={18}/>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="design-menu" initial={{opacity:0,y:-6,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-6,scale:.97}} transition={{duration:.14}}>
            <p className="design-menu-title">{label}</p>
            {DESIGNS.map(d => (
              <button key={d.id} className={cls('design-option', design === d.id && 'active')} onClick={() => { setDesign(d.id); setOpen(false); }}>
                <span className="swatch">{d.swatch.map((c,i) => <i key={i} style={{background:c}}/>)}</span>
                <span className="design-meta"><b>{d.label}</b><small>{d.hint}</small></span>
                {design === d.id && <Check size={16} className="design-check"/>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Nav({ t, lang, setLang, theme, toggleTheme, design, setDesign, unlocked, onBrandClick }) {
  const [open, setOpen] = useState(false);
  const links = [['profile',t.nav.profile],['experience',t.nav.experience],['education',t.nav.education],['skills',t.nav.skills],['contact',t.nav.contact]];
  const themeLabel = theme === 'dark' ? t.nav.themeLight : t.nav.themeDark;
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          <img src={publicAsset('marcel-wlotzka.jpg')} onClick={(e) => { e.preventDefault(); onBrandClick(); }}/>
          <span><b>Marcel Wlotzka</b><small>{t.brand.sub}</small></span>
        </a>
        <nav>{links.map(([h,l]) => <a key={h} href={'#'+h}>{l}</a>)}</nav>
        <div className="lang">
          <button onClick={() => setLang('de')} className={lang === 'de' ? 'active' : ''}>DE</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          {unlocked && <DesignSwitcher design={design} setDesign={setDesign} label={t.nav.design}/>}
          <button className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button>
          <button className="mobile" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
      <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{height:0}} animate={{height:'auto'}} exit={{height:0}}>{links.map(([h,l]) => <a onClick={() => setOpen(false)} key={h} href={'#'+h}>{l}</a>)}</motion.div>}</AnimatePresence>
    </header>
  );
}

// ============================ GLOW (default) =====================
function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section-block">
      <motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}
function GlowHero({t}) {
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
          <span className="pill"><Sparkles size={16}/>{t.hero.degree}</span>
          <h1>{t.hero.name}</h1>
          <h3>{t.hero.role}</h3>
          <p>{t.hero.tagline}</p>
          <div className="actions">
            <a className="primary" href="#experience">CV ansehen <ChevronRight size={18}/></a>
            <a className="secondary" href={'mailto:'+t.hero.email}><Mail size={18}/> {t.hero.email}</a>
          </div>
        </motion.div>
        <motion.aside className="photo-card" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}}>
          <img src={publicAsset('marcel-wlotzka.jpg')} alt="Marcel Wlotzka"/>
          <div className="info">
            <p><MapPin size={16}/>{t.hero.location}</p>
            <p><Calendar size={16}/>{t.hero.born}</p>
            <p><UserRound size={16}/>{t.hero.maritalStatus}</p>
          </div>
          {t.hero.highlights.map(h => <div className="highlight" key={h}>{h}</div>)}
        </motion.aside>
      </div>
      <div className="stats">{t.stats.map(s => <div className="stat" key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}</div>
    </section>
  );
}
function GlowExperience({t}) {
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState(0);
  const filtered = useMemo(() => t.experience.filter(item => {
    const hay = [item.period, item.company, item.role, ...item.bullets, ...item.tags].join(' ').toLowerCase();
    return (filter === 'all' || item.tags.includes(filter)) && (!q || hay.includes(q.toLowerCase()));
  }), [t, filter, q]);
  return (
    <Section id="experience" eyebrow={t.sections.experienceEyebrow} title={t.sections.experienceTitle}>
      <div className="tools">
        <label><Search size={18}/><input value={q} onChange={e => setQ(e.target.value)} placeholder={t.sections.searchPlaceholder}/></label>
        <div>{Object.entries(t.filters).map(([k,l]) => <button className={filter === k ? 'active' : ''} onClick={() => setFilter(k)} key={k}>{l}</button>)}</div>
      </div>
      <div className="timeline">{filtered.map((item,i) => (
        <article key={item.period+item.role}>
          <button onClick={() => setExpanded(expanded === i ? -1 : i)}>
            <span className="dot"/>
            <div className="row">
              <div><small>{item.period}</small><h3>{item.role}</h3><p>{item.company}</p></div>
              <div className="tags">{item.badge && <em><Award size={14}/>{item.badge}</em>}{item.tags.map(tag => <span key={tag}>{t.filters[tag]}</span>)}</div>
            </div>
            <AnimatePresence>{expanded === i && (
              <motion.ul initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>
                {item.bullets.map(b => <li key={b}><ChevronRight size={16}/>{b}</li>)}
              </motion.ul>
            )}</AnimatePresence>
          </button>
        </article>
      ))}</div>
    </Section>
  );
}
function GlowEducation({t}) {
  return (
    <Section id="education" eyebrow={t.sections.educationEyebrow} title={t.sections.educationTitle}>
      <div className="cards three">{t.education.map(e => (
        <article className="card" key={e.title}>
          <div className="card-meta"><GraduationCap size={20}/><small>{e.period}</small></div>
          <h3>{e.title}</h3><p>{e.institution}</p><b>{e.grade}</b>
          {e.details.map(d => <p className="detail" key={d}>{d}</p>)}
        </article>
      ))}</div>
    </Section>
  );
}
function GlowSkills({t}) {
  return (
    <Section id="skills" eyebrow={t.sections.skillsEyebrow} title={t.sections.skillsTitle}>
      <div className="cards two">{t.skills.map(g => {
        const Icon = g.icon;
        return <article className="card" key={g.group}><Icon/><h3>{g.group}</h3><div className="chips">{g.items.map(i => <span key={i}>{i}</span>)}</div></article>;
      })}</div>
      <div className="cards two lower">
        <article className="card"><Languages/><h3>{t.sections.languagesTitle}</h3><div className="chips">{t.spokenLanguages.map(l => <span key={l}>{l}</span>)}</div></article>
        <article className="card"><Sparkles/><h3>{t.sections.hobbiesTitle}</h3><div className="hobbies">{t.hobbies.map(h => { const Icon = h.icon; return <span key={h.label}><Icon size={18}/>{h.label}</span>; })}</div></article>
      </div>
    </Section>
  );
}
function GlowContact({t, lang}) {
  return (
    <Section id="contact" eyebrow={t.sections.contactEyebrow} title={t.sections.contactTitle}>
      <div className="contact">
        <p>{t.sections.contactText}</p>
        <div className="actions">
          <a className="primary" href={'mailto:'+t.hero.email}><Mail size={18}/> {t.hero.email}</a>
          <a className="secondary" href={pdfFor(lang)} target="_blank" rel="noopener noreferrer"><Download size={18}/> {t.pdf[lang]}</a>
          <a className="secondary" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Globe2 size={18}/> LinkedIn</a>
        </div>
      </div>
    </Section>
  );
}
function GlowLayout({ t, lang }) {
  return (
    <main>
      <GlowHero t={t}/>
      <div className="container">
        <Section id="profile" eyebrow={t.sections.profileEyebrow} title={t.sections.profileTitle}>
          <div className="profile-grid">
            <div className="card"><Briefcase/><h3>{t.hero.role}</h3><p>{t.hero.location}</p></div>
            <div className="card"><p className="big">{t.sections.profileText}</p></div>
          </div>
        </Section>
        <GlowExperience t={t}/>
        <GlowEducation t={t}/>
        <GlowSkills t={t}/>
        <GlowContact t={t} lang={lang}/>
      </div>
    </main>
  );
}

// ======================= DOSSIER · SIDEBAR RESUME ======================
function DossierLayout({ t, lang }) {
  return (
    <main className="m-layout">
      <aside className="m-sidebar">
        <div className="m-sticky">
          <div className="m-photo"><img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/></div>
          <div className="m-id">
            <h1>{t.hero.name}</h1>
            <p>{t.hero.role}</p>
          </div>
          <ul className="m-contact">
            <li><Mail size={14}/> <a href={'mailto:'+t.hero.email}>{t.hero.email}</a></li>
            <li><Globe2 size={14}/> <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">{LINKEDIN}</a></li>
            <li><MapPin size={14}/> {t.hero.location}</li>
            <li><Calendar size={14}/> {t.hero.born}</li>
            <li><UserRound size={14}/> {t.hero.maritalStatus}</li>
          </ul>
          <div className="m-block">
            <h4>{t.sections.languagesTitle}</h4>
            <ul className="m-list">{t.spokenLanguages.map(l => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="m-block">
            <h4>{t.sections.skillsTitle}</h4>
            <div className="m-chips">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
          </div>
          <div className="m-block">
            <h4>{t.sections.hobbiesTitle}</h4>
            <ul className="m-list m-icon-list">{t.hobbies.map(h => { const Icon = h.icon; return <li key={h.label}><Icon size={14}/> {h.label}</li>; })}</ul>
          </div>
          <a className="m-pdf" href={pdfFor(lang)} target="_blank" rel="noreferrer"><Download size={16}/> {t.pdf[lang]}</a>
        </div>
      </aside>
      <article className="m-main">
        <section id="profile" className="m-section">
          <h2>{t.sections.profileTitle}</h2>
          <p className="m-lead">{t.hero.tagline}</p>
          <p className="m-body">{t.sections.profileText}</p>
        </section>
        <section id="experience" className="m-section">
          <h2>{t.sections.experienceTitle}</h2>
          <ol className="m-timeline">
            {t.experience.map((e, i) => (
              <li key={i}>
                <div className="m-period">{e.period}</div>
                <div className="m-entry">
                  <h3>{e.role}</h3>
                  <p className="m-company">{e.company}</p>
                  {e.badge && <p className="m-badge"><Award size={14}/> {e.badge}</p>}
                  <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section id="education" className="m-section">
          <h2>{t.sections.educationTitle}</h2>
          <ol className="m-timeline">
            {t.education.map(e => (
              <li key={e.title}>
                <div className="m-period">{e.period}</div>
                <div className="m-entry">
                  <h3>{e.title}</h3>
                  <p className="m-company">{e.institution} · <b>{e.grade}</b></p>
                  {e.details.map(d => <p key={d} className="m-detail">{d}</p>)}
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section id="contact" className="m-section">
          <h2>{t.sections.contactTitle}</h2>
          <p className="m-body">{t.sections.contactText}</p>
          <div className="m-cta">
            <a className="primary" href={'mailto:'+t.hero.email}><Mail size={16}/> {t.hero.email}</a>
            <a className="secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Globe2 size={16}/> LinkedIn</a>
          </div>
        </section>
      </article>
    </main>
  );
}

// ============================ EDITORIAL · MAGAZINE =====================
function EditorialLayout({ t, lang }) {
  const profile = t.sections.profileText;
  const dropChar = profile.charAt(0);
  const profileRest = profile.slice(1);
  return (
    <main className="e-layout">
      {/* Cover */}
      <section className="e-cover" id="top">
        <img className="e-cover-photo" src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
        <div className="e-cover-shade"/>
        <div className="e-cover-text">
          <p className="e-issue">No. 01 · {new Date().getFullYear()}</p>
          <h1>{t.hero.name}</h1>
          <p className="e-cover-role">{t.hero.role}</p>
          <p className="e-cover-meta">{t.hero.degree} · {t.hero.location}</p>
        </div>
      </section>

      {/* Profile / lead */}
      <section className="e-section" id="profile">
        <p className="e-eyebrow">{t.sections.profileEyebrow}</p>
        <h2 className="e-h2">{t.sections.profileTitle}</h2>
        <p className="e-tagline">{t.hero.tagline}</p>
        <div className="e-prose">
          <p><span className="e-dropcap">{dropChar}</span>{profileRest}</p>
        </div>
        <ul className="e-stats">{t.stats.map(s => <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>)}</ul>
      </section>

      {/* Pull quote */}
      <section className="e-pullquote">
        <Quote size={36}/>
        <blockquote>{t.quote}</blockquote>
      </section>

      {/* Experience as numbered articles */}
      <section className="e-section" id="experience">
        <p className="e-eyebrow">{t.sections.experienceEyebrow}</p>
        <h2 className="e-h2">{t.sections.experienceTitle}</h2>
        <div className="e-articles">
          {t.experience.map((e, i) => (
            <article key={i} className="e-article">
              <span className="e-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="e-article-body">
                <p className="e-period">{e.period}</p>
                <h3>{e.role}</h3>
                <p className="e-company">{e.company}</p>
                {e.badge && <p className="e-badge"><Award size={14}/> {e.badge}</p>}
                <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education in 3 cols */}
      <section className="e-section" id="education">
        <p className="e-eyebrow">{t.sections.educationEyebrow}</p>
        <h2 className="e-h2">{t.sections.educationTitle}</h2>
        <div className="e-edu">
          {t.education.map(e => (
            <div key={e.title} className="e-edu-col">
              <p className="e-period">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="e-company">{e.institution}</p>
              <p className="e-grade">{e.grade}</p>
              {e.details.map(d => <p key={d} className="e-detail">{d}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Skills as flowing prose */}
      <section className="e-section" id="skills">
        <p className="e-eyebrow">{t.sections.skillsEyebrow}</p>
        <h2 className="e-h2">{t.sections.skillsTitle}</h2>
        <div className="e-skills">
          {t.skills.map(g => (
            <p key={g.group} className="e-skills-row">
              <b>{g.group} —</b> {g.items.join('  ·  ')}
            </p>
          ))}
          <p className="e-skills-row"><b>{t.sections.languagesTitle} —</b> {t.spokenLanguages.join('  ·  ')}</p>
          <p className="e-skills-row"><b>{t.sections.hobbiesTitle} —</b> {t.hobbies.map(h => h.label).join('  ·  ')}</p>
        </div>
      </section>

      {/* Colophon contact */}
      <section className="e-section e-contact" id="contact">
        <p className="e-eyebrow">{t.sections.contactEyebrow}</p>
        <h2 className="e-h2">{t.sections.contactTitle}</h2>
        <p className="e-tagline">{t.sections.contactText}</p>
        <div className="e-actions">
          <a href={'mailto:'+t.hero.email}><Mail size={16}/> {t.hero.email}</a>
          <a href={pdfFor(lang)} target="_blank" rel="noreferrer"><Download size={16}/> {t.pdf[lang]}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Globe2 size={16}/> {LINKEDIN}</a>
        </div>
      </section>
    </main>
  );
}

// ============================ BRUTALIST · BENTO =====================
function BrutalistLayout({ t, lang }) {
  return (
    <main className="b-layout">
      <div className="bento">
        <div className="b-tile b-name" id="profile">
          <p className="b-eyebrow">CV / 2026</p>
          <h1>{t.hero.name}</h1>
          <p className="b-role">{t.hero.role}</p>
          <p className="b-meta">{t.hero.degree} · {t.hero.location}</p>
        </div>
        <div className="b-tile b-photo">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
        </div>

        {t.stats.map(s => (
          <div key={s.label} className="b-tile b-stat">
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}

        <div className="b-tile b-profile">
          <h3 className="b-h3">{t.sections.profileTitle}</h3>
          <p>{t.sections.profileText}</p>
        </div>

        <div className="b-tile b-experience" id="experience">
          <div className="b-h3-row">
            <h3 className="b-h3">{t.sections.experienceTitle}</h3>
            <p className="b-hint"><ArrowRight size={14}/> scroll</p>
          </div>
          <div className="b-scroll">
            {t.experience.map((e, i) => (
              <article key={i} className="b-card">
                <p className="b-period">{e.period}</p>
                <h4>{e.role}</h4>
                <p className="b-company">{e.company}</p>
                {e.badge && <p className="b-badge">★ {e.badge}</p>}
                <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>

        <div className="b-tile b-edu" id="education">
          <h3 className="b-h3">{t.sections.educationTitle}</h3>
          {t.education.map(e => (
            <div key={e.title} className="b-edu-row">
              <p className="b-period">{e.period}</p>
              <h4>{e.title}</h4>
              <p className="b-company">{e.institution} · <b>{e.grade}</b></p>
            </div>
          ))}
        </div>

        <div className="b-tile b-skills" id="skills">
          <h3 className="b-h3">{t.sections.skillsTitle}</h3>
          <div className="b-chips">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
        </div>

        <div className="b-tile b-lang">
          <h3 className="b-h3">{t.sections.languagesTitle}</h3>
          <ul>{t.spokenLanguages.map(l => <li key={l}>{l}</li>)}</ul>
        </div>

        <div className="b-tile b-hobbies">
          <h3 className="b-h3">{t.sections.hobbiesTitle}</h3>
          <div className="b-hobby-grid">{t.hobbies.map(h => { const Icon = h.icon; return <span key={h.label}><Icon size={26}/><b>{h.label}</b></span>; })}</div>
        </div>

        <div className="b-tile b-contact" id="contact">
          <h3 className="b-h3">{t.sections.contactTitle}</h3>
          <p>{t.sections.contactText}</p>
          <div className="b-actions">
            <a className="primary" href={'mailto:'+t.hero.email}><Mail size={16}/> {t.hero.email}</a>
            <a className="secondary" href={pdfFor(lang)} target="_blank" rel="noreferrer"><Download size={16}/> PDF</a>
            <a className="secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Globe2 size={16}/> LinkedIn</a>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================ TERMINAL · CLI =====================
function TermCmd({ children }) {
  return <div className="t-cmd"><span className="t-prompt">marcel@cv:~$</span> <span className="t-cmd-text">{children}</span></div>;
}

function TerminalLayout({ t, lang }) {
  return (
    <main className="t-layout">
      <div className="t-window">
        <header className="t-bar">
          <div className="t-lights"><span/><span/><span/></div>
          <div className="t-title"><TerminalIcon size={14}/> marcel.wlotzka — zsh — 100×40</div>
          <div className="t-bar-spacer"/>
        </header>
        <div className="t-body">
          <TermCmd>whoami</TermCmd>
          <div className="t-out">
            <p className="t-name">{t.hero.name}</p>
            <p>{t.hero.role}</p>
            <p className="t-dim">{t.hero.degree} · {t.hero.location}</p>
            <p className="t-dim">{t.hero.born}</p>
          </div>

          <TermCmd>cat profile.md</TermCmd>
          <div className="t-out">
            <p className="t-h"># {t.sections.profileTitle}</p>
            <p>{t.hero.tagline}</p>
            <p>{t.sections.profileText}</p>
          </div>

          <TermCmd>ls -la experience/</TermCmd>
          <div className="t-out" id="experience">
            <p className="t-dim">total {t.experience.length}</p>
            {t.experience.map((e, i) => (
              <div key={i} className="t-entry">
                <p><span className="t-blue">{e.period}</span>  <b className="t-bright">{e.role}</b>  <span className="t-dim">@ {e.company}</span></p>
                {e.badge && <p className="t-amber">  ★ {e.badge}</p>}
                {e.bullets.map(b => <p key={b} className="t-li">  · {b}</p>)}
              </div>
            ))}
          </div>

          <TermCmd>cat education.txt</TermCmd>
          <div className="t-out" id="education">
            {t.education.map(e => (
              <div key={e.title} className="t-entry">
                <p><span className="t-blue">{e.period}</span>  <b className="t-bright">{e.title}</b></p>
                <p className="t-dim">  {e.institution} · {e.grade}</p>
              </div>
            ))}
          </div>

          <TermCmd>pkg list --installed</TermCmd>
          <div className="t-out" id="skills">
            {t.skills.map(g => (
              <div key={g.group} className="t-entry">
                <p className="t-blue">[{g.group}]</p>
                {g.items.map(item => <p key={item} className="t-li"><span className="t-amber">  ✓</span> {item}</p>)}
              </div>
            ))}
          </div>

          <TermCmd>i18n --status</TermCmd>
          <div className="t-out">{t.spokenLanguages.map(l => <p key={l} className="t-li"><span className="t-amber">  ✓</span> {l}</p>)}</div>

          <TermCmd>hobbies --list</TermCmd>
          <div className="t-out">{t.hobbies.map(h => <p key={h.label} className="t-li">  · {h.label}</p>)}</div>

          <TermCmd>contact --info</TermCmd>
          <div className="t-out" id="contact">
            <p>  email:    <a href={'mailto:'+t.hero.email}>{t.hero.email}</a></p>
            <p>  linkedin: <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">{LINKEDIN}</a></p>
            <p>  pdf:      <a href={pdfFor(lang)} target="_blank" rel="noreferrer">./{lang === 'de' ? 'Marcel_Wlotzka_Lebenslauf_DE.pdf' : 'Marcel_Wlotzka_CV_EN.pdf'}</a></p>
          </div>

          <div className="t-cmd"><span className="t-prompt">marcel@cv:~$</span> <span className="t-cursor">_</span></div>
        </div>
      </div>
    </main>
  );
}

// ============================ DOC · WIKI =====================
function DocLayout({ t, lang }) {
  const sections = [
    { id: 'profile',    label: t.sections.profileTitle,    emoji: '👤' },
    { id: 'experience', label: t.sections.experienceTitle, emoji: '💼' },
    { id: 'education',  label: t.sections.educationTitle,  emoji: '🎓' },
    { id: 'skills',     label: t.sections.skillsTitle,     emoji: '🛠️' },
    { id: 'contact',    label: t.sections.contactTitle,    emoji: '📬' },
  ];
  return (
    <main className="n-layout">
      <aside className="n-toc">
        <p className="n-toc-title">{lang === 'de' ? 'Auf dieser Seite' : 'On this page'}</p>
        <ul>{sections.map(s => <li key={s.id}><a href={'#'+s.id}>{s.emoji} {s.label}</a></li>)}</ul>
      </aside>
      <article className="n-doc">
        <header className="n-header">
          <p className="n-path">CV / {t.hero.name}</p>
          <h1 className="n-title"><span className="n-page-icon">📄</span> {t.hero.name}</h1>
          <div className="n-props">
            <div><span>Role</span><b>{t.hero.role}</b></div>
            <div><span>Degree</span><b>{t.hero.degree}</b></div>
            <div><span>Location</span><b>{t.hero.location}</b></div>
            <div><span>Email</span><b><a href={'mailto:'+t.hero.email}>{t.hero.email}</a></b></div>
          </div>
        </header>

        <div className="n-callout n-callout-blue">
          <span className="n-callout-icon">💡</span>
          <p>{t.hero.tagline}</p>
        </div>

        <h2 id="profile">{sections[0].emoji} {sections[0].label}</h2>
        <p>{t.sections.profileText}</p>

        <h2 id="experience">{sections[1].emoji} {sections[1].label}</h2>
        {t.experience.map((e, i) => (
          <div key={i} className="n-toggle">
            <div className="n-toggle-head">
              <span className="n-tag">{e.period}</span>
              <b>{e.role}</b>
              <span className="n-meta">@ {e.company}</span>
            </div>
            {e.badge && <p className="n-callout n-callout-yellow"><span className="n-callout-icon">🏆</span> {e.badge}</p>}
            <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
          </div>
        ))}

        <h2 id="education">{sections[2].emoji} {sections[2].label}</h2>
        {t.education.map(e => (
          <div key={e.title} className="n-toggle">
            <div className="n-toggle-head">
              <span className="n-tag">{e.period}</span>
              <b>{e.title}</b>
              <span className="n-meta">{e.institution} · {e.grade}</span>
            </div>
            {e.details.map(d => <p key={d}>{d}</p>)}
          </div>
        ))}

        <h2 id="skills">{sections[3].emoji} {sections[3].label}</h2>
        {t.skills.map(g => (
          <div key={g.group} className="n-skill-group">
            <h3>{g.group}</h3>
            <p className="n-codes">{g.items.map(i => <code key={i}>{i}</code>)}</p>
          </div>
        ))}
        <h3>{t.sections.languagesTitle}</h3>
        <p className="n-codes">{t.spokenLanguages.map(l => <code key={l}>{l}</code>)}</p>
        <h3>{t.sections.hobbiesTitle}</h3>
        <p className="n-codes">{t.hobbies.map(h => <code key={h.label}>{h.label}</code>)}</p>

        <h2 id="contact">{sections[4].emoji} {sections[4].label}</h2>
        <div className="n-callout n-callout-gray">
          <span className="n-callout-icon">📥</span>
          <div>
            <p>{t.sections.contactText}</p>
            <div className="n-actions">
              <a href={'mailto:'+t.hero.email}><Mail size={14}/> {t.hero.email}</a>
              <a href={pdfFor(lang)} target="_blank" rel="noreferrer"><Download size={14}/> {t.pdf[lang]}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Globe2 size={14}/> LinkedIn</a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

// ============================ SYNTHWAVE · NEON =====================
function SynthwaveLayout({ t, lang }) {
  return (
    <main className="sw-layout">
      <div className="sw-grid"/>
      <div className="sw-sun"/>
      <section className="sw-hero" id="profile">
        <div className="sw-hero-text">
          <p className="sw-eyebrow">// SYS.RUN ./marcel.exe</p>
          <h1 className="sw-name" data-text={t.hero.name}>{t.hero.name}</h1>
          <p className="sw-role">{t.hero.role}</p>
          <p className="sw-tagline">{t.hero.tagline}</p>
        </div>
        <div className="sw-photo">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          <div className="sw-photo-glow"/>
        </div>
      </section>

      <section className="sw-panel" id="experience">
        <header className="sw-panel-head">
          <h2>// MISSION LOG</h2>
          <span>{String(t.experience.length).padStart(2,'0')} ENTRIES</span>
        </header>
        <div className="sw-missions">
          {t.experience.map((e, i) => (
            <article key={i} className="sw-mission">
              <p className="sw-period">▸ {e.period}</p>
              <h3>{e.role}</h3>
              <p className="sw-company">@ {e.company}</p>
              {e.badge && <p className="sw-badge">★ {e.badge}</p>}
              <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sw-panel" id="education">
        <header className="sw-panel-head"><h2>// CREDENTIALS</h2></header>
        <div className="sw-edu-grid">
          {t.education.map(e => (
            <div key={e.title} className="sw-edu">
              <p className="sw-period">{e.period}</p>
              <h3>{e.title}</h3>
              <p>{e.institution}</p>
              <p className="sw-grade">{e.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sw-panel" id="skills">
        <header className="sw-panel-head"><h2>// LOADOUT</h2></header>
        <div className="sw-chips">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
        <div className="sw-aux">
          <div className="sw-aux-block">
            <h4>// LANGUAGES</h4>
            {t.spokenLanguages.map(l => <p key={l}>· {l}</p>)}
          </div>
          <div className="sw-aux-block">
            <h4>// HOBBIES</h4>
            {t.hobbies.map(h => <p key={h.label}>· {h.label}</p>)}
          </div>
        </div>
      </section>

      <section className="sw-panel sw-contact" id="contact">
        <header className="sw-panel-head"><h2>// TRANSMIT</h2></header>
        <p className="sw-contact-line">{t.sections.contactText}</p>
        <div className="sw-cta">
          <a className="sw-btn" href={'mailto:'+t.hero.email}>SEND EMAIL ▸</a>
          <a className="sw-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">DOWNLOAD CV ▸</a>
          <a className="sw-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LINKEDIN ▸</a>
        </div>
      </section>
    </main>
  );
}

// ============================ NEWSPAPER · VINTAGE PRINT =====================
function NewspaperLayout({ t, lang }) {
  const profile = t.sections.profileText;
  const dropChar = profile.charAt(0);
  const profileRest = profile.slice(1);
  const dateStr = new Date().toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <main className="np-layout">
      <header className="np-masthead">
        <div className="np-edition-bar">
          <span>VOL. XVIII</span>
          <span>{dateStr.toUpperCase()}</span>
          <span>{lang === 'de' ? 'EDITION DE' : 'EDITION EN'} · €0,00</span>
        </div>
        <h1 className="np-title">The Wlotzka Herald</h1>
        <p className="np-subtitle">— Strategy · Architecture · Innovation, since A.D. 2007 —</p>
      </header>

      <section className="np-lead" id="profile">
        <p className="np-eyebrow">— LEAD STORY —</p>
        <h2 className="np-h2">{t.hero.role}</h2>
        <p className="np-byline">By M. Wlotzka, Special Correspondent · {t.hero.location}</p>
        <div className="np-prose">
          <p><span className="np-dropcap">{dropChar}</span>{profileRest}</p>
          <p>{t.hero.tagline}</p>
        </div>
      </section>

      <hr className="np-rule"/>

      <section className="np-section" id="experience">
        <p className="np-eyebrow">— CAREER ARCHIVES —</p>
        <h2 className="np-h2">{t.sections.experienceTitle}</h2>
        <div className="np-cols">
          {t.experience.map((e, i) => (
            <article key={i} className="np-story">
              <h3>{e.role}</h3>
              <p className="np-byline">{e.company} · {e.period}</p>
              {e.badge && <p className="np-badge">★  {e.badge}  ★</p>}
              <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <hr className="np-rule"/>

      <section className="np-section" id="education">
        <p className="np-eyebrow">— ACADEMIC RECORD —</p>
        <h2 className="np-h2">{t.sections.educationTitle}</h2>
        <div className="np-edu">
          {t.education.map(e => (
            <div key={e.title} className="np-edu-entry">
              <h4>{e.title}</h4>
              <p className="np-byline">{e.institution} · {e.period} · {e.grade}</p>
              {e.details.map(d => <p key={d} className="np-detail">{d}</p>)}
            </div>
          ))}
        </div>
      </section>

      <hr className="np-rule"/>

      <section className="np-section" id="skills">
        <p className="np-eyebrow">— CLASSIFIED ADS —</p>
        <h2 className="np-h2">{lang === 'de' ? 'Werkzeuge & Sprachen' : 'Skills & Languages'}</h2>
        <div className="np-classified">
          {t.skills.map(g => (
            <div key={g.group}>
              <h4>{g.group.toUpperCase()}</h4>
              <p>{g.items.join(' · ')}</p>
            </div>
          ))}
          <div>
            <h4>{t.sections.languagesTitle.toUpperCase()}</h4>
            <p>{t.spokenLanguages.join(' · ')}</p>
          </div>
          <div>
            <h4>{t.sections.hobbiesTitle.toUpperCase()}</h4>
            <p>{t.hobbies.map(h => h.label).join(' · ')}</p>
          </div>
        </div>
      </section>

      <hr className="np-rule"/>

      <section className="np-section np-contact" id="contact">
        <p className="np-eyebrow">— CORRESPONDENCE —</p>
        <h2 className="np-h2">{t.sections.contactTitle}</h2>
        <p>{t.sections.contactText}</p>
        <div className="np-actions">
          <a href={'mailto:'+t.hero.email}>{t.hero.email}</a>
          <span> · </span>
          <a href={pdfFor(lang)} target="_blank" rel="noreferrer">{t.pdf[lang]}</a>
          <span> · </span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">{LINKEDIN}</a>
        </div>
      </section>
    </main>
  );
}

// ============================ GAME UI · RPG SHEET =====================
function GameUILayout({ t, lang }) {
  return (
    <main className="g-layout">
      <section className="g-header" id="profile">
        <div className="g-portrait">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          <div className="g-level">LV·{(new Date().getFullYear() - 2007)}</div>
        </div>
        <div className="g-id">
          <p className="g-class">CLASS · {t.hero.role.toUpperCase()}</p>
          <h1>{t.hero.name}</h1>
          <p className="g-title">▸ {t.hero.degree} · {t.hero.location}</p>
          <div className="g-stats">
            {t.stats.map((s, i) => (
              <div key={s.label} className="g-stat">
                <p>{s.label.toUpperCase()}</p>
                <b>{s.value}</b>
                <div className="g-bar"><span style={{width: `${72 + i * 6}%`}}/></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="g-panel" id="experience">
        <header className="g-panel-head">
          <h2>QUEST LOG</h2>
          <span className="g-count">{String(t.experience.length).padStart(2,'0')} QUESTS</span>
        </header>
        <div className="g-quests">
          {t.experience.map((e, i) => (
            <article key={i} className="g-quest">
              <div className={cls('g-quest-status', i === 0 && 'active')}>
                {i === 0 ? '◉ ACTIVE' : '◎ COMPLETE'}
              </div>
              <div className="g-quest-body">
                <p className="g-quest-period">{e.period}</p>
                <h3>{e.role}</h3>
                <p className="g-quest-loc">@ {e.company}</p>
                {e.badge && <p className="g-achievement">🏆 ACHIEVEMENT · {e.badge}</p>}
                <ul>{e.bullets.map(b => <li key={b}>▸ {b}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="g-panel" id="skills">
        <header className="g-panel-head"><h2>SKILL INVENTORY</h2><span className="g-count">{allSkills(t).length} ITEMS</span></header>
        <div className="g-inventory">
          {allSkills(t).map(s => <div key={s} className="g-item">{s}</div>)}
        </div>
        <div className="g-aux">
          <div>
            <h4>· LANGUAGES ·</h4>
            <ul>{t.spokenLanguages.map(l => <li key={l}>★ {l}</li>)}</ul>
          </div>
          <div>
            <h4>· HOBBIES ·</h4>
            <ul>{t.hobbies.map(h => <li key={h.label}>♢ {h.label}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="g-panel" id="education">
        <header className="g-panel-head"><h2>BACKGROUND</h2></header>
        {t.education.map(e => (
          <div key={e.title} className="g-edu">
            <p className="g-edu-period">{e.period}</p>
            <h3>{e.title}</h3>
            <p className="g-edu-meta">{e.institution} · GRADE: <b>{(e.grade.split(': ')[1]) || e.grade}</b></p>
          </div>
        ))}
      </section>

      <section className="g-panel g-contact" id="contact">
        <header className="g-panel-head"><h2>CONTACT NPC</h2></header>
        <p>{t.sections.contactText}</p>
        <div className="g-actions">
          <a className="g-btn g-btn-primary" href={'mailto:'+t.hero.email}>▸ SEND MESSAGE</a>
          <a className="g-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">▸ DOWNLOAD CV</a>
          <a className="g-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">▸ VIEW LINKEDIN</a>
        </div>
      </section>
    </main>
  );
}

// ============================ VISION · GLASSMORPHISM =====================
function VisionLayout({ t, lang }) {
  return (
    <main className="v-layout">
      <div className="v-aurora"/>
      <div className="v-aurora v-aurora-2"/>
      <section className="v-hero" id="profile">
        <div className="v-glass v-hero-card">
          <div className="v-portrait">
            <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          </div>
          <div className="v-hero-text">
            <p className="v-pill"><Sparkles size={14}/> {t.hero.degree}</p>
            <h1>{t.hero.name}</h1>
            <p className="v-role">{t.hero.role}</p>
            <p className="v-tagline">{t.hero.tagline}</p>
            <div className="v-meta">
              <span><MapPin size={14}/> {t.hero.location}</span>
              <span><Calendar size={14}/> {t.hero.born.replace(/^[Gg]eboren /, '').replace(/^Born /, '')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="v-row v-stats">
        {t.stats.map(s => (
          <div key={s.label} className="v-glass v-stat">
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="v-section" id="experience">
        <h2 className="v-h2">{t.sections.experienceTitle}</h2>
        <div className="v-floating-cards">
          {t.experience.map((e, i) => (
            <article key={i} className="v-glass v-exp">
              <p className="v-period">{e.period}</p>
              <h3>{e.role}</h3>
              <p className="v-company">{e.company}</p>
              {e.badge && <p className="v-badge"><Award size={14}/> {e.badge}</p>}
              <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="v-section" id="education">
        <h2 className="v-h2">{t.sections.educationTitle}</h2>
        <div className="v-row v-edu-row">
          {t.education.map(e => (
            <div key={e.title} className="v-glass v-edu">
              <p className="v-period">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="v-company">{e.institution}</p>
              <p className="v-grade">{e.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="v-section" id="skills">
        <h2 className="v-h2">{t.sections.skillsTitle}</h2>
        <div className="v-glass v-skills">
          <div className="v-chips">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
          <div className="v-aux-row">
            <div>
              <h4>{t.sections.languagesTitle}</h4>
              <p>{t.spokenLanguages.join(' · ')}</p>
            </div>
            <div>
              <h4>{t.sections.hobbiesTitle}</h4>
              <p>{t.hobbies.map(h => h.label).join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="v-section" id="contact">
        <div className="v-glass v-contact">
          <h2 className="v-h2">{t.sections.contactTitle}</h2>
          <p>{t.sections.contactText}</p>
          <div className="v-cta">
            <a className="v-btn v-btn-primary" href={'mailto:'+t.hero.email}><Mail size={16}/> {t.hero.email}</a>
            <a className="v-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer"><Download size={16}/> {t.pdf[lang]}</a>
            <a className="v-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer"><Globe2 size={16}/> LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================ SCRAPBOOK · PHOTO ALBUM =====================
function ScrapbookLayout({ t, lang }) {
  const tilts = ['rotate(-2.5deg)', 'rotate(1.8deg)', 'rotate(-1deg)', 'rotate(2.2deg)', 'rotate(-2deg)', 'rotate(1deg)', 'rotate(-1.6deg)', 'rotate(2.4deg)', 'rotate(-1.4deg)'];
  return (
    <main className="po-layout">
      <section className="po-hero" id="profile">
        <div className="po-photo">
          <div className="po-tape po-tape-tl"/>
          <div className="po-tape po-tape-tr"/>
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          <p className="po-caption">— {t.hero.name}, {new Date().getFullYear()}</p>
        </div>
        <div className="po-note po-tilted">
          <h1>{t.hero.name}</h1>
          <p className="po-role">{t.hero.role}</p>
          <p className="po-hand">{t.hero.tagline}</p>
          <p className="po-meta">📍 {t.hero.location} · ✉ {t.hero.email}</p>
        </div>
      </section>

      <section className="po-section" id="experience">
        <h2 className="po-h2">{t.sections.experienceTitle}</h2>
        <div className="po-cards">
          {t.experience.map((e, i) => (
            <article key={i} className="po-card" style={{transform: tilts[i % tilts.length]}}>
              <div className="po-tape po-tape-top"/>
              <p className="po-stamp">{e.period}</p>
              <h3>{e.role}</h3>
              <p className="po-where">@ {e.company}</p>
              {e.badge && <p className="po-sticker">⭐ {e.badge}</p>}
              <ul>{e.bullets.map(b => <li key={b}>· {b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="po-section" id="education">
        <h2 className="po-h2">{t.sections.educationTitle}</h2>
        <div className="po-cards">
          {t.education.map((e, i) => (
            <article key={e.title} className="po-card" style={{transform: tilts[(i + 4) % tilts.length]}}>
              <div className="po-tape po-tape-top"/>
              <p className="po-stamp">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="po-where">{e.institution} · {e.grade}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="po-section" id="skills">
        <h2 className="po-h2">{t.sections.skillsTitle}</h2>
        <div className="po-tags">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
        <div className="po-aux">
          <div className="po-note po-aux-note" style={{transform: 'rotate(-1.5deg)'}}>
            <h4>{t.sections.languagesTitle}</h4>
            {t.spokenLanguages.map(l => <p key={l} className="po-hand">{l}</p>)}
          </div>
          <div className="po-note po-aux-note" style={{transform: 'rotate(1.4deg)'}}>
            <h4>{t.sections.hobbiesTitle}</h4>
            {t.hobbies.map(h => <p key={h.label} className="po-hand">{h.label}</p>)}
          </div>
        </div>
      </section>

      <section className="po-section po-contact" id="contact">
        <div className="po-note" style={{transform: 'rotate(-1deg)'}}>
          <h2 className="po-h2">{t.sections.contactTitle}</h2>
          <p className="po-hand">{t.sections.contactText}</p>
          <div className="po-actions">
            <a href={'mailto:'+t.hero.email}>✉ {t.hero.email}</a>
            <a href={pdfFor(lang)} target="_blank" rel="noreferrer">📄 {t.pdf[lang]}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">🔗 LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================ TRADING · BLOOMBERG =====================
function TradingLayout({ t, lang }) {
  const tickerItems = allSkills(t).map((s, i) => ({ symbol: s.toUpperCase().replace(/[^A-Z0-9.]/g, '').slice(0, 6), val: (1.0 + Math.sin(i * 1.7) * 0.4).toFixed(2), pct: ((Math.sin(i) * 4.5).toFixed(2)) }));
  return (
    <main className="tr-layout">
      <div className="tr-ticker">
        <div className="tr-ticker-track">
          {[...tickerItems, ...tickerItems].map((it, i) => (
            <span key={i} className={cls('tr-ticker-item', parseFloat(it.pct) >= 0 ? 'up' : 'down')}>
              {it.symbol} <b>{it.val}</b> {parseFloat(it.pct) >= 0 ? '▲' : '▼'} {Math.abs(parseFloat(it.pct))}%
            </span>
          ))}
        </div>
      </div>

      <div className="tr-grid">
        <section className="tr-panel tr-id" id="profile">
          <header className="tr-panel-head"><h2>MWLOTZKA · OVERVIEW</h2><span className="tr-status">● LIVE</span></header>
          <div className="tr-id-body">
            <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
            <div>
              <h1>{t.hero.name}</h1>
              <p className="tr-role">{t.hero.role}</p>
              <p className="tr-meta">{t.hero.degree} · {t.hero.location} · {t.hero.email}</p>
              <p className="tr-tagline">{t.hero.tagline}</p>
            </div>
          </div>
        </section>

        <section className="tr-panel tr-stats">
          <header className="tr-panel-head"><h2>KEY METRICS</h2></header>
          <div className="tr-stat-grid">
            {t.stats.map((s, i) => (
              <div key={s.label} className="tr-stat">
                <p>{s.label.toUpperCase()}</p>
                <b>{s.value}</b>
                <span className={i % 2 === 0 ? 'up' : 'down'}>{i % 2 === 0 ? '▲ +' : '▲ +'}{(2.5 + i * 1.2).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="tr-panel tr-experience" id="experience">
          <header className="tr-panel-head"><h2>POSITIONS HISTORY</h2><span>{t.experience.length} entries</span></header>
          <table className="tr-table">
            <thead><tr><th>PERIOD</th><th>SYMBOL</th><th>ROLE</th><th className="tr-num">YIELD</th></tr></thead>
            <tbody>
              {t.experience.map((e, i) => (
                <tr key={i} className={i === 0 ? 'tr-active' : ''}>
                  <td className="tr-mono">{e.period}</td>
                  <td className="tr-sym">{e.company.split(/[ ,]/)[0].toUpperCase().slice(0, 6)}</td>
                  <td>
                    <b>{e.role}</b>
                    {e.badge && <span className="tr-tag">★ {e.badge}</span>}
                  </td>
                  <td className="tr-num up">▲ {(8 + Math.random() * 12).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="tr-panel tr-watchlist" id="education">
          <header className="tr-panel-head"><h2>CREDENTIALS</h2></header>
          {t.education.map(e => (
            <div key={e.title} className="tr-watch">
              <p className="tr-mono tr-dim">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="tr-meta">{e.institution} · GRADE <b>{e.grade.split(': ')[1] || e.grade}</b></p>
            </div>
          ))}
        </section>

        <section className="tr-panel tr-contact" id="contact">
          <header className="tr-panel-head"><h2>EXECUTE TRADE</h2></header>
          <p className="tr-meta">{t.sections.contactText}</p>
          <div className="tr-actions">
            <a className="tr-btn tr-btn-buy" href={'mailto:'+t.hero.email}>BUY · EMAIL</a>
            <a className="tr-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">DOWNLOAD PROSPECTUS</a>
            <a className="tr-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">VIEW PROFILE</a>
          </div>
        </section>
      </div>
    </main>
  );
}

// ============================ BOARDING · AIRLINE =====================
function BoardingLayout({ t, lang }) {
  const cities = ['CGN', 'DRM', 'NIS', 'NIS', 'OFB', 'FRA', 'FRA', 'FRA', 'FRA'];
  return (
    <main className="bp-layout">
      <header className="bp-header" id="profile">
        <div className="bp-header-row">
          <div>
            <p className="bp-airline">WLOTZKA AIRWAYS</p>
            <h1>{t.hero.name}</h1>
            <p className="bp-headline-meta">{t.hero.role} · {t.hero.degree}</p>
          </div>
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
        </div>
        <p className="bp-tagline">{t.hero.tagline}</p>
      </header>

      <section className="bp-section" id="experience">
        <h2 className="bp-h2">FLIGHT HISTORY · {t.sections.experienceTitle}</h2>
        <div className="bp-passes">
          {t.experience.map((e, i) => {
            const from = cities[(i + 1) % cities.length] || 'XXX';
            const to = cities[i % cities.length] || 'YYY';
            return (
              <article key={i} className="bp-pass">
                <div className="bp-pass-stub">
                  <p className="bp-stub-eyebrow">BOARDING PASS</p>
                  <p className="bp-flight">FLT MW{String(2026 - parseInt(e.period.slice(3, 7) || '2010')).padStart(2, '0')}{String(i + 1).padStart(2, '0')}</p>
                  <p className="bp-stub-meta">{e.period}</p>
                </div>
                <div className="bp-perf"/>
                <div className="bp-pass-main">
                  <div className="bp-route">
                    <div><p className="bp-tiny">FROM</p><b>{from}</b></div>
                    <div className="bp-line">────────✈────────</div>
                    <div><p className="bp-tiny">TO</p><b>{to}</b></div>
                  </div>
                  <h3>{e.role}</h3>
                  <p className="bp-where">@ {e.company}</p>
                  <div className="bp-row3">
                    <div><p className="bp-tiny">GATE</p><b>{String.fromCharCode(65 + (i % 6))}{i + 1}</b></div>
                    <div><p className="bp-tiny">SEAT</p><b>{18 + i}{'ABCDEF'[i % 6]}</b></div>
                    <div><p className="bp-tiny">ROLE</p><b>{e.tags[0] ? e.tags[0].slice(0, 4).toUpperCase() : 'IT'}</b></div>
                  </div>
                  {e.badge && <p className="bp-badge">★ {e.badge}</p>}
                  <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bp-section" id="education">
        <h2 className="bp-h2">FREQUENT FLYER · {t.sections.educationTitle}</h2>
        <div className="bp-edu-grid">
          {t.education.map(e => (
            <div key={e.title} className="bp-edu">
              <p className="bp-tiny">{e.period}</p>
              <h3>{e.title}</h3>
              <p>{e.institution} · {e.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bp-section" id="skills">
        <h2 className="bp-h2">CARRY-ON · {t.sections.skillsTitle}</h2>
        <div className="bp-bag">
          {allSkills(t).map(s => <span key={s}>{s}</span>)}
        </div>
      </section>

      <section className="bp-section bp-contact" id="contact">
        <h2 className="bp-h2">CONTACT THE CAPTAIN</h2>
        <p>{t.sections.contactText}</p>
        <div className="bp-actions">
          <a className="bp-btn bp-btn-primary" href={'mailto:'+t.hero.email}>BOOK FLIGHT · {t.hero.email}</a>
          <a className="bp-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">PRINT TICKET</a>
          <a className="bp-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">FREQUENT FLYER PROGRAM</a>
        </div>
      </section>
    </main>
  );
}

// ============================ COMIC · HALFTONE =====================
function ComicLayout({ t, lang }) {
  const exclaims = ['BAM!', 'POW!', 'ZAP!', 'WHAM!', 'BOOM!', 'SMASH!', 'CRASH!', 'KAPOW!', 'WHOOSH!'];
  return (
    <main className="cm-layout">
      <section className="cm-hero" id="profile">
        <div className="cm-panel cm-panel-big">
          <div className="cm-burst">
            <span>NEW!</span>
          </div>
          <p className="cm-eyebrow">— ISSUE #18 · {new Date().getFullYear()} —</p>
          <h1>{t.hero.name}</h1>
          <p className="cm-role">{t.hero.role}</p>
          <p className="cm-bubble">{t.hero.tagline}</p>
        </div>
        <div className="cm-panel cm-panel-photo">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          <div className="cm-tag">M.W.</div>
        </div>
      </section>

      <section className="cm-section" id="experience">
        <h2 className="cm-h2">— ORIGIN STORY —</h2>
        <div className="cm-grid">
          {t.experience.map((e, i) => (
            <article key={i} className="cm-panel cm-panel-exp">
              <div className="cm-action">{exclaims[i % exclaims.length]}</div>
              <p className="cm-period">{e.period}</p>
              <h3>{e.role}</h3>
              <p className="cm-where">@ {e.company}</p>
              {e.badge && <p className="cm-medal">🏆 {e.badge}</p>}
              <ul>{e.bullets.map(b => <li key={b}>★ {b}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cm-section" id="education">
        <h2 className="cm-h2">— TRAINING ARC —</h2>
        <div className="cm-grid cm-grid-3">
          {t.education.map(e => (
            <div key={e.title} className="cm-panel cm-panel-edu">
              <p className="cm-period">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="cm-where">{e.institution}</p>
              <p className="cm-grade">{e.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cm-section" id="skills">
        <h2 className="cm-h2">— POWERS & ABILITIES —</h2>
        <div className="cm-panel cm-panel-skills">
          <div className="cm-chips">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
        </div>
      </section>

      <section className="cm-section cm-contact" id="contact">
        <div className="cm-panel cm-panel-contact">
          <h2 className="cm-h2">— CONTACT THE HERO —</h2>
          <p>{t.sections.contactText}</p>
          <div className="cm-cta">
            <a className="cm-btn" href={'mailto:'+t.hero.email}>SEND SIGNAL!</a>
            <a className="cm-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">GET ORIGIN!</a>
            <a className="cm-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">VIEW HQ!</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================ Y2K · 2000s WEB =====================
function Y2KLayout({ t, lang }) {
  const tabs = [
    { id: 'profile', label: 'About Me', emoji: '☆' },
    { id: 'experience', label: 'My Career', emoji: '✦' },
    { id: 'education', label: 'School', emoji: '✿' },
    { id: 'skills', label: 'Tech Stuff', emoji: '✪' },
    { id: 'contact', label: 'E-Mail Me!', emoji: '✉' },
  ];
  return (
    <main className="yk-layout">
      <div className="yk-window">
        <header className="yk-titlebar">
          <span className="yk-titlebar-text">★ Marcel's Homepage v2.0 ★ — Microsoft Internet Explorer</span>
          <div className="yk-titlebar-buttons"><button>_</button><button>□</button><button>×</button></div>
        </header>
        <div className="yk-tabs">
          {tabs.map(tb => <a key={tb.id} href={'#'+tb.id} className="yk-tab">{tb.emoji} {tb.label}</a>)}
        </div>
        <div className="yk-body">
          <section className="yk-section" id="profile">
            <div className="yk-hero">
              <div className="yk-photo-frame"><img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/></div>
              <div>
                <h1 className="yk-h1">★~ Welcome to my Homepage ~★</h1>
                <p className="yk-marquee">~*~ Visitor #00012347 · Last updated: TODAY · Best viewed in 1024×768 ~*~</p>
                <h2>{t.hero.name}</h2>
                <p className="yk-blink">{t.hero.role}</p>
                <p>{t.hero.tagline}</p>
              </div>
            </div>
          </section>

          <section className="yk-section" id="experience">
            <h2 className="yk-h2">✦ My Career Journal ✦</h2>
            <table className="yk-table">
              <thead><tr><th>When?</th><th>Where?</th><th>What?</th></tr></thead>
              <tbody>
                {t.experience.map((e, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'yk-row' : 'yk-row alt'}>
                    <td>{e.period}</td>
                    <td>{e.company}</td>
                    <td>
                      <b>{e.role}</b>
                      {e.badge && <p className="yk-badge">{e.badge}</p>}
                      <ul>{e.bullets.map(b => <li key={b}>» {b}</li>)}</ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="yk-section" id="education">
            <h2 className="yk-h2">✿ My School Days ✿</h2>
            {t.education.map(e => (
              <div key={e.title} className="yk-card">
                <p className="yk-period">— {e.period} —</p>
                <h3>{e.title}</h3>
                <p>{e.institution} · {e.grade}</p>
              </div>
            ))}
          </section>

          <section className="yk-section" id="skills">
            <h2 className="yk-h2">✪ Tech I Like ✪</h2>
            <div className="yk-chips">{allSkills(t).map(s => <span key={s}>★ {s}</span>)}</div>
          </section>

          <section className="yk-section yk-contact" id="contact">
            <h2 className="yk-h2">✉ Sign My Guestbook!</h2>
            <p>{t.sections.contactText}</p>
            <div className="yk-buttons">
              <a className="yk-btn" href={'mailto:'+t.hero.email}>📧 E-Mail Me!</a>
              <a className="yk-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">📄 Download CV</a>
              <a className="yk-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">🌐 LinkedIn</a>
            </div>
            <p className="yk-footer-text">© Marcel · Made with ♥ on a Pentium III</p>
          </section>
        </div>
      </div>
    </main>
  );
}

// ============================ KANBAN · TRELLO =====================
function KanbanLayout({ t, lang }) {
  const columns = [
    { id: 'about', title: 'About', emoji: '👤' },
    { id: 'experience', title: t.sections.experienceTitle, emoji: '💼' },
    { id: 'education', title: t.sections.educationTitle, emoji: '🎓' },
    { id: 'skills', title: t.sections.skillsTitle, emoji: '🛠' },
    { id: 'contact', title: t.sections.contactTitle, emoji: '📩' },
  ];
  const labelColor = (i) => ['kn-l-green', 'kn-l-blue', 'kn-l-purple', 'kn-l-yellow', 'kn-l-red', 'kn-l-orange'][i % 6];
  return (
    <main className="kn-layout">
      <header className="kn-board-head">
        <div className="kn-board-title">
          <h1>{t.hero.name} · CV Board</h1>
          <p>{t.hero.role}</p>
        </div>
        <div className="kn-members">
          <div className="kn-avatar"><img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/></div>
        </div>
      </header>

      <div className="kn-columns">
        <div className="kn-col" id="profile">
          <header><span>{columns[0].emoji} {columns[0].title}</span><span className="kn-count">1</span></header>
          <div className="kn-card">
            <span className="kn-label kn-l-green">📍 {t.hero.location}</span>
            <h3>{t.hero.role}</h3>
            <p>{t.sections.profileText}</p>
            <div className="kn-footer">
              <span className="kn-meta">📅 18+ years</span>
              <span className="kn-meta">📎 1</span>
            </div>
          </div>
        </div>

        <div className="kn-col" id="experience">
          <header><span>{columns[1].emoji} {columns[1].title}</span><span className="kn-count">{t.experience.length}</span></header>
          {t.experience.map((e, i) => (
            <div key={i} className="kn-card">
              <div className="kn-labels">
                {e.tags.map((tag, j) => <span key={tag} className={cls('kn-label', labelColor(j))}>{t.filters[tag]}</span>)}
              </div>
              <h3>{e.role}</h3>
              <p className="kn-meta">{e.company}</p>
              {e.badge && <p className="kn-badge">🏆 {e.badge}</p>}
              <p className="kn-bullets">{e.bullets.slice(0, 2).join(' · ')}</p>
              <div className="kn-footer">
                <span className="kn-meta">📅 {e.period}</span>
                <span className="kn-meta">💬 {e.bullets.length}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="kn-col" id="education">
          <header><span>{columns[2].emoji} {columns[2].title}</span><span className="kn-count">{t.education.length}</span></header>
          {t.education.map(e => (
            <div key={e.title} className="kn-card">
              <span className="kn-label kn-l-blue">{e.grade.split(': ')[1] || e.grade}</span>
              <h3>{e.title}</h3>
              <p className="kn-meta">{e.institution}</p>
              <div className="kn-footer">
                <span className="kn-meta">📅 {e.period}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="kn-col" id="skills">
          <header><span>{columns[3].emoji} {columns[3].title}</span><span className="kn-count">{allSkills(t).length}</span></header>
          {t.skills.map(g => (
            <div key={g.group} className="kn-card">
              <h3>{g.group}</h3>
              <div className="kn-chips">{g.items.map(i => <span key={i}>{i}</span>)}</div>
            </div>
          ))}
          <div className="kn-card">
            <h3>{t.sections.languagesTitle}</h3>
            <p>{t.spokenLanguages.join(' · ')}</p>
          </div>
          <div className="kn-card">
            <h3>{t.sections.hobbiesTitle}</h3>
            <p>{t.hobbies.map(h => h.label).join(' · ')}</p>
          </div>
        </div>

        <div className="kn-col" id="contact">
          <header><span>{columns[4].emoji} {columns[4].title}</span><span className="kn-count">3</span></header>
          <div className="kn-card">
            <span className="kn-label kn-l-green">Open</span>
            <h3>Get in touch</h3>
            <p>{t.sections.contactText}</p>
            <div className="kn-actions">
              <a href={'mailto:'+t.hero.email}>✉ {t.hero.email}</a>
              <a href={pdfFor(lang)} target="_blank" rel="noreferrer">📥 {t.pdf[lang]}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">🔗 LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ============================ STUDIO · MUSIC =====================
function StudioLayout({ t, lang }) {
  const formatPlays = (n) => n > 1000 ? `${(n/1000).toFixed(1)}K` : `${n}`;
  return (
    <main className="sp-layout">
      <section className="sp-hero" id="profile">
        <div className="sp-cover">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
        </div>
        <div className="sp-hero-text">
          <p className="sp-pre">✓ Verified Artist</p>
          <h1>{t.hero.name}</h1>
          <p className="sp-role">{t.hero.role}</p>
          <p className="sp-listeners">{formatPlays(247829)} monthly listeners</p>
          <div className="sp-cta">
            <a className="sp-btn-play" href={'#experience'}>▶ Play</a>
            <a className="sp-btn-secondary" href={'mailto:'+t.hero.email}>Follow</a>
          </div>
        </div>
      </section>

      <section className="sp-section" id="experience">
        <header className="sp-section-head"><h2>Top Tracks</h2><span>this decade</span></header>
        <div className="sp-tracks">
          {t.experience.map((e, i) => (
            <article key={i} className="sp-track">
              <span className="sp-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="sp-track-art" aria-hidden="true">{e.company.charAt(0)}</div>
              <div className="sp-track-info">
                <h3>{e.role}</h3>
                <p>{e.company} · {e.period}</p>
              </div>
              <div className="sp-track-tags">{e.badge && <span className="sp-explicit">★</span>}{e.tags.map(tag => <span key={tag} className="sp-tag">{t.filters[tag]}</span>)}</div>
              <span className="sp-plays">{formatPlays(80000 - i * 9000)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sp-section" id="education">
        <header className="sp-section-head"><h2>Albums · {t.sections.educationTitle}</h2></header>
        <div className="sp-albums">
          {t.education.map((e, i) => (
            <div key={e.title} className="sp-album">
              <div className="sp-album-cover" style={{background: ['linear-gradient(135deg,#1DB954,#11833F)','linear-gradient(135deg,#FF6B5B,#C42D1C)','linear-gradient(135deg,#5460FF,#1A2480)'][i]}}>{e.title.charAt(0)}</div>
              <h3>{e.title}</h3>
              <p>{e.period} · {e.institution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-section" id="skills">
        <header className="sp-section-head"><h2>Genres</h2></header>
        <div className="sp-genres">{allSkills(t).map(s => <span key={s}>{s}</span>)}</div>
      </section>

      <section className="sp-section sp-contact" id="contact">
        <header className="sp-section-head"><h2>Contact</h2></header>
        <p>{t.sections.contactText}</p>
        <div className="sp-cta">
          <a className="sp-btn-play" href={'mailto:'+t.hero.email}>Email</a>
          <a className="sp-btn-secondary" href={pdfFor(lang)} target="_blank" rel="noreferrer">Download CV</a>
          <a className="sp-btn-secondary" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}

// ============================ RECEIPT · THERMAL =====================
function ReceiptLayout({ t, lang }) {
  const pad = (s, w) => s.padEnd(w);
  return (
    <main className="rc-layout">
      <article className="rc-paper">
        <div className="rc-jagged rc-jagged-top"/>
        <header className="rc-head" id="profile">
          <h1>WLOTZKA &amp; CO.</h1>
          <p>— Strategy · Architecture · Innovation —</p>
          <p className="rc-meta">{t.hero.location}</p>
          <p className="rc-meta">TEL: ✉ {t.hero.email}</p>
          <p className="rc-line">================================</p>
          <p className="rc-meta">RECEIPT #00018 · {new Date().toISOString().slice(0,10)}</p>
          <p className="rc-meta">SERVED BY: M. WLOTZKA</p>
          <p className="rc-line">================================</p>
        </header>

        <section className="rc-section" id="experience">
          <p className="rc-section-title">.: PROFESSIONAL EXPERIENCE :.</p>
          <p className="rc-line">--------------------------------</p>
          {t.experience.map((e, i) => (
            <div key={i} className="rc-item">
              <p className="rc-item-line"><span>{e.role}</span><span className="rc-period">{e.period.split(' ')[0]}</span></p>
              <p className="rc-item-meta">  {e.company}</p>
              {e.bullets.map(b => <p key={b} className="rc-item-bullet">  · {b}</p>)}
              {e.badge && <p className="rc-item-promo">  ★ {e.badge}</p>}
              <p className="rc-spacer"></p>
            </div>
          ))}
        </section>

        <p className="rc-line">================================</p>

        <section className="rc-section" id="education">
          <p className="rc-section-title">.: ACADEMIC RECORD :.</p>
          <p className="rc-line">--------------------------------</p>
          {t.education.map(e => (
            <div key={e.title} className="rc-item">
              <p className="rc-item-line"><span>{e.title}</span></p>
              <p className="rc-item-meta">  {e.institution}</p>
              <p className="rc-item-line"><span>  {e.period}</span><span>{e.grade.split(': ')[1] || e.grade}</span></p>
              <p className="rc-spacer"></p>
            </div>
          ))}
        </section>

        <p className="rc-line">================================</p>

        <section className="rc-section" id="skills">
          <p className="rc-section-title">.: SKILLS &amp; LANGUAGES :.</p>
          <p className="rc-line">--------------------------------</p>
          {t.skills.map(g => (
            <div key={g.group}>
              <p className="rc-item-meta"><b>{g.group.toUpperCase()}</b></p>
              {g.items.map(i => <p key={i} className="rc-item-bullet">  · {i}</p>)}
            </div>
          ))}
          <p className="rc-spacer"></p>
          <p className="rc-item-meta"><b>{t.sections.languagesTitle.toUpperCase()}</b></p>
          {t.spokenLanguages.map(l => <p key={l} className="rc-item-bullet">  · {l}</p>)}
          <p className="rc-spacer"></p>
          <p className="rc-item-meta"><b>{t.sections.hobbiesTitle.toUpperCase()}</b></p>
          {t.hobbies.map(h => <p key={h.label} className="rc-item-bullet">  · {h.label}</p>)}
        </section>

        <p className="rc-line">================================</p>
        <p className="rc-totals"><span>YEARS OF SERVICE</span><span>{18}+</span></p>
        <p className="rc-totals"><span>QUESTIONS ASKED</span><span>∞</span></p>
        <p className="rc-totals rc-grand"><span>TOTAL</span><span>PRICELESS</span></p>
        <p className="rc-line">================================</p>

        <section className="rc-section rc-contact" id="contact">
          <p className="rc-thanks">*** THANK YOU ***</p>
          <p className="rc-thanks">Get in touch:</p>
          <p className="rc-actions">
            <a href={'mailto:'+t.hero.email}>✉ {t.hero.email}</a>
            <a href={pdfFor(lang)} target="_blank" rel="noreferrer">📄 PDF</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">🌐 LinkedIn</a>
          </p>
        </section>

        <div className="rc-barcode" aria-hidden="true">
          {Array.from({length: 40}).map((_, i) => <span key={i} style={{width: `${1 + (i % 4)}px`}}/>)}
        </div>
        <p className="rc-meta rc-center">— PLEASE COME AGAIN —</p>
        <div className="rc-jagged rc-jagged-bottom"/>
      </article>
    </main>
  );
}

// ============================ BLUEPRINT · ARCHITECTURE =====================
function BlueprintLayout({ t, lang }) {
  return (
    <main className="bl-layout">
      <div className="bl-grid"/>
      <header className="bl-titleblock" id="profile">
        <div className="bl-tb-row">
          <div>
            <p className="bl-tb-label">PROJECT</p>
            <h1>{t.hero.name}</h1>
            <p className="bl-tb-sub">{t.hero.role}</p>
          </div>
          <div className="bl-tb-side">
            <p><span className="bl-tb-label">SCALE</span><span>1 : 18 YRS</span></p>
            <p><span className="bl-tb-label">SHEET</span><span>A1 / 01</span></p>
            <p><span className="bl-tb-label">DATE</span><span>{new Date().toISOString().slice(0,10)}</span></p>
            <p><span className="bl-tb-label">LOCATION</span><span>{t.hero.location.split(',')[0]}</span></p>
          </div>
        </div>
      </header>

      <section className="bl-section bl-portrait-section">
        <div className="bl-portrait">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
          <div className="bl-dim bl-dim-h">
            <span>◀</span><span>FIG. 01 — PORTRAIT</span><span>▶</span>
          </div>
        </div>
        <div className="bl-spec">
          <p className="bl-callout">A — {t.hero.degree}</p>
          <p className="bl-callout">B — {t.hero.location}</p>
          <p className="bl-callout">C — {t.hero.email}</p>
          <p className="bl-tagline">{t.hero.tagline}</p>
        </div>
      </section>

      <section className="bl-section" id="experience">
        <h2 className="bl-h2">— SECTION A · {t.sections.experienceTitle.toUpperCase()} —</h2>
        <div className="bl-timeline">
          {t.experience.map((e, i) => (
            <article key={i} className="bl-entry">
              <div className="bl-marker">A.{String(i + 1).padStart(2, '0')}</div>
              <div>
                <p className="bl-period">{e.period}</p>
                <h3>{e.role}</h3>
                <p className="bl-where">@ {e.company}</p>
                {e.badge && <p className="bl-note">NOTE: {e.badge}</p>}
                <ul>{e.bullets.map(b => <li key={b}>— {b}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bl-section" id="education">
        <h2 className="bl-h2">— SECTION B · {t.sections.educationTitle.toUpperCase()} —</h2>
        <div className="bl-edu-grid">
          {t.education.map((e, i) => (
            <div key={e.title} className="bl-edu">
              <div className="bl-marker">B.{String(i + 1).padStart(2, '0')}</div>
              <p className="bl-period">{e.period}</p>
              <h3>{e.title}</h3>
              <p className="bl-where">{e.institution} · {e.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bl-section" id="skills">
        <h2 className="bl-h2">— SECTION C · {t.sections.skillsTitle.toUpperCase()} —</h2>
        <div className="bl-mat">
          <p className="bl-tb-label">MATERIALS LIST</p>
          <div className="bl-chips">{allSkills(t).map(s => <span key={s}>· {s}</span>)}</div>
        </div>
      </section>

      <section className="bl-section bl-contact" id="contact">
        <h2 className="bl-h2">— LEGEND · {t.sections.contactTitle.toUpperCase()} —</h2>
        <p>{t.sections.contactText}</p>
        <div className="bl-actions">
          <a href={'mailto:'+t.hero.email}>✉ {t.hero.email}</a>
          <a href={pdfFor(lang)} target="_blank" rel="noreferrer">⎙ {t.pdf[lang]}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">⌬ LinkedIn</a>
        </div>
      </section>
    </main>
  );
}

// ============================ PIXEL · 8-BIT NES =====================
function PixelLayout({ t, lang }) {
  return (
    <main className="px-layout">
      <header className="px-hud">
        <div className="px-hud-l">PLAYER 1 · {t.hero.name.toUpperCase()}</div>
        <div className="px-hud-c">SCORE 1·8·8·8·8·8·0</div>
        <div className="px-hud-r">♥♥♥</div>
      </header>

      <section className="px-hero" id="profile">
        <div className="px-frame px-frame-photo">
          <img src={publicAsset('marcel-wlotzka.jpg')} alt={t.hero.name}/>
        </div>
        <div className="px-frame px-frame-id">
          <p className="px-eyebrow">▼ READY PLAYER ▼</p>
          <h1>{t.hero.name}</h1>
          <p className="px-class">CLASS · {t.hero.role.toUpperCase()}</p>
          <p className="px-quote">"{t.hero.tagline}"</p>
        </div>
      </section>

      <section className="px-frame" id="experience">
        <h2 className="px-h2">▶ STAGE SELECT</h2>
        <div className="px-stages">
          {t.experience.map((e, i) => (
            <article key={i} className="px-stage">
              <p className="px-stage-num">STAGE {String(i + 1).padStart(2, '0')}</p>
              <h3>{e.role.toUpperCase()}</h3>
              <p className="px-stage-where">{e.company.toUpperCase()} · {e.period}</p>
              {e.badge && <p className="px-coin">★ COIN: {e.badge.toUpperCase()}</p>}
              <ul>{e.bullets.map(b => <li key={b}>► {b.toUpperCase()}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="px-frame" id="education">
        <h2 className="px-h2">▶ TUTORIAL LEVELS</h2>
        {t.education.map(e => (
          <div key={e.title} className="px-edu">
            <p className="px-stage-num">{e.period}</p>
            <h3>{e.title.toUpperCase()}</h3>
            <p className="px-stage-where">{e.institution.toUpperCase()} · GRADE {e.grade.split(': ')[1] || e.grade}</p>
          </div>
        ))}
      </section>

      <section className="px-frame" id="skills">
        <h2 className="px-h2">▶ INVENTORY</h2>
        <div className="px-inv">{allSkills(t).map(s => <div key={s} className="px-item">{s.toUpperCase()}</div>)}</div>
      </section>

      <section className="px-frame px-contact" id="contact">
        <h2 className="px-h2">▶ INSERT COIN TO CONTINUE</h2>
        <p className="px-press">{t.sections.contactText}</p>
        <div className="px-cta">
          <a className="px-btn" href={'mailto:'+t.hero.email}>▶ START</a>
          <a className="px-btn" href={pdfFor(lang)} target="_blank" rel="noreferrer">▶ LOAD CV</a>
          <a className="px-btn" href={LINKEDIN_URL} target="_blank" rel="noreferrer">▶ MULTIPLAYER</a>
        </div>
        <p className="px-blink">PRESS START</p>
      </section>
    </main>
  );
}

// =============================== APP ==============================
const LAYOUTS = {
  glow: GlowLayout,
  dossier: DossierLayout,
  editorial: EditorialLayout,
  brutalist: BrutalistLayout,
  terminal: TerminalLayout,
  doc: DocLayout,
  synthwave: SynthwaveLayout,
  newspaper: NewspaperLayout,
  gameui: GameUILayout,
  vision: VisionLayout,
  scrapbook: ScrapbookLayout,
  trading: TradingLayout,
  boarding: BoardingLayout,
  comic: ComicLayout,
  y2k: Y2KLayout,
  kanban: KanbanLayout,
  studio: StudioLayout,
  receipt: ReceiptLayout,
  blueprint: BlueprintLayout,
  pixel: PixelLayout,
};

function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const [design, setDesign] = useState(getInitialDesign);
  const [unlocked, setUnlocked] = useState(getInitialUnlocked);
  const [toast, setToast] = useState(null);
  const brandClicksRef = useRef({ count: 0, last: 0 });
  const t = data[lang];

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { document.documentElement.dataset.design = design; localStorage.setItem('design', design); }, [design]);

  const unlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    localStorage.setItem('designs-unlocked', '1');
    setToast(t.unlock.msg);
    setTimeout(() => setToast(null), 4500);
  };

  // Konami code
  useEffect(() => {
    if (unlocked) return;
    let buf = [];
    const onKey = (e) => {
      buf.push((e.key || '').toLowerCase());
      if (buf.length > KONAMI.length) buf = buf.slice(-KONAMI.length);
      if (buf.length === KONAMI.length && buf.every((k, i) => k === KONAMI[i])) unlock();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [unlocked]);

  // 5 rapid clicks on the brand photo (mobile-friendly easter egg)
  const onBrandClick = () => {
    if (unlocked) return;
    const now = Date.now();
    const r = brandClicksRef.current;
    if (now - r.last > 800) r.count = 0;
    r.count += 1;
    r.last = now;
    if (r.count >= 5) { r.count = 0; unlock(); }
  };

  const toggleTheme = () => setTheme(c => c === 'dark' ? 'light' : 'dark');
  const Layout = LAYOUTS[design] || GlowLayout;
  return <>
    <Nav t={t} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} design={design} setDesign={setDesign} unlocked={unlocked} onBrandClick={onBrandClick}/>
    <Layout t={t} lang={lang}/>
    <footer>© {new Date().getFullYear()} · Marcel Wlotzka · {t.brand.footer}</footer>
    <AnimatePresence>
      {toast && (
        <motion.div className="toast" role="status" aria-live="polite" initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:24,scale:.96}} transition={{duration:.22}}>
          <Sparkles size={18}/> <span>{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);
