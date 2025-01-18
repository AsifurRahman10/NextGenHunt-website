/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        btnPrimary: '#613cfc',
        bannerPrimary: '#EEEDF2',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}