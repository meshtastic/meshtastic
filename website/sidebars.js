module.exports = {
  Sidebar: {
    "Getting Started": [
      "getting_started/overview",
      "getting_started/flashing_firmware",
      "getting_started/concepts",
      {
        "Howto's": [],
      },
    ],
    Software: [
      "software/overview",
      {
        "Meshtastic Android": [],
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
        "Plugins": [
          "software/plugins/plugins",
          "software/plugins/store-forward-plugin",
          "software/plugins/range-test-plugin",
          "software/plugins/environment-plugin",
          "software/plugins/ext-notif-plugin",
          "software/plugins/serial-plugin",
        ],
      },
      {
        "Meshtastic-python": [
          {
            type: "link",
            label: "API Docs",
            href: "https://meshtastic.github.io/Meshtastic-python",
          },
        ],
      },
      {
        Other: [
          "software/other/sw-design",
          "software/other/remote-hardware-service",
          "software/other/rak815",
          "software/other/power",
          "software/other/plugin-api",
          "software/other/pinetab",
          "software/other/nrf52-TODO",
          "software/other/mqtt",
          "software/other/mesh-alg",
          "software/other/install-OSX",
          "software/other/esp32-arduino-build-notes",
          "software/other/device-api",
          "software/other/crypto",
          "software/other/build-instructions",
          "software/other/ant",
        ],
      },
    ],
    Hardware: [
      "hardware/overview",
      "hardware/supported_hardware",
      "hardware/behaviour",
      "hardware/antenna",
    ],
    Developers: [
      "developers/overview",
      {
        Protobufs: ["developers/protobufs/api"],
      },
      "developers/api",
      {
        Device: [
          "developers/device/radio-settings",
          "developers/device/supported-hardware",
          "developers/device/faq",
          "developers/device/http-api",
          "developers/device/documents",
        ],
      },
    ],
  },
};
