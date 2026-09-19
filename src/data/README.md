# Site data

JSON files backing the homepage and the standalone pages. Editing one of these
is a content change: no component needs to be touched.

## Swapping the featured devices

`devices.json` drives both the `#hardware` overlay on the homepage and the
`/hardware` page. The two render the same component, so one edit updates both.

`callToAction` carries more weight than the cards do. Its `title` is the heading
on `/hardware`, and its `subtitle` is both the paragraph under that heading and
the description that appears when the page is linked in chat. Edit it knowing it
shows up in a link preview.

Each entry looks like this:

```json
{
  "name": "T-Deck Plus",
  "vendor": "LILYGO",
  "image": "t-deck.svg",
  "url": "https://msh.to/tdeck_plus",
  "tags": ["keyboard", "gps", "esp32"]
}
```

| Field    | What it holds                                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `name`   | The device name as its vendor writes it. Also the React key, so it must be unique within the file.                          |
| `vendor` | The company that sells it.                                                                                                  |
| `image`  | A file name under `imageBaseUrl`, not a path and not a URL.                                                                 |
| `url`    | Where the card links. An `msh.to` link opens in a new tab; a site-relative path such as `/docs/hardware/devices/` does not. |
| `tags`   | Short lowercase labels shown as pills. At least one.                                                                        |

To swap a device, replace its entry and run the tests:

```shell
pnpm exec playwright test devices-data
```

The end-to-end config serves the built site, so run `pnpm run build` first on a
fresh clone. CI runs this spec on every pull request either way.

Add or remove entries freely. The grid reflows at two, three, and four cards per
row, so any count lays out.

### Artwork

`imageBaseUrl` points at the web-flasher, which hosts the device art. Check that
the file exists before using its name:

```shell
curl -sI https://flasher.meshtastic.org/img/devices/<FILE_NAME>.svg | head -1
```

A 200 alone does not mean the file is there. The flasher serves its own page for
an unknown path, so a wrong file name returns 200 with an HTML body and the card
renders blank. `e2e/devices-data.spec.ts` checks the content type, which is what
catches this, so run it rather than trusting the status code.

Artwork for a device the flasher does not have yet belongs in
[meshtastic/web-flasher](https://github.com/meshtastic/web-flasher) under
`public/img/devices/`. Add it there first.

### The social preview image

`static/img/hardware/social-preview-1200x630.png` is the card people see when
`/hardware` is linked from chat, and it is generated from this file. After adding,
removing or swapping a device, rebuild it and commit both together:

```shell
pnpm preview:hardware
```

The row re-measures and re-spaces itself for whatever it finds, so nothing else
needs editing. CI fails a pull request that changes `devices.json` without the
regenerated PNG. See `scripts/README-hardware-preview.md` for the layout rules and
the optional order and size tuning.
