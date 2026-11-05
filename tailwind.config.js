/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          maroon: {
            DEFAULT: '#560D0D',
            50: '#FDF2F2',
            100: '#FCE7E7',
            200: '#F9D1D1',
            300: '#F2AFAF',
            400: '#E06D6D',
            500: '#C43B3B',
            600: '#9B1D1D',
            700: '#7E1313',
            800: '#560D0D',
            900: '#3D0707',
            950: '#230303',
          },
          gold: {
            DEFAULT: '#C8872B',
            50: '#FDF9F0',
            100: '#FAF2DF',
            200: '#F4E2BE',
            300: '#ECCF96',
            400: '#E1B463',
            500: '#C8872B',
            600: '#AB6D1D',
            700: '#8A5217',
            800: '#6E4017',
            900: '#593416',
          },
          cream: {
            50: '#FCFBF7',
            100: '#F8F6EE',
            200: '#F1ECDB',
            300: '#E6DDC3',
          },
          navy: {
            900: '#0F172A',
            800: '#1E293B',
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 30px -5px rgba(86, 13, 13, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'gold-glow': '0 4px 20px -2px rgba(200, 135, 43, 0.25)',
      }
    },
  },
  plugins: [],
}
