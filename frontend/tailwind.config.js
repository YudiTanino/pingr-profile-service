module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          lightest: '#BECBDA',
          light: '#486480',
          DEFAULT: '#384A61',
          dark: '#253140',
        },
        red: {
          light: '#EE9694',
          DEFAULT: '#E25354',
        },
        gray: {
          light: '#E6E8E6',
          DEFAULT: '#ABB1AB',
          dark: '#656D78',
        },
        white: {
          DEFAULT: '#FEFEFE',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
