/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e8f5f0",
          100: "#c5e6d8",
          200: "#9fd6be",
          300: "#73c6a3",
          400: "#4db98c",
          500: "#1aad75",
          600: "#159d69",
          700: "#0e8a5a",
          800: "#08774c",
          900: "#005a35",
        },
        dark: {
          50: "#f5f5f6",
          100: "#e6e6e7",
          200: "#cfcfd2",
          300: "#adaeb3",
          400: "#84858c",
          500: "#696a72",
          600: "#595a61",
          700: "#4b4c53",
          800: "#2d2e33",
          900: "#1a1b1e",
          950: "#0f1012",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
