module.exports = {
  title: "Meshtastic",
  tagline: "Open Source hiking, pilot, skiing and secure GPS mesh communicator",
  url: "https://meshtastic.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/meshtastic-design/web/favicon.ico",
  organizationName: "meshtastic",
  projectName: "meshtastic",
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Meshtastic",
      logo: {
        alt: "Meshtastic Logo",
        src: "img/meshtastic-design/logo/svg/Mesh_Logo_Black.svg",
        srcDark: "img/meshtastic-design/logo/svg/Mesh_Logo_White.svg",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
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
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Device",
              to: "docs/device/radio-settings/",
            },
            {
              label: "Software",
              to: "docs/software/sw-design/",
            },
            {
              label: "meshtastic.js",
              to: "docs/js/getting-started/",
            },
            {
              label: "Protobufs",
              to: "docs/protobufs/api",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/meshtastic/meshtastic",
            },
          ],
        },
      ],
      copyright: `Meshtastic® trademark is a registered trademark belonging to Geeksville Industries LLC`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/meshtastic/meshtastic/edit/master/website/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
