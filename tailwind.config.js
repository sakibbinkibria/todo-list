/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#72a38f",
        cream: "#f2f2ed",
        activerTab: "#52a2a8",
        hoverTab: "#205c61",
      },
    },
  },
  plugins: [],
};

