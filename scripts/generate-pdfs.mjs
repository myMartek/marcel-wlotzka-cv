import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'public');
const photoPath = path.join(outDir, 'marcel-wlotzka.jpg');

// ----- Palette: Mainova-derived (powder-blue sidebar, navy text, cyan pop) -----
const SIDE_BG     = '#D5E8F2';   // very pale powder blue sidebar
const SIDE_TEXT   = '#002C77';   // Mainova navy
const SIDE_MUTE   = '#5F7A99';
const MAIN_BG     = '#FFFFFF';
const INK         = '#001E55';
const BODY        = '#3F506E';
const ACCENT      = '#009AD8';   // Mainova cyan — signature highlight

const A4 = { w: 595.28, h: 841.89 };
const SIDEBAR_W = 215;
const MAIN_X = SIDEBAR_W + 36;
const MAIN_W = A4.w - MAIN_X - 40;

const common = {
  name: 'Marcel Wlotzka',
  email: 'marcel@wlotzka.org',
  locationDE: 'Lautertal, Deutschland',
  locationEN: 'Lautertal, Germany',
  bornDE: 'geboren am 9. August 1989 in Goch',
  bornEN: 'born August 9, 1989 in Goch, Germany',
  linkedin: 'linkedin.com/in/marcel-wlotzka-5b61a0a4',
  skills: ['Objective-C','Swift','C / C++','C#','Java','JavaScript','TypeScript','PHP','Linux Server','Windows Server','ReactJS','Vue.js','Symfony','Laravel','Node.js','Chromium Embedded Framework'],
};

