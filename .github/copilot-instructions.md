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

## Important Reminders

1. **Always verify the dev server is running** before testing changes
2. **Use Playwright MCP** to visually confirm changes when available
3. **Client-side rendering**: In dev mode, `curl` requests only return the HTML shell—actual content renders in the browser
4. **Clear caches** if changes don't appear: `rm -rf .docusaurus node_modules/.cache`
