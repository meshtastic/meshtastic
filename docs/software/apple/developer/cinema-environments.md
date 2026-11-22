---
title: Cinema Environments
parent: Developer Guide
sidebar_position: 12
---

# Cinema Environments

On Apple Vision Pro, the [Cinema](../user/cinema.md) puts the app on a big screen inside a place: a search and rescue tent, a ham shack, a fire lookout, a castle tower, a city rooftop or a sky deck. Each place is a 360° image rendered in Blender from a Python script in `scripts/cinema/`, plus an anchors file that says where the app's screen and boards go. This page is for anyone who wants to add a place of their own.

Open an issue describing the place first, and wait for a maintainer to add the `approved` label before building it.

## How it works

- The image is one equirectangular panorama, 2:1, rendered from a seated viewer at the origin, 1.15 m above the floor. The app wraps it on a sphere 50 m around the viewer.
- The render also writes `<name>_anchors.json`: each board's center, size and facing, relative to the camera. The app places its live panels from it, so moving a board in the scene and rendering again moves the panel with it.
- The app pushes each panel out along the lines from the viewer until it sits just inside the sphere, and grows it to match. It covers the same part of the view, and has the same depth as the painting around it.

In Blender, +Y is the center of the image, where the screen usually goes. +X is the viewer's right and Z is up.

## What the image can and can't do

The image is flat: one picture, with no depth of its own. That decides what looks right.

- Things at room distance (about 2.5–3 m) look fine. The tent's walls are all about 2.8 m away.
- Things close to the viewer look painted on and shift wrongly when you move your head. Keep near surfaces plain, keep the floor close by simple, and put the detail on the walls and the furniture against them. Real 3D models placed in front of the image float, so the app doesn't do that.
- The screen needs a plain surface the viewer faces, with nothing in the picture behind or around it that the screen would cut through.

## Boards

| Board | Id | Required | What the app draws |
|---|---|---|---|
| Screen | `screen` | Yes | The app's sections, with tabs above. Use `screen_anchor()`; it's 2.6 m wide by default, in the screen's shape. Nothing is drawn in the image there. |
| Team Favorites | `teamStatus` | No | Favorite nodes and the connected radio. The tent uses a 1.35 × 0.9 m whiteboard. |
| Trace route | `traceRoute` | No | The latest trace route's card. The tent uses a 1.1 × 0.9 m framed print. |
| Status | `nodeStatus` | No | The nodes' status messages, the connected radio's first. `CinemaEnvironment` titles it for the place and says whether it stands portrait (2:3) or lies landscape (3:2). The tent uses a 0.8 × 1.2 m portrait whiteboard beside the screen. |

An environment can have its boards drawn as scrolls instead (`CinemaEnvironment.hasScrolls`, as the castle tower does). The app then draws each one whole, parchment and rollers, from `CinemaScroll`, and the viewer can roll it up out of the view. Paint only what it hangs from, and leave the space under it open. The anchor covers the whole scroll: the parchment's width plus 5.5% of it past each side for the rollers' ends, and its height plus 4.5% of its width above and below for the rollers. `castle_tower.py` has `scroll_size()` for this.

A board is a plane passed to `anchor("<id>", plane, width, height)`. The plane's +X is the board's right and its +Z faces the viewer. Paint the board blank in the image (the app covers it), and light it about as bright as the panel will be, so the frame around it matches. The app skips any optional board an environment leaves out.

## Building a place

There are two ways in:

- **A furnished tent.** Copy `scripts/cinema/sar_tent.py`, change its `furnish(layout)`, and call `tent_base.render(furnish)`. The tent shell, lights, windows, branding, dusk forest and the screen on the front wall come with it.
- **A room of your own.** Write a `build()` that makes the room, its furniture, lights and boards, and calls `screen_anchor(center, rotation)`. Then call `room_base.render_room(build, "<hdri file>")`. `room_base.py` gives you the camera, the render settings, the anchors file and small helpers (`box`, `plane`, `cylinder`, `material`, …). For a screen on a side wall, `rotation` is `(math.pi / 2, 0, -side * math.pi / 2)`, with `side` 1 for the right wall and -1 for the left.

A room of your own starts like this. Blender runs the script directly, so it has to add its own folder to the import path before it can import `room_base`:

```python
import math
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from room_base import EYE_HEIGHT, box, material, render_room, screen_anchor  # noqa: E402


def build():
    wall = material("Wall", (0.55, 0.5, 0.42), 0.8)
    box("Front", (6, 0.1, 2.6), (0, 3, 1.3), wall)
    # ... the other walls, the floor, furniture, lights and boards ...
    screen_anchor((0, 2.9, EYE_HEIGHT + 0.2), (math.pi / 2, 0, 0))


render_room(build, "sunset_forest_4k.hdr")
```

Then:

1. Add `environment <name>` at the end of `scripts/cinema/build.sh`. Use `build.sh --preview` for a quick 2048-wide render in `scripts/cinema/out/`, and `build.sh` for the full size. The full build writes `<name>.heic` and `<name>_anchors.json` into `Packages/CinemaContent`.
2. Add a case to `CinemaEnvironment` in `Meshtastic/Helpers/Cinema/CinemaEnvironment.swift` with a localized title, `imageName` set to `<name>`, and placeholder colors for the backdrop shown if the image can't be loaded.
3. List every asset's source in `scripts/cinema/README.md`.

The build fails if the scene has no screen, or if its HDRI isn't in `cache/`.

## The sky and the light: HDRIs

What's outside the room, and much of its light, comes from an HDRI: a 360° photo that keeps how bright each part of the scene really is. Poly Haven's are CC0. Add one with an `hdri <name> <resolution>` line in `build.sh`, which downloads it to `cache/<name>_<resolution>.hdr`, and pass that file name to `render_room`. `hdri_rotation` turns it (in degrees) to put the sun where you want it, and `hdri_strength` sets how much light it gives.

4K is enough when the HDRI is only seen through a door or windows, as in the tent. When it's most of the view, as on a hilltop or in a fire lookout's glass cab, use 8K or more, or it will look soft.

An environment whose outside the app may replace, as it replaces the fire lookout's with real terrain, renders with `render_room(..., cutout=True)`: the HDRI still lights the room, but the image is left transparent wherever the camera saw past the room's geometry, glass included. The app then shows a sky sphere behind it, rendered from an HDRI alone by `sky.py` (a `sky <name> <hdri file> <rotation> <strength>` line in `build.sh`), and `CinemaEnvironment` says which sky images the environment has and where their sun is. The castle tower is lit by the same HDRI at the same turn as the fire lookout, so it uses the lookout's skies. The lighthouse is lit by the same HDRI turned to put the sun over the sea on the left, and has its own skies turned to match. The painted landscape behind the glass when there's no real terrain is its own script, such as `forest_view.py` or `sea_view.py`, rendered with a `view <name> <script> <hdri file> <rotation> <strength>` line; both use the haze helpers in `room_base.py`.

A cutout environment says in `CinemaEnvironment.siteKind` what it stands on in the downloaded maps: a summit (`LookoutTerrain.sites`), as the fire lookout and the castle tower do; a headland on the coast (`LookoutTerrain.coastSites`, scored by `LookoutCoast`), as the lighthouse does; the roof of one of the tallest buildings (`RooftopSites`), as the city rooftop does; or the face of one, as the sky deck does (`RooftopSites.deck` picks the face whose view the other tall towers block least, and the site carries the bearing out from it). Each kind keeps its own chosen site, turn and list of sites found, and `LookoutSite.standHeight` says how high the floor stands above the ground (the kind's `standHeight`, or for a rooftop or sky deck the building's height), which the terrain and the node markers are seen from. Whichever it is, the app builds the real terrain round it from the eye's height there, and puts a marker out for every node. For a rooftop it also stands the basemap's buildings out to about 3.5 km on that terrain (`RooftopCity`), drawn in the same compressed depths as the terrain so each sits in front of or behind it where it should. A rooftop's painted view, for when there's no map, is `city_view.py`: a made-up city under the lookout's clear sunset. A sky deck's glass floor shows straight down, so for it the terrain's rings start right under the seat and the city keeps the buildings a rooftop's deck would hide, leaving out only the tower it hangs off. On the 3D map, the rooftop puts a small water tower and mast (`SpatialRooftop`) on the chosen roof, at the height `SpatialRoofs` gives for it, as the lookout and the castle stand on their summit, and the sky deck hangs a small glass box (`SpatialSkyDeck`) on its tower's face at the tower's height.

A room with no HDRI at all, lit only by its own lights, passes `None` for the HDRI: `render_room(build, None, cutout=True)`. Its world is black and gives no light. The space station does this: its view out of the cupola is rendered by its own script, `space_earth.py`, with a `painted <name> <script>` line in `build.sh`. The station's racks, cupola and lights and the Earth view share where Earth and the sun are through `orbit.py`.

An environment built in more than one stone or color renders once per variant with `stone_environment <script> <variant>` in `build.sh`, which passes `--stone <variant>` to the script, writes `<script>_<variant>.heic`, and ships one `<script>_anchors.json` for all of them. The castle tower does this for gray and pink.

## Rules for assets

- Everything must be CC0 or your own work, with its source in `scripts/cinema/README.md`. No manufacturer logos or other marks.
- Keep the Meshtastic mark. A place can carry Meshtastic branding as the tent does; it never replaces it with another logo.
- Build from scripts so the image can be rebuilt. Don't commit `.blend` files or rendered PNGs; only the HEIC and its anchors ship.

## Trying it

Build for the visionOS 26.5 simulator and launch with `--meshtastic-open-cinema`. The app opens the Cinema a few seconds after launch. Pick your place under **Environment** on the control panel, then check that:

- the screen sits on the surface you meant
- each board lines up with its painted frame
- nothing near the viewer looks wrong as you move

Then try it on a headset if you have one.