const cv = {
  de: {
    file: 'Marcel_Wlotzka_Lebenslauf_DE.pdf',
    title: 'Lebenslauf',
    role: 'Sachgebietsleiter IT Strategie und Architektur',
    degree: 'M.Sc. Informatik',
    contactTitle: 'KONTAKT',
    profileTitle: 'Profil',
    profile: 'IT-Strategie, Architektur und Innovation mit Praxisnähe: von Smart-City-Plattformen über KI und Automatisierung bis zu skalierbaren digitalen Lösungen. Ich verbinde technologische Tiefe mit strategischer Perspektive und befähige Teams, tragfähige digitale Lösungen umzusetzen.',
    experienceTitle: 'Beruflicher Werdegang',
    educationTitle: 'Schule & Studium',
    educationShort: 'TU Darmstadt · Durchschnitt 1,87',
    skillsTitle: 'Kenntnisse & Technologien',
    focusTitle: 'Schwerpunkte',
    focus: ['IT Strategie', 'Enterprise Architektur', 'Smart City', 'KI & Automation', 'Innovation Mgmt.'],
    languagesTitle: 'Sprachen',
    languagesShort: [
      { label: 'Deutsch',  descriptor: 'Muttersprache' },
      { label: 'Englisch', descriptor: 'verhandlungssicher' },
    ],
    hobbiesTitle: 'Hobbies',
    hobbies: 'Badminton  ·  Drohne fliegen  ·  Gitarre spielen',
    location: common.locationDE,
    born: common.bornDE,
    experience: [
      ['01/2026 - Heute','Mainova AG','Sachgebietsleiter IT Strategie und Architektur',['Disziplinarische und fachliche Führung','KI-Beauftragter']],
      ['10/2024 - 12/2025','Mainova AG','IT Architekt',['Mainova IT']],
      ['09/2020 - 10/2024','Mainova AG','SmartCity Solution Architekt',['Entwicklung der SmartCity Plattform der Mainova','Ausgezeichnet mit dem VKU Innovationspreis 2023']],
      ['09/2018 - 09/2020','Mainova AG','IT Innovation Manager',['Evaluation neuer Technologien in der Energiewirtschaft','Schulung von Mitarbeitenden zu neuen Technologiefeldern','Projekte in KI, VR, SmartCity, Blockchain sowie Prozessoptimierung und Automatisierung']],
      ['09/2016 - 09/2018','CMF Advertising GmbH','Leiter der Softwareentwicklung',['Eigenverantwortliche Entwicklung von Web- und App-Projekten auf Kundenwunsch','Koordination des Teams mit anderen Abteilungen']],
      ['08/2014 - 08/2016','2VizCon GmbH, Neu-Isenburg','App Developer',['Entwicklung von Apps für iOS, Android, Windows und Windows Phone','Weiterentwicklung eines App-Containers zur Darstellung webbasierter Inhalte','Entwicklung automatischer Build-Prozesse für Apps','Beratung der Geschäftsführung und Kunden in App-Fragen']],
      ['08/2009 - 08/2014','KWP GmbH & Co. KG, Neu-Isenburg','Werkstudent Web Developer',['Werkstudent, zwei Tage pro Woche als Web Developer','Eigenständige Weiterbildung zum App Developer','Verantwortung für viele IT-relevante Anliegen']],
      ['09/2008 - 06/2009','XYQOM GmbH, Waldbröl bei Köln','Schulische Aushilfe Template & Webentwicklung',['Template-Umsetzung in TypoLight / Contao für Kundenwebseiten','Erstellung kleinerer TypoLight-Erweiterungen','HTML5-Bestellsystem mit Konfigurator für KRONE-Sattelauflieger']],
      ['07/2007 - 09/2009','Da Source Distribution, Köln','Schulische Aushilfe Online-Shop',['Pflege eines ASP.NET-basierten Online-Shops für DJ-Equipment und Schallplatten','API-Anbindung zur Synchronisation mit eBay und internationalen Online-Shops']],
    ],
    education: [
      ['04/2013 - 08/2018','Technische Universität Darmstadt','Master of Science Informatik mit Anwendungsfach IT-Management','Durchschnitt: 1,87','Schwerpunkte: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering. Master Thesis in Englisch.'],
      ['10/2009 - 04/2013','Technische Universität Darmstadt','Bachelor of Science Informatik','Durchschnitt: 2,5','Bachelor Thesis: Delay-tolerante Datenübertragung in mobilen Sensornetzen.'],
      ['1996 - 2009','Willibrord Gymnasium Emmerich, NRW','Abitur','Durchschnitt: 2,3','Abiturfächer: Mathe LK, Geschichte LK, Englisch, Informatik.'],
    ],
  },
  en: {
    file: 'Marcel_Wlotzka_CV_EN.pdf',
    title: 'Curriculum Vitae',
    role: 'Head of IT Strategy and Architecture Team',
    degree: 'M.Sc. Computer Science',
    contactTitle: 'CONTACT',
    profileTitle: 'Profile',
    profile: 'IT strategy, architecture and innovation with hands-on depth: from smart-city platforms to AI, automation and scalable digital solutions. I combine technical depth with a strategic perspective and enable teams to deliver sustainable digital solutions.',
    experienceTitle: 'Professional Experience',
    educationTitle: 'Education',
    educationShort: 'TU Darmstadt · GPA 1.87',
    skillsTitle: 'Skills & Technologies',
    focusTitle: 'Focus Areas',
    focus: ['IT Strategy', 'Enterprise Architecture', 'Smart City', 'AI & Automation', 'Innovation Mgmt.'],
    languagesTitle: 'Languages',
    languagesShort: [
      { label: 'German',  descriptor: 'native' },
      { label: 'English', descriptor: 'fluent' },
    ],
    hobbiesTitle: 'Hobbies',
    hobbies: 'Badminton  ·  Flying drones  ·  Playing guitar',
    location: common.locationEN,
    born: common.bornEN,
    experience: [
      ['01/2026 - Present','Mainova AG','Head of IT Strategy and Architecture Team',['Disciplinary and functional leadership','AI Officer']],
      ['10/2024 - 12/2025','Mainova AG','IT Architect',['Mainova IT']],
      ['09/2020 - 10/2024','Mainova AG','SmartCity Solution Architect',["Development of Mainova's SmartCity platform",'Awarded with the VKU Innovation Award 2023']],
      ['09/2018 - 09/2020','Mainova AG','IT Innovation Manager',['Evaluation of emerging technologies in the energy sector','Training employees in new technology areas','Projects in AI, VR, SmartCity, blockchain and internal process optimization / automation']],
      ['09/2016 - 09/2018','CMF Advertising GmbH','Head of Software Development',['Independent development of customer-specific web and app projects','Coordination of the team with other departments']],
      ['08/2014 - 08/2016','2VizCon GmbH, Neu-Isenburg','App Developer',['Development of apps for iOS, Android, Windows and Windows Phone','Further development of an app container for web-based content','Development of automated build processes for apps','Advising management and customers on app-related questions']],
      ['08/2009 - 08/2014','KWP GmbH & Co. KG, Neu-Isenburg','Working Student Web Developer',['Working student, two days per week as web developer','Self-directed development into app development','Responsible for many IT-related topics']],
      ['09/2008 - 06/2009','XYQOM GmbH, Waldbröl near Cologne','Student Assistant Template & Web Development',['Template implementation in TypoLight / Contao for customer websites','Creation of smaller TypoLight extensions','HTML5 ordering system with configurator for KRONE semi-trailers']],
      ['07/2007 - 09/2009','Da Source Distribution, Cologne','Student Assistant Online Shop',['Maintenance of an ASP.NET-based online shop for DJ equipment and vinyl records','API integration for synchronization with eBay and international online shops']],
    ],
    education: [
      ['04/2013 - 08/2018','Technical University of Darmstadt','Master of Science Computer Science with minor in IT Management','Grade average: 1.87','Focus areas: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering. Master thesis written in English.'],
      ['10/2009 - 04/2013','Technical University of Darmstadt','Bachelor of Science Computer Science','Grade average: 2.5','Bachelor thesis: Delay-tolerant data transmission in mobile sensor networks.'],
      ['1996 - 2009','Willibrord Gymnasium Emmerich, NRW','Abitur / German university entrance qualification','Grade average: 2.3','Exam subjects: Mathematics advanced course, History advanced course, English, Computer Science.'],
    ],
  },
};

