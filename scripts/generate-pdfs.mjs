import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'public');
const photo = path.join(outDir, 'marcel-wlotzka.jpg');

const common = {
  name: 'Marcel Wlotzka',
  email: 'marcel@wlotzka.org',
  locationDE: 'Lautertal, Deutschland',
  locationEN: 'Lautertal, Germany',
  bornDE: 'Geboren am 9. August 1989 in Goch, Deutschland',
  bornEN: 'Born on August 9, 1989 in Goch, Germany',
  linkedin: 'linkedin.com/in/marcel-wlotzka-5b61a0a4',
  skills: ['Objective-C','Swift','C / C++','C#','Java','JavaScript','TypeScript','PHP','Linux Server','Windows Server','ReactJS','Vue.js','Symfony','Laravel','Node.js','Chromium Embedded Framework'],
};

const cv = {
  de: {
    file: 'Marcel_Wlotzka_Lebenslauf_DE.pdf',
    title: 'Lebenslauf',
    role: 'Sachgebietsleiter IT Strategie und Architektur',
    degree: 'M.Sc. Informatik',
    profileTitle: 'Profil',
    profile: 'IT-Strategie, Architektur und Innovation mit Praxisnähe: von Smart-City-Plattformen über KI und Automatisierung bis zu skalierbaren digitalen Lösungen. Ich verbinde technologische Tiefe mit strategischer Perspektive und befähige Teams, tragfähige digitale Lösungen umzusetzen.',
    experienceTitle: 'Beruflicher Werdegang',
    educationTitle: 'Schule & Studium',
    skillsTitle: 'Kenntnisse & Technologien',
    languagesTitle: 'Sprachen',
    languages: 'Deutsch, Englisch in Wort und Schrift',
    hobbiesTitle: 'Hobbies',
    hobbies: 'Badminton, Drohne fliegen, Gitarre spielen',
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
      ['07/2007 - 09/2009','Da Source Distribution, Köln','Schulische Aushilfe Online-Shop',['Pflege eines ASP.NET-basierten Online-Shops für DJ-Equipment und Schallplatten','API-Anbindung zur Synchronisation mit eBay und internationalen Online-Shops']]
    ],
    education: [
      ['04/2013 - 08/2018','Technische Universität Darmstadt','Master of Science Informatik mit Anwendungsfach IT-Management','Durchschnitt: 1,87','Schwerpunkte: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering. Master Thesis in Englisch.'],
      ['10/2009 - 04/2013','Technische Universität Darmstadt','Bachelor of Science Informatik','Durchschnitt: 2,5','Bachelor Thesis: Delay-tolerante Datenübertragung in mobilen Sensornetzen.'],
      ['1996 - 2009','Willibrord Gymnasium Emmerich, NRW','Abitur','Durchschnitt: 2,3','Abiturfächer: Mathe LK, Geschichte LK, Englisch, Informatik.']
    ]
  },
  en: {
    file: 'Marcel_Wlotzka_CV_EN.pdf',
    title: 'Curriculum Vitae',
    role: 'Head of IT Strategy and Architecture Team',
    degree: 'M.Sc. Computer Science',
    profileTitle: 'Profile',
    profile: 'IT strategy, architecture and innovation with hands-on depth: from smart-city platforms to AI, automation and scalable digital solutions. I combine technical depth with a strategic perspective and enable teams to deliver sustainable digital solutions.',
    experienceTitle: 'Professional Experience',
    educationTitle: 'Education',
    skillsTitle: 'Skills & Technologies',
    languagesTitle: 'Languages',
    languages: 'German, English spoken and written',
    hobbiesTitle: 'Hobbies',
    hobbies: 'Badminton, flying drones, playing guitar',
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
      ['07/2007 - 09/2009','Da Source Distribution, Cologne','Student Assistant Online Shop',['Maintenance of an ASP.NET-based online shop for DJ equipment and vinyl records','API integration for synchronization with eBay and international online shops']]
    ],
    education: [
      ['04/2013 - 08/2018','Technical University of Darmstadt','Master of Science Computer Science with minor in IT Management','Grade average: 1.87','Focus areas: Data and Knowledge Engineering, Human Computer Systems, Net Centric Systems, Software Engineering. Master thesis written in English.'],
      ['10/2009 - 04/2013','Technical University of Darmstadt','Bachelor of Science Computer Science','Grade average: 2.5','Bachelor thesis: Delay-tolerant data transmission in mobile sensor networks.'],
      ['1996 - 2009','Willibrord Gymnasium Emmerich, NRW','Abitur / German university entrance qualification','Grade average: 2.3','Exam subjects: Mathematics advanced course, History advanced course, English, Computer Science.']
    ]
  }
};

