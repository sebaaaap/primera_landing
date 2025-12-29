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
          DEFAULT: '#0066FF', // Azul eléctrico
          soft: '#E6F0FF',    // Azul suave
        },
        accent: {
          DEFAULT: '#FF6600', // Naranja vibrante
          light: '#FFE6CC',   // Naranja claro
        },
        neutral: {
          dark: '#222222',    // Gris oscuro
          medium: '#666666',  // Gris medio
          light: '#F5F5F5',   // Gris claro
          white: '#FFFFFF',   // Blanco puro
        },
        footer: '#2C3E50',    // Gris azulado
      },
    },
  },
  plugins: [],
};
