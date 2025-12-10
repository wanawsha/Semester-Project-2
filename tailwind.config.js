/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#9DAC8C",
        accent: "#B59700",
        bg: "#F6F6F6",
        grayMain: "#B4B4B4",
        dark: "#393939",
        delete: "#DAC4C4",
        button: "#848484",
        subtext: "#848484",
      },
      fontFamily: {
        heading: ['"Roboto Mono"', "monospace"],
        body: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}



