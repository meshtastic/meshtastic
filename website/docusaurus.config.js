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
          to: "docs/getting-started",
          activeBasePath: "docs/getting-started",
          label: "Getting Started",
          position: "left",
        },
        {
          to: "docs/software",
          activeBasePath: "docs/software",
          label: "Software",
          position: "left",
        },
        {
          to: "docs/hardware",
          activeBasePath: "docs/hardware",
          label: "Hardware",
          position: "left",
        },
        {
          to: "docs/developers",
          activeBasePath: "docs/developers",
          label: "Developers",
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
              label: "Getting Started",
              to: "docs/getting-started",
            },
            {
              label: "Software",
              to: "docs/software",
            },
            {
              label: "Hardware",
              to: "docs/hardware",
            },
            {
              label: "Developers",
              to: "docs/developers",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Forum",
              href: "https://meshtastic.discourse.group",
            },
            {
              label: "Slack",
              href: "https://meshtasticdev.slack.com",
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
            {
              label: "Legal",
              to: "docs/legal",
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
