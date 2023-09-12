/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme"

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        arial: ["Arial", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
