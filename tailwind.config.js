/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffb347',
        'primary-hover': '#df9a3b',
        secondary: '#333',
        'hover-bg': '#fff',
        'rojo-fuego': '#f1473a',
        'blanco-transparente': 'rgba(255, 255, 255, 0.9)',
        correcto: '#388e3c',
        incorrecto: '#d32f2f',
      },
      fontSize: {
        'gigante': '5rem',
        'muy-grande': '3rem',
        'grande': '2rem',
        'estandar': '1.2rem',
        'estandar-grande': '1.5rem',
        'pequeña': '1rem',
        'mini': '0.8rem',
      },
      screens: {
        'pantalla-pequeña': '576px', // Móviles pequeños
        'pantalla-mediana': '768px', // Tablets
        'pantalla-grande': '992px', // Portátiles
        'pantalla-muy-grande': '1200px', // Pantallas grandes
      },
    },
  },
  plugins: [],
};

