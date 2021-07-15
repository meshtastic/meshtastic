module.exports = {
  Sidebar: {
    "Getting Started": [
      "getting-started/overview",
      {
        "Flashing firmware": [
          "getting-started/flashing-esp32",
          "getting-started/flashing-nrf52",
        ],
      },
      "getting-started/concepts",
    ],
    Software: [
      "software/overview",
      {
        "Meshtastic device": [
          "software/device/device-software",
          "software/device/device-channels",
          "software/device/device-remote-admin",
          "software/device/remote-hardware-service",
          "software/device/device-wifi",
          "software/device/device-power",
          "software/device/critical-error-codes",
        ],
      },
      {
        "Meshtastic Android": [
          "software/android/android-installation",
          "software/android/android-usage",
          "software/android/location-access"
        ],
      },
      {
        "Meshtastic iOS": [
          "software/ios/ios-development",
        ],
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
          "software/python/python-cli",
          "software/python/python-usage",
          {
            type: "link",
            label: "API Docs",
            href: "https://meshtastic.github.io/Meshtastic-python",
          },
        ],
      },
      {
        "Plugins": [
          "software/plugins/plugins",
          "software/plugins/range-test-plugin",
          "software/plugins/ext-notif-plugin",
          "software/plugins/serial-plugin",
          "software/plugins/store-forward-plugin",
          "software/plugins/environment-plugin",
        ],
      },
      {
        "Web interface": [
          "software/web/web-app-software",
          "software/web/web-config-software",
          "software/web/web-usage-software",
          "software/web/web-partitions-software",
          "software/web/web-development-software",
        ],
      },
      {
        "Community projects": [
          "software/community/community-overview",
          "software/community/community-atak",
          "software/community/community-pygui",
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
          "software/other/esp32-arduino-build-notes",
          "software/other/build-instructions",
          "software/other/ant",
        ],
      },
      {
        Settings: [
          "software/settings/overview",
          "software/settings/channel",
          "software/settings/gps",
          "software/settings/mqtt",
          "software/settings/power",
          "software/settings/router",
          "software/settings/wifi",
          {
            "Plugins": [
              "software/settings/environmental-measurement-plugin",
              "software/settings/external-notification-plugin",
              "software/settings/range-test-plugin",
              "software/settings/serial-plugin",
              "software/settings/store-and-forward-plugin",
            ],
            "Advanced": [
              "software/settings/channel-advanced",
              "software/settings/misc",
            ],
          },
        ]
      },
    ],
    Hardware: [
      "hardware/overview",
      {
        "Supported Hardware": [
          "hardware/tbeam-hardware",
          "hardware/lora-hardware",
          "hardware/heltec-hardware",
          "hardware/techo-hardware",
          "hardware/wisBlock-hardware",
        ],
      },
      "hardware/buttons",
      {
        "Antennas": [
          "hardware/antenna/antenna",
          "hardware/antenna/aerials",
          "hardware/antenna/non-aerial",
          "hardware/antenna/antenna-testing",
          "hardware/antenna/resources",
        ],
      },
    ],
    Developers: [
      "developers/overview",
      {
        Protobufs: ["developers/protobufs/api"],
      },
      "developers/api",
      "developers/build-env",
      "developers/codespaces",
      {
        Device: [
          "developers/device/device-api",
          "developers/device/radio-settings",
          "developers/device/mesh-alg",
          "developers/device/encryption",
          "developers/device/portnum",
          "developers/device/plugin-api",
          "developers/device/http-api",
          "developers/device/documents",
        ],
      },
      {
        "Android App": [
          "developers/android/build-app",
          "developers/android/mapbox",
        ],
      },
    ],
    Legal: [
      "legal/overview",
      "legal/licensing",
      "legal/trademark",
      "legal/privacy",
    ],
  },
};
