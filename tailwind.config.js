/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        header: '#09090A',
        body: '#0e121b',
        //main: '#0B1824',
        background: '#1b2336',
        tile: '#202c44',
        tileDark: '#1b2336',
        //navbar: '#f2f4fa',
        //navbarHover: '#8992ad',
        primary: '#c33f0c',
        primaryDark: '#a23101',
        secondary: '#289499',
        input: '#878a91',
        inputFocus: '#dfe4ee',
        red: '#CB0000',
        //light: '#2A2C33',
        text: '#000',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans']
      }
    },
  },
  plugins: [],
}
