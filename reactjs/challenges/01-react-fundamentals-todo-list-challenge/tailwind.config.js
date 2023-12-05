/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F2F2F2',
          200: '#D9D9D9',
          300: '#808080',
          400: '#333333',
          500: '#262626',
          600: '#1A1A1A',
          700: '#0D0D0D',
        },
        blue: {
          100: '#4EA8DE',
          300: '#1E6F9F',
        },
        purple: {
          100: '#5E60CE',
          300: '#8284FA',
        }
      }
    },
  },
  plugins: [],
}

