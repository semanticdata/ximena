/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
module.exports = {
  content: ["./src/**/*.{html,njk,md,js}", "./src/**/*.svg"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom colors
        "blue": "#1fb6ff",
        "purple": "#7e5bef",
        "pink": "#ff49db",
        "orange": "#ff7849",
        "green": "#13ce66",
        "yellow": "#ffc82c",
        "gray-dark": "#273444",
        "gray": "#8492a6",
        "gray-light": "#d3dce6",

        // Light theme colors
        "primary": "#2577c1",
        "secondary-bg": "#fff",
        "theme": "#fff",
        "header-color": "#c23fe2",
        "route-link-active": "#fff",
        "link-color": "#555050",
        "border-color": "#555050",

        // Dark theme colors
        "dark-primary": "#ff500b",
        "dark-secondary-bg": "#424242",
        "dark-theme": "#424242",
        "dark-header-color": "#424242",
        "dark-route-link-active": "#ff500b",
        "dark-link-color": "#fff",
        "dark-border-color": "#1cd61c",
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      // fontFamily: {
      //   sans: ['Inter', 'sans-serif'],
      //   serif: ['Georgia', 'serif'],
      // },
    },
  },
}
