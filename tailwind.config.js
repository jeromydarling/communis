/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Communis palette — earthy, cooperative, calm
        terra: {
          50: '#faf6f1',
          100: '#f0e6d6',
          200: '#e2ceae',
          300: '#d1b080',
          400: '#c2955c',
          500: '#b37d42',
          600: '#9a6636',
          700: '#7d4f2e',
          800: '#674029',
          900: '#573625',
        },
        grove: {
          50: '#f0f7f1',
          100: '#dcedde',
          200: '#bbdcc0',
          300: '#8ec49a',
          400: '#5ea86e',
          500: '#3d8b50',
          600: '#2d6f3d',
          700: '#255933',
          800: '#20472a',
          900: '#1b3b24',
        },
        commons: {
          50: '#f4f6fa',
          100: '#e6eaf3',
          200: '#d3daea',
          300: '#b4c1da',
          400: '#8fa3c5',
          500: '#7388b4',
          600: '#5f72a4',
          700: '#546196',
          800: '#49527b',
          900: '#3e4663',
        },
        warmth: {
          50: '#fdf8f0',
          100: '#faecd8',
          200: '#f4d5b0',
          300: '#ecb87e',
          400: '#e3964e',
          500: '#dc7c30',
          600: '#cd6326',
          700: '#aa4c22',
          800: '#883d22',
          900: '#6e331e',
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
