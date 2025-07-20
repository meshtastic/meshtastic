import type { Options as PresetClassicOptions } from "@docusaurus/preset-classic";
import type { ThemeConfig } from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import autoprefixer from "autoprefixer";
import remarkDefList from "remark-deflist";
import tailwindcss from "tailwindcss";

require("dotenv").config();

const config: Config = {
  title: "Meshtastic",
  tagline:
    "An open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices",
  url: "https://meshtastic.org",
  baseUrl: "/",
  trailingSlash: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "design/web/favicon.ico",
  organizationName: "meshtastic",
  projectName: "meshtastic",
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Meshtastic Logo",
        src: "design/logo/svg/Mesh_Logo_Black.svg",
        srcDark: "design/logo/svg/Mesh_Logo_White.svg",
      },
      items: [
        {
          label: "Blog",
          to: "blog",
        },
        {
          label: "Docs",
          to: "docs/introduction",
        },
        {
          label: "Downloads",
          to: "downloads",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          label: "About",
          position: "right",
          items: [
            {
              label: "Introduction",
              to: "docs/introduction",
            },
            {
              label: "Getting Started",
              to: "docs/getting-started",
            },
            {
              label: "Contributing",
              to: "docs/contributing",
            },
            {
              label: "Legal",
              to: "docs/legal",
            },
            {
              label: "FAQs",
              to: "docs/faq",
            },
          ],
        },
        {
          href: "https://github.com/meshtastic",
          position: "right",
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
      contextualSearch: false,
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
  } satisfies ThemeConfig,
  plugins: [
    () => {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
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
      } satisfies PresetClassicOptions,
    ],
  ],
  customFields: {
    API_URL: process.env.API_URL,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "cs-CZ", "de", "pl-PL", "sk-SK", "tr-TR", "zh-CN", "zh-TW"],
    localeConfigs: {
      en: {
        label: "English",
      },
      "cs-CZ": {
        label: "Čeština",
      },
      da: {
        label: "Dansk",
      },
      fi: {
        label: "Suomi",
      },
      de: {
        label: "Deutsch",
      },
      it: {
        label: "Italiano",
      },
      "pl-PL": {
        label: "Polski",
      },
      "sk-SK": {
        label: "Slovenčina",
      },
      sv: {
        label: "Svenska",
      },
      "tr-TR": {
        label: "Türkçe",
      },
      "zh-CN": {
        label: "简体中文",
      },
      "zh-TW": {
        label: "繁體中文",
      },
    },
  },
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
