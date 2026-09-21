# Hardware preview card

Builds `static/img/preview/hardware-1200x630.png`, the card people see when
`meshtastic.org/hardware` is linked in chat.

```shell
pnpm exec playwright install chromium   # one-time, shared with the e2e suite
pnpm preview:hardware
```

The card is committed. Regenerate it and commit the PNG in the same change as the
edit that caused it.

## Changing which devices appear

`src/data/devices.json` is the only source. Add, remove or swap an entry there,
rerun `pnpm preview:hardware`, and the row re-measures and re-spaces itself. No
file in `scripts/` needs editing to add or remove a device.

The solver fits whatever it is given into the same 1200x630 canvas: it trims each
SVG to its visible ink, measures the real aspect ratio, and solves for one shared
scale that fits the row within the available width and the height left under the
subline. Gaps tighten to a 16px floor before any device shrinks, a sparse row
grows no more than 1.4x, and a row that would spread too thin centres instead.

Sizing is normalised on each device's **long edge**, not its height. Portrait
artwork is unaffected, since its long edge is already its height, but it matters
for a landscape board: giving that the same height as a handheld would make it
far wider than anything else on the card, so a 50mm dev module ends up
out-measuring a base station. Worse, the row then shrinks to fit that width and
every other device gets smaller. Normalising the long edge keeps them
comparable.

Everything it decided is printed on each run:

```
7 devices · scale 1.000 · gap 19.4px · space-between
headroom 296px (text ends at 258px)
  · T1000-E Tracker      128.4x200
```

## Optional tuning

Both keys in `hardware-preview.config.json` are optional, and both degrade
gracefully when `devices.json` changes.

`order` is a preference, not a list. Devices it names are placed first in that
sequence; anything in `devices.json` it doesn't name is appended after them; a
name that has left `devices.json` is skipped. It exists because raw JSON order
tends to clump the tall devices together. Delete the key to use `devices.json`
order.

`scales` nudges one device's size relative to the others, for artwork that would
otherwise read wrong beside its neighbours. Anything unlisted renders at `1`. A
stale name is reported and ignored.

Reach for `scales` when a device still reads wrong after that. Long-edge
normalisation treats every device as roughly the same size object, which is a
decent default but not physically true: a pocket tracker and a base station both
get the same long edge. Nudge the small one down, or the large one up.

## Fonts

The card embeds Geist Mono and Geist Sans from `scripts/assets/fonts/`, two
variable `.woff2` files committed to the repo.

This is deliberate. The site itself uses system stacks (`ui-monospace,
SFMono-Regular, …`), which resolve to SF Mono on macOS and to something quite
different on Linux. That is fine for a web page, where every visitor sees their
own system font, but not for a generated PNG whose pixels get committed — the
typeface would change depending on who last regenerated it. Vendoring the files
means every contributor produces the same card, with no network and no
dependency to install.

The fonts are SIL OFL 1.1; see `assets/fonts/LICENSE.txt`.

## Artwork and caching

Device art comes from `flasher.meshtastic.org`, with the `web-flasher` repo as a
mirror, and is cached in `.cache/device-svg/` (gitignored) so reruns work
offline. Artwork for a device the flasher doesn't have yet belongs in
[meshtastic/web-flasher](https://github.com/meshtastic/web-flasher) under
`public/img/devices/` — add it there first.

A wrong `image` filename does not fail loudly on its own: the flasher serves its
own page for an unknown path, so the fetch returns 200 with an HTML body.
`e2e/devices-data.spec.ts` checks the content type, which is what catches it.

## CI

CI does not regenerate the card. Vendored fonts make the typeface reproducible,
but Chromium still rasterises text differently across operating systems, so a
byte comparison between a macOS-generated card and a Linux one is not reliable.

Instead CI fails a pull request that changes `src/data/devices.json` without also
changing the PNG, and says to run `pnpm preview:hardware`. That catches the
mistake that actually happens — editing the lineup and forgetting the card —
without depending on pixels.
