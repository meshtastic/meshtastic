---
title: Testing
parent: Developer Guide
nav_order: 6
---

# Testing

The test target is `MeshtasticTests/`. All new tests must use **Swift Testing** (`import Testing`).

## Writing Tests

```swift
import Testing
@testable import Meshtastic

@Suite("MyFeatureTests")
struct MyFeatureTests {

    @Test func someExpectation() {
        let value = computeSomething()
        #expect(value == 42)
    }

    @Test func requiredValue() throws {
        let result = try #require(optionalValue())
        #expect(result.count > 0)
    }
}
```

- Use `@Suite` to group related tests under a descriptive name.
- Use `#expect` for assertions (does not throw on failure — test continues).
- Use `#require` for preconditions (throws on failure — test stops).
- Do not use `XCTAssert*` in new test files.

## Running Tests

Run with ⌘U in Xcode. There is no CLI test runner — tests require Xcode.

Ensure all existing tests pass before opening a PR. SwiftLint runs on every commit; tests failing due to lint errors will block CI.

## Snapshot Tests

Snapshot tests for SwiftUI views live in `MeshtasticTests/SwiftUIViewSnapshotTests.swift`.

### How Snapshots Work

1. A `renderImage` helper renders a SwiftUI view to a `UIImage` using `UIHostingController` + `drawHierarchy(in:afterScreenUpdates:true)`.
2. On first run, the PNG is saved to `MeshtasticTests/__Snapshots__/SwiftUIViewSnapshotTests/` as a reference.
3. On subsequent runs, the rendered image is compared pixel-by-pixel to the reference using `CGImage` dimensions.

### Writing a Snapshot Test

```swift
@Suite("MyViewSnapshotTests")
struct MyViewSnapshotTests {

    @Test func rendersCorrectly() throws {
        let image = try renderImage(MyView(), width: 390)
        let cgImage = try #require(image.cgImage)
        #expect(cgImage.width == 390 * Int(UIScreen.main.scale))
    }
}
```

- Name suites `<ViewName>SnapshotTests`.
- Compare using `cgImage.width` / `cgImage.height` (pixel dimensions at screen scale), not `UIImage.size` (which is scale-dependent).
- For views with `ScrollView` or no intrinsic height, pass an explicit `height:` parameter to `renderImage`.
- Commit reference PNGs alongside the test file.

### Embedding Dark/Light Snapshot Pairs in Docs

When a view is snapshotted in both colour schemes (e.g. `foo_light.png` + `foo_dark.png`), embedding both `![]()` tags side-by-side causes both images to appear simultaneously on the Jekyll site and in the in-app viewer. Use an HTML `<picture>` element instead:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../assets/screenshots/foo_dark.png">
  <img src="/img/apple/foo_light.png" alt="Description">
</picture>
```

This works in both contexts because `build-docs.sh` invokes `cmark-gfm --unsafe` (raw HTML is passed through) and `WKWebView` (used for in-app display) is full WebKit and respects `prefers-color-scheme`.

### Regenerating Snapshots

Delete the reference PNG and run the test once — it records a new reference. Commit the new reference with your PR.

## Async Tests

For tests involving `async/await`:

```swift
@Test func asyncOperation() async throws {
    let result = await someAsyncFunction()
    #expect(result != nil)
}
```

Router is `@MainActor`; access it in tests with `await MainActor.run { }`:

```swift
@Test func routerNavigates() async {
    let router = await MainActor.run { Router() }
    await MainActor.run { router.routeSettings(path: "helpDocs") }
    let state = await MainActor.run { router.navigationState.settingsNavigationState }
    #expect(state == .helpDocs)
}
```
