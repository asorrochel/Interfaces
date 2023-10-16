/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#333333',
        'secundary': '#232323',
        'text-primary': '#B4B4B4',
    },
  },
  plugins: [],
  },
};