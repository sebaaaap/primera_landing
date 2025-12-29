module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFCC00', // Amarillo Energía
          soft: '#FFF9E6',    // Amarillo claro
        },
        accent: {
          DEFAULT: '#E63946', // Rojo Intenso
          light: '#FF6B6B',   // Rojo apagado
        },
        neutral: {
          dark: '#1A1A1A',    // Negro Profundo
          medium: '#666666',  // Gris medio
          light: '#F2F2F2',   // Gris claro
          white: '#FFFFFF',   // Blanco Puro
          card: '#2D2D2D',    // Gris Oscuro
        },
        footer: '#1A1A1A',    // Negro Profundo - Footer
      },
    },
  },
  plugins: [],
};
