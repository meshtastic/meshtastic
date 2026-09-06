---
title: Test Builds & Obtainium
sidebar_position: 10
last_updated: 2026-07-29
description: Install and auto-update Meshtastic test builds from GitHub releases with Obtainium — channel configurations, APK selection, and the shareable config format.
parent: Developer Guide
---

# Test Builds & Obtainium

[Obtainium](https://github.com/ImranR98/Obtainium) installs and auto-updates Android apps straight from their GitHub releases — no Play Store account, no testing-track invite. This page sets it up for Meshtastic and shows how to follow the **open beta**, **closed beta**, or **snapshot** channels.

> **Heads up — signatures.** Builds from GitHub are signed with the project's release key (`CN=Kevin Hester, O=Geeksville Industries`), **not** Google Play's. If you already have Meshtastic installed from the Play Store, Android will refuse to update over it: **uninstall the Play Store version first** (this clears app data), then install via Obtainium and stay on Obtainium for updates.
>
> **Switching between the `fdroid` and `google` flavors is fine.** Both flavors in a given release carry the *same* release key, so Obtainium can move you from one to the other in place — verified by installing the `google` APK over an installed `fdroid` build. Only the *origin* of a build (Play vs GitHub) determines whether the signatures clash.

---

## Which channels can Obtainium reach?

Meshtastic for Android promotes builds up a ladder: `closed → open → production`. Each maps to a Google Play track, and the GitHub release is published (un-drafted) when a build is promoted to closed or higher.

| Channel | Play track | On GitHub | Obtainium can install it? |
|---|---|---|---|
| **stable** | Production | published, marked *Latest* | ✅ Yes |
| **open** beta | Beta (Open) | published prerelease, tag `vX.Y.Z-open.N` | ✅ Yes |
| **closed** beta | Alpha (Closed) | published prerelease, tag `vX.Y.Z-closed.N` | ✅ Yes |
| **snapshot** | — (not on Play) | rolling prerelease, tag `snapshot` | ✅ Yes |

Each promotion cuts its **own** tag, and older ones stay published — a whole run of `vX.Y.Z-open.N` tags accumulates during a version cycle, each still installable with APKs attached. So a channel gathers releases rather than moving a single one forward, and the channel configs below pick the **newest** release whose title matches the channel.

Which release each channel currently resolves to is deliberately **not** listed on this page: it is archived per release tag and bundled into the app, so a live version number here would be frozen at build time and wrong within weeks. The [project README](https://github.com/meshtastic/Meshtastic-Android#get-meshtastic) carries the current state, refreshed automatically.

A channel can legitimately be empty — most often `-closed`, early in a cycle before any build has been cut to it. The number of published `fdroid` ABI splits has also changed over time (2.7.14 shipped five, 2.8.0 ships three), which is why the filter matches every split rather than naming ABIs.

**Snapshot** is different: it's an automated debug build of the latest commit on `main`, rebuilt and re-published under the single moving `snapshot` tag on every push. It never goes to Play. Because debug builds use a `.debug` application-ID suffix (`com.geeksville.mesh.fdroid.debug` / `com.geeksville.mesh.google.debug`) and the debug signing key, a snapshot installs as its **own separate app** — it sits alongside a Play/stable/beta install, so the uninstall-first warning above does **not** apply to it.

---

## One-tap setup

Tap a link below on the device that has Obtainium installed. Every setting from the rest of this page is already baked into it — pick the channel you want and the flavor you want ([which flavor?](#picking-the-apk)).

<!-- BEGIN GENERATED LINKS: obtainium/generate-links.py -->

| Channel | `google` flavor | `fdroid` flavor |
|---|---|---|
| Stable | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%22%2C%22additionalSettings%22%3A%22%7B%5C%22apkFilterRegEx%5C%22%3A%5C%22google-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%5C%22%7D%22%7D) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%22%2C%22additionalSettings%22%3A%22%7B%5C%22apkFilterRegEx%5C%22%3A%5C%22fdroid-.%2A-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%5C%22%7D%22%7D) |
| Open beta | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Beta%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-open%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22google-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Beta%5C%22%7D%22%7D) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Beta%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-open%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22fdroid-.%2A-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Beta%5C%22%7D%22%7D) |
| Closed beta | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Alpha%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-closed%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22google-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Alpha%5C%22%7D%22%7D) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Alpha%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-closed%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22fdroid-.%2A-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Alpha%5C%22%7D%22%7D) |
| Bleeding edge (newest promoted test build) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Beta%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-%28closed%7Copen%29%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22google-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Beta%5C%22%7D%22%7D) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Beta%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22-%28closed%7Copen%29%5C%22%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22fdroid-.%2A-release%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Beta%5C%22%7D%22%7D) |
| Snapshot (latest commit on `main`) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh.google.debug%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Snapshot%20%28google%29%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5ESnapshot%5C%22%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Atrue%2C%5C%22versionDetection%5C%22%3Afalse%2C%5C%22releaseDateAsVersion%5C%22%3Atrue%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22google-.%2A-debug-%5C%5C%5C%5Cd%2B%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Snapshot%20%28google%29%5C%22%7D%22%7D) | [Add](https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/%7B%22id%22%3A%22com.geeksville.mesh.fdroid.debug%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2Fmeshtastic%2FMeshtastic-Android%22%2C%22author%22%3A%22meshtastic%22%2C%22name%22%3A%22Meshtastic%20Snapshot%20%28fdroid%29%22%2C%22additionalSettings%22%3A%22%7B%5C%22includePrereleases%5C%22%3Atrue%2C%5C%22filterReleaseTitlesByRegEx%5C%22%3A%5C%22%5ESnapshot%5C%22%2C%5C%22useLatestAssetDateAsReleaseDate%5C%22%3Atrue%2C%5C%22versionDetection%5C%22%3Afalse%2C%5C%22releaseDateAsVersion%5C%22%3Atrue%2C%5C%22apkFilterRegEx%5C%22%3A%5C%22fdroid-.%2A-debug-%5C%5C%5C%5Cd%2B%5C%5C%5C%5C.apk%24%5C%22%2C%5C%22autoApkFilterByArch%5C%22%3Atrue%2C%5C%22appName%5C%22%3A%5C%22Meshtastic%20Snapshot%20%28fdroid%29%5C%22%7D%22%7D) |

