/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif']
      },
      colors: {
        ink: '#12161c',
        sand: '#f5efe7',
        lime: '#c7f000',
        coral: '#ff7a59'
      }
    }
  },
  plugins: []
};
