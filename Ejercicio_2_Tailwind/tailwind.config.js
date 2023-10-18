/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "gris_primario": "#333333",
        "gris_secundario": "#232323",
        "gris_textos": "#B4B4B4",
        "naranja_enlaces": "#FFA502",
    },
  },
  plugins: [],
  },
};