# 99MGMT

Portfolio site for 99MGMT (99management.dk). Plain HTML/CSS/JS, no build step.

- `index.html` – content (edit the roster and contact details here)
- `styles.css` – dark theme styles
- `assets/` – logo, favicons, social preview image
- `salary/` – 99TICK, live salary clock (standalone page at `/salary/`)

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push.

## Custom domain (later)
1. Add a `CNAME` file containing `99management.dk`.
2. At the DNS provider, add A records for `99management.dk` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME `www` → `rodriguez594.github.io`.
3. In repo Settings → Pages, set the custom domain and tick "Enforce HTTPS".
