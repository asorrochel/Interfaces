/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'gray/text' : '#374151',
        'green/h2': '#059669',
        'gray/background': '#F9FAFB',
        'separador': '#E5E7EB', 
        'green/button': '#064E3B',
        'gray/button': '#9CA3AF',
      },
      fontFamily: {
        "button-nav": "var(--button-nav-font-family)",
        "etiqueta-texto": "var(--etiqueta-texto-font-family)",
        "heading-1": "var(--heading-1-font-family)",
        "heading-1-subrayado": "var(--heading-1-subrayado-font-family)",
        "heading-2": "var(--heading-2-font-family)",
        "heading-inicio": "var(--heading-inicio-font-family)",
        "inicio-bot-n-texto": "var(--inicio-bot-n-texto-font-family)",
        "p-rrafo-inicio": "var(--p-rrafo-inicio-font-family)",
      },
  },
  plugins: [],
  },
};