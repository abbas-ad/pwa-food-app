module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      primary: '#000',
      secondary: '#6c757e',
      'gray-primary':'#ABABAB',
      'gray-secondary': '#F5F5F5',
      'gray-tertiary':'rgba(151,170,189,.1)',
      'yellow-primary': '#FFCB2D',
      'green-primary': '#04944F',
      'green-secondary': '#00BF71',
      'red-primary': '#EF2A52',
      red: '#D03435',
      'border-gray': '#e5e5e5',
      white: '#fff'
    },
    fontFamily: {
      'yekan-thin': ['yekan-thin', 'sans-serif'],
      'yekan-regular': ['yekan-regular', 'sans-serif'],
      'yekan-medium': ['yekan-medium', 'sans-serif'],
      'yekan-bold': ['yekan-bold', 'sans-serif']
    },
    fontSize: {
      'xs': '.6rem',
      'sm': '.8rem',
      'base': '1rem',
      'md': '1.2rem',
      'lg': '1.4rem',
      'xl': '1.6rem',
      '3xl': '1.8rem',
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      'accordion': '0 0 .6rem rgba(0, 0, 0, 0.1)',
    },
    extend: {
      spacing: {
        half: '50%',
       },
     borderRadius: {
      circle: '50%'
     },
      outline: {
        black: '.1rem solid #000',
      },
      backgroundImage: {
        'category-header': "url('/src/assets/svgs/categoryBackground.svg')",
        'splash': "url('/src/assets/img/splash.png')",
       },
       animation: {
        downanime: 'downanime .5s ease-in-out',
       },
       keyframes: {
        downanime: {
          'from': { transform: 'translateY(-20rem)' },
          'to': { transform: 'translateY(0)' },
        }
       }
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('tailwindcss-rtl')
  ],
}
