module.exports = {
  About: {
    "About Meshtastic": [
      "about/overview",
      {
        Concepts: [
          "about/concepts/overview",
          "about/concepts/channels",
          "about/concepts/clients",
          "about/concepts/external-devices",
          "about/concepts/internet",
          "about/concepts/mesh",
        ],
      },
      "about/expectations",
      {
        FAQs: [
          "faq/faq",
          "faq/antenna",
          "faq/bluetooth",
          "faq/channel",
          {
            Clients: [
              "faq/client-android",
              "faq/client-python-cli",
              "faq/client-ios",
              "faq/client-web",
            ],
          },
          "faq/device",
          "faq/mesh",
          "faq/mqtt",
          "faq/modules",
          "faq/wifi",
        ],
      },
    ],
  },
  Software: {
    Software: [
      "software/overview",
      {
        "Meshtastic device": [
          "software/device/device-firmware",
          "software/device/device-channels",
          "software/device/device-remote-admin",
          "software/device/remote-hardware-service",
          "software/device/device-power",
          "software/device/critical-error-codes",
          "software/device/ham",
        ],
      },
      {
        "Meshtastic Android": [
          "software/android/android-installation",
          "software/android/android-usage",
          "software/android/location-access",
        ],
      },
      {
        "Meshtastic iOS": ["software/ios/ios-development"],
      },
      {
        "Meshtastic.js": [
          "software/js/getting-started",
          "software/js/connecting",
          "software/js/events",
          "software/js/http-api",
          {
            type: "link",
            label: "API Docs",
            href: "https://js.meshtastic.org",
          },
        ],
      },
      {
        "Meshtastic-python": [
          "software/python/python-installation",
          "software/python/python-standalone",
          "software/python/python-cli",
          "software/python/python-uses",
          "software/python/python-stream",
          {
            type: "link",
            label: "API Docs",
            href: "https://python.meshtastic.org/",
          },
        ],
      },
      {
        Modules: [
          "software/modules/modules",
          "software/modules/range-test-module",
          "software/modules/ext-notif-module",
          "software/modules/canned-message-module",
          "software/modules/serial-module",
          "software/modules/store-forward-module",
          "software/modules/environment-module",
        ],
      },
      {
        "Web interface": [
          "software/web/web-app-software",
          "software/web/web-partitions-software",
          "software/web/web-development-software",
        ],
      },
      {
        "Community projects": [
          "software/community/community-overview",
          "software/community/community-atak",
          "software/community/community-pygui",
          "software/community/community-go",
        ],
      },
      {
        Other: [
          "software/other/sw-design",
          "software/other/remote-hardware-service",
          "software/other/rak815",
          "software/other/power",
          "software/other/pinetab",
          "software/other/nrf52-TODO",
          "software/other/mqtt",
          "software/other/install-OSX",
          "software/other/esp32-arduino-build",
          "software/other/ant",
        ],
      },
    ],
    "Additional Documentation": [
      { type: "ref", id: "getting-started/overview" },
      { type: "ref", id: "settings/overview" },
      { type: "ref", id: "hardware/overview" },
      { type: "ref", id: "developers/overview" },
      { type: "ref", id: "developers/maintaining-documentation/overview" },
      { type: "ref", id: "legal/overview" },
    ],
  },
  Configuration: {
    "Getting Started": [
      "getting-started/overview",
      {
        "Flashing firmware": [
          "getting-started/flashing-firmware",
          "getting-started/meshtastic-flasher",
          {
            "Manual Method": [
              "getting-started/flashing-esp32",
              "getting-started/flashing-nrf52",
            ],
          },
        ],
      },
      {
        "Connect to Device": ["getting-started/clients"],
      },
      "getting-started/first-steps",
    ],

    "Device Settings": [
      "settings/overview",
      "settings/channel",
      "settings/gps",
      "settings/ham",
      "settings/mqtt",
      "settings/power",
      "settings/router",
      "settings/wifi",
      {
        Modules: [
          "settings/canned-message-module",
          "settings/environmental-measurement-module",
          "settings/external-notification-module",
          "settings/range-test-module",
          "settings/rotary-encoder-module",
          "settings/serial-module",
          "settings/store-and-forward-module",
        ],
        Advanced: ["settings/channel-advanced", "settings/misc"],
      },
    ],
    "Additional Documentation": [
      { type: "ref", id: "hardware/overview" },
      { type: "ref", id: "software/overview" },
      { type: "ref", id: "developers/overview" },
      { type: "ref", id: "developers/maintaining-documentation/overview" },
      { type: "ref", id: "legal/overview" },
    ],
  },
  Hardware: {
    Hardware: [
      "hardware/overview",
      {
        "Supported Hardware": [
          "hardware/supported/tbeam",
          "hardware/supported/lora",
          "hardware/supported/heltec",
          "hardware/supported/techo",
          "hardware/supported/wisBlock",
          "hardware/supported/linux",
        ],
      },
      "hardware/buttons",
      "hardware/battery",
      "hardware/gpsmodule",
      {
        Antennas: [
          "hardware/antenna/antenna",
          "hardware/antenna/aerials",
          "hardware/antenna/non-aerial",
          "hardware/antenna/antenna-testing",
          "hardware/antenna/resources",
        ],
      },
    ],
    "Additional Documentation": [
      { type: "ref", id: "getting-started/overview" },
      { type: "ref", id: "settings/overview" },
      { type: "ref", id: "software/overview" },
      { type: "ref", id: "developers/overview" },
      { type: "ref", id: "developers/maintaining-documentation/overview" },
      { type: "ref", id: "legal/overview" },
    ],
  },
  Contribute: {
    "Developers": [
      "developers/overview",
      {
        Protobufs: ["developers/protobufs/api"],
      },
      "developers/api",
      "developers/publish",
      {
        Firmware: [
          "developers/firmware/build",
          "developers/firmware/stacktrace-decode",
          "developers/firmware/device-api",
          "developers/firmware/radio-settings",
          "developers/firmware/mesh-alg",
          "developers/firmware/encryption",
          "developers/firmware/portnum",
          "developers/firmware/module-api",
          "developers/firmware/http-api",
          "developers/firmware/documents",
        ],
      },
      {
        "Android App": [
          "developers/android/build-app",
          "developers/android/mapbox",
        ],
        "Maintaining Documentation": [
          "developers/maintaining-documentation/overview",
          {
            Dependencies: [
              "developers/maintaining-documentation/docusaurus",
              "developers/maintaining-documentation/github",
              "developers/maintaining-documentation/vercel",
            ],
          },
          {
            Examples: [
              "developers/maintaining-documentation/serve-docs-locally",
            ],
          },
          {
            "Style Guides": [
              "developers/maintaining-documentation/style-guides/style-guide-settings",
            ],
          },
        ],
      },
    ],
    "Additional Documentation": [
      { type: "ref", id: "getting-started/overview" },
      { type: "ref", id: "settings/overview" },
      { type: "ref", id: "hardware/overview" },
      { type: "ref", id: "software/overview" },
      { type: "ref", id: "legal/overview" },
      { type: "ref", id: "developers/overview" },
    ],
  },
  Legal: {
    Legal: [
      "legal/overview",
      "legal/licensing",
      "legal/trademark",
      "legal/privacy",
    ],
    "Additional Documentation": [
      { type: "ref", id: "getting-started/overview" },
      { type: "ref", id: "settings/overview" },
      { type: "ref", id: "hardware/overview" },
      { type: "ref", id: "software/overview" },
      { type: "ref", id: "developers/overview" },
    ],
  },
};
