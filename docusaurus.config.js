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
/*
        {
          label: "About Meshtastic",
          to: "docs/about",
          activeBasePath: "docs/about",
        },
*/
/*
        {
          label: "Showcase",
          to: "showcase",
          activeBasePath: "showcase",
        },
*/
        {
          label: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "docs/getting-started",
            },
            // FIXME create configuration & settings landing page and adjust path below
            {
              label: "Configuration & Settings",
              to: "docs/settings",
            },
            {
              label: "Hardware Details",
              to: "docs/hardware",
            },
            {
              label: "Meshtastic Software",
              to: "docs/software",
            },
          ],
        },
        {
          label: "Contribute",
          items: [
            {
              label: "Developers",
              to: "docs/developers",
            },
            {
              label: "Maintaining Documentation",
              to: "docs/developers/maintaining-documentation/overview",
            },
            {
              label: "Legal",
              to: "docs/legal",
            },
          ],
        },
        {
          label: "Downloads",
          to: "downloads",
          activeBasePath: "downloads",
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
          title: 'Learn',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            // {
            //   label: 'About',
            //   to: 'docs/about',
            // },
            {
              label: 'Hardware',
              to: 'docs/hardware',
            },
            {
              label: 'Settings',
              to: 'docs/settings',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              to: 'https://discord.com/invite/UQJ5QuM7vq',
            },
            {
              label: 'Forum',
              to: 'https://meshtastic.discourse.group',
            },
            {
              label: 'Reddit',
              to: 'https://reddit.com/r/meshtastic',
            },
            {
              label: 'YouTube',
              to: 'https://www.youtube.com/meshtastic',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy',
              to: 'docs/legal/privacy',
            },
            {
              label: 'Licensing',
              to: 'docs/legal/licensing',
            },
            {
              label: 'Trademark',
              to: 'docs/legal/trademark',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              to: 'https://github.com/meshtastic',
            },
            {
              label: 'Contribute',
              to: 'docs/developers',
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
