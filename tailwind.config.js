/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        // Hero only
        exo: ['"Exo 2"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        signature: ['"Mrs Saint Delafield"', 'cursive'],
      },
    },
  },
  plugins: [],
}
