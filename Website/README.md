# Blue Rock Manor — Website

Simple static website scaffold for the Blue Rock Manor Civic Association.

## Overview
- Pages: Home, About, Resident Resources, Newsletters, Dues, Contact
- Contact email: brmca19803@gmail.com
- Mailing address included in Contact page

## Run locally
Open a terminal in the `Blue Rock Manor Civic Association/Website` folder and run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Forms / Email collection
- The resident signup forms submit directly to a Google Form without showing the Google Form to users.
- Google Form URLs and field IDs are stored in the `GOOGLE_FORM_CONFIG` section at the top of `scripts/main.js`.
- To switch to a BRMCA-owned Google Form later, replace the form ID, URLs, and `entry.*` field IDs in that configuration block.

## Next steps
- Add final newsletter PDFs or full HTML newsletter content when available.
- Replace the temporary Google Form configuration with a BRMCA-owned Google Form when available.
- Configure a domain and deploy (Netlify, Vercel, GitHub Pages, or similar).