<!-- END GENERATED LINKS -->

Prefer a file? Import one of these via **Import/Export → Obtainium import**. Pick the one matching the flavor you want for the *release* build; each also sets up **both** snapshot flavors, which can coexist:

- [`meshtastic-obtainium-export-google.json`](https://github.com/meshtastic/Meshtastic-Android/blob/main/obtainium/meshtastic-obtainium-export-google.json) — `google` stable + both snapshots
- [`meshtastic-obtainium-export-fdroid.json`](https://github.com/meshtastic/Meshtastic-Android/blob/main/obtainium/meshtastic-obtainium-export-fdroid.json) — `fdroid` stable + both snapshots

### How many entries can you have at once?

Obtainium keys apps by application ID, so the rule follows from ours:

| | Application ID | Can coexist? |
|---|---|---|
| Release builds — stable, open, closed, bleeding edge, either flavor | `com.geeksville.mesh` | **No** — pick exactly one |
| Snapshot, `google` | `com.geeksville.mesh.google.debug` | Yes |
| Snapshot, `fdroid` | `com.geeksville.mesh.fdroid.debug` | Yes |

So one release entry, plus up to both snapshots, is the maximum. Tapping a second *release* link switches that single entry to the new channel or flavor instead of adding one, and importing both files in turn leaves you with whichever flavor's release entry came last. The snapshots are unaffected either way.

To set things up by hand instead, follow the rest of this page.

---

## Manual setup

1. Install Obtainium ([GitHub releases](https://github.com/ImranR98/Obtainium/releases) or [F-Droid / IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/dev.imranr.obtainium)).
2. Tap **Add App**.
3. **App Source URL:** `https://github.com/meshtastic/Meshtastic-Android`
4. Set the options for the channel you want (below).
5. Tap **Add**, then **Install**.

### Stable

- **Include prereleases:** off
- *(optional, stricter)* **Verify the 'latest' tag:** on
- **Filter APKs by regular expression:** see [Picking the APK](#picking-the-apk)

### Open beta

- **Include prereleases:** on
- **Filter release titles by regular expression:** `-open`
- **Filter APKs by regular expression:** see [Picking the APK](#picking-the-apk)

### Closed beta

- **Include prereleases:** on
- **Filter release titles by regular expression:** `-closed`
- **Filter APKs by regular expression:** see [Picking the APK](#picking-the-apk)

### Bleeding edge (newest promoted test build, any channel)

- **Include prereleases:** on
- **Filter release titles by regular expression:** `-(closed|open)`
- **Filter APKs by regular expression:** see [Picking the APK](#picking-the-apk)

Obtainium installs the newest promoted prerelease — whatever is currently in open or closed. The title filter is required to skip the always-newer `snapshot` prerelease; without it Obtainium would follow snapshot instead.

### Snapshot (latest commit on `main`)

- **Include prereleases:** on
- **Filter release titles by regular expression:** `^Snapshot`
- **Use the latest asset date as the release date:** on
- **Version detection:** off, with **Release date as version** on
- **Filter APKs by regular expression:** debug-signed names, see below

Follows `main` directly — updates on every push. These are **debug builds** (`.debug` package, debug key), so they install as a separate app and won't disturb a stable/beta install. The `snapshot` tag never changes, so there is no version string to compare — date-based pseudo-versioning is what makes updates detectable.

The APKs are named `…-debug-<versionCode>.apk` (not `-release.apk`), so use debug-suffixed filters:

| You want | Regex |
|---|---|
| `google` flavor, most phones (arm64) | `google-arm64-v8a-debug-\d+\.apk` |
| `fdroid` flavor, most phones (arm64) | `fdroid-arm64-v8a-debug-\d+\.apk` |
| `fdroid` flavor, one-size-fits-all | `fdroid-universal-debug-\d+\.apk` |

Snapshot releases attach only the debug APKs — no `.aab` or desktop installers.

> **If you build debug locally, uninstall your local build first.** CI signs snapshots with *its own* debug keystore, not yours (`07c16b98…` from CI versus `88914c61…` from a local machine, for example). Since both produce the same `com.geeksville.mesh.<flavor>.debug` package name, Android refuses the swap with `INSTALL_FAILED_UPDATE_INCOMPATIBLE`. The "installs as a separate app" note above holds against *release* builds, not against your own debug builds.

Two more things about release selection apply to every channel above, not just snapshot:

> **Leave "Fallback to older releases" ON.** It is not a channel-strictness setting, and turning it off breaks every channel config here. Obtainium's release loop breaks out after the first candidate when fallback is off, so a title filter never gets to skip past releases that don't match — a config pinned to `-open` or `^Snapshot` then fails with "Could not find a suitable release" because production `v2.7.14` sits at the head of the list. The title filter is what pins the channel; fallback is what lets Obtainium walk down to the newest release that matches it.
>
> **If your channel filter still finds nothing:** that channel has no published release yet — common early in a version cycle. Check the [project README](https://github.com/meshtastic/Meshtastic-Android#get-meshtastic) for what is live, or use the *Bleeding edge* form to follow whichever of open/closed is newest.

---

## Picking the APK

Each release attaches the `google` flavor APK, several `fdroid` flavor APKs, plus an `.aab` (not installable) and the desktop installers. Obtainium ignores non-APK assets on its own, but the two flavors share the `com.geeksville.mesh` package name, so exactly one must be pinned with **Filter APKs by regular expression**:

| You want | Regex |
|---|---|
| **Recommended for testing — `google` flavor** | `google-release\.apk` |
| `fdroid` flavor, most phones (arm64) | `fdroid-arm64-v8a-release\.apk` |
| `fdroid` flavor, one-size-fits-all | `fdroid-universal-release\.apk` |
| `fdroid` flavor, let Obtainium pick the ABI | `fdroid-.*-release\.apk` with **Auto-select by architecture** on |

**Use the `google` flavor while testing.** It ships Firebase Crashlytics and Datadog RUM, so the crashes and errors you hit get reported back to the team — which is the whole point of a test phase. It also has Google push (FCM) and Google Maps. Pick an `fdroid` flavor only if you'd rather not send that telemetry. You can change your mind later: both flavors share the release key, so Obtainium updates across the flavor boundary without an uninstall. Expect the `google` flavor to show its analytics-consent screen the first time it starts.

---

## Version detection turns itself off — that's expected

Release tags read `vX.Y.Z`, while our installed `versionName` reads `X.Y.Z (versionCode) <flavor>`. Obtainium tries to reconcile the two against a list of standard version formats, all of which are **fully anchored** — none of them tolerates the spaces and parentheses in our `versionName`. So on the first update check Obtainium logs `Could not reconcile version formats for: com.geeksville.mesh`, sets **Version detection** to off for the app, and records the release tag as the installed version.

**This is harmless and you should not try to fix it.** With detection off, Obtainium compares the release tag it last installed against the newest tag, so updates are still detected and installed normally. What you lose is only the ability to notice a version installed *outside* Obtainium.

In particular, **do not set "Trim the version string"** to `\d+\.\d+\.\d+` hoping to fix it. That setting only rewrites the version parsed from the *release*; the unparseable side is the installed `versionName`, which it never touches — so reconciliation fails exactly as before. It also adds a failure mode: if the regex ever matches nothing (a tag without a three-part version), the update check fails outright with a "no version found" error instead of degrading quietly.

Snapshot is a separate case: its tag is the literal string `snapshot` and never changes, so tag comparison can't work either. Those configs use date-based pseudo-versioning (**Release date as version** plus **Use the latest asset date as the release date**) instead.

---

## The config format

An Obtainium app configuration is a flat JSON object. Four keys are required — `id` (Android package name), `url` (the GitHub repo, which is what selects the source), `author`, and `name`. Everything else goes in `additionalSettings`, a **JSON string nested inside the JSON**, so its quotes and backslashes are escaped one extra level. Any key you omit takes its default.

The same object travels in three shapes:

| Shape | Format | Used for |
|---|---|---|
| Import/export file | `{"apps":[…],"settings":null}` | **Import/Export → Obtainium import** |
| Deep link | `obtainium://app/<percent-encoded JSON>` | one-tap add with settings baked in |
| Config-site entry | `{"configs":[…],"icon","categories","description"}` | PRs to [apps.obtainium.imranr.dev](https://apps.obtainium.imranr.dev) |

`obtainium://add/<url>` only prefills the Add-App page; `obtainium://app/…` is what carries settings. Wrapping a link as `https://apps.obtainium.imranr.dev/redirect.html?r=obtainium://app/…` keeps it clickable where a custom scheme wouldn't linkify.

Obtainium keys apps by package name, so the two stable flavors cannot coexist as separate entries — the config-site submission expresses them as alternate `configs` with an `altLabel` each. See [`obtainium/README.md`](https://github.com/meshtastic/Meshtastic-Android/blob/main/obtainium/README.md) for the full key reference and the submission checklist.

---

## Notes

- **Play Protect may interrupt the install** with "App scan recommended — Play Protect hasn't seen this app before," offering *Scan app* or *Don't install app*. *Scan app* uploads the APK to Google. Declining cancels the install, so on a device with Play Services you'll need to allow the scan, or install with `adb install` instead. This showed up for a debug-signed snapshot but not for a release-signed build.
- **Obtainium's first launch shows two full-screen dialogs** (a welcome note and a Play-certification note). They swallow an incoming `obtainium://` link, so dismiss them before using a one-tap link.
- **Track without installing:** turn on **Track-only** to get update notifications without Obtainium downloading anything.
- **Snapshot filenames carry the versionCode** so that a moving tag, which reuses the same release and asset URLs forever, still produces a distinguishable asset on every build.
