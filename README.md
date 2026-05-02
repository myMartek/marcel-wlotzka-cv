# Interaktive Lebenslauf-Webseite

## Starten

```bash
npm install
npm run dev
```

Beim Start werden automatisch zwei moderne PDF-Dateien generiert:

- `public/Marcel_Wlotzka_Lebenslauf_DE.pdf`
- `public/Marcel_Wlotzka_CV_EN.pdf`

Die Website ist danach normalerweise unter `http://localhost:5173` erreichbar.

## PDFs manuell neu generieren

```bash
npm run pdf
```

## Inhalte bearbeiten

- Website-Inhalte: `src/main.jsx`
- PDF-Inhalte: `scripts/generate-pdfs.mjs`
- Foto: `public/marcel-wlotzka.jpg`
- E-Mail: `marcel@wlotzka.org`

## Build für Veröffentlichung

```bash
npm run build
```

Die fertige statische Seite liegt danach im Ordner `dist`.

## Veröffentlichung über GitHub Pages

Bei jedem Push auf den Branch `main` baut GitHub Actions die Seite und veröffentlicht den Inhalt von `dist` automatisch über GitHub Pages.

Vor dem ersten Deployment in GitHub:

1. Repository auf GitHub erstellen.
2. Lokales Repository mit dem GitHub-Repository verbinden.
3. In GitHub unter `Settings` -> `Pages` als Source `GitHub Actions` auswählen.
4. Auf `main` pushen.

```bash
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```
