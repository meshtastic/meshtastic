---
title: Adding Features
parent: Developer Guide
nav_order: 3
---

# Adding Features

This guide walks through adding a new settings view end-to-end: navigation state, deep link, view file, and Settings integration.

## 1. Add a Navigation Case

Open `Meshtastic/Router/NavigationState.swift` and add a new case to `SettingsNavigationState`:

```swift
enum SettingsNavigationState: String {
    // ... existing cases ...
    case myNewFeature   // raw value is "myNewFeature" — matches the deep link path segment
}
```

Use `lowerCamelCase` raw values. The raw value becomes the URL path segment for deep linking.

## 2. Create the View

Create a new SwiftUI file under `Meshtastic/Views/Settings/`:

```swift
// Meshtastic/Views/Settings/MyNewFeatureView.swift

import SwiftUI

struct MyNewFeatureView: View {
    var body: some View {
        List {
            // content
        }
        .navigationTitle("My New Feature")
    }
}
```

Keep view files focused. If the view grows beyond ~400 lines (SwiftLint warning), split into subviews or extension files.

## 3. Wire up Settings Navigation

Open `Meshtastic/Views/Settings/Settings.swift` and find the `navigationDestination(for:)` switch. Add your case:

```swift
.navigationDestination(for: SettingsNavigationState.self) { state in
    switch state {
    // ... existing cases ...
    case .myNewFeature:
        MyNewFeatureView()
    }
}
```

Then add a `NavigationLink` in the appropriate section of the Settings list:

```swift
NavigationLink(value: SettingsNavigationState.myNewFeature) {
    Label("My New Feature", systemImage: "star")
}
```

## 4. Handle the Deep Link (Optional)

If you need a deep link (`meshtastic:///settings/myNewFeature`), add handling in `Router.routeSettings()`:

```swift
func routeSettings(path: String) {
    if let state = SettingsNavigationState(rawValue: path) {
        navigationState.settingsNavigationState = state
        navigationState.selectedTab = .settings
    }
}
```

The `rawValue` init already handles this automatically for `String`-backed enums — no additional code needed.

Document the new URL in `docs/developer/deep-links.md`.

## 5. Add Logging

Import the appropriate logger category from `Logger.swift`:

```swift
Logger.data.debug("MyNewFeatureView appeared")
```

Create a new category only if existing categories don't fit. See the [Codebase Guide](codebase.md) for available categories.

## 6. Write Tests

Add a test file in `MeshtasticTests/` using Swift Testing:

```swift
import Testing
@testable import Meshtastic

@Suite("MyNewFeatureTests")
struct MyNewFeatureTests {
    @Test func navigationCaseHasCorrectRawValue() {
        #expect(SettingsNavigationState.myNewFeature.rawValue == "myNewFeature")
    }
}
```

Run tests in Xcode with ⌘U before opening a PR.
