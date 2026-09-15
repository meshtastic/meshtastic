// Make table-of-contents links work when the heading lives inside a tab.
//
// Docusaurus renders inactive <TabItem> panels into the DOM with the `hidden`
// attribute, so a heading inside a closed tab has a valid id but nothing the
// browser can scroll to. Tab selection is synced from the query string and from
// localStorage, never from location.hash, and upstream closed that as working
// as intended (facebook/docusaurus#5343). So open the owning tab first, then
// scroll.
//
// This is site infrastructure, not an authoring API: .mdx files keep using
// <Tabs> and <TabItem> exactly as before and never reference this file.

const PANEL = '[role="tabpanel"]';

const frame = () => new Promise(requestAnimationFrame);

// Tab buttons for a panel, best guess first. A <Tabs values> prop can order the
// buttons differently from the TabItem children, so the positional match is only
// a guess and the caller verifies it before settling.
function tabButtonsFor(panel) {
  const container = panel.closest(".tabs-container");
  if (!container) {
    return [];
  }
  const buttons = [
    ...container.querySelectorAll(':scope > [role="tablist"] > [role="tab"]'),
  ];
  const panels = [...panel.parentElement.children].filter((node) =>
    node.matches(PANEL),
  );
  return [buttons[panels.indexOf(panel)], ...buttons].filter(Boolean);
}

async function revealHash(hash) {
  let id;
  try {
    id = decodeURIComponent((hash || "").replace(/^#/, ""));
  } catch {
    return; // Malformed percent-encoding, such as "#%".
  }
  if (!id) {
    return;
  }

  // On a cold load the target may not be mounted yet.
  let target = null;
  for (let i = 0; i < 20 && !target; i++) {
    target = document.getElementById(id);
    if (!target) {
      await frame();
    }
  }

  const panel = target?.closest(`${PANEL}[hidden]`);
  if (!panel) {
    return; // Already visible, so the browser has handled it.
  }

  // Clicking the tab is the only way in: selectValue lives in React state with
  // no imperative handle. The click also writes the query string and
  // localStorage, exactly as a reader's own click would, so the resulting URL
  // stays shareable.
  for (const button of tabButtonsFor(panel)) {
    button.click();
    await frame();
    if (!panel.hasAttribute("hidden")) {
      break;
    }
  }

  // Tabs restores the scroll position on the render after a change, via
  // blockElementScrollPositionUntilNextRender, so scroll once that has landed.
  await frame();
  target.scrollIntoView();
}

export function onRouteDidUpdate({ location }) {
  if (location.hash) {
    revealHash(location.hash);
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => revealHash(window.location.hash));

  // Clicking the entry already in the URL fires no hashchange.
  window.addEventListener(
    "click",
    (event) => {
      const link = event.target.closest?.('a[href*="#"]');
      if (!link) {
        return;
      }
      const url = new URL(link.href, window.location.href);
      if (
        url.pathname === window.location.pathname &&
        url.hash &&
        url.hash === window.location.hash
      ) {
        revealHash(url.hash);
      }
    },
    true,
  );
}
