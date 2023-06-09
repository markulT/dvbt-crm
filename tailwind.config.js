/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white-bg': '#f3f3f3',
      'white-dark': '#d9d9d9',
      'blue-6': '#0E1423',
      'blue-5': '#1B2845',
      'blue-4': '#274060',
      'blue-3': '#335C81',
      'blue-2': '#4576B1',
      'blue-1': '#65AFFF',
      'yellow-6': '#DB9B20',
      'yellow-5': '#FDB833',
      'yellow-4': '#FDC43F',
      'yellow-3': '#FFD53E',
      'yellow-2': '#FFE246',
      'yellow-1': '#FFF75E',
      'white': '#ffffff'
    },
    extend: {
      dropShadow: {
        '3xl': '0 0 20px rgba(27, 40, 69, 0.2);',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'black-rgba': 'rgba(0,0,0,0.54)',
        'green-rgba': 'rgba(0,255,0, 0.27)'
      }
    },
  },
  plugins: [],
}
