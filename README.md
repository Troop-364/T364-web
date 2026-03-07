# Troop 364 & 5364 Website

Website for BSA Troop 364 & 5364 — Virginia Beach, VA

🌐 **Live Site:** https://troop-364.github.io/T364-web/

## Local Development

### Prerequisites
- Python 3.10+

### Setup
```bash
# Create virtual environment
python -m venv .venv

# Activate it
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Run Locally
```bash
mkdocs serve
```
Then open http://127.0.0.1:8000/T364-web/ in your browser. The site will auto-reload as you edit files.

### Build
```bash
mkdocs build
```
Output goes to the `site/` folder.

## Adding a New Campout Report

1. Copy `docs/campouts/TEMPLATE.md` to a new file (e.g., `docs/campouts/March-2026-Outing.md`)
2. Fill in the sections with your observations
3. Add the new page to `mkdocs.yml` under the `nav:` > `Campouts:` section
4. **Privacy:** Use first names, nicknames, or patrol names only — no last names!

## Project Structure

```
docs/
├── index.md              # Home page
├── about.md              # About the troop
├── schedule.md           # Campout schedule
├── campouts/
│   ├── index.md          # Campout reports landing page
│   ├── TEMPLATE.md       # Template for new reports
│   ├── January-Outing.md # Monthly outing reports...
│   └── ...
├── resources/
│   └── index.md          # Forms & resources
├── forms/                # Downloadable forms
├── images/               # Photos
├── stylesheets/
│   └── extra.css         # Custom scout-themed styling
└── overrides/
    └── main.html         # Theme template overrides
mkdocs.yml                # Site configuration
requirements.txt          # Python dependencies
```

## Deployment

The site auto-deploys to GitHub Pages when changes are pushed to `main` via GitHub Actions.

To enable this:
1. Go to your repo **Settings** → **Pages**
2. Set **Source** to **GitHub Actions**
