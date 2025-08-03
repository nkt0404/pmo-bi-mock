/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#b3daff',
          500: '#0052cc',
          600: '#0747a6',
          700: '#073592'
        },
        success: {
          50: '#e3fcef',
          100: '#abf5d1',
          500: '#36b37e',
          600: '#00875a',
          700: '#006644'
        },
        warning: {
          50: '#fffae6',
          100: '#fff0b3',
          500: '#ff8b00',
          600: '#ff7b00',
          700: '#de350b'
        },
        danger: {
          50: '#ffebe6',
          100: '#ffbdad',
          500: '#de350b',
          600: '#bf2600',
          700: '#97190b'
        },
        neutral: {
          0: '#ffffff',
          50: '#f4f5f7',
          100: '#ebecf0',
          200: '#dfe1e6',
          300: '#c1c7d0',
          400: '#b3bac5',
          500: '#8993a4',
          600: '#6b778c',
          700: '#5e6c84',
          800: '#505f79',
          900: '#42526e'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
      },
      boxShadow: {
        'card': '0 1px 3px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
        'card-hover': '0 4px 8px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)'
      }
    },
  },
  plugins: [],
}