// ------------------------------- Helpers -------------------------------
function clipCircle(doc, cx, cy, r, draw) {
  doc.save();
  doc.circle(cx, cy, r).clip();
  draw();
  doc.restore();
}

function paintBg(doc) {
  doc.rect(0, 0, A4.w, A4.h).fill(MAIN_BG);
  doc.rect(0, 0, SIDEBAR_W, A4.h).fill(SIDE_BG);
}

function sectionTitle(doc, title) {
  // Section titles in main column: navy bold + short cyan rule below
  const x = MAIN_X;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(13).text(title.toUpperCase(), x, doc.y, { width: MAIN_W, characterSpacing: 1.4 });
  const y = doc.y + 4;
  doc.moveTo(x, y).lineTo(x + 36, y).strokeColor(ACCENT).lineWidth(2).stroke();
  doc.y = y + 12;
}

function sideHeading(doc, t, y) {
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(10).text(t, 24, y, { width: SIDEBAR_W - 48, characterSpacing: 1.4 });
  return doc.y + 6;
}

function ensureSpace(doc, need) {
  if (doc.y + need > A4.h - 40) {
    doc.addPage();
    paintBg(doc);
    doc.y = 50;
  }
}

// ------------------------------- Build -------------------------------
function generate(lang) {
  const t = cv[lang];
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    info: { Title: `${common.name} - ${t.title}`, Author: common.name },
  });
  doc.pipe(fs.createWriteStream(path.join(outDir, t.file)));

  paintBg(doc);

  // ----- Sidebar -----
  // photo with navy halo ring
  const cx = SIDEBAR_W / 2;
  const cy = 110;
  const r = 70;
  doc.circle(cx, cy, r + 6).fill(INK);
  if (fs.existsSync(photoPath)) {
    clipCircle(doc, cx, cy, r, () => {
      doc.image(photoPath, cx - r, cy - r, { cover: [r * 2, r * 2], align: 'center', valign: 'center' });
    });
  }

  let sy = 210;
  sy = sideHeading(doc, t.contactTitle, sy);
  doc.fillColor(SIDE_TEXT).font('Helvetica').fontSize(9).text(common.email, 24, sy, { width: SIDEBAR_W - 48 });
  doc.fillColor(SIDE_MUTE).fontSize(8.5).text(common.linkedin, 24, doc.y + 4, { width: SIDEBAR_W - 48 });
  doc.fillColor(SIDE_TEXT).fontSize(9).text(t.location, 24, doc.y + 4, { width: SIDEBAR_W - 48 });
  doc.fillColor(SIDE_MUTE).fontSize(8.5).text(t.born, 24, doc.y + 4, { width: SIDEBAR_W - 48 });
  sy = doc.y + 22;

  sy = sideHeading(doc, t.educationTitle.toUpperCase(), sy);
  doc.fillColor(SIDE_TEXT).font('Helvetica-Bold').fontSize(9.5).text(t.degree, 24, sy);
  doc.fillColor(SIDE_MUTE).font('Helvetica').fontSize(8.5).text(t.educationShort, 24, doc.y + 1, { width: SIDEBAR_W - 48 });
  sy = doc.y + 22;

  sy = sideHeading(doc, t.languagesTitle.toUpperCase(), sy);
  for (const l of t.languagesShort) {
    doc.fillColor(SIDE_TEXT).font('Helvetica').fontSize(9).text(l.label, 24, sy);
    doc.fillColor(SIDE_MUTE).fontSize(8.5).text(l.descriptor, 24, doc.y);
    sy = doc.y + 8;
  }
  sy += 14;

  sy = sideHeading(doc, t.focusTitle.toUpperCase(), sy);
  doc.font('Helvetica').fontSize(9);
  for (const f of t.focus) {
    doc.circle(28, sy + 4.5, 1.6).fill(ACCENT);
    doc.fillColor(SIDE_TEXT).text(f, 38, sy);
    sy = doc.y + 4;
  }
  sy += 14;

  sy = sideHeading(doc, t.hobbiesTitle.toUpperCase(), sy);
  doc.fillColor(SIDE_TEXT).font('Helvetica').fontSize(9).text(t.hobbies, 24, sy, { width: SIDEBAR_W - 48 });

  // ----- Main column -----
  doc.y = 56;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(28).text(common.name, MAIN_X, doc.y, { width: MAIN_W });
  doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(12).text(t.role.toUpperCase(), MAIN_X, doc.y + 2, { width: MAIN_W, characterSpacing: 1 });
  const ruleY = doc.y + 12;
  doc.moveTo(MAIN_X, ruleY).lineTo(MAIN_X + 60, ruleY).strokeColor(ACCENT).lineWidth(2).stroke();
  doc.y = ruleY + 14;

  doc.fillColor(BODY).font('Helvetica').fontSize(10).text(t.profile, MAIN_X, doc.y, { width: MAIN_W, lineGap: 2.5, align: 'justify' });
  doc.y += 22;

  // Experience
  ensureSpace(doc, 80);
  sectionTitle(doc, t.experienceTitle);
  for (const [period, company, role, bullets] of t.experience) {
    ensureSpace(doc, 70);
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(10.5).text(role, MAIN_X, doc.y, { width: MAIN_W });
    doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(9).text(company, MAIN_X, doc.y + 1, { continued: true });
    doc.fillColor(BODY).font('Helvetica').text('   ·   ' + period, { width: MAIN_W });
    doc.y += 5;
    for (const b of bullets) {
      ensureSpace(doc, 18);
      doc.circle(MAIN_X + 3, doc.y + 4.5, 1.6).fill(ACCENT);
      doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text(b, MAIN_X + 12, doc.y, { width: MAIN_W - 12, lineGap: 1.5 });
      doc.y += 3;
    }
    doc.y += 10;
  }

  // Education
  doc.y += 4;
  ensureSpace(doc, 80);
  sectionTitle(doc, t.educationTitle);
  for (const [period, inst, title, grade, details] of t.education) {
    ensureSpace(doc, 60);
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(10.5).text(title, MAIN_X, doc.y, { width: MAIN_W });
    doc.fillColor(ACCENT).font('Helvetica-Bold').fontSize(9).text(inst, MAIN_X, doc.y + 1, { continued: true });
    doc.fillColor(BODY).font('Helvetica').text(`   ·   ${period}   ·   ${grade}`, { width: MAIN_W });
    doc.fillColor(BODY).font('Helvetica').fontSize(9.5).text(details, MAIN_X, doc.y + 4, { width: MAIN_W, lineGap: 1.5 });
    doc.y += 14;
  }

  // Skills
  ensureSpace(doc, 80);
  sectionTitle(doc, t.skillsTitle);
  let chipX = MAIN_X, chipY = doc.y;
  doc.font('Helvetica-Bold').fontSize(8.5);
  for (const s of common.skills) {
    const w = doc.widthOfString(s) + 20;
    if (chipX + w > MAIN_X + MAIN_W) { chipX = MAIN_X; chipY += 26; }
    doc.roundedRect(chipX, chipY, w, 18, 9).fill(ACCENT);
    doc.fillColor('#FFFFFF').text(s, chipX + 10, chipY + 5.3, { width: w - 20, lineBreak: false });
    chipX += w + 6;
  }

  doc.end();
  console.log(`Generated public/${t.file}`);
}

fs.mkdirSync(outDir, { recursive: true });
generate('de');
generate('en');
