// @ts-check

require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Meshtastic',
  tagline: 'Open Source hiking, pilot, skiing and secure GPS mesh communicator',
  url: 'https://meshtastic.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'design/web/favicon.ico',
  organizationName: 'meshtastic',
  projectName: 'meshtastic',
  ssrTemplate: `<!DOCTYPE html>
  <html <%~ it.htmlAttributes %>>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="generator" content="Docusaurus v<%= it.version %>">
      <% if (it.noIndex) { %>
        <meta name="robots" content="noindex, nofollow" />
      <% } %>
      <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "https://meshtastic.org",
        "logo": "https://meshtastic.org/design/logo/logo.svg"
      }
      </script>
      <%~ it.headTags %>
      <% it.metaAttributes.forEach((metaAttribute) => { %>
        <%~ metaAttribute %>
      <% }); %>
      <% it.stylesheets.forEach((stylesheet) => { %>
        <link rel="stylesheet" href="<%= it.baseUrl %><%= stylesheet %>" />
      <% }); %>
      <% it.scripts.forEach((script) => { %>
        <link rel="preload" href="<%= it.baseUrl %><%= script %>" as="script">
      <% }); %>
    </head>
    <body <%~ it.bodyAttributes %>>
      <%~ it.preBodyTags %>
      <div id="__docusaurus">
        <%~ it.appHtml %>
      </div>
      <% it.scripts.forEach((script) => { %>
        <script src="<%= it.baseUrl %><%= script %>"></script>
      <% }); %>
      <%~ it.postBodyTags %>
    </body>
  </html>`,
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
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
          ],
        },
        {
          label: 'Developers',
          to: 'docs/developers',
        },
        {
          label: 'Other',
          items: [
            {
              label: 'Downloads',
              to: 'downloads',
              activeBasePath: 'downloads',
            },
            {
              label: 'Showcase',
              to: 'showcase',
              activeBasePath: 'showcase',
            },
          ],
        },
      ],
    },
    footer: {
      copyright: `<a href="https://vercel.com/?utm_source=meshtastic&utm_campaign=oss">Powered by ▲ Vercel</a> | Meshtastic® is a registered trademark of Geeksville Industries LLC. | <a href="/docs/legal">Legal Information</a>.`,
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
          // Appends TailwindCSS and AutoPrefixer.
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
