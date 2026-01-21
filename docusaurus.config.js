require("dotenv").config();

import path from "node:path";
import remarkDefList from "remark-deflist";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Meshtastic",
  tagline:
    "An open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices",
  url: "https://meshtastic.org",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "meshtastic",
  projectName: "meshtastic",
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Meshtastic Logo",
        src: "img/logo.svg",
        srcDark: "img/logo.svg",
      },
      items: [
        {
          label: "Documentation",
          to: "docs/introduction/",
        },
        {
          label: "Downloads",
          to: "downloads/",
        },
        {
          label: "Flasher",
          href: "https://flasher.meshtastic.org",
          className: "navbar__item--flasher",
        },
        // // {
        // //   label: "About",
        // //   position: "right",
        // //   items: [
        // //     {
        // //       label: "Introduction",
        // //       to: "docs/introduction",
        // //     },
        // //     {
        // //       label: "Getting Started",
        // //       to: "docs/getting-started",
        // //     },
        // //     {
        // //       label: "Contributing",
        // //       to: "docs/contributing",
        // //     },
        // //     {
        // //       label: "Legal",
        // //       to: "docs/legal",
        // //     },
        // //     {
        // //       label: "FAQs",
        // //       to: "docs/faq",
        // //     },
        // //   ],
        // // },
        {
          href: "https://github.com/meshtastic",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      copyright: `<a href="https://vercel.com/?utm_source=meshtastic&utm_campaign=oss">Powered by ▲ Vercel</a> | Meshtastic® is a registered trademark of Meshtastic LLC. | <a href="/docs/legal">Legal Information</a>.`,
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
          primaryTextColor: "var(--tw-prose-headings)",
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
          editUrl: "https://github.com/meshtastic/meshtastic/edit/master/",
          breadcrumbs: false,
          showLastUpdateAuthor: true,
          remarkPlugins: [remarkDefList],
        },
        blog: {
          blogTitle: "Meshtastic Blog",
          blogDescription:
            "Discover in-depth insights from developers and maintainers, including project updates and changes. Hear from the community about their projects and ideas.",
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
    locales: ["en", "cs-CZ", "de", "pl-PL", "sk-SK", "tr-TR", "zh-CN", "zh-TW"],
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  future: {
    v4: {
      useCssCascadeLayers: false,
    },
  },
};

module.exports = config;
