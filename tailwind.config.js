/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "hero-pattern": "url(/poster.jpg)",
        "gradient-to-b": "linear-gradient(180deg,#000000c9, #000000c7)"
      }
    },
  },
  plugins: [],
}