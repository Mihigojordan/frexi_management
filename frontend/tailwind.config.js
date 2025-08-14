/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#113d48', // Your main primary color
          600: '#0e3440',
          700: '#0c2b38',
          800: '#0a2230',
          900: '#081928',
          950: '#03090b'
        }
      }
    },
  },
  plugins: [],
};