/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/flowbite-react/**/*.{js,jsx,tsx}'
  ],
  theme: {
    extend: {
      textColor: ['visited'],
      backgroundColor: ['active']
    },
  },
  plugins: [require('flowbite/plugin')],
}

