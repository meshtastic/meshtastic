// @ts-check

require("dotenv").config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Meshtastic",
  tagline: "Open Source hiking, pilot, skiing and secure GPS mesh communicator",
  url: "https://meshtastic.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "design/web/favicon.ico",
  organizationName: "meshtastic",
  projectName: "meshtastic",
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Meshtastic",
      hideOnScroll: true,
      logo: {
        alt: "Meshtastic Logo",
        src: "design/logo/svg/Mesh_Logo_Black.svg",
        srcDark: "design/logo/svg/Mesh_Logo_White.svg",
      },

      items: [
/*
        {
          label: "Start Here",
          to: "docs/academy",
          activeBasePath: "docs/academy",
        },
*/
        {
          label: "Documentation",
          items: [
            {
              label: "About Meshtastic",
              to: "docs/software",
            },
            {
              label: "Getting Started",
              to: "docs/getting-started",
            },
            {
              label: "Device Settings",
              to: "docs/settings",
            },
            {
              label: "Hardware Details",
              to: "docs/hardware",
            },
            {
              label: "Contribute to Meshtastic",
              to: "docs/developers",
            },
            {
              label: "About this Documentation",
              to: "docs/about-documentation",
            },
            {
              label: "Legal",
              to: "docs/legal",
            },

          ],
        },
        {
          label: "Firmware",
          to: "firmware",
          activeBasePath: "firmware",
        },
        {
          label: "Showcase",
          to: "showcase",
          activeBasePath: "showcase",
        },
        {
          href: "https://meshtastic.discourse.group",
          label: "Forum",
          position: "left",
        },
        {
          href: "https://github.com/meshtastic/meshtastic",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      copyright: `<a href="https://vercel.com/?utm_source=meshtastic&utm_campaign=oss" style="color: var(--ifm-footer-color)">Powered by ▲ Vercel</a> | Meshtastic® is a registered trademark of Geeksville Industries LLC`,
      links: [
        {
          //title: 'Social',
          items: [
            {
              label: 'YouTube',
              to: 'https://www.youtube.com/meshtastic',
            },
            {
              label: 'Discord',
              to: 'https://discord.com/invite/UQJ5QuM7vq',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/meshtastic',
            },
            {
              label: 'Forum',
              to: 'https://meshtastic.discourse.group',
            },
          ],
        },
      ],
    },
    algolia: {
      apiKey: "01ad7e13d3fe392d2ad26da3c69dbc21",
      indexName: "meshtastic",
      contextualSearch: false,
      searchParameters: {},
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/meshtastic/meshtastic/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: ["@docusaurus/plugin-ideal-image"],
  customFields: {
    API_URL: process.env.API_URL,
  },
};

module.exports = config;
