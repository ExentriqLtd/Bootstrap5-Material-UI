// postcss.config.js
const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      // directory aggiuntive in cui cercare gli @import
      path: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'scss'),
        path.resolve(__dirname, 'scss/vendor-extra'),
      ],
    }),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production'
      ? [require('cssnano')({ preset: 'default' })]
      : []),
  ],
};