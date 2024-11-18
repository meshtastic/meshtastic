import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  corePlugins: {
    preflight: false,
    container: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        base: "var(--base)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        mute: "var(--mute)",
        primaryInv: "var(--primaryInv)",
        secondaryInv: "var(--secondaryInv)",
        tertiaryInv: "var(--tertiaryInv)",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            blockquote: {
              "p::before": {
                content: "none",
              },
              "p::after": {
                content: "none",
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography()],
} satisfies Config;
