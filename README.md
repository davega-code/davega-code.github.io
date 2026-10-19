# davega.net

Personal website for David Vega Ramirez (David Vega).

## Development

```bash
pnpm install
pnpm dev
```

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

## Search visibility

`index.html` contains the canonical URL, social metadata, and `ProfilePage` / `Person`
structured data identifying both names and linking the public LinkedIn and GitHub
profiles. It also contains a readable introduction for visitors and crawlers without
JavaScript; React replaces it with the interactive layout. Keep this introduction
and the metadata consistent with the visible About and Contact content.

`public/sitemap.xml` lists the single canonical page and is advertised in
`public/robots.txt`. Sections open within the page, so they are not separate URLs.

After deploying, verify `https://davega.net/` in Google Search Console and Bing
Webmaster Tools, submit `https://davega.net/sitemap.xml`, and request indexing of the
homepage. These services require owner verification; metadata alone cannot guarantee
indexing, a ranking, or when a result appears. Link to this domain from public
profiles so search engines can connect the site to its owner.
