import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  corePlugins: {
    preflight: false,
    container: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./docs/**/*.{md,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      screens: {
        sidebar: "1000px",
      },
      colors: {
        accent: "var(--accent)",
        base: "var(--base)",
        primary: "hsl(var(--btn-primary))",
        secondary: "hsl(var(--surface-alt))",
        tertiary: "var(--tertiary)",
        mute: "var(--mute)",
        primaryInv: "var(--primaryInv)",
        secondaryInv: "var(--secondaryInv)",
        tertiaryInv: "var(--tertiaryInv)",

        // homepage colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        "primary-foreground": "hsl(var(--primary-foreground))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          foreground: "hsl(var(--surface-foreground))",
        },
        overlay: "hsl(var(--overlay))",
        subtle: "hsl(var(--subtle))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [typography(), animate],
} satisfies Config;
