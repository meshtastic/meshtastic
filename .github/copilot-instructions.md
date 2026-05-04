# Copilot Instructions for Meshtastic Documentation

## Project Overview

This is the official Meshtastic documentation website built with Docusaurus. It contains documentation, guides, resources, and the home page for the Meshtastic mesh networking project.

## Development Server

**The dev server runs at `http://localhost:3000`**

- Start the server: `pnpm start`
- The server uses client-side rendering in development mode
- Production builds can be created with `pnpm build` and served with `pnpm serve`

## Verifying Changes

### Use Playwright MCP When Available

If the Playwright MCP tools are available, **always use them to confirm visual changes and verify that components render correctly**. This is especially important for:

- Verifying that images and SVGs load properly
- Checking component layouts and styling
- Confirming navigation and links work
- Testing responsive behavior

Example workflow:
1. Make code changes
2. Ensure dev server is running at `localhost:3000`
3. Use Playwright MCP to navigate to the affected page
4. Take screenshots or inspect elements to verify changes

### Alternative Verification Methods

If Playwright MCP is not available:
- Use `curl` to check the built HTML (note: dev mode uses client-side rendering, so `curl` will only show the shell)
- Run `pnpm build` and check the output in the `build/` directory
- Ask the user to verify visually in the browser

## Key Technologies

- **Framework**: Docusaurus 3.x
- **Language**: TypeScript, MDX, React
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Project Structure

- `/docs/` - Documentation content in MDX format
- `/src/components/` - React components
- `/src/pages/` - Custom pages
- `/static/` - Static assets
- `/blog/` - Blog posts

## Common Tasks

### Adding Device Images

Device SVGs are hosted at `https://flasher.meshtastic.org/img/devices/`. Use the `DeviceImage` component:

```mdx
import { DeviceImage } from "@site/src/components/DeviceImage";

<DeviceImage device="heltec-v3.svg" size="md" />
<DeviceImage device="t-deck.svg" float="right" size="sm" />
```

### Running Tests

- Lint MDX: `./scripts/lint-mdx.sh`
- E2E tests: `pnpm playwright test`
- Type check: `pnpm tsc --noEmit`

## Design Standards

All UI must comply with the [Meshtastic Client Design Standards](https://raw.githubusercontent.com/meshtastic/design/refs/heads/master/standards/meshtastic_design_standards_latest.md). Fetch and review this document before making any UI changes.

### Brand Colors

Primary/Foreground color:
- `#2C2D3C` / `RGB 44 45 60`

Secondary/Background/Accent color:
- `#67EA94` / `RGB 103 234 148`

### Extended Color Palette

#### Neutral Scale (derived from Primary `#2C2D3C`)

| Name | Hex | Usage |
|------|-----|-------|
| Neutral 950 | `#0F1017` | Darkest background |
| Neutral 900 | `#1A1B26` | Dark mode background |
| Neutral 800 | `#2C2D3C` | **Primary** — dark mode surface / light mode text |
| Neutral 700 | `#3D3E50` | Dark mode elevated surface |
| Neutral 600 | `#555668` | Dark mode secondary text |
| Neutral 500 | `#6E7082` | Placeholder text |
| Neutral 400 | `#9496A6` | Disabled / tertiary |
| Neutral 300 | `#B8BAC8` | Borders (light mode) |
| Neutral 200 | `#D5D6E0` | Dividers |
| Neutral 100 | `#ECEDF3` | Light mode surface / card |
| Neutral 50  | `#F5F6FA` | Light mode background |

#### Green Scale (derived from Accent `#67EA94`)

| Name | Hex | Usage |
|------|-----|-------|
| Green 100 | `#E5FCEE` | Success tint background |
| Green 300 | `#B5F5CE` | Light highlight |
| Green 400 | `#8FF0B2` | Hover / active accent |
| Green 500 | `#67EA94` | **Accent** — primary action / brand highlight |
| Green 600 | `#3FB86D` | Text on light backgrounds |
| Green 700 | `#2D8F52` | Strong / dark green text |

#### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Info | `#5C6BC0` | Informational indicators / links |
| Info Light | `#E8EAF6` | Info tint background |
| Warning | `#E8A33E` | Caution / attention |
| Warning Light | `#FFF3E0` | Warning tint background |
| Error | `#E05252` | Errors / destructive actions |
| Error Light | `#FDEAEA` | Error tint background |

> **Accessibility note:** All foreground/background pairings in this palette meet WCAG AA contrast (4.5:1 minimum). Use `Green 600` or `Green 700` for green text on light backgrounds — never the raw accent `#67EA94`, which does not meet contrast requirements on white.

### Logo

The Meshtastic logo is derived from the appearance/aesthetics of physical LoRa modulation. The use of the Meshtastic® logo is subject to restrictions as defined in the [Licensing and Trademark Guidelines](https://meshtastic.org/docs/legal/licensing-and-trademark/).

### Typeface

Refer to the [design repository](https://github.com/meshtastic/design) for typeface specifications and logo usage guidelines including margins, spacing, and sizes for different use cases.

## Important Reminders

1. **Always verify the dev server is running** before testing changes
2. **Use Playwright MCP** to visually confirm changes when available
3. **Client-side rendering**: In dev mode, `curl` requests only return the HTML shell—actual content renders in the browser
4. **Clear caches** if changes don't appear: `rm -rf .docusaurus node_modules/.cache`
