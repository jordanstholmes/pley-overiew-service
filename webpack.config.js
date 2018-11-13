const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },
  plugins: [
    new CompressionPlugin(),
  ],
  module: {
    rules: [
      {
        loaders: "babel-loader",
        test: /\.jsx?$/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        }
      }
    ]
  }
}