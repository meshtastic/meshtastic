#!/usr/bin/env python3
"""Report <Tabs> blocks whose headings produce a wrong table of contents.

Docusaurus builds the table of contents from every heading in the file, whether
or not the tab holding it is the open one, and renders inactive tab panels with
the `hidden` attribute. Two shapes go wrong:

1. A block where some tabs open with a heading and others do not. The table of
   contents then lists a subset of the tabs, so the reader sees some variants
   and not others. This is wrong wherever it appears.

2. A block under docs/hardware/devices/ where no tab has a heading. Each tab
   there is a distinct device variant, and with no heading none of them reaches
   the table of contents, so a reader cannot tell the variants exist.

A block where no tab has a heading is fine everywhere else, and deliberately so:
platform and release-channel tabs (macOS/Windows/Linux, beta/alpha/daily) are
one instruction written several ways, not several subjects. Giving those tabs
headings would repeat the platform names throughout the table of contents
without adding a destination worth navigating to.

Exits 0 when nothing is reported, 1 otherwise. Callers treat a non-zero exit as
a warning, not a build failure.
"""

import pathlib
import re
import sys

TABS_OPEN = re.compile(r"<Tabs\b")
TABS_CLOSE = re.compile(r"</\s*Tabs>")
TAB_ITEM = re.compile(r'<TabItem\s[^>]*value\s*=\s*"([^"]+)"')
HEADING = re.compile(r"#{1,6}\s")

DEVICE_TREE = "docs/hardware/devices/"


def blocks(lines):
    """Yield (closing line number, [(line, value, has_heading), ...]) per Tabs block."""
    current = None
    for index, line in enumerate(lines):
        if TABS_OPEN.search(line):
            current = []
        match = TAB_ITEM.search(line)
        if match and current is not None:
            following = index + 1
            while following < len(lines) and not lines[following].strip():
                following += 1
            first = lines[following].strip() if following < len(lines) else ""
            current.append((index + 1, match.group(1), bool(HEADING.match(first))))
        if TABS_CLOSE.search(line) and current is not None:
            if current:
                yield index + 1, current
            current = None


def main(argv):
    roots = argv[1:] or ["docs"]
    found = 0
    for root in roots:
        base = pathlib.Path(root)
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.mdx")):
            text = path.read_text(encoding="utf-8", errors="replace").split("\n")
            in_device_tree = str(path).startswith(DEVICE_TREE)
            for close_line, tabs in blocks(text):
                headed = [tab for tab in tabs if tab[2]]
                if headed and len(headed) != len(tabs):
                    found += 1
                    missing = ", ".join(f'"{value}"' for _, value, ok in tabs if not ok)
                    print(
                        f"{path}:{close_line}  mixed headings: {len(headed)} of "
                        f"{len(tabs)} tabs are in the table of contents, "
                        f"missing {missing}"
                    )
                elif not headed and in_device_tree:
                    found += 1
                    values = ", ".join(f'"{value}"' for _, value, _ in tabs)
                    print(
                        f"{path}:{close_line}  no tab has a heading, so none of "
                        f"these device variants reaches the table of contents: {values}"
                    )
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
