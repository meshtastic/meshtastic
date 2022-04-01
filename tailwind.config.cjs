module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#67ea94",
        primary: "#f2f2f2",
        secondary: "#ffffff",
        primaryDark: "#242526",
        secondaryDark: "#18191a",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
