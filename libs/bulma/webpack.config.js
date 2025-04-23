const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, '../../dist/bulma'), // the bundle output path
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scsss'],
    alias: {
      '@mito-forms/core': path.resolve(__dirname, '../../dist/core'),
    },
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/, // .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html' // to import index.html file inside index.js
    // })
  ],
};
