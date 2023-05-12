/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/flowbite-react/**/*.{js,jsx,tsx}'
  ],
  theme: {
    extend: {
      textColor: ['visited']
    },
  },
  plugins: [require('flowbite/plugin')],
}

