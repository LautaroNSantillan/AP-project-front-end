module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      'postcss-easy-import': { prefix: '_', extensions: ['.css', '.scss'] },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-nested')
      ]
  }