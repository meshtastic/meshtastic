/**
 * Prefix root-absolute paths in raw HTML with the site's baseUrl.
 *
 * Docusaurus resolves Markdown image and link syntax against baseUrl, but raw HTML
 * is passed through as written, so `<img src="/img/x.webp">` resolves against the
 * server root and breaks anywhere the site is served below one. MDX parses raw HTML
 * into JSX nodes with plain string attributes, so the rewrite belongs here: it reaches
 * every page, including frozen versioned docs and generated content, without either
 * having to carry a useBaseUrl import.
 *
 * Fenced blocks and code spans parse to `code`/`inlineCode` nodes rather than JSX, so
 * syntax examples are left literal without any special handling.
 */

// Attributes that hold a URL. `data` is for <object>, `href` for raw <a>.
const URL_ATTRIBUTES = new Set(["src", "srcset", "poster", "data", "href"]);

// Markdown links are Docusaurus's job, except ones pointing straight at a static file:
// it resolves links to pages, but leaves an asset path as written.
const ASSET_PREFIXES = ["/img/", "/documents/", "/design/"];

const isRootAbsolute = (url) => url.startsWith("/") && !url.startsWith("//");

// Only plain HTML elements. A capitalised name is a component, which may resolve the
// path itself, and prefixing it here would apply baseUrl twice.
const isHtmlElement = (name) =>
  typeof name === "string" && name[0] === name[0].toLowerCase();

function walk(node, visitor) {
  visitor(node);
  for (const child of node.children ?? []) {
    walk(child, visitor);
  }
}

/** @param {{baseUrl?: string}} options */
function remarkBaseUrlAssets({ baseUrl = "/" } = {}) {
  const prefix = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  // At a domain root every path is already correct, so skip the traversal entirely.
  if (prefix === "/") {
    return () => {};
  }

  /** Returns the prefixed URL, or null when the URL should be left alone. */
  const resolve = (url) => {
    if (!isRootAbsolute(url) || url.startsWith(prefix)) return null;
    return prefix + url.slice(1);
  };

  /** srcset holds comma-separated candidates, each a URL with an optional descriptor. */
  const resolveSrcset = (value) => {
    let touched = false;
    const candidates = value.split(",").map((candidate) => {
      const trimmed = candidate.trim();
      if (!trimmed) return trimmed;
      const [url, ...descriptor] = trimmed.split(/\s+/);
      const resolved = resolve(url);
      if (resolved) touched = true;
      return [resolved ?? url, ...descriptor].join(" ");
    });
    return touched ? candidates.filter(Boolean).join(", ") : null;
  };

  return (tree) => {
    walk(tree, (node) => {
      if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
        if (!isHtmlElement(node.name)) return;
        for (const attribute of node.attributes ?? []) {
          // Anything already an expression, such as useBaseUrl(), is left as written.
          if (attribute.type !== "mdxJsxAttribute") continue;
          if (typeof attribute.value !== "string") continue;
          if (!URL_ATTRIBUTES.has(attribute.name)) continue;

          const resolved =
            attribute.name === "srcset"
              ? resolveSrcset(attribute.value)
              : resolve(attribute.value);
          if (resolved) attribute.value = resolved;
        }
        return;
      }

      if (node.type === "link" && ASSET_PREFIXES.some((p) => node.url.startsWith(p))) {
        const resolved = resolve(node.url);
        if (resolved) node.url = resolved;
      }
    });
  };
}

module.exports = remarkBaseUrlAssets;
