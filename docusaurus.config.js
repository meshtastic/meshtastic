require("dotenv").config();

import path from "node:path";
import remarkDefList from "remark-deflist";
import glossaryPlugin from "docusaurus-plugin-glossary";
const remarkBaseUrlAssets = require("./src/remark/base-url-assets.js");

// Terms link and show a definition on hover. Acronym expansion stays off: it
// rewrites authored prose, and its "already expanded" guard misses any wording
// the author varied, producing "Protocol Buffer (Protocol Buffers (protobuf))".
const glossaryPath = "glossary/glossary.json";

// Where a term links to. docs/terms/index.mdx renders the glossary itself so the
// page keeps the docs sidebar, which a plugin-generated route does not get.
const glossaryRoutePath = "/docs/terms/";

// Raw HTML in the config and in MDX bypasses Docusaurus link handling, so anything
// built by hand has to prefix this itself. Overridable for builds served under a
// path rather than at a domain root. Docusaurus gives the value it is handed both a
// leading and a trailing slash, so do the same here or the two disagree.
const baseUrl = `/${process.env.DOCS_BASE_URL ?? ""}/`.replace(/\/{2,}/g, "/");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Meshtastic",
  tagline:
    "An open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices",
  url: "https://meshtastic.org",
  baseUrl,
  trailingSlash: true,
  onBrokenLinks: "throw",
  favicon: "img/logo.svg",
  organizationName: "meshtastic",
  projectName: "meshtastic",
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    respectPrefersColorScheme: true,
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      hideOnScroll: false,
      title: "Meshtastic",
      logo: {
        alt: "Meshtastic Logo",
        src: "img/logo.svg",
        srcDark: "img/logo.svg",
      },
      items: [
        {
          label: "Docs",
          to: "/docs/introduction/",
          position: "left",
        },
        {
          label: "Blog",
          to: "/blog/",
          position: "left",
        },
        {
          label: "Downloads",
          to: "/downloads/",
          position: "left",
        },
        {
          label: "Flasher",
          href: "https://flasher.meshtastic.org",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
        {
          type: "search",
          position: "right",
        },
        {
          label: "Donate",
          href: "https://opencollective.com/meshtastic",
          position: "right",
        },
        {
          label: "GitHub",
          href: "https://github.com/meshtastic",
          position: "right",
        },
      ],
    },
    footer: {
      copyright: `<a href="https://vercel.com/?utm_source=meshtastic&utm_campaign=oss">Powered by ▲ Vercel</a> | Meshtastic® is a registered trademark of Meshtastic LLC. | <a href="${baseUrl}docs/legal">Legal Information</a>.`,
    },
    algolia: {
      appId: "IG2GQB8L3V",
      apiKey: "2e4348812173ec7ea6f7879c7032bb21",
      indexName: "meshtastic",
      contextualSearch: true,
      searchPagePath: "search",
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: { light: "base", dark: "base" },
      options: {
        themeVariables: {
          primaryColor: "#67EA94",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#4D4D4D",
          lineColor: "#EAD667",
          secondaryColor: "#EA67BD",
          tertiaryColor: "#677CEA",
        },
      },
    },
    prism: {
      additionalLanguages: ["shell-session", "bash"],
    },
  },
  plugins: [
    () => {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    () => {
      return {
        name: "docusaurus-webpack-alias",
        configureWebpack() {
          return {
            resolve: {
              alias: {
                "@": path.resolve(__dirname, "src"),
              },
            },
          };
        },
      };
    },
    "@docusaurus/plugin-vercel-analytics",
    // routePath: null suppresses the plugin's own page; the plugin stays
    // registered so its term data reaches the tooltips and the glossary page.
    ["docusaurus-plugin-glossary", { glossaryPath, routePath: null }],
  ],
  scripts: [
    ...(process.env.COOKIEYES_CLIENT_ID
      ? [
          {
            src: `https://cdn-cookieyes.com/client_data/${process.env.COOKIEYES_CLIENT_ID}/script.js`,
            async: true,
          },
        ]
      : []),
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Frozen versions get no "Edit this page" link; only current is editable.
          editUrl: ({ version, docPath }) =>
            version === "current"
              ? `https://github.com/meshtastic/meshtastic/edit/master/docs/${docPath}`
              : undefined,
          breadcrumbs: false,
          showLastUpdateAuthor: true,
          remarkPlugins: [
            remarkDefList,
            [remarkBaseUrlAssets, { baseUrl }],
            [
              glossaryPlugin.remarkPlugin,
              { glossaryPath, routePath: glossaryRoutePath, siteDir: __dirname },
            ],
          ],
          lastVersion: "current",
          versions: {
            current: { label: "2.8" },
            2.7: {
              label: "2.7 and below",
              path: "2.7",
              banner: "unmaintained",
            },
          },
        },
        blog: {
          remarkPlugins: [[remarkBaseUrlAssets, { baseUrl }]],
          blogTitle: "Meshtastic Blog",
          blogDescription:
            "Discover in-depth insights from developers and maintainers, including project updates and changes. Hear from the community about their projects and ideas.",
        },
        pages: {
          remarkPlugins: [[remarkBaseUrlAssets, { baseUrl }]],
        },
        sitemap: {
          ignorePatterns: ["/docs/2.7/**"],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  customFields: {
    API_URL: process.env.API_URL,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
  future: {
    faster: true,
    v4: {
      useCssCascadeLayers: false,
      removeLegacyPostBuildHeadAttribute: true,
    },
  },
};

module.exports = config;
