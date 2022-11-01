// @ts-check

require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Meshtastic',
  tagline:
    'An open source, off-grid, decentralized, mesh network built to run on affordable, low-power devices',
  url: 'https://meshtastic.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'design/web/favicon.ico',
  organizationName: 'meshtastic',
  projectName: 'meshtastic',
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    announcementBar: {
      id: '2_0',
      content:
        '🎉 Meshtastic 2.0 Has Now Launched! Check it Out <a href="/2.0">Here</a> 🎉',
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Meshtastic',
      hideOnScroll: true,
      logo: {
        alt: 'Meshtastic Logo',
        src: 'design/logo/svg/Mesh_Logo_Black.svg',
        srcDark: 'design/logo/svg/Mesh_Logo_White.svg',
      },
      items: [
        {
          label: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Configuration',
              to: 'docs/settings',
            },
            {
              label: 'Hardware',
              to: 'docs/hardware',
            },
            {
              label: 'Software',
              to: 'docs/software',
            },
            {
              label: 'Developers',
              to: 'docs/developers',
            },
          ],
        },
        {
          label: 'Downloads',
          to: 'downloads',
        },
      ],
    },
    footer: {
      copyright: `<a href="https://vercel.com/?utm_source=meshtastic&utm_campaign=oss">Powered by ▲ Vercel</a> | Meshtastic® is a registered trademark of Meshtastic LLC. | <a href="/docs/legal">Legal Information</a>.`,
    },
    algolia: {
      appId: 'IG2GQB8L3V',
      apiKey: '2e4348812173ec7ea6f7879c7032bb21',
      indexName: 'meshtastic',
      contextualSearch: false,
      searchPagePath: 'search',
    },
  },
  plugins: [
    () => {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/meshtastic/meshtastic/edit/master/',
          breadcrumbs: false,
          showLastUpdateAuthor: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  customFields: {
    API_URL: process.env.API_URL,
  },
};

module.exports = config;
