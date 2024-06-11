/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontSize: {
        '30' : '30px'
      },
      height: {
        '70' : '70px'
      },
      keyframes: {
        'dot-blink': {
          '0%, 20%, 50%, 80%, 100%': { opacity: 1 },
          '40%': { opacity: 0 },
          '60%': { opacity: 0 },
        },
      },
      animation: {
        'dot-blink': 'dot-blink 1.4s infinite both',
      },
      boxShadow: {
        'pronounced': '0 10px 15px rgba(0, 0, 0, 0.5)', // Custom shadow with more intensity
      },
    },
  },
  plugins: [],
}

