---
title: LoRa Region Presets
parent: Developer Guide
sidebar_position: 11
---

# LoRa Region → Preset Compatibility

For 2.8 the firmware reworked LoRa regions and modem presets so that **not every
preset is legal in every region** — the EU SRD / narrow bands, the amateur (ham)
bands, and the 2.4 GHz band each accept only a subset. The firmware enforces this
internally, but a client had no way to *know* the rules, so a user could pick an
illegal region+preset pair and only discover it after the radio silently corrected
it.

The radio now **declares the legal region→preset combinations** to the client during
the `want_config` handshake, so the LoRa config screen can constrain the preset
picker to the valid set for the selected region (and warn about licensed-only bands).
It is advisory metadata — the firmware remains the source of truth and still
validates/clamps on its own.

## Protocol

Three messages in `mesh.proto` plus one new `FromRadio` oneof variant (field 19),
generated into `MeshtasticProtobufs`:

```proto
message LoRaPresetGroup {
  repeated Config.LoRaConfig.ModemPreset presets = 1;       // legal presets for this group
  Config.LoRaConfig.ModemPreset         default_preset = 2; // always one of `presets`
  bool                                  licensed_only = 3;  // ham/amateur band → warn/gate
}
message LoRaRegionPresets {
  Config.LoRaConfig.RegionCode region = 1;
  uint32                       group_index = 2; // index into LoRaRegionPresetMap.groups
}
message LoRaRegionPresetMap {
  repeated LoRaPresetGroup    groups = 1;        // each distinct preset list, once
  repeated LoRaRegionPresets  region_groups = 2; // every known region → a group index
}
```

The map is delivered **grouped** (each distinct preset list appears once in `groups`;
`region_groups` maps every region to a group by index) so it fits in a single 512-byte
`FromRadio` packet. It arrives once, immediately after `metadata` and before the first
`channel`, on a full or config-only `want_config`. It is **omitted** by the nodes-only
nonce and by firmware older than 2.8.

## Decode and storage

The grouped wire form is flattened into a per-region lookup by
`LoRaRegionPresetMap.decoded()` in
[`LoraConfigEnums.swift`](https://github.com/meshtastic/Meshtastic-Apple/blob/main/Meshtastic/Enums/LoraConfigEnums.swift):

```swift
struct RegionPresetInfo: Equatable {
    let presets: Set<Config.LoRaConfig.ModemPreset>
    let defaultPreset: Config.LoRaConfig.ModemPreset
    let licensedOnly: Bool
}

extension LoRaRegionPresetMap {
    func decoded() -> [Config.LoRaConfig.RegionCode: RegionPresetInfo]
}
```

A `region_groups` entry whose `group_index` is out of range is skipped defensively,
which tolerates malformed or forward-compatible data.

`AccessoryManager.processFromRadio(_:)` dispatches the new `.regionPresets` variant to
`handleRegionPresets(_:)` (in `AccessoryManager+FromRadio.swift`), which stores the
decoded lookup on the connection model:

```swift
@Published var loRaRegionPresets: [Config.LoRaConfig.RegionCode: RegionPresetInfo] = [:]
```

It is **reset to empty on disconnect** (`updateState` → `.idle`/`.discovering`), so the
map always reflects the currently connected radio. There is no SwiftData persistence —
the radio re-sends it every handshake, and the LoRa screen only edits a connected node.

## Firmware gating

The new 2.8 regions and presets must **not** be settable on radios running 2.7.x or
earlier, which have no band table for them and would silently clamp the selection.
`RegionCodes` and `ModemPresets` (in `LoraConfigEnums.swift`) mark the 2.8 additions and
expose firmware-aware selection helpers:

```swift
RegionCodes.selectable(supports2_8: Bool) -> [RegionCodes]
ModemPresets.selectable(supports2_8: Bool) -> [ModemPresets]
```

When `supports2_8` is `false`, the amateur/ham regions (`itu*`), the EU 866 / narrow
regions, and the Lite / Narrow / Tiny presets are dropped from the pickers. The flag is
derived from the connected radio via the existing
`AccessoryManager.checkIsVersionSupported(forVersion: "2.8.0")`. The legacy
`userSelectable` accessors are retained for callers with no firmware context (e.g. the
discovery scan) and are equivalent to `selectable(supports2_8: false)`.

## UI integration

[`LoRaConfig.swift`](https://github.com/meshtastic/Meshtastic-Apple/blob/main/Meshtastic/Views/Settings/Config/LoRaConfig.swift)
reads `accessoryManager.loRaRegionPresets` and applies these rules:

- **Filter** — when *Use Preset* is on, the preset picker (`availablePresets`) is the
  firmware-gated list intersected with the selected region's legal set. It never renders
  empty: an absent region or absent message falls back to the full gated list.
- **Default preset** — switching region runs `applyRegionPresetDefault(forRegion:)`,
  which delegates to the pure, unit-tested `ModemPresets.presetToSelect(…)`. A
  factory-flashed node (region still unset) defaults to **Long Turbo** when **US** is
  selected; otherwise, if the current preset is not legal in the new region, it selects
  that region's `default_preset`.
- **Licensed bands** — when the region's `licensed_only` is set, a warning row is shown,
  coordinated with the operator's `is_licensed` flag in User Config.
- **EU auto-swap** — the firmware may swap the EU sibling regions
  (`EU_868` / `EU_866` / `EU_N_868`) on a preset change. The screen dismisses on save and
  re-reads the persisted (possibly swapped) region on reopen, so the picker stays
  consistent.

## Semantics (the load-bearing rules)

| Rule | Behavior |
| --- | --- |
| Region absent from map | No constraint — show the full (firmware-gated) preset list. |
| Whole message absent (pre-2.8) | No constraint — keep unconstrained behavior; never block the screen waiting for it. |
| `default_preset` | Always a member of the group's `presets`; used to re-select when the current preset becomes illegal. |
| `licensed_only` | Ham/amateur band — warn/gate and coordinate with `is_licensed`. |
| Source of truth | The firmware still validates/clamps; the map is a UI guard, not a correctness boundary. |

Regions with no firmware band table (`EU_874`, `EU_917`, `ITU*_70CM`) are simply absent
from the map and carry no constraint.

## Files

| File | Role |
| --- | --- |
| `Meshtastic/Enums/LoraConfigEnums.swift` | `RegionCodes`/`ModemPresets` cases, gating helpers, `RegionPresetInfo`, `LoRaRegionPresetMap.decoded()` |
| `Meshtastic/Accessory/Accessory Manager/AccessoryManager.swift` | `loRaRegionPresets` storage, `.regionPresets` dispatch, disconnect reset |
| `Meshtastic/Accessory/Accessory Manager/AccessoryManager+FromRadio.swift` | `handleRegionPresets(_:)` |
| `Meshtastic/Views/Settings/Config/LoRaConfig.swift` | Region/preset pickers, filtering, default-preset switch, licensed warning |
| `MeshtasticTests/LoraDeviceEnumTests.swift` | `LoRaRegionPresetMapTests`, `LoRaFirmwareGatingTests` |

## Testing

`LoRaRegionPresetMapTests` decodes the firmware's reference table (spec §9 — six preset
groups) and asserts the per-region presets, defaults, and licensing — including that two
groups sharing the same preset list keep distinct licensing, that an out-of-range
`group_index` is skipped, and that absent regions carry no entry.
`LoRaFirmwareGatingTests` covers the `selectable(supports2_8:)` gating for both enums.