function addHeader(doc, t) {
  const W = doc.page.width;
  doc.rect(0, 0, W, 160).fill('#0f172a');
  doc.circle(500, 25, 130).fillOpacity(0.22).fill('#22d3ee').fillOpacity(1);
  if (fs.existsSync(photo)) doc.image(photo, 430, 42, { width: 95, height: 95, cover: [95, 95], align: 'center', valign: 'top' });
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(30).text(common.name, 48, 42);
  doc.fillColor('#a5f3fc').fontSize(14).text(t.role, 48, 79, { width: 350 });
  doc.fillColor('#cbd5e1').font('Helvetica').fontSize(9).text(`${t.degree}  |  ${t.location}`, 48, 116);
  doc.text(`${common.email}  |  ${common.linkedin}`, 48, 130);
}

function ensure(doc, y, needed = 90) {
  if (y + needed > doc.page.height - 50) { doc.addPage(); return 52; }
  return y;
}
function section(doc, title, y) {
  y = ensure(doc, y, 60);
  doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(14).text(title, 48, y);
  doc.moveTo(48, y + 20).lineTo(545, y + 20).strokeColor('#22d3ee').lineWidth(1.2).stroke();
  return y + 34;
}
function paragraph(doc, text, y, opts = {}) {
  y = ensure(doc, y, 60);
  doc.fillColor(opts.color || '#334155').font(opts.bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(opts.size || 9.5).text(text, opts.x || 48, y, { width: opts.width || 497, lineGap: 2 });
  return doc.y + 8;
}
function chips(doc, items, y) {
  let x = 48; let rowY = y;
  doc.font('Helvetica-Bold').fontSize(8);
  for (const item of items) {
    const w = Math.min(doc.widthOfString(item) + 18, 150);
    if (x + w > 545) { x = 48; rowY += 24; }
    doc.roundedRect(x, rowY, w, 17, 8).fill('#e0f2fe');
    doc.fillColor('#0f172a').text(item, x + 9, rowY + 5, { width: w - 18, lineBreak: false });
    x += w + 7;
  }
  return rowY + 30;
}
function generate(lang) {
  const t = cv[lang];
  const doc = new PDFDocument({ size: 'A4', margin: 48, info: { Title: `${common.name} - ${t.title}`, Author: common.name } });
  const file = path.join(outDir, t.file);
  doc.pipe(fs.createWriteStream(file));
  addHeader(doc, t);
  let y = 188;
  y = section(doc, t.profileTitle, y);
  y = paragraph(doc, t.profile, y, { size: 10.5 });
  y = section(doc, t.experienceTitle, y + 8);
  for (const [period, company, role, bullets] of t.experience) {
    y = ensure(doc, y, 76);
    doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(8.5).text(period, 48, y, { width: 95 });
    doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(10.5).text(role, 155, y, { width: 390 });
    doc.fillColor('#64748b').font('Helvetica').fontSize(8.5).text(company, 155, doc.y + 2, { width: 390 });
    for (const b of bullets) {
      doc.fillColor('#334155').fontSize(8.7).text(`- ${b}`, 168, doc.y + 3, { width: 370, lineGap: 1 });
    }
    y = doc.y + 10;
  }
  y = section(doc, t.educationTitle, y + 2);
  for (const [period, institution, title, grade, details] of t.education) {
    y = ensure(doc, y, 60);
    doc.fillColor('#0284c7').font('Helvetica-Bold').fontSize(8.5).text(period, 48, y, { width: 95 });
    doc.fillColor('#0f172a').font('Helvetica-Bold').fontSize(10.2).text(title, 155, y, { width: 390 });
    doc.fillColor('#64748b').font('Helvetica').fontSize(8.5).text(`${institution} | ${grade}`, 155, doc.y + 2, { width: 390 });
    doc.fillColor('#334155').fontSize(8.7).text(details, 155, doc.y + 3, { width: 390, lineGap: 1 });
    y = doc.y + 10;
  }
  y = section(doc, t.skillsTitle, y + 2);
  y = chips(doc, common.skills, y);
  y = section(doc, t.languagesTitle, y + 2);
  y = paragraph(doc, t.languages, y);
  y = section(doc, t.hobbiesTitle, y + 2);
  y = paragraph(doc, t.hobbies, y);
  doc.end();
  console.log(`Generated public/${t.file}`);
}
fs.mkdirSync(outDir, { recursive: true });
generate('de');
generate('en');
