// trunk-ignore(eslint/no-undef)
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
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
        tertiaryInv: "var(--tertiaryInv)"
      }
    }
  },
  // trunk-ignore(eslint/no-undef)
  plugins: [require("@tailwindcss/typography")]
};
