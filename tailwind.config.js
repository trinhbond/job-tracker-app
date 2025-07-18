/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          default: "#808080",
          payne: "#95959D",
          night: "#121212",
        },
      },
    },
  },
  plugins: [],
};
