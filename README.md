# 99MGMT

Portfolio site for 99MGMT (99management.dk). Plain HTML/CSS/JS, no build step.

- `index.html` – content (edit the roster and contact details here)
- `styles.css` – dark theme styles
- `assets/` – logo, favicons, social preview image
- `salary/` – 99MS, live salary clock (standalone page at `/salary/`)

Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push.

## Custom domain (later)
1. Add a `CNAME` file containing `99management.dk`.
2. At the DNS provider, add A records for `99management.dk` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153, and a CNAME `www` → `rodriguez594.github.io`.
3. In repo Settings → Pages, set the custom domain and tick "Enforce HTTPS".

## 99MS account sync (Supabase)
`salary/index.html` has a `SYNC` config (`url`, `anonKey`). Leave it empty and 99MS works offline only. To turn on sync, create a Supabase project and run this in its SQL editor:

```sql
create table public.user_data (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.user_data enable row level security;
create policy "own data" on public.user_data
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```
