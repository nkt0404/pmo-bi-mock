/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 薄い青のグラデーション
        lightBlue: {
          50: '#f0f8ff',
          100: '#e6f4ff',
          200: '#d1ebff',
          300: '#bfe2ff',
          400: '#9dd4ff',
          500: '#7bc6ff',
          600: '#5ab8ff',
          700: '#3aa6ff',
          800: '#1a94ff',
          900: '#0080ff'
        },
        // 薄い紫のグラデーション
        lightPurple: {
          50: '#f8f5ff',
          100: '#f1ebff',
          200: '#e8d8ff',
          300: '#dfc5ff',
          400: '#d3b2ff',
          500: '#c79fff',
          600: '#bb8cff',
          700: '#af79ff',
          800: '#a366ff',
          900: '#9753ff'
        },
        // 白ベースのニュートラル
        softWhite: {
          50: '#ffffff',
          100: '#fdfeff',
          200: '#fbfcff',
          300: '#f9faff',
          400: '#f7f8ff',
          500: '#f5f6ff',
          600: '#f3f4ff',
          700: '#f1f2ff',
          800: '#eff0ff',
          900: '#edeefd'
        },
        primary: {
          50: '#e6f2ff',
          100: '#b3daff',
          200: '#80c7ff',
          300: '#4db4ff',
          400: '#1a8cff',
          500: '#0052cc',
          600: '#0747a6',
          700: '#073592',
          800: '#052a7a',
          900: '#041f61'
        },
        success: {
          50: '#e3fcef',
          100: '#abf5d1',
          200: '#79f2c0',
          300: '#46e89f',
          400: '#39d87a',
          500: '#36b37e',
          600: '#00875a',
          700: '#006644',
          800: '#005038',
          900: '#003a2b'
        },
        warning: {
          50: '#fffae6',
          100: '#fff0b3',
          200: '#ffcc5c',
          300: '#ffab00',
          400: '#ff9500',
          500: '#ff8b00',
          600: '#ff7b00',
          700: '#de350b',
          800: '#c62d00',
          900: '#9f2400'
        },
        danger: {
          50: '#ffebe6',
          100: '#ffbdad',
          200: '#ff8f73',
          300: '#ff5630',
          400: '#ff4500',
          500: '#de350b',
          600: '#bf2600',
          700: '#97190b',
          800: '#7a1508',
          900: '#5c1005'
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