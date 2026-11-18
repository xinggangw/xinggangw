# Design: WSI Labs

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Map / Diagram
- Theme: Almanac, with the WSI brand blue preserved
- Axes: mid/grotesk-sans/cool · posture: restrained

## Tokens
`tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(84% 0.012 245); --color-paper-2: oklch(81% 0.012 245); --color-paper-3: oklch(77% 0.012 245);
  --color-ink: oklch(16% 0.020 245); --color-ink-2: oklch(24% 0.018 245); --color-muted: oklch(38% 0.016 245); --color-rule: oklch(73% 0.013 240);
  --color-accent: oklch(45% 0.200 260); --color-accent-ink: oklch(97% 0.006 245); --color-focus: oklch(46% 0.190 260);
  --font-display: "Hanken Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Newsreader", ui-serif, Georgia, serif;
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 0; --radius-pill: 2px; --rule-hair: 1px; --shadow-card: none;
}
```
The spacing scale, type scale, dark-mode tokens, easings and durations live in `tokens.css`.

## Controls
- Primary: WSI blue fill · 2px radius · 48px height
- Secondary: hairline outline · 2px radius · 48px height

## Motion
- Character: still; state changes only, no reveal or ambient animation. Reduced motion ends every transition at once.

## Exports
`tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request.
