# Deployment Note

The production site `https://wsilabs.xyz/` is served by GitHub Pages from:

`git@github.com:xinggangw/xinggangw.git`

Use this repository as the deployment source for WSI Labs site updates. The local `origin` remote should point to `xinggangw/xinggangw`.

Do not infer the deployment source from the `sameAs` metadata in `index.html`; that field can mention a different GitHub organization and is not the Pages source.

Useful checks:

```bash
git remote -v
git status -sb
curl -I https://wsilabs.xyz/
curl -I https://wsilabs.xyz/blog/reworld-world-action-models.html
```
