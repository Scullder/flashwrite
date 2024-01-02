/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* colors: {
        header: '#09090A',
        body: '#0e121b',
        background: '#1b2336',
        tile: '#202c44',
        tileDark: '#1b2336',
        /*
        primary: '#c33f0c',
        primaryDark: '#a23101',
        secondary: '#289499', 
        /
        primary: '#F0ACA1',
        primaryGlow: '#F27289',
        primaryDark: '#a23101',
        secondary: '#E2F4F9',
        secondaryGlow: '#57A5D4',
        input: '#878a91',
        inputFocus: '#dfe4ee',
        red: '#CB0000',
        text: '#000',
        alertSuccess: '#0bc20f',
        alertWarning: '#000',
        alertInfo: '#000',
      }, */
      colors: {
        primary: '#23827d',
        primaryDark: '#a23101',
        secondary: '#23827d', 
        body: '#111622',
        background: '#1a2133',
        tile: '#232D46',
        tileDark: '#1b2336',
        input: '#878a91',
        inputFocus: '#dfe4ee',
        red: '#CB0000',
        text: '#000',
        alertSuccess: '#0bc20f',
        alertWarning: '#000',
        alertInfo: '#000',
        header: '#09090A',  // check
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans']
      }
    },
  },
  plugins: [],
}
