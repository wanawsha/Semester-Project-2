/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        bgMain: "#F6F6F6",
        grayMain: "#B4B4B4",
        headings: "#393939",
        button: "#848484",
        success: "#9DAC8C",
        credits: "#B59700",
        delete: "#DAC4C4",
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


