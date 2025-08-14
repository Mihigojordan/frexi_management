/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         primary: {
          50:  '#e5eff1',
          100: '#cce0e4',
          200: '#99c1c8',
          300: '#66a2ad',
          400: '#337391',
          500: '#113d48', // base
          600: '#0e353f',
          700: '#0b2c35',
          800: '#081f26',
          900: '#051317',
          950: '#03090b'
        },
      }
    },
  },
  plugins: [],
};  
