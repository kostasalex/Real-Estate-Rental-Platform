/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue0': '#EAEEFF;',
        'blue1/2': '#A0B3FF;',
        'blue1': '#677FD4;',
      },
    },
  },
  plugins: [],
}

